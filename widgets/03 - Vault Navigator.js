// ==========================================
// 1. INJECT STYLES (TACTICAL NAV V15 - NAMESPACED)
// ==========================================
document.querySelectorAll("style[id^='obsidian-banner-links']").forEach(el => el.remove());
const style = document.createElement("style");
style.id = "obsidian-banner-links-v15-namespaced";
style.innerHTML = `
        @keyframes hudNavScanSheen {
            0% { left: -100%; opacity: 0; }
            30% { opacity: 0.35; }
            60% { left: 130%; opacity: 0; }
            100% { left: 130%; opacity: 0; }
        }

        .hud-nav-container {
            display: flex; flex-direction: column; gap: 14px; width: 100%;
            margin-top: 10px; font-family: 'JetBrains Mono', 'Courier New', monospace;
            color: #a1a1aa; background: #09090b; padding: 16px; border-radius: 4px;
            border: 1px dashed rgba(255, 255, 255, 0.15); box-sizing: border-box;
            position: relative;
        }

        /* TALL & SPACIOUS HEADER BAR */
        .hud-nav-header {
            display: flex; justify-content: space-between; align-items: center;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.15); 
            padding: 4px 0 14px 0; margin-bottom: 14px; 
            width: 100%; position: relative; box-sizing: border-box;
            min-height: 44px;
        }
        .hud-nav-title {
            color: #ffffff !important; font-size: 15px !important; text-transform: uppercase !important;
            letter-spacing: 2.5px !important; font-weight: 800 !important; flex-grow: 1; text-align: center;
            line-height: 1 !important; padding: 4px 0; text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important;
        }

        /* HEADER ACTION BUTTONS */
        .hud-nav-header-actions {
            position: absolute; right: 0; top: -2px; z-index: 10;
            display: flex; gap: 8px;
        }
        .hud-nav-action-btn {
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.3);
            color: #ffffff; font-size: 9.5px; font-weight: bold; letter-spacing: 1px;
            padding: 6px 14px; border-radius: 2px; cursor: pointer; text-transform: uppercase;
            transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;
        }
        .hud-nav-action-btn:hover {
            border-color: #38bdf8; color: #38bdf8; box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
            transform: translateY(-1px);
        }
        .hud-nav-settings-btn {
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: #e4e4e7 !important; width: 28px; height: 28px; padding: 0 !important; border-radius: 4px !important;
            display: inline-flex !important; align-items: center; justify-content: center; font-size: 13px;
        }
        .hud-nav-settings-btn:hover {
            border-color: rgba(255, 255, 255, 0.6) !important; color: #ffffff !important; background: rgba(255, 255, 255, 0.12) !important;
        }

        /* INTERACTIVE DRAWER (SEARCH & SETTINGS) */
        .hud-nav-selector-drawer {
            background: #000000; border: 1px solid rgba(56, 189, 248, 0.4);
            border-radius: 2px; padding: 14px 16px; display: flex; flex-direction: column;
            gap: 12px; margin-bottom: 14px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.9);
            box-sizing: border-box; width: 100%; z-index: 20; position: relative;
        }
        .hud-nav-drawer-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .hud-nav-drawer-title { font-size: 13.5px; font-weight: bold; color: #38bdf8; letter-spacing: 1.5px; }

        /* MODE TABS */
        .hud-nav-drawer-mode-bar {
            display: flex; gap: 10px; width: 100%; border-bottom: 1px dotted rgba(255, 255, 255, 0.15);
            padding-bottom: 10px;
        }
        .hud-nav-drawer-mode-tab {
            flex: 1; background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2);
            color: #a1a1aa; font-size: 12px; font-weight: bold; padding: 9px 14px;
            border-radius: 2px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px;
            text-align: center; transition: all 0.2s ease;
        }
        .hud-nav-drawer-mode-tab:hover { border-color: #ffffff; color: #ffffff; }
        .hud-nav-drawer-mode-tab.active {
            border-color: #38bdf8 !important; background: rgba(56, 189, 248, 0.15) !important;
            color: #38bdf8 !important; box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
        }

        /* YAML FILTER BAR */
        .hud-nav-drawer-filter-bar {
            display: flex; align-items: center; justify-content: space-between;
            background: #09090b; padding: 10px 12px; border: 1px dotted rgba(255,255,255,0.2);
            border-radius: 2px; margin-top: 2px; margin-bottom: 4px; flex-wrap: wrap; gap: 10px;
        }
        .hud-nav-drawer-select {
            background: #000000; border: 1px solid rgba(255, 255, 255, 0.3); color: #ffffff;
            font-size: 12.5px; font-weight: bold; padding: 5px 10px; border-radius: 2px;
            outline: none; cursor: pointer; transition: all 0.2s ease; font-family: inherit;
            text-transform: uppercase; max-width: 220px;
            height: 36px !important; min-height: 36px !important; line-height: normal !important; box-sizing: border-box;
        }
        .hud-nav-drawer-select:focus { border-color: #38bdf8; box-shadow: 0 0 6px rgba(56,189,248,0.4); }
        .hud-nav-drawer-select option { background: #09090b; color: #ffffff; text-transform: uppercase; }

        /* RECENT COUNT SELECTOR */
        .hud-nav-recent-count-bar {
            display: flex; align-items: center; gap: 8px; font-size: 12px; color: #e4e4e7;
            font-weight: bold; letter-spacing: 1px; text-transform: uppercase; background: #09090b;
            padding: 8px 12px; border: 1px dotted rgba(255, 255, 255, 0.2); border-radius: 2px;
            flex-wrap: wrap;
        }
        .hud-nav-recent-count-btn {
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.3); color: #ffffff;
            font-size: 11.5px; font-weight: bold; padding: 5px 12px; border-radius: 2px; cursor: pointer;
            transition: all 0.2s ease;
        }
        .hud-nav-recent-count-btn:hover { border-color: #ffffff; }
        .hud-nav-recent-count-btn.active {
            border-color: #38bdf8 !important; background: #38bdf8 !important; color: #000000 !important;
        }
        .hud-nav-recent-custom-input {
            width: 60px; background: #000000; border: 1px solid rgba(255, 255, 255, 0.3);
            color: #ffffff; font-family: inherit; font-size: 12px; font-weight: bold;
            padding: 4px 8px; border-radius: 2px; text-align: center; outline: none;
            transition: border-color 0.2s;
        }
        .hud-nav-recent-custom-input:focus { border-color: #38bdf8; box-shadow: 0 0 6px rgba(56, 189, 248, 0.4); }

        .hud-nav-drawer-search-input {
            width: 100%; background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.25);
            color: #ffffff; font-family: inherit; font-size: 13px; padding: 8px 12px;
            border-radius: 2px; box-sizing: border-box; outline: none; transition: border-color 0.2s;
        }
        .hud-nav-drawer-search-input:focus { border-color: #38bdf8; box-shadow: 0 0 6px rgba(56, 189, 248, 0.3); }

        .hud-nav-drawer-list-wrapper {
            display: grid; grid-template-columns: 1fr 1fr; gap: 10px; max-height: 260px;
            overflow-y: auto; padding-right: 4px; border-top: 1px dotted rgba(255, 255, 255, 0.15);
            padding-top: 10px;
        }
        @media (max-width: 700px) { .hud-nav-drawer-list-wrapper { grid-template-columns: 1fr; } }
        
        .hud-nav-drawer-list-wrapper::-webkit-scrollbar { width: 4px; }
        .hud-nav-drawer-list-wrapper::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 2px; }

        .hud-nav-drawer-page-item {
            background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2);
            padding: 8px 12px; border-radius: 2px; display: flex; align-items: center;
            justify-content: space-between; cursor: pointer; transition: all 0.2s ease;
            user-select: none;
        }
        .hud-nav-drawer-page-item:hover { border-color: #ffffff; background: rgba(255, 255, 255, 0.08); }
        .hud-nav-drawer-page-item.selected {
            border-color: #38bdf8 !important; background: rgba(56, 189, 248, 0.12) !important;
        }

        .hud-nav-drawer-item-title { font-size: 12.5px; font-weight: bold; color: #ffffff; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .hud-nav-drawer-item-check { font-size: 11.5px; color: #38bdf8; font-weight: bold; }

        .hud-nav-drawer-actions { display: flex; justify-content: space-between; align-items: center; width: 100%; border-top: 1px dotted rgba(255, 255, 255, 0.15); padding-top: 10px; }
        .hud-nav-drawer-btn {
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.25);
            color: #ffffff; font-size: 11.5px; font-weight: bold; padding: 7px 16px;
            border-radius: 2px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px;
            transition: all 0.2s ease;
        }
        .hud-nav-drawer-btn:hover { border-color: #ffffff; background: rgba(255, 255, 255, 0.12) !important; }
        .hud-nav-drawer-btn-save { border-color: #38bdf8; color: #38bdf8; }
        .hud-nav-drawer-btn-save:hover { background: #38bdf8 !important; color: #000000 !important; box-shadow: 0 0 10px rgba(56, 189, 248, 0.5); }

        /* SUGGESTION PILLS */
        

        /* 3 CARDS PER ROW GRID SYSTEM */
        .hud-nav-banner-grid {
            display: grid !important; 
            grid-template-columns: repeat(3, 1fr) !important; 
            gap: 16px; width: 100%; box-sizing: border-box;
        }

        @media (max-width: 900px) { .hud-nav-banner-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .hud-nav-banner-grid { grid-template-columns: 1fr !important; } }

        /* BANNER CARD HEIGHT 240px */
        .hud-nav-banner-card {
            position: relative; height: 240px; border-radius: 2px;
            border: 1px dotted rgba(255, 255, 255, 0.2); background: #000000;
            overflow: hidden; cursor: pointer; transition: all 0.25s ease;
            display: flex; flex-direction: column; justify-content: space-between;
            padding: 16px 18px; box-sizing: border-box; text-decoration: none !important;
            min-width: 0;
        }
        .hud-nav-banner-card:hover {
            border-color: #ffffff;
            transform: translateY(-3px);
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.9), 0 0 18px rgba(255, 255, 255, 0.22);
        }

        .hud-nav-banner-bg-image {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover; background-position: center;
            transition: transform 0.4s ease, filter 0.4s ease;
            z-index: 1; filter: brightness(0.72) contrast(1.1);
        }
        .hud-nav-banner-card:hover .hud-nav-banner-bg-image {
            transform: scale(1.06); filter: brightness(0.92) contrast(1.15);
        }

        .hud-nav-banner-bg-fallback {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%);
            z-index: 1; opacity: 0.9;
        }
        .hud-nav-banner-bg-fallback::before {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px);
            pointer-events: none;
        }

        .hud-nav-banner-gradient-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.15) 100%);
            z-index: 2; pointer-events: none;
        }

        .hud-nav-banner-card::after {
            content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
            pointer-events: none; z-index: 4; animation: hudNavScanSheen 4.5s infinite linear;
        }

        .hud-nav-banner-bracket-tl { position: absolute; top: -1px; left: -1px; width: 8px; height: 8px; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; z-index: 5; pointer-events: none; }
        .hud-nav-banner-bracket-br { position: absolute; bottom: -1px; right: -1px; width: 8px; height: 8px; border-bottom: 1px solid #ffffff; border-right: 1px solid #ffffff; z-index: 5; pointer-events: none; }

        .hud-nav-banner-card-header { display: flex; justify-content: space-between; align-items: center; z-index: 3; position: relative; width: 100%; }
        .hud-nav-banner-folder-badge {
            font-size: 9px; font-weight: bold; color: #ffffff; background: rgba(0, 0, 0, 0.75);
            border: 1px dotted rgba(255, 255, 255, 0.3); padding: 4px 8px; border-radius: 2px;
            letter-spacing: 1.2px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%;
        }

        .hud-nav-banner-status-tag {
            font-size: 10px !important; color: #ffffff !important; letter-spacing: 1.2px !important;
            text-transform: uppercase; font-weight: bold !important; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
            background: rgba(0, 0, 0, 0.75); padding: 3px 8px; border-radius: 2px;
            border: 1px solid rgba(255, 255, 255, 0.25); transition: all 0.2s ease;
        }
        .hud-nav-banner-card:hover .hud-nav-banner-status-tag {
            color: #ffffff !important; border-color: #ffffff !important;
            background: rgba(0, 0, 0, 0.9) !important; text-shadow: 0 0 8px rgba(255, 255, 255, 0.9) !important;
        }

        .hud-nav-banner-card-footer { z-index: 3; position: relative; display: flex; flex-direction: column; gap: 6px; }
        .hud-nav-banner-title {
            font-size: 16px; font-weight: 800; color: #ffffff; letter-spacing: 1px;
            text-transform: uppercase; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.95); margin: 0;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        
        .hud-nav-banner-subtitle {
            font-size: 11.5px; color: #38bdf8; letter-spacing: 1.2px; text-transform: uppercase; font-weight: bold;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 0 6px rgba(56, 189, 248, 0.4);
        }

        .hud-nav-banner-card.hud-nav-no-banner-card { justify-content: space-between; }
        .hud-nav-banner-card-center {
            z-index: 3; position: relative; display: flex; flex-direction: column;
            align-items: center; justify-content: center; text-align: center;
            flex-grow: 1; margin: 10px 0; gap: 8px; width: 100%;
        }
        .hud-nav-banner-title-center {
            font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 1.2px;
            text-transform: uppercase; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            line-height: 1.3; margin: 0; text-align: center; width: 100%;
            word-break: break-word; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .hud-nav-banner-subtitle-center {
            font-size: 12px; color: #38bdf8; letter-spacing: 1.2px; text-transform: uppercase; font-weight: bold;
            text-shadow: 0 0 6px rgba(56, 189, 248, 0.4); margin-top: 4px;
        }
    `;
    document.head.appendChild(style);

// ==========================================
// 2. HUD CONFIG & MULTI-PROFILE ARCHITECTURE
// ==========================================
const currentNote = dv.current();
const notePath = currentNote?.file?.path?.replace(/\.md$/i, '') || 'default';
const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, '_');

const CONFIG_DIR = `${app.vault.configDir}/HUD Config`;
const getConfigPath = (profileName) => `${CONFIG_DIR}/tactical-nav--${profileName}.json`;

let activeProfile = defaultProfileKey;
let currentActivePages = [];
let currentConfig = { mode: "manual", recentCount: 5, yamlFilter: "ALL", filterKey: "", filterValue: "", folderFilter: "" };

const ensureConfigDir = async () => {
    try {
        if (!(await app.vault.adapter.exists(CONFIG_DIR))) {
            if (app.vault.adapter.mkdir) {
                await app.vault.adapter.mkdir(CONFIG_DIR).catch(() => {});
            } else if (app.vault.createFolder) {
                await app.vault.createFolder(CONFIG_DIR).catch(() => {});
            }
        }
    } catch(e) {}
};

const listProfiles = async () => {
    const list = new Set([defaultProfileKey]);
    try {
        if (await app.vault.adapter.exists(CONFIG_DIR)) {
            const res = await app.vault.adapter.list(CONFIG_DIR);
            if (res && res.files) {
                res.files.forEach(f => {
                    const filename = f.split(/[\\/]/).pop();
                    const m = filename.match(/^tactical-nav--(.+)\.json$/);
                    if (m) list.add(m[1]);
                });
            }
        }
    } catch(e) {}
    return Array.from(list);
};

const loadProfileData = async (profileName) => {
    try {
        const targetPath = getConfigPath(profileName);
        if (await app.vault.adapter.exists(targetPath)) {
            const raw = await app.vault.adapter.read(targetPath);
            const parsed = JSON.parse(raw);
            if (parsed) {
                currentActivePages = parsed.pages || [];
                currentConfig = {
                    mode: "manual",
                    recentCount: 5,
                    yamlFilter: "ALL",
                    filterKey: "",
                    filterValue: "",
                    folderFilter: "",
                    heading: "TACTICAL NAV // QUICK DESTINATIONS",
                    ...(parsed.config || {})
                };
                return;
            }
        }
    } catch(e) {
        console.error("Tactical Nav: Failed to load profile data:", e);
    }
    currentActivePages = [];
    currentConfig = { mode: "manual", recentCount: 5, yamlFilter: "ALL", filterKey: "", filterValue: "", folderFilter: "", heading: "TACTICAL NAV // QUICK DESTINATIONS" };
};

const saveStateToStorage = async (pages, config) => {
    try {
        await ensureConfigDir();
        const targetPath = getConfigPath(activeProfile);
        const dataToSave = {
            pages: pages || [],
            config: {
                mode: config?.mode || "manual",
                recentCount: config?.recentCount !== undefined ? config.recentCount : 5,
                yamlFilter: config?.yamlFilter || "ALL",
                filterKey: config?.filterKey || "",
                filterValue: config?.filterValue || "",
                folderFilter: config?.folderFilter || "",
                heading: config?.heading || "TACTICAL NAV // QUICK DESTINATIONS"
            }
        };
        await app.vault.adapter.write(targetPath, JSON.stringify(dataToSave, null, 2));
    } catch(e) {
        console.error("Tactical Nav: Failed to save config:", e);
    }
};

const saveNotePointer = async (targetProfileName) => {
    try {
        await ensureConfigDir();
        const noteConfigPath = getConfigPath(defaultProfileKey);
        if (targetProfileName === defaultProfileKey) {
            if (await app.vault.adapter.exists(noteConfigPath)) {
                try {
                    let existing = JSON.parse(await app.vault.adapter.read(noteConfigPath)) || {};
                    delete existing.mirrors;
                    await app.vault.adapter.write(noteConfigPath, JSON.stringify(existing, null, 2));
                } catch(e) {}
            }
        } else {
            let existing = {};
            if (await app.vault.adapter.exists(noteConfigPath)) {
                try {
                    existing = JSON.parse(await app.vault.adapter.read(noteConfigPath)) || {};
                } catch(e) {}
            }
            existing.mirrors = targetProfileName;
            await app.vault.adapter.write(noteConfigPath, JSON.stringify(existing, null, 2));
        }
    } catch(e) {
        console.error("Tactical Nav: Failed to save note pointer:", e);
    }
};

const loadConfig = async () => {
    try {
        await ensureConfigDir();
        const noteConfigPath = getConfigPath(defaultProfileKey);
        
        if (await app.vault.adapter.exists(noteConfigPath)) {
            const rawNote = await app.vault.adapter.read(noteConfigPath);
            let parsed = JSON.parse(rawNote);
            if (parsed && parsed.mirrors) {
                activeProfile = parsed.mirrors;
                await loadProfileData(activeProfile);
                return;
            } else if (parsed) {
                activeProfile = defaultProfileKey;
                currentActivePages = parsed.pages || [];
                currentConfig = {
                    mode: "manual",
                    recentCount: 5,
                    yamlFilter: "ALL",
                    filterKey: "",
                    filterValue: "",
                    folderFilter: "",
                    heading: "TACTICAL NAV // QUICK DESTINATIONS",
                    ...(parsed.config || {})
                };
                return;
            }
        }

        // Check legacy localStorage migration if available
        try {
            const legacyP = localStorage.getItem(`obsidian_hud_nav_pages_${defaultProfileKey}`);
            const legacyC = localStorage.getItem(`obsidian_hud_nav_config_${defaultProfileKey}`);
            if (legacyP !== null || legacyC !== null) {
                currentActivePages = legacyP ? JSON.parse(legacyP) : [];
                currentConfig = {
                    mode: "manual",
                    recentCount: 5,
                    yamlFilter: "ALL",
                    filterKey: "",
                    filterValue: "",
                    folderFilter: "",
                    heading: "TACTICAL NAV // QUICK DESTINATIONS",
                    ...(legacyC ? JSON.parse(legacyC) : {})
                };
                activeProfile = defaultProfileKey;
                await saveStateToStorage(currentActivePages, currentConfig);
                return;
            }
        } catch(e) {}

        activeProfile = defaultProfileKey;
        currentActivePages = [];
        currentConfig = { mode: "manual", recentCount: 5, yamlFilter: "ALL", filterKey: "", filterValue: "", folderFilter: "", heading: "TACTICAL NAV // QUICK DESTINATIONS" };
    } catch(e) {
        activeProfile = defaultProfileKey;
        currentActivePages = [];
        currentConfig = { mode: "manual", recentCount: 5, yamlFilter: "ALL", filterKey: "", filterValue: "", folderFilter: "", heading: "TACTICAL NAV // QUICK DESTINATIONS" };
    }
};

// ==========================================
// 3. METADATA ENGINES & VAULT AUTOFILL HELPERS
// ==========================================
const getVaultFolders = () => {
    try {
        const folders = new Set();
        if (typeof app !== "undefined" && app.vault) {
            if (typeof app.vault.getAllLoadedFiles === "function") {
                app.vault.getAllLoadedFiles().forEach(f => {
                    if (f && f.children && f.path && f.path !== "/" && f.path !== "") {
                        folders.add(f.path);
                    }
                });
            }
            if (typeof app.vault.getFiles === "function") {
                app.vault.getFiles().forEach(f => {
                    if (f && f.parent && f.parent.path && f.parent.path !== "/" && f.parent.path !== "") {
                        folders.add(f.parent.path);
                    }
                });
            }
        }
        return Array.from(folders).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    } catch (e) {
        return [];
    }
};

const getVaultProperties = () => {
    try {
        const props = new Set();
        if (typeof app !== "undefined" && app.metadataCache && app.vault) {
            const files = app.vault.getMarkdownFiles ? app.vault.getMarkdownFiles() : (app.vault.getFiles ? app.vault.getFiles().filter(f => f.extension === 'md') : []);
            files.forEach(f => {
                const cache = app.metadataCache.getFileCache(f);
                if (cache && cache.frontmatter) {
                    Object.keys(cache.frontmatter).forEach(k => {
                        if (k && k !== "position") props.add(k);
                    });
                }
            });
        }
        if (props.size === 0 && typeof dv !== "undefined" && dv.pages) {
            dv.pages().forEach(p => {
                const ignore = ["file"];
                for (let key in p) {
                    if (!ignore.includes(key) && p[key] != null) {
                        props.add(key);
                    }
                }
            });
        }
        return Array.from(props).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    } catch (e) {
        return [];
    }
};

let globalPropCache = null;
const getProps = () => {
    if (!globalPropCache) {
        let props = {};
        dv.pages().forEach(p => {
            const ignore = ["file"]; 
            for (let key in p) {
                if (!ignore.includes(key) && p[key] != null) {
                    if (!props[key]) props[key] = new Set();
                    let val = p[key];
                    let valArray = Array.isArray(val) ? val : [val];
                    valArray.forEach(v => {
                        if (v == null) return;
                        let vStr = (typeof v === "object" && v.path) ? v.path : String(v);
                        if (vStr && vStr !== '[object Object]') props[key].add(vStr);
                    });
                }
            }
        });
        let result = {};
        Object.keys(props).sort().forEach(k => {
            result[k] = Array.from(props[k]).sort((a,b) => a.localeCompare(b, undefined, {numeric: true}));
        });
        globalPropCache = result;
    }
    return globalPropCache;
};

const passesFilter = (fileObj, activeConfig) => {
    // 1. Folder path filter (if specified)
    if (activeConfig.folderFilter && activeConfig.folderFilter.trim()) {
        const targetFolder = activeConfig.folderFilter.trim().toLowerCase();
        const filePath = (fileObj.path || "").toLowerCase();
        const fileFolder = (fileObj.parent ? (fileObj.parent.path || fileObj.parent.name || "") : "").toLowerCase();
        if (!fileFolder.includes(targetFolder) && !filePath.startsWith(targetFolder)) {
            return false;
        }
    }

    // 2. YAML Filter Key / Value (if specified)
    if (!activeConfig.filterKey) return true;
    let p = dv.page(fileObj.path);
    if (!p) return false;
    let val = p[activeConfig.filterKey];
    if (val === undefined || val === null) return false;
    if (!activeConfig.filterValue) return true;
    
    let valArray = Array.isArray(val) ? val : [val];
    for (let v of valArray) {
        let vStr = (typeof v === "object" && v.path) ? v.path : String(v);
        if (vStr === activeConfig.filterValue) return true;
    }
    return false;
};

const getRelativeTimeStr = (mtime) => {
    let m = moment(mtime);
    let now = moment();
    let diffMins = now.diff(m, 'minutes');
    if (diffMins < 1) return "JUST NOW";
    if (diffMins < 60) return `${diffMins}M AGO`;
    let diffHours = now.diff(m, 'hours');
    if (diffHours < 24) return `${diffHours}H AGO`;
    let diffDays = now.diff(m, 'days');
    if (diffDays < 7) return `${diffDays}D AGO`;
    return m.format("DD-MM-YY");
};

const getFullDateTimeStr = (mtime) => { return moment(mtime).format("DD-MM-YYYY • hh:mm A"); };

const resolveBannerUrl = (bannerProp, sourcePath) => {
    if (!bannerProp) return null;
    let cleanPath = String(bannerProp).trim();
    let wikiMatch = cleanPath.match(/\[\[(?:.*\|)?([^\]]+)\]\]/);
    if (wikiMatch) cleanPath = wikiMatch[1];
    
    let fileObj = app.metadataCache.getFirstLinkpathDest(cleanPath, sourcePath || "");
    if (fileObj) return app.vault.getResourcePath(fileObj);
    if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) return cleanPath;
    return null;
};

// ==========================================
// 4. BUILD INTERACTIVE DOM
// ==========================================
const containerDiv = document.createElement("div");
containerDiv.className = "hud-nav-container";

// --- Header Bar ---
const navHeader = document.createElement("div");
navHeader.className = "hud-nav-header";

const headerTitle = document.createElement("div");
headerTitle.className = "hud-nav-title";
const updateHeaderTitle = () => {
    const hText = currentConfig.heading !== undefined ? currentConfig.heading : "TACTICAL NAV // QUICK DESTINATIONS";
    headerTitle.innerHTML = `<div class="hud-nav-banner-bracket-tl"></div><div class="hud-nav-banner-bracket-br"></div>${hText}`;
};
updateHeaderTitle();

const headerActions = document.createElement("div");
headerActions.className = "hud-nav-header-actions";

const searchBtn = document.createElement("button");
searchBtn.className = "hud-nav-action-btn";
searchBtn.innerHTML = `🔍 SEARCH`;

const configBtn = document.createElement("button");
configBtn.className = "hud-nav-action-btn hud-nav-settings-btn";
configBtn.innerHTML = `⚙️`;
configBtn.title = "Settings";

headerActions.appendChild(searchBtn);
headerActions.appendChild(configBtn);

navHeader.appendChild(headerTitle);
navHeader.appendChild(headerActions);
containerDiv.appendChild(navHeader);

// --- Quick Search Drawer (Hidden by default) ---
const searchDrawer = document.createElement("div");
searchDrawer.className = "hud-nav-selector-drawer";
searchDrawer.style.display = "none";
searchDrawer.innerHTML = `
    <div class="hud-nav-drawer-row">
        <span class="hud-nav-drawer-title">🔍 QUICK SEARCH (ACTIVE VIEW)</span>
        <button class="hud-nav-drawer-btn" style="border-color:#ef4444; color:#ef4444;" id="btn-close-search">CLOSE ✖</button>
    </div>
    <input type="text" class="hud-nav-drawer-search-input" placeholder="Search currently displayed destinations or folder..." id="hud-nav-quick-search-input" autocomplete="off" />
    <div class="hud-nav-drawer-list-wrapper" id="hud-nav-quick-search-list"></div>
`;
containerDiv.appendChild(searchDrawer);

// --- Settings Drawer (Hidden by default) ---
const selectorDrawer = document.createElement("div");
selectorDrawer.className = "hud-nav-selector-drawer";
selectorDrawer.style.display = "none";
containerDiv.appendChild(selectorDrawer);

// --- Grid Container ---
const gridDiv = document.createElement("div");
gridDiv.className = "hud-nav-banner-grid";
containerDiv.appendChild(gridDiv);

// State variables
let drawerOpen = false;
let activeGridNotes = []; 

// --- QUICK SEARCH LOGIC ---
const quickSearchInput = searchDrawer.querySelector("#hud-nav-quick-search-input");
const quickSearchList = searchDrawer.querySelector("#hud-nav-quick-search-list");

const renderQuickSearchList = (term = "") => {
    quickSearchList.innerHTML = "";
    let cleanTerm = term.toLowerCase().trim();
    
    let filtered = activeGridNotes.filter(item => {
        let title = (item.label || "").toLowerCase();
        let folder = (item.folder || "").toLowerCase();
        let path = (item.path || "").toLowerCase();
        return title.includes(cleanTerm) || folder.includes(cleanTerm) || path.includes(cleanTerm);
    });

    if (filtered.length === 0) {
        quickSearchList.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:#a1a1aa; font-size:10px; padding: 10px;">NO MATCHES IN CURRENT VIEW</div>`;
        return;
    }

    filtered.forEach(item => {
        let el = document.createElement("div");
        el.className = "hud-nav-drawer-page-item";
        el.innerHTML = `<span class="hud-nav-drawer-item-title">📄 ${item.label}</span>`;
        
        el.onclick = (e) => {
            e.preventDefault();
            app.workspace.openLinkText(item.path, "", false);
            searchDrawer.style.display = "none";
            quickSearchInput.value = "";
        };
        quickSearchList.appendChild(el);
    });
};

searchBtn.onclick = () => {
    selectorDrawer.style.display = "none"; 
    drawerOpen = false;

    let isSearchOpen = searchDrawer.style.display === "flex";
    if (isSearchOpen) {
        searchDrawer.style.display = "none";
    } else {
        searchDrawer.style.display = "flex";
        quickSearchInput.value = "";
        renderQuickSearchList();
        setTimeout(() => quickSearchInput.focus(), 50); 
    }
};

quickSearchInput.addEventListener("input", (e) => renderQuickSearchList(e.target.value));
searchDrawer.querySelector("#btn-close-search").onclick = () => searchDrawer.style.display = "none";


// --- RENDER GRID CARDS ---
const renderGrid = () => {
    gridDiv.innerHTML = "";
    let targetList = [];

    if (currentConfig.mode === "recent") {
        let allMarkdownAndBase = app.vault.getFiles().filter(f => (f.extension === "md" || f.extension === "base" || f.name.endsWith(".base")) && passesFilter(f, currentConfig));
        allMarkdownAndBase.sort((a,b) => b.stat.mtime - a.stat.mtime);
        
        let sliceCount = currentConfig.recentCount === "ALL" ? allMarkdownAndBase.length : Math.max(1, parseInt(currentConfig.recentCount) || 5);
        targetList = allMarkdownAndBase.slice(0, sliceCount).map(f => {
            let isBase = f.extension === "base" || f.name.endsWith(".base");
            let baseTagStr = isBase ? " (.base file)" : "";
            let relativeAgo = getRelativeTimeStr(f.stat.mtime);
            let fullDateTime = getFullDateTimeStr(f.stat.mtime);

            return {
                path: f.path,
                label: f.basename.replace(/\.base$/i, '').replace(/\.md$/i, '').toUpperCase() + baseTagStr,
                folder: f.parent ? f.parent.name.toUpperCase() : "VAULT",
                subtitle: `LAST EDITED: ${fullDateTime}`,
                editedBadge: `EDITED ${relativeAgo}`
            };
        });
    } else {
        targetList = currentActivePages;
    }

    activeGridNotes = targetList; 

    if (targetList.length === 0) {
        gridDiv.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #000000; border: 1px dotted rgba(255,255,255,0.15); border-radius: 2px;">
                <div style="font-size: 12px; font-weight: bold; color: #ffffff; letter-spacing: 1.5px;">[ NO PAGES FOUND / MATCH FILTER ]</div>
                <div style="font-size: 10px; color: #a1a1aa; margin-top: 6px; letter-spacing: 1px;">CLICK <span style="color:#38bdf8; font-weight:bold;">⚙️</span> AT TOP RIGHT TO ADJUST SETTINGS OR FILTERS</div>
            </div>
        `;
        return;
    }
    
    targetList.forEach(target => {
        let targetPath = typeof target === "string" ? target : target.path;
        let pageObj = dv.page(targetPath);
        
        let isBaseFile = targetPath.endsWith(".base") || (pageObj && pageObj.file && (pageObj.file.ext === "base" || pageObj.file.name.endsWith(".base")));
        let baseTagStr = isBaseFile && !String(target.label || "").includes("(.base file)") ? " (.base file)" : "";

        let cleanTitle = (typeof target === "object" && target.label) ? (target.label + (isBaseFile && !target.label.includes("(.base file)") ? " (.base file)" : "")) : 
                         (pageObj ? (pageObj.file.name.replace(/\.md$/i, '').toUpperCase() + baseTagStr) : (targetPath.split('/').pop().replace(/\.md$/i, '').toUpperCase() + baseTagStr));
                         
        let cleanFolder = (typeof target === "object" && target.folder) ? target.folder : 
                          (pageObj && pageObj.file.folder ? pageObj.file.folder.split('/').pop().toUpperCase() : "VAULT");
                          
        let cleanSubtitle = (typeof target === "object" && target.subtitle) ? target.subtitle : "QUICK DESTINATION";

        let bannerProp = pageObj ? (pageObj.banner || (pageObj.file && pageObj.file.frontmatter ? pageObj.file.frontmatter.banner : null)) : null;
        let resolvedUrl = resolveBannerUrl(bannerProp, targetPath);

        const card = document.createElement("div");
        card.onclick = (e) => { e.preventDefault(); app.workspace.openLinkText(targetPath, "", false); };

        let statusTagStr = target.editedBadge ? `[ ${target.editedBadge} ]` : `[ OPEN ]`;

        if (resolvedUrl) {
            card.className = "hud-nav-banner-card";
            card.innerHTML = `
                <div class="hud-nav-banner-bracket-tl"></div><div class="hud-nav-banner-bracket-br"></div>
                <div class="hud-nav-banner-bg-image" style="background-image: url('${resolvedUrl}');"></div>
                <div class="hud-nav-banner-gradient-overlay"></div>
                <div class="hud-nav-banner-card-header">
                    <div class="hud-nav-banner-folder-badge">📂 ${cleanFolder}</div>
                    <div class="hud-nav-banner-status-tag">${statusTagStr}</div>
                </div>
                <div class="hud-nav-banner-card-footer">
                    <div class="hud-nav-banner-title">${cleanTitle}</div>
                    <div class="hud-nav-banner-subtitle">${cleanSubtitle}</div>
                </div>
            `;
        } else {
            card.className = "hud-nav-banner-card hud-nav-no-banner-card";
            card.innerHTML = `
                <div class="hud-nav-banner-bracket-tl"></div><div class="hud-nav-banner-bracket-br"></div>
                <div class="hud-nav-banner-bg-fallback"></div>
                <div class="hud-nav-banner-gradient-overlay"></div>
                <div class="hud-nav-banner-card-header">
                    <div class="hud-nav-banner-folder-badge">📂 ${cleanFolder}</div>
                    <div class="hud-nav-banner-status-tag">${statusTagStr}</div>
                </div>
                <div class="hud-nav-banner-card-center">
                    <div class="hud-nav-banner-title-center">${cleanTitle}</div>
                    <div class="hud-nav-banner-subtitle-center">${cleanSubtitle}</div>
                </div>
                <div style="z-index:3; position:relative;"></div>
            `;
        }
        gridDiv.appendChild(card);
    });
};

// --- RENDER INTERACTIVE SETTINGS DRAWER ---
const renderDrawer = () => {
    let isManual = currentConfig.mode === "manual";
    let countValues = [3, 5, 6, 9, 12];
    let allProps = getProps();
    let vaultFolders = getVaultFolders();
    let vaultProps = Array.from(new Set([...getVaultProperties(), ...Object.keys(allProps)])).sort((a,b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    selectorDrawer.innerHTML = `
        <div class="hud-nav-drawer-row">
            <span class="hud-nav-drawer-title">⚙️ NAV SETTINGS & PAGE SELECTOR</span>
            <span style="font-size:11.5px; color:#a1a1aa;">(${currentConfig.mode === "recent" ? 'MODE: RECENT NOTES (' + (currentConfig.recentCount === 'ALL' ? 'ALL' : currentConfig.recentCount) + ')' : currentActivePages.length + ' PAGES SELECTED'})</span>
        </div>

        <!-- PROFILE SELECTOR ROW -->
        <div class="hud-nav-drawer-row" style="background:#09090b; padding:8px 12px; border:1px dotted rgba(255,255,255,0.2); border-radius:2px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; flex-grow:1;">
                <span style="font-size:12px; color:#38bdf8; font-weight:bold; letter-spacing:1px; white-space:nowrap;">PROFILE:</span>
                <select id="hud-nav-profile-select" class="hud-nav-drawer-select" style="max-width:240px; height: 36px !important; min-height: 36px !important; line-height: normal !important;">
                    <option value="${activeProfile}">[Current: ${activeProfile}]</option>
                    <option value="__new__">+ Create New Named Profile...</option>
                </select>
            </div>
            <div id="hud-nav-new-profile-wrap" style="display:none; align-items:center; gap:6px; width:100%; margin-top:4px;">
                <input type="text" id="hud-nav-new-profile-name" class="hud-nav-drawer-search-input" placeholder="New profile name (e.g. dev-links, sidebar)..." style="flex:1; padding:6px 10px; font-size:12px;" />
                <button class="hud-nav-drawer-btn" id="hud-nav-create-profile-btn" style="border-color:#38bdf8; color:#38bdf8; padding:6px 14px; font-size:11.5px;">CREATE</button>
                <button class="hud-nav-drawer-btn" id="hud-nav-cancel-profile-btn" style="border-color:#ef4444; color:#ef4444; padding:6px 10px; font-size:11.5px;">✕</button>
            </div>
        </div>

        <!-- HEADING ROW -->
        <div class="hud-nav-drawer-row" style="background:#09090b; padding:8px 12px; border:1px dotted rgba(255,255,255,0.2); border-radius:2px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; width:100%;">
                <span style="font-size:12px; color:#38bdf8; font-weight:bold; letter-spacing:1px; white-space:nowrap;">HEADING:</span>
                <input type="text" id="hud-nav-heading-input" class="hud-nav-drawer-search-input" style="flex:1; padding:6px 10px; font-size:12px;" placeholder="e.g. TACTICAL NAV // QUICK DESTINATIONS" value="${(currentConfig.heading || 'TACTICAL NAV // QUICK DESTINATIONS').replace(/"/g, '&quot;')}" />
            </div>
        </div>

        <div class="hud-nav-drawer-mode-bar">
            <button class="hud-nav-drawer-mode-tab ${isManual ? 'active' : ''}" id="tab-mode-manual">📌 MANUAL CUSTOM SELECTION</button>
            <button class="hud-nav-drawer-mode-tab ${!isManual ? 'active' : ''}" id="tab-mode-recent">⚡ RECENTLY EDITED NOTES</button>
        </div>

        <div class="hud-nav-drawer-filter-bar">
            <!-- YAML Property Filter Row -->
            <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span style="font-size: 12px; color: #38bdf8; font-weight: bold; letter-spacing: 1px; white-space: nowrap;">YAML FILTER:</span>
                    <input type="text" id="hud-nav-filter-key" list="hud-nav-filter-keys-datalist" class="hud-nav-drawer-search-input" style="width: 170px; padding: 5px 8px; font-size: 12px;" placeholder="Property key..." value="${(currentConfig.filterKey || '').replace(/"/g, '&quot;')}" />
                    <datalist id="hud-nav-filter-keys-datalist">
                        <option value="">-- NO FILTER --</option>
                        ${vaultProps.map(k => `<option value="${k.replace(/"/g, '&quot;')}">${k.toUpperCase()}</option>`).join('')}
                    </datalist>
                    <select id="hud-nav-filter-val" class="hud-nav-drawer-select" style="display:${currentConfig.filterKey ? 'inline-block' : 'none'}; max-width: 180px;"></select>
                    <button class="hud-nav-drawer-btn" id="btn-clear-yaml-filter" style="padding: 5px 10px; font-size: 11px; border-color: #ef4444; color: #ef4444; display:${currentConfig.filterKey ? 'inline-block' : 'none'};">CLEAR</button>
                </div>
                
            </div>

            <!-- Folder Path Filter Row -->
            <div style="display: flex; flex-direction: column; gap: 6px; width: 100%; border-top: 1px dotted rgba(255, 255, 255, 0.1); padding-top: 8px; margin-top: 2px;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span style="font-size: 12px; color: #38bdf8; font-weight: bold; letter-spacing: 1px; white-space: nowrap;">FOLDER FILTER:</span>
                    <input type="text" id="hud-nav-folder-filter" list="hud-nav-folder-datalist" class="hud-nav-drawer-search-input" style="width: 210px; padding: 5px 8px; font-size: 12px;" placeholder="e.g. Work/Projects or Notes..." value="${(currentConfig.folderFilter || '').replace(/"/g, '&quot;')}" />
                    <datalist id="hud-nav-folder-datalist">
                        ${vaultFolders.map(f => `<option value="${f.replace(/"/g, '&quot;')}"></option>`).join('')}
                    </datalist>
                    <button class="hud-nav-drawer-btn" id="btn-clear-folder-filter" style="padding: 5px 10px; font-size: 11px; border-color: #ef4444; color: #ef4444; display:${currentConfig.folderFilter ? 'inline-block' : 'none'};">CLEAR</button>
                </div>
                
            </div>

            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; width: 100%; margin-top: 2px;">Applies to Search & Recent Mode</div>
        </div>

        <div id="drawer-recent-options" style="display:${!isManual ? 'flex' : 'none'}; flex-direction:column; gap:10px;">
            <div class="hud-nav-recent-count-bar">
                <span>SHOW TOP RECENT NOTES:</span>
                ${countValues.map(c => `<button class="hud-nav-recent-count-btn ${currentConfig.recentCount === c ? 'active' : ''}" data-count="${c}">${c} NOTES</button>`).join('')}
                <button class="hud-nav-recent-count-btn ${currentConfig.recentCount === 'ALL' ? 'active' : ''}" data-count="ALL">ALL NOTES</button>
                <div style="display:flex; align-items:center; gap:6px; margin-left:6px;">
                    <span style="font-size:11.5px; color:#a1a1aa;">CUSTOM:</span>
                    <input type="number" min="1" max="9999" value="${currentConfig.recentCount === 'ALL' ? '' : currentConfig.recentCount}" class="hud-nav-recent-custom-input" id="hud-nav-recent-custom" />
                </div>
            </div>
        </div>

        <div id="drawer-manual-options" style="display:${isManual ? 'flex' : 'none'}; flex-direction:column; gap:10px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
                <input type="text" class="hud-nav-drawer-search-input" placeholder="🔍 Search page titles or folder paths..." id="hud-nav-search-input" autocomplete="off" />
            </div>
            <div class="hud-nav-drawer-list-wrapper" id="hud-nav-page-list"></div>
        </div>

        <div class="hud-nav-drawer-actions">
            ${isManual ? `
                <div style="display:flex; gap:10px; flex-grow:1;">
                    <button class="hud-nav-drawer-btn" id="btn-clear-all">CLEAR ALL</button>
                    <button class="hud-nav-drawer-btn" id="btn-select-all" style="border-color:#38bdf8; color:#38bdf8;">SELECT ALL</button>
                </div>
            ` : '<div></div>'}
            <button class="hud-nav-drawer-btn hud-nav-drawer-btn-save" id="btn-save-close">SAVE & CLOSE 🔒</button>
        </div>
    `;

    // --- Profile Selector Wireup ---
    const profileSelect = selectorDrawer.querySelector("#hud-nav-profile-select");
    const newProfWrap = selectorDrawer.querySelector("#hud-nav-new-profile-wrap");
    const newProfInput = selectorDrawer.querySelector("#hud-nav-new-profile-name");
    const createProfBtn = selectorDrawer.querySelector("#hud-nav-create-profile-btn");
    const cancelProfBtn = selectorDrawer.querySelector("#hud-nav-cancel-profile-btn");

    listProfiles().then(profiles => {
        if (!profileSelect) return;
        const allProfiles = new Set(profiles);
        allProfiles.add(activeProfile);
        allProfiles.add(defaultProfileKey);

        let optionsHtml = "";
        const isCurrentDefault = activeProfile === defaultProfileKey;
        optionsHtml += `<option value="${defaultProfileKey}" ${isCurrentDefault ? 'selected' : ''}>[Current Note: ${defaultProfileKey}]</option>`;
        
        Array.from(allProfiles).sort().forEach(p => {
            if (p !== defaultProfileKey) {
                optionsHtml += `<option value="${p}" ${p === activeProfile ? 'selected' : ''}>${p}</option>`;
            }
        });

        optionsHtml += `<option value="__new__">+ Create New Named Profile...</option>`;
        profileSelect.innerHTML = optionsHtml;
    }).catch(() => {});

    profileSelect.onchange = async (e) => {
        const chosen = e.target.value;
        if (chosen === "__new__") {
            newProfWrap.style.display = "flex";
            newProfInput.value = "";
            newProfInput.focus();
            return;
        }
        newProfWrap.style.display = "none";
        if (chosen === defaultProfileKey) {
            activeProfile = defaultProfileKey;
            await saveNotePointer(defaultProfileKey);
            await loadProfileData(defaultProfileKey);
            if (typeof new Notice === "function") new Notice(`Tactical Nav: Switched to Current Note profile`);
        } else {
            activeProfile = chosen;
            await saveNotePointer(chosen);
            await loadProfileData(chosen);
            if (typeof new Notice === "function") new Notice(`Tactical Nav: Switched to profile "${chosen}"`);
        }
        renderGrid();
        renderDrawer();
    };

    createProfBtn.onclick = async () => {
        const raw = (newProfInput.value || "").trim();
        const cleanName = raw.replace(/[^a-zA-Z0-9_-]/g, '_');
        if (!cleanName) {
            if (typeof new Notice === "function") new Notice("⚠️ Please enter a valid profile name!");
            newProfInput.focus();
            return;
        }
        activeProfile = cleanName;
        await saveStateToStorage(currentActivePages, currentConfig);
        await saveNotePointer(cleanName);
        if (typeof new Notice === "function") new Notice(`Tactical Nav: Profile "${cleanName}" created & activated!`);
        renderGrid();
        renderDrawer();
    };

    cancelProfBtn.onclick = () => {
        newProfWrap.style.display = "none";
        profileSelect.value = activeProfile;
    };

    newProfInput.onkeydown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            createProfBtn.click();
        }
    };

    const keyInput = selectorDrawer.querySelector("#hud-nav-filter-key");
    const valSelect = selectorDrawer.querySelector("#hud-nav-filter-val");
    const clearYamlBtn = selectorDrawer.querySelector("#btn-clear-yaml-filter");

    const updateValSelect = (key) => {
        if (!key) {
            valSelect.style.display = "none";
            valSelect.innerHTML = "";
        } else {
            valSelect.style.display = "inline-block";
            let vals = allProps[key] || [];
            valSelect.innerHTML = `<option value="">-- ALL VALUES (${vals.length}) --</option>` + vals.map(v => `<option value="${v.replace(/"/g, '&quot;')}" ${currentConfig.filterValue === v ? 'selected' : ''}>${v.toUpperCase()}</option>`).join("");
        }
    };

    if (currentConfig.filterKey) updateValSelect(currentConfig.filterKey);

    let populateManualList; 
    let searchInputBox;

    const onKeyChange = () => {
        currentConfig.filterKey = (keyInput.value || "").trim();
        currentConfig.filterValue = ""; 
        updateValSelect(currentConfig.filterKey);
        if (clearYamlBtn) clearYamlBtn.style.display = currentConfig.filterKey ? "inline-block" : "none";
        
        saveStateToStorage(currentActivePages, currentConfig);
        if (isManual && populateManualList) populateManualList(searchInputBox ? searchInputBox.value : "");
        else renderGrid();
    };

    keyInput.addEventListener("input", onKeyChange);
    keyInput.addEventListener("change", onKeyChange);

    if (clearYamlBtn) {
        clearYamlBtn.onclick = () => {
            keyInput.value = "";
            onKeyChange();
        };
    }

    selectorDrawer.querySelectorAll("#hud-nav-prop-pills .hud-nav-suggestion-pill").forEach(pill => {
        pill.onclick = () => {
            const prop = pill.getAttribute("data-prop");
            keyInput.value = (keyInput.value === prop) ? "" : prop;
            onKeyChange();
        };
    });

    valSelect.addEventListener("change", (e) => {
        currentConfig.filterValue = e.target.value;
        saveStateToStorage(currentActivePages, currentConfig);
        if (isManual && populateManualList) populateManualList(searchInputBox ? searchInputBox.value : "");
        else renderGrid();
    });

    // Folder Filter Wiring
    const folderInput = selectorDrawer.querySelector("#hud-nav-folder-filter");
    const clearFolderBtn = selectorDrawer.querySelector("#btn-clear-folder-filter");

    const onFolderChange = () => {
        currentConfig.folderFilter = (folderInput.value || "").trim();
        if (clearFolderBtn) clearFolderBtn.style.display = currentConfig.folderFilter ? "inline-block" : "none";
        
        saveStateToStorage(currentActivePages, currentConfig);
        if (isManual && populateManualList) populateManualList(searchInputBox ? searchInputBox.value : "");
        else renderGrid();
    };

    if (folderInput) {
        folderInput.addEventListener("input", onFolderChange);
        folderInput.addEventListener("change", onFolderChange);
    }

    if (clearFolderBtn) {
        clearFolderBtn.onclick = () => {
            folderInput.value = "";
            onFolderChange();
        };
    }

    selectorDrawer.querySelectorAll("#hud-nav-folder-pills .hud-nav-suggestion-pill").forEach(pill => {
        pill.onclick = () => {
            const folder = pill.getAttribute("data-folder");
            folderInput.value = (folderInput.value === folder) ? "" : folder;
            onFolderChange();
        };
    });

    selectorDrawer.querySelector("#tab-mode-manual").onclick = () => {
        currentConfig.mode = "manual"; saveStateToStorage(currentActivePages, currentConfig); renderDrawer(); renderGrid();
    };

    selectorDrawer.querySelector("#tab-mode-recent").onclick = () => {
        currentConfig.mode = "recent"; saveStateToStorage(currentActivePages, currentConfig); renderDrawer(); renderGrid();
    };

    let countBtns = selectorDrawer.querySelectorAll(".hud-nav-recent-count-btn");
    countBtns.forEach(b => {
        b.onclick = () => {
            let val = b.getAttribute("data-count");
            currentConfig.recentCount = val === "ALL" ? "ALL" : parseInt(val);
            saveStateToStorage(currentActivePages, currentConfig); renderDrawer(); renderGrid();
        };
    });

    let customInput = selectorDrawer.querySelector("#hud-nav-recent-custom");
    if (customInput) {
        customInput.addEventListener("input", (e) => {
            let val = parseInt(e.target.value);
            if (!isNaN(val) && val > 0) {
                currentConfig.recentCount = val; saveStateToStorage(currentActivePages, currentConfig); renderGrid();
                selectorDrawer.querySelectorAll(".hud-nav-recent-count-btn").forEach(btn => btn.classList.remove("active"));
            }
        });
    }

    if (isManual) {
        searchInputBox = selectorDrawer.querySelector("#hud-nav-search-input");
        const listWrapper = selectorDrawer.querySelector("#hud-nav-page-list");
        let allFiles = app.vault.getFiles().filter(f => f.extension === "md" || f.extension === "base" || f.name.endsWith(".base"));

        populateManualList = (filterTerm = "") => {
            listWrapper.innerHTML = "";
            let term = filterTerm.toLowerCase().trim();
            let filtered = allFiles.filter(f => {
                let matchesSearch = f.basename.toLowerCase().includes(term) || f.path.toLowerCase().includes(term);
                return matchesSearch && passesFilter(f, currentConfig);
            });

            filtered.sort((a, b) => {
                let aName = a.basename.toLowerCase(); let bName = b.basename.toLowerCase();
                if (term.length > 0) {
                    let aExact = aName === term; let bExact = bName === term;
                    if (aExact && !bExact) return -1; if (!aExact && bExact) return 1;
                    let aStarts = aName.startsWith(term); let bStarts = bName.startsWith(term);
                    if (aStarts && !bStarts) return -1; if (!aStarts && bStarts) return 1;
                }
                let aSelected = currentActivePages.some(p => (typeof p === "string" ? p : p.path) === a.path);
                let bSelected = currentActivePages.some(p => (typeof p === "string" ? p : p.path) === b.path);
                if (aSelected && !bSelected) return -1; if (!aSelected && bSelected) return 1;
                return a.basename.localeCompare(b.basename);
            });

            filtered.forEach(file => {
                let isSelected = currentActivePages.some(p => (typeof p === "string" ? p : p.path) === file.path);
                let isBase = file.extension === "base" || file.name.endsWith(".base");
                let baseTagStr = isBase ? " (.base file)" : "";

                let item = document.createElement("div");
                item.className = `hud-nav-drawer-page-item ${isSelected ? 'selected' : ''}`;
                item.innerHTML = `
                    <span class="hud-nav-drawer-item-title">${isSelected ? '✅' : (isBase ? '📊' : '📄')} ${file.basename.toUpperCase()}${baseTagStr}</span>
                    <span class="hud-nav-drawer-item-check">${isSelected ? '[ SELECTED ]' : '[ ADD ]'}</span>
                `;

                item.onclick = () => {
                    if (isSelected) {
                        currentActivePages = currentActivePages.filter(p => (typeof p === "string" ? p : p.path) !== file.path);
                    } else {
                        currentActivePages.push({ path: file.path, label: file.basename.replace(/\.base$/i, '').replace(/\.md$/i, '').toUpperCase() + baseTagStr, folder: file.parent ? file.parent.name.toUpperCase() : "VAULT", subtitle: "QUICK DESTINATION" });
                    }
                    saveStateToStorage(currentActivePages, currentConfig); renderGrid(); populateManualList(searchInputBox.value);
                };
                listWrapper.appendChild(item);
            });
        };

        populateManualList();
        searchInputBox.addEventListener("input", (e) => populateManualList(e.target.value));

        

        let selectAllBtn = selectorDrawer.querySelector("#btn-select-all");
        if (selectAllBtn) {
            selectAllBtn.onclick = () => {
                let term = searchInputBox.value.toLowerCase().trim();
                let filtered = allFiles.filter(f => {
                    let matchesSearch = f.basename.toLowerCase().includes(term) || f.path.toLowerCase().includes(term);
                    return matchesSearch && passesFilter(f, currentConfig);
                });
                filtered.forEach(file => {
                    let isSelected = currentActivePages.some(p => (typeof p === "string" ? p : p.path) === file.path);
                    if (!isSelected) {
                        let isBase = file.extension === "base" || file.name.endsWith(".base");
                        let baseTagStr = isBase ? " (.base file)" : "";
                        currentActivePages.push({ path: file.path, label: file.basename.replace(/\.base$/i, '').replace(/\.md$/i, '').toUpperCase() + baseTagStr, folder: file.parent ? file.parent.name.toUpperCase() : "VAULT", subtitle: "QUICK DESTINATION" });
                    }
                });
                saveStateToStorage(currentActivePages, currentConfig); renderGrid(); populateManualList(searchInputBox.value);
            };
        }

        let clearBtn = selectorDrawer.querySelector("#btn-clear-all");
        if (clearBtn) {
            clearBtn.onclick = () => {
                currentActivePages = []; saveStateToStorage(currentActivePages, currentConfig); renderGrid(); populateManualList(searchInputBox.value);
            };
        }
    }

    selectorDrawer.querySelector("#btn-save-close").onclick = async () => {
        const headingInput = selectorDrawer.querySelector("#hud-nav-heading-input");
        if (headingInput) {
            currentConfig.heading = headingInput.value.trim() || "TACTICAL NAV // QUICK DESTINATIONS";
            updateHeaderTitle();
        }
        await saveStateToStorage(currentActivePages, currentConfig);
        selectorDrawer.style.display = "none";
        drawerOpen = false;
        if (typeof new Notice === "function") new Notice("Tactical Nav settings saved!");
    };
};

configBtn.onclick = () => {
    searchDrawer.style.display = "none"; 
    drawerOpen = !drawerOpen;
    if (drawerOpen) { renderDrawer(); selectorDrawer.style.display = "flex"; } else { selectorDrawer.style.display = "none"; }
};

// Initial Mount & Render
dv.container.appendChild(containerDiv);
loadConfig().then(() => {
    updateHeaderTitle();
    renderGrid();
});