# HUD Widget Blocks

[![Latest Release](https://img.shields.io/github/v/release/vishwasupponi/hud-blocks?color=3b82f6&label=Version)](https://github.com/vishwasupponi/hud-blocks/releases/latest)
[![Obsidian](https://img.shields.io/badge/Obsidian-v0.15.0%2B-7C3AED.svg)](https://obsidian.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](LICENSE)

> [!NOTE]
> **Safe & Non-Destructive**: This plugin operates strictly in read-only mode. It **never modifies, edits, alters, or writes to any of your existing notes** in your vault (with the sole exception of the Live Session Tracker widget, which creates and updates session log notes only when you explicitly start or end a session).

Modular and customisable sci-fi HUD widgets and dashboards for your notes.

---

## ✨ Features

- **Modular Widgets**: Quick Actions, Live Session Tracker, Vault Navigator, Activity Heatmap, Vault Stats, Metrics Dashboard, Activity Timeline, and Completion Trends.
- **Clean 2-Line Codeblocks**: No need to paste 1,000+ lines of raw JavaScript into your notes.
- **Updates from GitHub**: Update widgets directly from GitHub within Obsidian settings.
- **Automatic Note-Based Profiles**: Zero configuration required — each note automatically creates and remembers its own settings.
- **Zero External Plugin Dependencies**: **When the HUD Widget Blocks plugin is installed, all 8 widgets work 100% natively out of the box — you do NOT need Dataview or any other plugin installed!**
- **Standalone DataviewJS Compatible**: **Don't want to install this plugin? You can still run any of the `.js` files standalone, provided you have the Dataview plugin installed (with *"Enable JavaScript Queries"* turned ON).**

---

## 🚀 Installation

### From Obsidian Community Plugins *(Recommended)*
1. In Obsidian, navigate to **Settings** → **Community plugins**.
2. Turn off **Restricted mode** if prompted.
3. Click **Browse** and search for **HUD Widget Blocks**.
4. Click **Install**, then click **Enable**.

### Manual Installation
1. Download the `hud-blocks` release files (`main.js`, `manifest.json`, `styles.css`, `catalog.json`, and `widgets/`) from the [Latest Release](https://github.com/vishwasupponi/hud-blocks/releases/latest).
2. Inside your Obsidian vault, navigate to `.obsidian/plugins/`.
3. Create a folder named `hud-blocks` and copy the downloaded files into it.
4. Go to **Settings** → **Community plugins**, click **Reload plugins**, and enable **HUD Widget Blocks**.

---

## ⚡ Quick Start

### 1. Standard Syntax
In any markdown note, add a `hud` codeblock with `widget: <id or alias>`:

````markdown
```hud
widget: activity-heatmap
```
````

### 2. Convenience Tag Syntax
You can also use the direct tag for any widget:

````markdown
```hud-heatmap
```
````

### 3. Quick Insert Command
Open the Command Palette (`Ctrl+P` or `Cmd+P`) and type:
> **HUD Blocks: Insert HUD Widget...**

Select any widget from the fuzzy-search list to insert it at your cursor.

### 4. Widget Catalog & Syntax

| # | Widget Name | Primary ID | Aliases | Direct Codeblock Tag |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **Quick Actions** | `quick-actions` | `1` | ```` ```hud-quick-actions ```` |
| **02** | **Live Session Tracker** | `live-session-tracker` | `2` | ```` ```hud-live-tracker ```` |
| **03** | **Vault Navigator** | `vault-navigator` | `3` | ```` ```hud-vault-navigator ```` |
| **04** | **Activity Heatmap** | `activity-heatmap` | `4` | ```` ```hud-heatmap ```` |
| **05** | **Vault Stats** | `vault-stats` | `5` | ```` ```hud-vault-stats ```` |
| **06** | **Metrics Dashboard** | `metrics-dashboard` | `6` | ```` ```hud-metrics ```` |
| **07** | **Activity Timeline** | `activity-timeline` | `7` | ```` ```hud-timeline ```` |
| **08** | **Completion Trends** | `completion-trends` | `8` | ```` ```hud-completion-trends ```` |

### 5. Handling Multiple Blocks on the Same Page

- **Different Widgets on the Same Page**: Place as many different widgets as you like on a single page. Each widget runs in its own isolated DOM container and manages its own independent configuration file on disk.
- **Multiple Instances of the Same Widget**: If you want two instances of the same widget on a single note (e.g., two *Quick Actions* panels), add the optional `profile:` parameter to give each block an independent identity:

````markdown
### Daily Tasks
```hud
widget: quick-actions
profile: daily_shortcuts
```

### Project Actions
```hud
widget: quick-actions
profile: project_actions
```
````

---

## 📖 6. Widget Setup & User Manual

> [!TIP]
> **Interactive In-Widget Settings (`⚙️`)**: Every widget has a **`⚙️` Settings** button in its top-right corner. Because HUD Widget Blocks does **not** hardcode any personal folder or property names, **all folder and YAML property fields start blank by default** so you can connect them to your own vault structure in seconds.

| Widget | Requires YAML Frontmatter? | YAML Properties Used *(Configured in `⚙️` Settings)* |
| :--- | :---: | :--- |
| **01. Quick Actions** | ❌ **No** | *None — configured 100% visually in `⚙️` Settings* |
| **02. Live Session Tracker** | ✅ **Yes** *(Auto-created)* | **Start Time**, **End Time**, and **Tracked Item** properties |
| **03. Vault Navigator** | ⚡ **Optional** | **`banner`** *(strictly lowercase)* for card cover images + optional **YAML Filter** |
| **04. Activity Heatmap** | ❌ **No** | *None — automatically reads file creation (`ctime`) & modification (`mtime`) dates* |
| **05. Vault Stats** | ✅ **Yes** *(for grouping)* | **Base Properties** *(comma-separated YAML keys linking notes to `.base` files/categories)* |
| **06. Metrics Dashboard** | ✅ **Yes** | **Start Time**, **End Time**, **Completion Date**, and **Year** properties |
| **07. Activity Timeline** | ✅ **Yes** | **Start Time**, **End Time**, and **Item / Activity** properties |
| **08. Completion Trends** | ✅ **Yes** | **Completion Date** property *(also detects `/YYYY/` year subfolders)* |

---

### 🔹 01. Quick Actions (`quick-actions`)
- **Zero YAML Setup Needed**: Click the **`⚙️`** icon in the widget header to add custom buttons, choose Emoji or Lucide icons, and link each button to:
  - **Obsidian Commands** *(triggers any core or community plugin command)*
  - **Vault Notes / `.base` Files** *(opens any file in your vault)*
  - **External URLs** *(opens web links or `obsidian://` URIs)*

---

### 🔹 02. Live Session Tracker (`live-session-tracker`)
- **Works 100% Natively (No External Plugins Required)**: Automatically creates a new session log note when you click **Start** and writes the end timestamp when you click **End**.
- **Required First-Time `⚙️` Setup**: Open **`⚙️` Settings** and fill in:
  1. **Sessions Folder**: The folder where new session log notes will be saved *(e.g. `Logs/Sessions`)*.
  2. **Items Folder**: The folder containing the notes/projects/activities you want to pick from the dropdown *(or link a `.base` file)*.
  3. **YAML Property Names**: Enter the property names to write into each session note:
     - **Start Time Property** *(e.g. `start-time`)*
     - **End Time Property** *(e.g. `end-time`)*
     - **Tracked Item Property** *(e.g. `activity` or `project`)*
- **Optional QuickAdd Plugin Integration**: If you prefer custom macros via the **QuickAdd** community plugin, you can optionally select your QuickAdd start/end commands in **`⚙️` Settings**.

---

### 🔹 03. Vault Navigator (`vault-navigator`) — & Card Banner Image Previews
- **Navigation Modes & Filters**: In the **`⚙️` Settings** drawer, switch between **Manual Selection Mode** *(pin specific notes or `.base` files)* and **Recent Notes Mode** *(automatically show recently edited notes)*. You can also narrow down results using the **YAML Filter** *(by property key & value)* or **Folder Filter**.

> [!IMPORTANT]
> **🖼️ How to Show Banner Image Previews on Cards (No Banner Plugin Needed!)**
>
> **You do NOT need the *Banners* plugin (or any other community plugin) installed to display cover images on Vault Navigator cards!**
>
> Simply add a YAML frontmatter property named **`banner`** (**strictly lowercase `banner`**, not `Banner`) to any linked note and point it to an image in your vault or a web URL:

```yaml
---
banner: "[[my-cover-image.png]]"
# You can also use a relative vault path or an external web URL:
# banner: "Attachments/cover-image.jpg"
# banner: "https://example.com/banner.jpg"
---
```

---

### 🔹 04. Activity Heatmap (`activity-heatmap`)
- **Zero YAML Setup Needed (Works Out of the Box)**: Automatically scans `.md` and `.base` files across your vault and plots daily activity intensity using file creation (`ctime`) and modification (`mtime`) dates.
- **In-Widget Controls & `⚙️` Settings**: Switch between **Yearly** and **365-Day Rolling** views or pick color themes directly in the header. Open **`⚙️` Settings** to customize the **Widget Heading** *(supports `{MODE}` token)* or add **Excluded Folders** *(comma-separated folders to ignore)*.

---

### 🔹 05. Vault Stats (`vault-stats`)
- **Categories, `.base` Files & Radar Distribution**: Automatically discovers `.base` files in your vault (as well as notes with `type: base` in YAML) and displays a **Vault Categories & Bases** list on the left alongside an interactive **Radar Distribution Chart & Recent Modifications** feed on the right.
- **Required `⚙️` Setup for Note Grouping**: Open **`⚙️` Settings** and configure:
  - **Base Properties**: Enter the comma-separated YAML frontmatter property names your notes use to link to a `.base` file or category *(e.g. `base, database, category, type`)*. Notes without these properties are grouped under `NOT LINKED TO BASE`.
  - **Excluded Folders & Top Categories Limit**: Optionally exclude specific folders from indexing or set the max number of categories shown on the radar chart before grouping the rest into `OTHER BASES`.

---

### 🔹 06. Metrics Dashboard (`metrics-dashboard`)
- **Combined Session & Completion Telemetry**: Combines three panels — **Overview System Metrics**, **Weekly Load Distribution**, and a bottom **Completion Telemetry** chart.
- **Required First-Time `⚙️` Setup**: Open **`⚙️` Settings** and configure its two data sources:
  1. **Session Logs (Top Panels)**: Set your **Sessions Folder**, **Start Time Property**, and **End Time Property** *(the same folder and timestamp properties used in Widget 02)* to calculate total hours, session counts, active days, and weekly load.
  2. **Completed Items (Bottom Chart & Counter)**: Set your **Target / Items Folder**, **Completion Date Property**, and **Year Property** to track completed items and plot them across Yearly, Monthly, and Recent 12M views.

---

### 🔹 07. Activity Timeline (`activity-timeline`)
- **Daily Session Trace & Activity Breakdown**: Plots an interactive daily session bar chart with date-range presets (`7D`, `30D`, `90D`, `ALL`) and a per-activity hours breakdown.
- **Required First-Time `⚙️` Setup**: Open **`⚙️` Settings** and enter your **Sessions Folder**, **Start Time Property**, **End Time Property**, and **Item / Activity Property** *(matching the exact properties configured in Widget 02)*.

---

### 🔹 08. Completion Trends (`completion-trends`)
- **Yearly, Monthly & Recent 12M Completion Line Chart**: Scans your completed notes and plots completion trends with a multi-year filter dropdown.
- **Required First-Time `⚙️` Setup**: Open **`⚙️` Settings** and configure:
  1. **Target / Items Folder**: Select the vault folder containing your completed notes *(e.g. `Archive`, `Projects`, `Completed` — or leave blank to scan the entire vault)*.
  2. **Completion Date Property**: Enter the frontmatter property name that stores the completion date on those notes *(e.g. `completedDate`, `date-watched`, `finish-date` in `YYYY-MM-DD` format)*.

---

## ⚙️ Settings

### Zero-Configuration Note Binding
You **never** need to configure a profile name manually:
1. When you add a widget to `Dashboard.md`, the widget automatically detects the note name.
2. It generates a unique profile key: `Dashboard`.
3. When you click the ⚙️ gear icon and save changes, settings are saved to `.obsidian/HUD Config/<widget>--Dashboard.json`.
4. Re-opening the note automatically restores your exact configuration.

### Shared Profiles (Mirroring)
If you want `Project A.md` and `Project B.md` to share identical settings:
1. Open the ⚙️ modal in `Project B.md`.
2. Select `Project A` from the **Profile** dropdown.
3. Click **Save Settings**. `Project B` will now automatically mirror `Project A`!

### Updates from GitHub
The plugin features a modular updater:
1. Open Obsidian **Settings** → **HUD Blocks**.
2. Click **🔄 Check for Updates**.
3. Update individual widgets via `[ ⬆️ Update to vX.X.X ]`, or click `[ ⚡ Update All ]`.
4. The downloaded file immediately overwrites the local script in `.obsidian/plugins/hud-blocks/widgets/`.
5. Open notes re-render the updated widget instantly **without needing an Obsidian restart**!
6. **Your saved settings, buttons, and custom colors are 100% safe** in `.obsidian/HUD Config/` and are never overwritten during widget updates.

### Standalone Usage (Without Plugin)
> [!IMPORTANT]
> - **If you install the HUD Widget Blocks plugin:** **All 8 widgets work 100% natively out of the box — you do NOT need Dataview installed.**
> - **If you do NOT install the HUD Widget Blocks plugin:** **None of the raw `.js` widget scripts can run in vanilla Obsidian on their own. You MUST install and enable the Dataview community plugin (with *"Enable JavaScript Queries"* turned ON) to run them.**

To run any widget without installing the HUD Widget Blocks plugin:
1. **Install and enable the Dataview community plugin (with *"Enable JavaScript Queries"* turned ON).**
2. Copy the code from any file in the `widgets/` folder (e.g. `04 - Activity Heatmap.js`).
3. Paste it inside a `dataviewjs` codeblock:
   ````markdown
   ```dataviewjs
   // Paste widget code here
   ```
   ````
**The widget UI, animations, and settings modal will function identically.**

---

## Development

To build the plugin from source:
```bash
npm install
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Developed by [Vishwas Upponi](https://github.com/vishwasupponi).
