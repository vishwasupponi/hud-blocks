import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import type HUDBlocksPlugin from "./main";
import { WidgetEntry } from "./types";

export class HUDBlocksSettingTab extends PluginSettingTab {
    private localCatalog: WidgetEntry[] = [];
    private remoteCatalog: WidgetEntry[] | null = null;
    private isChecking = false;
    private updatingWidgets: Set<string> = new Set();
    private statusText = "";

    constructor(app: App, private plugin: HUDBlocksPlugin) {
        super(app, plugin);
    }

    async display(): Promise<void> {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.addClass("hud-settings-container");

        containerEl.createEl("h2", { text: "⚡ HUD WIDGET BLOCKS SETTINGS" });

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
        containerEl.createEl("h3", { text: "📦 WIDGET MANAGER" });

        const controlsRow = containerEl.createDiv({ cls: "hud-settings-controls" });

        const checkBtn = controlsRow.createEl("button", {
            text: this.isChecking ? "⏳ Checking..." : "🔄 Check for Updates",
            cls: "mod-cta"
        });
        checkBtn.disabled = this.isChecking;
        checkBtn.onclick = async () => {
            await this.checkForUpdates();
        };

        const statusLabel = controlsRow.createSpan({ cls: "hud-settings-status" });
        statusLabel.setText(this.statusText || (this.plugin.settings.lastCheckTime ? `Last checked: ${new Date(this.plugin.settings.lastCheckTime).toLocaleTimeString()}` : "Click 'Check for Updates' to verify with GitHub."));

        // Render Widget List
        await this.renderWidgetList(containerEl);
    }

    private async checkForUpdates() {
        this.isChecking = true;
        this.statusText = "Contacting GitHub...";
        this.display();

        try {
            this.localCatalog = await this.plugin.catalogManager.getLocalCatalog();
            this.remoteCatalog = await this.plugin.catalogManager.getRemoteCatalog(
                this.plugin.settings.githubRepo,
                this.plugin.settings.branch
            );

            this.plugin.settings.lastCheckTime = Date.now();
            await this.plugin.saveSettings();

            // Count available updates
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
            this.display();
        }
    }

    private getAvailableUpdatesCount(): number {
        if (!this.remoteCatalog) return 0;
        let count = 0;
        for (const remote of this.remoteCatalog) {
            const local = this.localCatalog.find(l => l.id === remote.id);
            if (!local || this.isVersionGreater(remote.version, local.version)) {
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

        const listWrap = containerEl.createDiv({ cls: "hud-widget-list" });

        // Update All Button if multiple updates are available
        const updatesCount = this.getAvailableUpdatesCount();
        if (updatesCount > 1) {
            const topRow = listWrap.createDiv({ cls: "hud-widget-bulk-bar" });
            const updateAllBtn = topRow.createEl("button", {
                text: `⚡ Update All (${updatesCount} Widgets)`,
                cls: "mod-cta hud-btn-update-all"
            });
            updateAllBtn.onclick = async () => {
                await this.updateAllWidgets();
            };
        }

        for (const localWidget of this.localCatalog) {
            const row = listWrap.createDiv({ cls: "hud-widget-row" });

            const infoCol = row.createDiv({ cls: "hud-widget-info" });
            const titleRow = infoCol.createDiv({ cls: "hud-widget-title-row" });
            titleRow.createSpan({ text: localWidget.name, cls: "hud-widget-name" });
            titleRow.createSpan({ text: `v${localWidget.version}`, cls: "hud-widget-ver-badge" });

            const desc = infoCol.createDiv({ cls: "hud-widget-desc" });
            desc.setText(localWidget.description);

            // Codeblock Aliases & Direct Tag
            const aliasWrap = infoCol.createDiv({ cls: "hud-widget-alias-row" });
            aliasWrap.createSpan({ text: "Codeblock aliases: ", cls: "hud-alias-label" });

            const allAliases = [localWidget.id, ...(localWidget.aliases || [])];
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
            const directTag = directTagMap[localWidget.id];
            if (directTag) {
                aliasWrap.createSpan({ text: " • Direct tag: ", cls: "hud-alias-label" });
                aliasWrap.createEl("code", { text: `\`\`\`${directTag}`, cls: "hud-alias-code hud-alias-direct" });
            }

            // Action / Status Column
            const actionCol = row.createDiv({ cls: "hud-widget-action" });

            const remoteWidget = this.remoteCatalog?.find(r => r.id === localWidget.id);
            const isUpdating = this.updatingWidgets.has(localWidget.id);

            if (isUpdating) {
                const btn = actionCol.createEl("button", { text: "⏳ Updating...", cls: "hud-btn-busy" });
                btn.disabled = true;
            } else if (remoteWidget && this.isVersionGreater(remoteWidget.version, localWidget.version)) {
                // Update Available (Option B: Granular Control!)
                const updateBtn = actionCol.createEl("button", {
                    text: `⬆️ Update to v${remoteWidget.version}`,
                    cls: "mod-cta hud-btn-update"
                });
                updateBtn.onclick = async () => {
                    await this.updateSingleWidget(localWidget, remoteWidget);
                };
            } else if (remoteWidget) {
                actionCol.createSpan({ text: "✓ Up to date", cls: "hud-badge-ok" });
            } else {
                actionCol.createSpan({ text: `v${localWidget.version}`, cls: "hud-badge-neutral" });
            }
        }
    }

    private async updateSingleWidget(local: WidgetEntry, remote: WidgetEntry) {
        this.updatingWidgets.add(local.id);
        this.display();

        try {
            await this.plugin.catalogManager.updateWidget(
                local,
                remote,
                this.plugin.settings.githubRepo,
                this.plugin.settings.branch
            );
            new Notice(`⚡ HUD Blocks: Updated "${remote.name}" to v${remote.version}!`);
            this.localCatalog = await this.plugin.catalogManager.getLocalCatalog();
        } catch (err) {
            console.error(`[HUD Blocks] Failed to update widget ${local.id}:`, err);
            new Notice(`❌ Failed to update "${local.name}". Check console.`);
        } finally {
            this.updatingWidgets.delete(local.id);
            this.display();
        }
    }

    private async updateAllWidgets() {
        if (!this.remoteCatalog) return;
        const outdated = this.remoteCatalog.filter(r => {
            const l = this.localCatalog.find(loc => loc.id === r.id);
            return !l || this.isVersionGreater(r.version, l.version);
        });

        if (outdated.length === 0) return;

        new Notice(`⚡ HUD Blocks: Starting download of ${outdated.length} widgets...`);

        for (const remote of outdated) {
            const local = this.localCatalog.find(l => l.id === remote.id) || remote;
            this.updatingWidgets.add(remote.id);
            this.display();

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
        new Notice(`✓ HUD Blocks: All widgets updated successfully!`);
        this.display();
    }
}
