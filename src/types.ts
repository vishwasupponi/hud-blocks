export interface WidgetEntry {
    id: string;
    aliases?: string[];
    name: string;
    description: string;
    version: string;
    file: string;
}

export interface HUDBlocksSettings {
    githubRepo: string;
    branch: string;
    autoCheckUpdates: boolean;
    lastCheckTime: number;
}

export const DEFAULT_SETTINGS: HUDBlocksSettings = {
    githubRepo: "vishwasupponi/hud-blocks",
    branch: "main",
    autoCheckUpdates: false,
    lastCheckTime: 0
};
