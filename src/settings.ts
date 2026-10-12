import { App, Notice, PluginSettingTab, Setting, SettingDefinitionItem } from "obsidian";
import type HUDBlocksPlugin from "./main";
import { WidgetEntry } from "./types";

export class HUDBlocksSettingTab extends PluginSettingTab {
    private localCatalog: WidgetEntry[] = [];
    private remoteCatalog: WidgetEntry[] | null = null;
    private missingWidgets: Set<string> = new Set();
    private isChecking = false;
    private updatingWidgets: Set<string> = new Set();
    private statusText = "";

    constructor(app: App, private plugin: HUDBlocksPlugin) {
        super(app, plugin);
    }

    override getSettingDefinitions(): SettingDefinitionItem[] {
        return [];
    }

    private async refreshMissingWidgets() {
        this.missingWidgets.clear();
        for (const w of this.localCatalog) {
            const exists = await this.plugin.catalogManager.hasWidgetFile(w);
            if (!exists) {
                this.missingWidgets.add(w.id);
            }
        }
    }

    display(): void {
        this.renderTab();
    }

    private renderTab(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.addClass("hud-settings-container");

        // GENERAL SETTINGS
        new Setting(containerEl)
            .setName("Auto-check for updates")
            .setDesc("Automatically check for widget updates when Obsidian starts.")
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.autoCheckUpdates)
                .onChange(async (val) => {
                    this.plugin.settings.autoCheckUpdates = val;
                    await this.plugin.saveSettings();
                })
            );

        // WIDGET MANAGEMENT SECTION
        new Setting(containerEl)
            .setName("Widgets")
            .setHeading();

        const controlsRow = containerEl.createDiv({ cls: "hud-settings-controls" });

        const checkBtn = controlsRow.createEl("button", {
            text: this.isChecking ? "⏳ Checking..." : "🔄 Check for Updates",
            cls: "mod-cta"
        });
        checkBtn.disabled = this.isChecking;
        checkBtn.onclick = () => {
            void this.checkForUpdates();
        };

        const statusLabel = controlsRow.createSpan({ cls: "hud-settings-status" });
        statusLabel.setText(this.statusText || (this.plugin.settings.lastCheckTime ? `Last checked: ${new Date(this.plugin.settings.lastCheckTime).toLocaleTimeString()}` : "Click 'Check for Updates' to verify with GitHub."));

        // Render Widget List
        void this.renderWidgetList(containerEl);
    }

    private async checkForUpdates() {
        this.isChecking = true;
        this.statusText = "Contacting GitHub...";
        this.renderTab();

        try {
            this.localCatalog = await this.plugin.catalogManager.getLocalCatalog();
            await this.refreshMissingWidgets();
            this.remoteCatalog = await this.plugin.catalogManager.getRemoteCatalog(
                this.plugin.settings.githubRepo,
                this.plugin.settings.branch
            );

            this.plugin.settings.lastCheckTime = Date.now();
            await this.plugin.saveSettings();

            // Count available updates or missing files
            const updatesCount = this.getAvailableUpdatesCount();
            if (updatesCount > 0) {
                this.statusText = `⚡ ${updatesCount} update${updatesCount > 1 ? 's' : ''} available!`;
                new Notice(`⚡ HUD Blocks: ${updatesCount} widget update${updatesCount > 1 ? 's' : ''} available!`);
            } else {
                this.statusText = "✓ All widgets are up to date.";
                new Notice("✓ All HUD widgets are up to date.");
            }
        } catch (err) {
            console.error("[HUD Blocks] Update check failed:", err);
            this.statusText = `⚠️ Check failed: ${err instanceof Error ? err.message : String(err)}`;
            new Notice(`⚠️ HUD Blocks update check failed. Check console for details.`);
        } finally {
            this.isChecking = false;
            this.renderTab();
        }
    }

    private getAvailableUpdatesCount(): number {
        const sourceCatalog = this.remoteCatalog || this.localCatalog;
        let count = 0;
        for (const entry of sourceCatalog) {
            const local = this.localCatalog.find(l => l.id === entry.id);
            const isMissing = this.missingWidgets.has(entry.id);
            if (!local || isMissing || (this.remoteCatalog && this.isVersionGreater(entry.version, local.version))) {
                count++;
            }
        }
        return count;
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

    private async renderWidgetList(containerEl: HTMLElement) {
        if (this.localCatalog.length === 0) {
            this.localCatalog = await this.plugin.catalogManager.getLocalCatalog();
        }
        await this.refreshMissingWidgets();

        const listWrap = containerEl.createDiv({ cls: "hud-widget-list" });

        // Update All Button if multiple updates or missing files are available
        const updatesCount = this.getAvailableUpdatesCount();
        if (updatesCount > 1) {
            const topRow = listWrap.createDiv({ cls: "hud-widget-bulk-bar" });
            const updateAllBtn = topRow.createEl("button", {
                text: `⚡ Update All (${updatesCount} Widgets)`,
                cls: "mod-cta hud-btn-update-all"
            });
            updateAllBtn.onclick = () => {
                void this.updateAllWidgets();
            };
        }

        // Merge remote and local catalog so newly released remote widgets appear in the list
        const displayCatalogMap = new Map<string, { entry: WidgetEntry, isNew: boolean }>();
        if (this.remoteCatalog) {
            for (const r of this.remoteCatalog) {
                const isNew = !this.localCatalog.some(l => l.id === r.id);
                displayCatalogMap.set(r.id, { entry: r, isNew });
            }
        }
        for (const l of this.localCatalog) {
            if (!displayCatalogMap.has(l.id)) {
                displayCatalogMap.set(l.id, { entry: l, isNew: false });
            }
        }

        for (const { entry: widgetItem, isNew } of displayCatalogMap.values()) {
            const localWidget = this.localCatalog.find(l => l.id === widgetItem.id);
            const remoteWidget = this.remoteCatalog?.find(r => r.id === widgetItem.id);
            const currentEntry = localWidget || widgetItem;

            const row = listWrap.createDiv({ cls: "hud-widget-row" });

            const infoCol = row.createDiv({ cls: "hud-widget-info" });
            const titleRow = infoCol.createDiv({ cls: "hud-widget-title-row" });
            titleRow.createSpan({ text: widgetItem.name, cls: "hud-widget-name" });
            if (isNew) {
                titleRow.createSpan({ text: `NEW v${widgetItem.version}`, cls: "hud-widget-ver-badge hud-badge-ok" });
            } else {
                titleRow.createSpan({ text: `v${currentEntry.version}`, cls: "hud-widget-ver-badge" });
            }

            const desc = infoCol.createDiv({ cls: "hud-widget-desc" });
            desc.setText(widgetItem.description);

            // Codeblock Aliases & Direct Tag
            const aliasWrap = infoCol.createDiv({ cls: "hud-widget-alias-row" });
            aliasWrap.createSpan({ text: "Codeblock aliases: ", cls: "hud-alias-label" });

            const allAliases = [widgetItem.id, ...(widgetItem.aliases || [])];
            allAliases.forEach((alias, idx) => {
                const codeEl = aliasWrap.createEl("code", { text: alias, cls: "hud-alias-code" });
                if (idx === 0) codeEl.addClass("hud-alias-primary");
            });

            const directTagMap: Record<string, string> = {
                "quick-actions": "hud-quick-actions",
                "live-session-tracker": "hud-live-tracker",
                "vault-navigator": "hud-vault-navigator",
                "activity-heatmap": "hud-heatmap",
                "vault-stats": "hud-vault-stats",
                "metrics-dashboard": "hud-metrics",
                "activity-timeline": "hud-timeline",
                "completion-trends": "hud-completion-trends"
            };
            const directTag = directTagMap[widgetItem.id];
            if (directTag) {
                aliasWrap.createSpan({ text: " • Direct tag: ", cls: "hud-alias-label" });
                aliasWrap.createEl("code", { text: `\`\`\`${directTag}`, cls: "hud-alias-code hud-alias-direct" });
            }

            // Action / Status Column
            const actionCol = row.createDiv({ cls: "hud-widget-action" });

            const isUpdating = this.updatingWidgets.has(widgetItem.id);
            const isMissing = !localWidget || this.missingWidgets.has(widgetItem.id);
            const hasNewerVersion = (localWidget && remoteWidget) ? this.isVersionGreater(remoteWidget.version, localWidget.version) : false;

            if (isUpdating) {
                const btn = actionCol.createEl("button", { text: "⏳ Updating...", cls: "hud-btn-busy" });
                btn.disabled = true;
            } else if (isNew) {
                const installBtn = actionCol.createEl("button", {
                    text: `✨ Install v${widgetItem.version}`,
                    cls: "mod-cta hud-btn-update"
                });
                installBtn.onclick = () => {
                    void this.updateSingleWidget(localWidget || widgetItem, remoteWidget || widgetItem);
                };
            } else if (isMissing || hasNewerVersion) {
                const targetEntry = remoteWidget || currentEntry;
                const btnLabel = (isMissing && !hasNewerVersion)
                    ? `⬇️ Download v${targetEntry.version}`
                    : `⬆️ Update to v${targetEntry.version}`;
                const updateBtn = actionCol.createEl("button", {
                    text: btnLabel,
                    cls: "mod-cta hud-btn-update"
                });
                updateBtn.onclick = () => {
                    void this.updateSingleWidget(currentEntry, targetEntry);
                };
            } else if (remoteWidget) {
                actionCol.createSpan({ text: "✓ Up to date", cls: "hud-badge-ok" });
            } else {
                actionCol.createSpan({ text: `v${currentEntry.version}`, cls: "hud-badge-neutral" });
            }
        }
    }

    private async updateSingleWidget(local: WidgetEntry, remote: WidgetEntry) {
        this.updatingWidgets.add(local.id);
        this.renderTab();

        try {
            await this.plugin.catalogManager.updateWidget(
                local,
                remote,
                this.plugin.settings.githubRepo,
                this.plugin.settings.branch
            );
            new Notice(`⚡ HUD Blocks: Updated "${remote.name}" to v${remote.version}!`);
            this.localCatalog = await this.plugin.catalogManager.getLocalCatalog();
            await this.refreshMissingWidgets();
        } catch (err) {
            console.error(`[HUD Blocks] Failed to update widget ${local.id}:`, err);
            new Notice(`❌ Failed to update "${local.name}". Check console.`);
        } finally {
            this.updatingWidgets.delete(local.id);
            this.renderTab();
        }
    }

    private async updateAllWidgets() {
        const sourceCatalog = this.remoteCatalog || this.localCatalog;
        const outdated = sourceCatalog.filter(r => {
            const l = this.localCatalog.find(loc => loc.id === r.id);
            const isMissing = this.missingWidgets.has(r.id);
            return !l || isMissing || (this.remoteCatalog !== null && this.isVersionGreater(r.version, l.version));
        });

        if (outdated.length === 0) return;

        new Notice(`⚡ HUD Blocks: Starting download of ${outdated.length} widgets...`);

        for (const remote of outdated) {
            const local = this.localCatalog.find(l => l.id === remote.id) || remote;
            this.updatingWidgets.add(remote.id);
            this.renderTab();

            try {
                await this.plugin.catalogManager.updateWidget(
                    local,
                    remote,
                    this.plugin.settings.githubRepo,
                    this.plugin.settings.branch
                );
            } catch (err) {
                console.error(`[HUD Blocks] Failed to update ${remote.name}:`, err);
            } finally {
                this.updatingWidgets.delete(remote.id);
            }
        }

        this.localCatalog = await this.plugin.catalogManager.getLocalCatalog();
        await this.refreshMissingWidgets();
        new Notice(`✓ HUD Blocks: All widgets updated successfully!`);
        this.renderTab();
    }
}
