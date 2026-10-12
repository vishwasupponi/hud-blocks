import { normalizePath, Notice, requestUrl } from "obsidian";
import type HUDBlocksPlugin from "./main";
import { WidgetEntry } from "./types";

export const DEFAULT_CATALOG: WidgetEntry[] = [
    {
        id: "quick-actions",
        aliases: ["1"],
        name: "Quick Actions",
        description: "Configurable glowing action buttons with custom colors, drag-and-drop reordering, and live command/QuickAdd autocomplete.",
        version: "1.0.0",
        file: "widgets/01 - Quick Actions.js"
    },
    {
        id: "live-session-tracker",
        aliases: ["2"],
        name: "Live Session Tracker",
        description: "Tactical session terminal with matrix stream canvas, animated equalizer, recording status pulse, and live duration counter.",
        version: "1.0.0",
        file: "widgets/02 - Live Session Tracker.js"
    },
    {
        id: "vault-navigator",
        aliases: ["3"],
        name: "Vault Navigator",
        description: "Cyberpunk quick navigation drawer and cards with manual note picker, recent files scanner, and YAML filter chips.",
        version: "1.0.0",
        file: "widgets/03 - Vault Navigator.js"
    },
    {
        id: "activity-heatmap",
        aliases: ["4"],
        name: "Activity Heatmap",
        description: "Vault-wide activity heatmap grid with stealth/matrix/cyan/amber/crimson themes, custom color pickers, and folder exclusion filters.",
        version: "1.0.0",
        file: "widgets/04 - Activity Heatmap.js"
    },
    {
        id: "vault-stats",
        aliases: ["5"],
        name: "Vault Stats",
        description: "Interactive SVG radar donut chart with dual counter-rotating rings, sonar sweep animation, category breakdown, and recent files list.",
        version: "1.0.0",
        file: "widgets/05 - Vault Stats.js"
    },
    {
        id: "metrics-dashboard",
        aliases: ["6"],
        name: "Metrics Dashboard",
        description: "High-density command center with 360px metric cards panel, weekly distribution histogram, and interactive telemetry line graph.",
        version: "1.0.0",
        file: "widgets/06 - Metrics Dashboard.js"
    },
    {
        id: "activity-timeline",
        aliases: ["7"],
        name: "Activity Timeline",
        description: "Spaceship telemetry dashboard featuring dual laser sweepers, live data ticker, stepped line trace, and interactive hover readout box.",
        version: "1.0.0",
        file: "widgets/07 - Activity Timeline.js"
    },
    {
        id: "completion-trends",
        aliases: ["8"],
        name: "Completion Trends",
        description: "Neon rose-glow polyline chart for completion and milestone tracking with yearly/monthly resolution and multi-year filter dropdown.",
        version: "1.0.0",
        file: "widgets/08 - Completion Trends.js"
    }
];

export class CatalogManager {
    constructor(private plugin: HUDBlocksPlugin) {}

    private get pluginDir(): string {
        return normalizePath(this.plugin.manifest.dir || "");
    }

    private get localCatalogPath(): string {
        return normalizePath(`${this.pluginDir}/catalog.json`);
    }

    async getLocalCatalog(): Promise<WidgetEntry[]> {
        const adapter = this.plugin.app.vault.adapter;
        try {
            if (await adapter.exists(this.localCatalogPath)) {
                const data = await adapter.read(this.localCatalogPath);
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("[HUD Blocks] Failed to read local catalog.json:", e);
        }

        // Initialize with default catalog if missing or unreadable
        await this.saveLocalCatalog(DEFAULT_CATALOG);
        return DEFAULT_CATALOG;
    }

    async saveLocalCatalog(catalog: WidgetEntry[]): Promise<void> {
        const adapter = this.plugin.app.vault.adapter;
        try {
            await adapter.write(this.localCatalogPath, JSON.stringify(catalog, null, 2));
        } catch (e) {
            console.error("[HUD Blocks] Failed to write local catalog.json:", e);
        }
    }

    async getRemoteCatalog(repo: string, branch = "main"): Promise<WidgetEntry[]> {
        const cleanRepo = repo.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/+$/, '');
        const url = `https://raw.githubusercontent.com/${cleanRepo}/${branch.trim()}/catalog.json`;

        try {
            const resp = await requestUrl({ url, method: "GET" });
            if (resp.status >= 200 && resp.status < 300) {
                const parsed = JSON.parse(resp.text);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
            throw new Error(`HTTP ${resp.status}`);
        } catch (e) {
            throw new Error(`Failed to fetch catalog from ${url}: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

    async downloadWidgetFile(repo: string, branch: string, fileRelPath: string): Promise<string> {
        const cleanRepo = repo.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/+$/, '');
        const encodedPath = fileRelPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
        const url = `https://raw.githubusercontent.com/${cleanRepo}/${branch.trim()}/${encodedPath}`;

        try {
            const resp = await requestUrl({ url, method: "GET" });
            if (resp.status >= 200 && resp.status < 300 && resp.text.trim().length > 0) {
                return resp.text;
            }
            throw new Error(`HTTP ${resp.status}`);
        } catch (e) {
            throw new Error(`Failed to download widget code from ${url}: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

    async updateWidget(localEntry: WidgetEntry, remoteEntry: WidgetEntry, repo: string, branch: string): Promise<void> {
        const code = await this.downloadWidgetFile(repo, branch, remoteEntry.file);
        const targetPath = normalizePath(`${this.pluginDir}/${remoteEntry.file}`);
        const adapter = this.plugin.app.vault.adapter;

        // Ensure subfolder exists (e.g. widgets/)
        const parts = targetPath.split('/');
        parts.pop();
        const dirPath = parts.join('/');
        if (dirPath && !(await adapter.exists(dirPath))) {
            await adapter.mkdir(dirPath).catch(() => {});
        }

        // Write the downloaded code
        await adapter.write(targetPath, code);

        // Update local catalog entry
        const catalog = await this.getLocalCatalog();
        const existingIdx = catalog.findIndex(w => w.id === remoteEntry.id);
        if (existingIdx !== -1) {
            catalog[existingIdx] = { ...remoteEntry };
        } else {
            catalog.push({ ...remoteEntry });
        }
        await this.saveLocalCatalog(catalog);
    }

    findWidget(query: string, catalog: WidgetEntry[]): WidgetEntry | null {
        const clean = query.trim().toLowerCase();
        if (!clean) return null;

        // Direct ID match
        let found = catalog.find(w => w.id.toLowerCase() === clean);
        if (found) return found;

        // Alias match
        found = catalog.find(w => w.aliases && w.aliases.some(a => a.toLowerCase() === clean));
        if (found) return found;

        // Name match or partial match
        found = catalog.find(w => w.name.toLowerCase() === clean || w.name.toLowerCase().includes(clean));
        if (found) return found;

        // File path match (e.g., "01 - Quick Actions" or "01 - Quick Actions.js")
        found = catalog.find(w => {
            const basename = w.file.split('/').pop()?.replace(/\.js$/i, '').toLowerCase();
            return basename === clean || basename?.includes(clean);
        });
        if (found) return found;

        return null;
    }

    async hasWidgetFile(entry: WidgetEntry): Promise<boolean> {
        const adapter = this.plugin.app.vault.adapter;
        const targetPath = normalizePath(`${this.pluginDir}/${entry.file}`);
        return await adapter.exists(targetPath);
    }

    async getWidgetCode(entry: WidgetEntry): Promise<string> {
        const adapter = this.plugin.app.vault.adapter;
        const targetPath = normalizePath(`${this.pluginDir}/${entry.file}`);
        if (await adapter.exists(targetPath)) {
            return await adapter.read(targetPath);
        }
        throw new Error(`Widget file not found locally: ${entry.file}`);
    }
}
