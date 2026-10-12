import { MarkdownPostProcessorContext, Notice, Plugin } from "obsidian";
import { CatalogManager } from "./catalog";
import { InsertWidgetModal } from "./modal";
import { HUDBlocksSettingTab } from "./settings";
import { DEFAULT_SETTINGS, HUDBlocksSettings } from "./types";

export default class HUDBlocksPlugin extends Plugin {
    settings: HUDBlocksSettings = DEFAULT_SETTINGS;
    catalogManager: CatalogManager = new CatalogManager(this);

    async onload() {
        await this.loadSettings();

        // Add Setting Tab
        this.addSettingTab(new HUDBlocksSettingTab(this.app, this));

        // Add Command Palette Command
        this.addCommand({
            id: "insert-hud-widget",
            name: "Insert HUD Widget...",
            editorCallback: (editor) => {
                new InsertWidgetModal(this.app, this, editor).open();
            }
        });

        // Register Primary Codeblock Processor: ```hud
        this.registerMarkdownCodeBlockProcessor("hud", (source, el, ctx) => {
            this.renderWidgetBlock(source, el, ctx);
        });

        // Register Direct Convenience Processors
        const directBlockProcessors: Record<string, string> = {
            "hud-quick-actions": "quick-actions",
            "hud-live-tracker": "live-session-tracker",
            "hud-vault-navigator": "vault-navigator",
            "hud-heatmap": "activity-heatmap",
            "hud-vault-stats": "vault-stats",
            "hud-metrics": "metrics-dashboard",
            "hud-timeline": "activity-timeline",
            "hud-completion-trends": "completion-trends"
        };

        for (const [blockTag, widgetId] of Object.entries(directBlockProcessors)) {
            this.registerMarkdownCodeBlockProcessor(blockTag, (source, el, ctx) => {
                const effectiveSource = source.trim() ? source : `widget: ${widgetId}`;
                this.renderWidgetBlock(effectiveSource, el, ctx, widgetId);
            });
        }

        // Ensure local widget files exist and optionally check updates on startup
        this.app.workspace.onLayoutReady(() => {
            this.quietCheckUpdates();
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    private async quietCheckUpdates() {
        try {
            const local = await this.catalogManager.getLocalCatalog();

            // Automatically download any missing widget .js files (e.g. fresh install from Community Plugins)
            for (const w of local) {
                const exists = await this.catalogManager.hasWidgetFile(w);
                if (!exists) {
                    try {
                        await this.catalogManager.updateWidget(w, w, this.settings.githubRepo, this.settings.branch);
                    } catch (dlErr) {
                        // Ignore individual background download errors if offline
                    }
                }
            }

            if (!this.settings.autoCheckUpdates) return;

            const remote = await this.catalogManager.getRemoteCatalog(
                this.settings.githubRepo,
                this.settings.branch
            );
            let updateCount = 0;
            for (const r of remote) {
                const l = local.find(loc => loc.id === r.id);
                const exists = await this.catalogManager.hasWidgetFile(r);
                if (!l || !exists || this.isVersionGreater(r.version, l.version)) {
                    updateCount++;
                }
            }
            if (updateCount > 0) {
                new Notice(`⚡ HUD Blocks: ${updateCount} widget update${updateCount > 1 ? 's' : ''} available! Check Settings.`);
            }
        } catch(e) {
            // Silently fail on background auto-check
        }
    }

    private isVersionGreater(remoteVer: string, localVer: string): boolean {
        const rParts = remoteVer.split('.').map(n => parseInt(n) || 0);
        const lParts = localVer.split('.').map(n => parseInt(n) || 0);
        for (let i = 0; i < Math.max(rParts.length, lParts.length); i++) {
            const r = rParts[i] || 0;
            const l = lParts[i] || 0;
            if (r > l) return true;
            if (r < l) return false;
        }
        return false;
    }

    private async renderWidgetBlock(
        source: string,
        el: HTMLElement,
        ctx: MarkdownPostProcessorContext,
        defaultWidgetId?: string
    ) {
        el.empty();
        el.addClass("hud-block-mount");

        // Parse widget identifier and optional profile
        let widgetId = defaultWidgetId || "";
        let explicitProfile = "";
        const lines = source.split("\n").map(l => l.trim()).filter(Boolean);
        for (const line of lines) {
            if (/^widget\s*:/i.test(line)) {
                widgetId = line.replace(/^widget\s*:/i, "").trim().replace(/^['"]|['"]$/g, "");
            } else if (/^type\s*:/i.test(line)) {
                widgetId = line.replace(/^type\s*:/i, "").trim().replace(/^['"]|['"]$/g, "");
            } else if (/^profile\s*:/i.test(line)) {
                explicitProfile = line.replace(/^profile\s*:/i, "").trim().replace(/^['"]|['"]$/g, "");
            }
        }
        if (!widgetId && lines.length > 0 && !lines[0].includes(":")) {
            widgetId = lines[0].trim();
        }

        if (!widgetId) {
            const errDiv = el.createDiv({ cls: "hud-error-card" });
            errDiv.createSpan({ text: "⚠️ HUD Block: Please specify 'widget: <id>' in your code block." });
            return;
        }

        const catalog = await this.catalogManager.getLocalCatalog();
        const entry = this.catalogManager.findWidget(widgetId, catalog);
        if (!entry) {
            const errDiv = el.createDiv({ cls: "hud-error-card" });
            errDiv.createSpan({ text: `⚠️ HUD Block: Unknown widget '${widgetId}'. Please check HUD Blocks settings.` });
            return;
        }

        let code = "";
        try {
            code = await this.catalogManager.getWidgetCode(entry);
        } catch (e) {
            // Try auto-downloading the missing widget file on the fly first
            try {
                await this.catalogManager.updateWidget(entry, entry, this.settings.githubRepo, this.settings.branch);
                code = await this.catalogManager.getWidgetCode(entry);
            } catch (autoDlErr) {
                const errDiv = el.createDiv({ cls: "hud-error-card" });
                errDiv.createSpan({ text: `⚠️ HUD Block: Widget file '${entry.file}' is not installed locally. ` });
                const dlBtn = errDiv.createEl("button", { text: "Download from GitHub", cls: "mod-cta" });
                dlBtn.onclick = async () => {
                    dlBtn.disabled = true;
                    dlBtn.setText("Downloading...");
                    try {
                        await this.catalogManager.updateWidget(entry, entry, this.settings.githubRepo, this.settings.branch);
                        new Notice(`Downloaded ${entry.name}!`);
                        await this.renderWidgetBlock(source, el, ctx, defaultWidgetId);
                    } catch (dlErr) {
                        new Notice(`Download failed: ${dlErr instanceof Error ? dlErr.message : String(dlErr)}`);
                        dlBtn.disabled = false;
                        dlBtn.setText("Retry Download");
                    }
                };
                return;
            }
        }

        // Bridge Dataview API & Obsidian objects
        const dvApi = (this.app as any).plugins?.plugins?.dataview?.api;
        const currentFile = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
        const effectivePath = explicitProfile ? explicitProfile : ctx.sourcePath;

        const dvBridge: any = {
            container: el,
            current: () => {
                if (!explicitProfile && dvApi && dvApi.page) {
                    try {
                        const p = dvApi.page(ctx.sourcePath);
                        if (p) return p;
                    } catch(e) {}
                }
                return {
                    file: {
                        path: effectivePath,
                        name: effectivePath.split('/').pop()?.replace(/\.md$/i, '') || "default"
                    }
                };
            },
            page: (path: string) => {
                if (dvApi && dvApi.page) {
                    try {
                        const p = dvApi.page(path);
                        if (p) return p;
                    } catch(e) {}
                }
                const f = this.app.vault.getAbstractFileByPath(path) as any;
                if (!f) return null;
                const cache = this.app.metadataCache.getFileCache(f);
                const fm = (cache && cache.frontmatter) ? { ...cache.frontmatter } : {};
                return {
                    ...fm,
                    file: {
                        path: f.path,
                        name: f.basename || f.name,
                        folder: f.parent?.path || "",
                        frontmatter: fm,
                        stat: f.stat
                    }
                };
            },
            pages: (query: string = "") => {
                if (dvApi && dvApi.pages) {
                    try {
                        return dvApi.pages(query);
                    } catch(e) {
                        console.error("[HUD Blocks] Dataview query error:", e);
                    }
                }
                const wrapDataArray = (arr: any[]): any => {
                    const wrapped: any = [...arr];
                    wrapped.values = wrapped;
                    wrapped.where = (fn: (p: any) => boolean) => wrapDataArray(wrapped.filter(fn));
                    wrapped.sort = (keyFn: (p: any) => any, dir: string = "asc") => {
                        const copy = [...wrapped];
                        copy.sort((a, b) => {
                            const va = keyFn(a);
                            const vb = keyFn(b);
                            if (va == null && vb == null) return 0;
                            if (va == null) return 1;
                            if (vb == null) return -1;
                            const cmp = String(va).localeCompare(String(vb), undefined, { numeric: true });
                            return dir && dir.toLowerCase().startsWith("desc") ? -cmp : cmp;
                        });
                        return wrapDataArray(copy);
                    };
                    wrapped.limit = (n: number) => wrapDataArray(wrapped.slice(0, n));
                    wrapped.array = () => [...wrapped];
                    return wrapped;
                };
                const cleanQ = (query || "").trim().replace(/^["']|["']$/g, "").replace(/^\/+|\/+$/g, "");
                const mdFiles = this.app.vault.getMarkdownFiles();
                const matched = mdFiles
                    .filter(f => !cleanQ || f.path.startsWith(cleanQ + "/") || f.path === cleanQ + ".md" || (f.parent && f.parent.path === cleanQ))
                    .map(f => {
                        const cache = this.app.metadataCache.getFileCache(f);
                        const fm = (cache && cache.frontmatter) ? { ...cache.frontmatter } : {};
                        const parentFolder = f.parent && f.parent.path ? f.parent.path : "";
                        return {
                            ...fm,
                            file: {
                                path: f.path,
                                name: f.basename,
                                folder: parentFolder,
                                mtime: (f as any).stat?.mtime ? (window as any).moment((f as any).stat.mtime) : null,
                                ctime: (f as any).stat?.ctime ? (window as any).moment((f as any).stat.ctime) : null,
                                link: `[[${f.path}]]`
                            }
                        };
                    });
                return wrapDataArray(matched);
            }
        };

        // Execute widget code inside isolated function
        try {
            const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
            const runner = new AsyncFunction("app", "dv", "Notice", "moment", "container", code);
            await runner(this.app, dvBridge, Notice, (window as any).moment, el);
        } catch (runErr) {
            console.error(`[HUD Blocks] Error running widget "${entry.name}":`, runErr);
            const errCard = el.createDiv({ cls: "hud-error-card" });
            errCard.createDiv({ cls: "hud-error-title", text: `⚠️ Error executing HUD widget "${entry.name}"` });
            errCard.createEl("pre", {
                cls: "hud-error-details",
                text: runErr instanceof Error ? runErr.stack || runErr.message : String(runErr)
            });
        }
    }
}
