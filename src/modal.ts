import { App, Editor, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import { WidgetEntry } from "./types";
import type HUDBlocksPlugin from "./main";

export class InsertWidgetModal extends FuzzySuggestModal<WidgetEntry> {
    private items: WidgetEntry[] = [];

    constructor(app: App, private plugin: HUDBlocksPlugin, private editor?: Editor) {
        super(app);
        this.setPlaceholder("Search and select a HUD Widget to insert...");
    }

    async onOpen() {
        super.onOpen();
        this.items = await this.plugin.catalogManager.getLocalCatalog();
        // Re-render suggestions once items are loaded
        this.inputEl.dispatchEvent(new Event("input"));
    }

    getItems(): WidgetEntry[] {
        return this.items;
    }

    getItemText(item: WidgetEntry): string {
        return `${item.name} ${item.id} ${item.description}`;
    }

    renderSuggestion(match: FuzzyMatch<WidgetEntry>, el: HTMLElement) {
        const item = match.item;
        el.addClass("hud-modal-suggestion");
        
        const topRow = el.createDiv({ cls: "hud-modal-suggestion-header" });
        topRow.createSpan({ text: item.name, cls: "hud-modal-suggestion-title" });
        topRow.createSpan({ text: `v${item.version}`, cls: "hud-modal-suggestion-badge" });

        const desc = el.createDiv({ cls: "hud-modal-suggestion-desc" });
        desc.setText(item.description);
    }

    onChooseItem(item: WidgetEntry, evt: MouseEvent | KeyboardEvent) {
        const snippet = `\`\`\`hud\nwidget: ${item.id}\n\`\`\`\n`;
        if (this.editor) {
            this.editor.replaceSelection(snippet);
        } else {
            const activeView = this.app.workspace.getActiveViewOfType(this.app.workspace.activeEditor ? (this.app.workspace.activeEditor as any).constructor : null as any);
            const editor = (activeView as any)?.editor;
            if (editor) {
                editor.replaceSelection(snippet);
            }
        }
    }
}
