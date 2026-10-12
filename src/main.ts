import { App, MarkdownPostProcessorContext, Notice, Plugin, TFile, moment } from "obsidian";
import { CatalogManager } from "./catalog";
import { InsertWidgetModal } from "./modal";
import { HUDBlocksSettingTab } from "./settings";
import { DEFAULT_SETTINGS, HUDBlocksSettings } from "./types";

interface DataviewPage {
    file: {
        path: string;
        name: string;
        folder?: string;
        frontmatter?: Record<string, unknown>;
        stat?: { ctime?: number; mtime?: number; size?: number };
        ctime?: unknown;
        mtime?: unknown;
        link?: string;
    };
    [key: string]: unknown;
}

interface DataviewDataArray<T> extends Array<T> {
    values: T[];
    where: (fn: (p: T) => boolean) => DataviewDataArray<T>;
    sort: (keyFn: (p: T) => unknown, dir?: string) => DataviewDataArray<T>;
    limit: (n: number) => DataviewDataArray<T>;
    array: () => T[];
}

interface DataviewPluginApi {
    page?: (path: string) => DataviewPage | null;
    pages?: (query?: string) => DataviewDataArray<DataviewPage>;
}

interface AppWithCommunityPlugins extends App {
    plugins?: {
        plugins?: {
            dataview?: {
                api?: DataviewPluginApi;
            };
        };
    };
}

interface DataviewBridge {
    container: HTMLElement;
    current: () => DataviewPage | { file: { path: string; name: string } };
    page: (path: string) => DataviewPage | null;
    pages: (query?: string) => DataviewDataArray<DataviewPage>;
}

type AsyncFunctionConstructor = new (
    ...args: string[]
) => (app: App, dv: DataviewBridge, notice: typeof Notice, mom: typeof moment, container: HTMLElement) => Promise<void>;

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
            void this.renderWidgetBlock(source, el, ctx);
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
                void this.renderWidgetBlock(effectiveSource, el, ctx, widgetId);
            });
        }

        // Ensure local widget files exist and optionally check updates on startup
        this.app.workspace.onLayoutReady(() => {
            void this.quietCheckUpdates();
        });
    }

    async loadSettings() {
        const loaded: unknown = await this.loadData();
        if (loaded && typeof loaded === "object") {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded as Partial<HUDBlocksSettings>);
        }
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
                    } catch {
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
        } catch {
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
        } catch {
            // Try auto-downloading the missing widget file on the fly first
            try {
                await this.catalogManager.updateWidget(entry, entry, this.settings.githubRepo, this.settings.branch);
                code = await this.catalogManager.getWidgetCode(entry);
            } catch {
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
        const appWithPlugins = this.app as AppWithCommunityPlugins;
        const dvApi = appWithPlugins.plugins?.plugins?.dataview?.api;
        const effectivePath = explicitProfile ? explicitProfile : ctx.sourcePath;

        const dvBridge: DataviewBridge = {
            container: el,
            current: () => {
                if (!explicitProfile && dvApi && dvApi.page) {
                    try {
                        const p = dvApi.page(ctx.sourcePath);
                        if (p) return p;
                    } catch {
                        /* Dataview unavailable or page error; fallback to native */
                    }
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
                    } catch {
                        /* Dataview unavailable or page error; fallback to native */
                    }
                }
                const f = this.app.vault.getAbstractFileByPath(path);
                if (!f || !(f instanceof TFile)) return null;
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
                    } catch (e) {
                        console.error("[HUD Blocks] Dataview query error:", e);
                    }
                }
                const wrapDataArray = (arr: DataviewPage[]): DataviewDataArray<DataviewPage> => {
                    const wrapped = [...arr] as DataviewDataArray<DataviewPage>;
                    wrapped.values = wrapped;
                    wrapped.where = (fn: (p: DataviewPage) => boolean) => wrapDataArray(wrapped.filter(fn));
                    wrapped.sort = (keyFn: (p: DataviewPage) => unknown, dir: string = "asc") => {
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
                const matched: DataviewPage[] = mdFiles
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
                                mtime: f.stat?.mtime ? (moment(f.stat.mtime) as unknown) : null,
                                ctime: f.stat?.ctime ? (moment(f.stat.ctime) as unknown) : null,
                                link: `[[${f.path}]]`
                            }
                        };
                    });
                return wrapDataArray(matched);
            }
        };

        // Execute widget code inside isolated function
        try {
            const AsyncFunction = (
                Object.getPrototypeOf(async () => {
                    /* prototype probe */
                }) as unknown as { constructor: AsyncFunctionConstructor }
            ).constructor;
            const runner = new AsyncFunction("app", "dv", "Notice", "moment", "container", code);
            await runner(this.app, dvBridge, Notice, moment, el);
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
