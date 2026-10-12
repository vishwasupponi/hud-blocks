// ==========================================
// 1. INJECT STYLES (STANDALONE COMPLETION TRENDS V1 NAMESPACED)
// ==========================================
document.querySelectorAll("style[id^='obsidian-hud-trends'], style[id^='obsidian-movies-chart']").forEach(el => el.remove());
const style = document.createElement("style");
style.id = "obsidian-hud-trends-v1-namespaced";
style.innerHTML = `
        @keyframes hudTrendsTraceFlow {
            from { stroke-dashoffset: 70; }
            to { stroke-dashoffset: 0; }
        }
        @keyframes hudTrendsTextGlowPulse {
            0%, 100% { color: #ffffff; text-shadow: 0 0 2px rgba(255, 255, 255, 0.4); }
            50% { color: #ffffff; text-shadow: 0 0 10px rgba(255, 255, 255, 1); }
        }

        .hud-trends-container {
            display: flex; flex-direction: column; width: 100%;
            margin-top: 6px; margin-bottom: 6px; font-family: 'JetBrains Mono', 'Courier New', monospace;
            color: #a1a1aa; background: #09090b; padding: 14px; border-radius: 4px;
            border: 1px dashed rgba(255, 255, 255, 0.15); box-sizing: border-box !important;
            overflow: hidden !important; max-width: 100% !important;
        }

        .hud-trends-tactical-panel { 
            background: #000000; border: 1px solid rgba(255, 255, 255, 0.15); 
            padding: 12px; display: flex; flex-direction: column; width: 100%; 
            position: relative; box-sizing: border-box !important; border-radius: 2px;
            overflow: hidden !important; z-index: 1; height: 100%; max-width: 100% !important;
        }
        .hud-trends-tactical-panel.hud-trends-panel-active-popup {
            overflow: visible !important; z-index: 99999 !important;
        }
        
        .hud-trends-panel-bracket-tl { position: absolute; top: 0px; left: 0px; width: 8px; height: 8px; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; z-index: 2; pointer-events: none; }
        .hud-trends-panel-bracket-br { position: absolute; bottom: 0px; right: 0px; width: 8px; height: 8px; border-bottom: 1px solid #ffffff; border-right: 1px solid #ffffff; z-index: 2; pointer-events: none; }
        
        .hud-trends-panel-header { 
            display: flex; justify-content: space-between; align-items: center; 
            border-bottom: 1px dotted rgba(255, 255, 255, 0.15); padding: 0 0 10px 0; 
            margin-bottom: 10px; position: relative; z-index: 5; flex-wrap: wrap; gap: 10px;
        }
        .hud-trends-panel-title { 
            color: #ffffff !important; font-size: 15px !important; text-transform: uppercase !important; 
            letter-spacing: 2.5px !important; font-weight: 800 !important; margin: 0;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important;
            text-align: center !important; flex-grow: 1;
        }

        .hud-trends-trace-readout { 
            background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2); padding: 8px 12px; 
            font-size: 11px; color: #ffffff; display: flex; align-items: center; justify-content: center;
            min-height: 38px; border-radius: 2px; box-sizing: border-box !important; 
            flex-shrink: 0; line-height: 1; z-index: 1; position: relative; text-align: center;
            overflow: hidden !important; text-overflow: ellipsis; margin-top: 10px; width: 100%;
            animation: hudTrendsTextGlowPulse 5s infinite;
        }
        .hud-trends-readout-group { display: flex; align-items: center; justify-content: center; gap: 14px; font-size: 11px; width: 100%; white-space: nowrap; }
        .hud-trends-readout-divider { color: #71717a; font-weight: normal; margin: 0 6px; }
        .hud-trends-readout-highlight { color: #ffffff; font-weight: bold; font-size: 12px; }
        .hud-trends-readout-rose { color: #fb7185; font-weight: bold; font-size: 13px; }
        .hud-trends-readout-idle { 
            font-size: 10.5px; letter-spacing: 1px; font-weight: bold; white-space: nowrap; color: #ffffff;
        }

        .hud-trends-sq-layout { display: flex; width: 100%; height: 160px; position: relative; z-index: 2; overflow: visible; }
        .hud-trends-sq-y-axis { width: 45px; border-right: 1px dotted rgba(255, 255, 255, 0.25); position: relative; flex-shrink: 0; }
        .hud-trends-sq-y-label { position: absolute; right: 8px; font-size: 10px; color: #a1a1aa; transform: translateY(-50%); font-weight: 500; }
        
        .hud-trends-sq-svg-container { 
            flex-grow: 1; position: relative; border-bottom: 1px dotted rgba(255, 255, 255, 0.25); 
            overflow: visible; box-sizing: border-box !important;
        }
        
        .hud-trends-svg-layer {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: block; pointer-events: none; overflow: visible;
        }

        .hud-trends-sq-svg-container polyline {
            stroke-dasharray: 4, 3;
            stroke-width: 1.5px !important;
            opacity: 0.9 !important;
            animation: hudTrendsTraceFlow 15s linear infinite;
        }
        
        .hud-trends-sq-point { 
            position: absolute; width: 6px; height: 6px; 
            border-radius: 50%; transform: translate(-50%, -50%); z-index: 3; 
            pointer-events: none; transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
            opacity: 0.95;
        }
        .hud-trends-sq-point.hud-trends-highlighted { 
            transform: translate(-50%, -50%) scale(2.2) !important; 
            background: #ffffff !important; 
            border-color: #ffffff !important;
            box-shadow: 0 0 8px #fb7185 !important; 
            z-index: 25 !important; opacity: 1 !important;
        }
        
        .hud-trends-sq-hover-column { 
            position: absolute; top: 0; height: 100%; cursor: crosshair; z-index: 4; 
            background: transparent !important; border: none !important; outline: none !important;
        }

        .hud-trends-sq-x-axis { margin-left: 45px; height: 32px; position: relative; margin-top: 8px; z-index: 2; overflow: visible; }
        .hud-trends-sq-x-label { 
            position: absolute; top: 10px; font-size: 9.5px; color: #a1a1aa; 
            font-weight: bold; white-space: nowrap; transform: translateX(-50%);
        }

        /* HEADER CONTROLS */
        .hud-trends-sq-header-controls { display: flex; gap: 8px; align-items: center; z-index: 99999; flex-wrap: wrap; }
        
        .hud-trends-sq-mode-btn {
            display: flex; align-items: center; gap: 6px; font-size: 9.5px;
            padding: 4px 10px; border-radius: 2px; cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.3); background: #121215 !important;
            color: #ffffff; font-weight: bold; letter-spacing: 1px; user-select: none;
            transition: all 0.2s;
        }
        .hud-trends-sq-mode-btn:hover { border-color: #fb7185; color: #fb7185; }
        .hud-trends-sq-mode-btn.hud-trends-active {
            border-color: #fb7185 !important; background: rgba(251, 113, 133, 0.15) !important;
            color: #fb7185 !important;
        }
        .hud-trends-sq-settings-btn {
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: #e4e4e7 !important; width: 28px; height: 28px; padding: 0 !important; border-radius: 4px !important;
            display: inline-flex !important; align-items: center; justify-content: center; font-size: 13px;
        }
        .hud-trends-sq-settings-btn:hover {
            border-color: rgba(255, 255, 255, 0.6) !important; color: #ffffff !important; background: rgba(255, 255, 255, 0.12) !important;
        }

        .hud-trends-sq-dropdown-wrapper { position: relative; display: inline-block; z-index: 99999; }
        .hud-trends-sq-dropdown-btn { 
            display: flex; align-items: center; gap: 6px; font-size: 9.5px; 
            padding: 4px 10px; border-radius: 2px; cursor: pointer; 
            border: 1px solid rgba(255, 255, 255, 0.3); background: #121215 !important; 
            color: #ffffff; font-weight: bold; letter-spacing: 1px; user-select: none; 
            transition: all 0.2s; position: relative; z-index: 100000;
        }
        .hud-trends-sq-dropdown-btn:hover { border-color: #fb7185; color: #fb7185; }
        
        .hud-trends-sq-dropdown-popup { 
            position: absolute; right: 0; top: 100%; margin-top: 4px; 
            background: #0d0d10; border: 1px solid #fb7185; 
            padding: 8px; border-radius: 2px; display: none; flex-direction: column; gap: 4px; 
            min-width: 160px; max-height: 220px; overflow-y: auto; 
            z-index: 9999999 !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 1); 
            pointer-events: auto !important;
        }
        .hud-trends-sq-dropdown-popup.hud-trends-show { display: flex !important; }
        
        .hud-trends-sq-dropdown-action { 
            font-size: 9px; color: #fb7185; font-weight: bold; text-align: center; 
            padding: 6px; background: rgba(251, 113, 133, 0.12); border-radius: 2px; 
            cursor: pointer; user-select: none; margin-bottom: 6px; letter-spacing: 1px; 
            position: relative; z-index: 10000000 !important; pointer-events: auto !important;
        }
        .hud-trends-sq-dropdown-action:hover { background: rgba(251, 113, 133, 0.25); color: #ffffff; }

        .hud-trends-sq-dropdown-option { 
            display: flex; align-items: center; gap: 8px; font-size: 10px; 
            color: #a1a1aa; cursor: pointer; padding: 6px 8px; border-radius: 2px; 
            user-select: none; transition: background 0.15s; 
            position: relative; z-index: 10000000 !important; pointer-events: auto !important;
        }
        .hud-trends-sq-dropdown-option:hover { background: rgba(255, 255, 255, 0.15); color: #ffffff; }
        .hud-trends-sq-dropdown-option.hud-trends-active-opt { background: rgba(251, 113, 133, 0.12); }

        .hud-trends-hud-radio-dot { 
            width: 12px; height: 12px; border-radius: 50%; 
            border: 1px solid rgba(255, 255, 255, 0.4); 
            background: #000000; flex-shrink: 0; transition: all 0.2s; pointer-events: none;
        }
        .hud-trends-hud-radio-dot.hud-trends-checked { 
            background: #fb7185 !important; border-color: #fb7185 !important; 
            box-shadow: 0 0 6px rgba(251, 113, 133, 0.8);
        }

        /* MODAL STYLES */
        .hud-trends-modal-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(4px);
            z-index: 10000000; display: flex; align-items: center; justify-content: center;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
        }
        .hud-trends-modal {
            background: #09090b; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 4px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.95), 0 0 14px rgba(255, 255, 255, 0.1);
            padding: 22px; width: 580px; max-width: 92vw; max-height: 88vh; overflow-y: auto;
            color: #ffffff; box-sizing: border-box; position: relative;
        }
        .hud-trends-modal::-webkit-scrollbar { width: 4px; }
        .hud-trends-modal::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 2px; }
        .hud-trends-modal h3 {
            margin: 0 0 16px 0; font-size: 15px; font-weight: bold; color: #ffffff;
            letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
            padding-bottom: 10px; display: flex; align-items: center; gap: 8px;
        }
        .hud-trends-form-group {
            display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;
        }
        .hud-trends-form-group label {
            font-size: 12.5px; font-weight: bold; color: #ffffff !important; text-transform: uppercase; letter-spacing: 1px;
        }
        .hud-trends-form-group input, .hud-trends-form-group select {
            background: #000000; border: 1px solid rgba(255, 255, 255, 0.3); color: #ffffff !important;
            font-size: 13px; padding: 8px 12px; border-radius: 2px; font-family: inherit;
            outline: none; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; width: 100%;
            min-height: 38px !important; height: 38px !important; line-height: normal !important;
        }
        .hud-trends-form-group select {
            padding: 6px 12px !important;
        }
        .hud-trends-form-group select option { background: #09090b; color: #ffffff; }
        .hud-trends-form-group input:focus, .hud-trends-form-group select:focus {
            border-color: #ffffff; box-shadow: 0 0 8px rgba(255, 255, 255, 0.35);
        }
        .hud-trends-form-desc {
            font-size: 11.5px; color: #e4e4e7 !important; margin-top: 2px; line-height: 1.4;
        }
        .hud-trends-modal-actions {
            display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
            border-top: 1px dotted rgba(255, 255, 255, 0.15); padding-top: 14px;
        }
        .hud-trends-mod-btn {
            padding: 8px 18px; font-size: 12px; font-weight: bold; letter-spacing: 1px;
            border-radius: 2px; cursor: pointer; text-transform: uppercase; font-family: inherit;
            transition: all 0.2s; color: #ffffff !important;
        }
        .hud-trends-mod-cancel {
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.3); color: #ffffff !important;
        }
        .hud-trends-mod-cancel:hover {
            border-color: #ffffff; background: rgba(255, 255, 255, 0.12) !important; color: #ffffff !important;
        }
        .hud-trends-mod-primary {
            background: rgba(255, 255, 255, 0.15); border: 1px solid #ffffff; color: #ffffff !important;
        }
        .hud-trends-mod-primary:hover {
            background: #ffffff !important; color: #000000 !important; box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }

        
    `;
    document.head.appendChild(style);

// ==========================================
// 2. HUD CONFIG & MULTI-PROFILE ARCHITECTURE
// ==========================================
const CONFIG_DIR = `${app.vault.configDir}/HUD Config`;

const currentNote = dv.current();
const notePath = currentNote && currentNote.file ? currentNote.file.path.replace(/\.md$/i, '') : "default";
const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, "_");

const DEFAULT_HEADING = "📈 COMPLETION TRENDS // '{FOLDER}' ARCHIVE";

let activeProfile = defaultProfileKey;
let config = {
    heading: DEFAULT_HEADING,
    mediaFolder: "",
    dateWatchedProp: "",
    granularity: "yearly",
    yearsVisibility: {}
};

const ensureConfigDir = async () => {
    try {
        if (!(await app.vault.adapter.exists(CONFIG_DIR))) {
            if (app.vault.createFolder) {
                await app.vault.createFolder(CONFIG_DIR).catch(() => {});
            } else if (app.vault.adapter.mkdir) {
                await app.vault.adapter.mkdir(CONFIG_DIR).catch(() => {});
            }
        }
    } catch(e) {}
};

const getConfigPath = (profileName) => `${CONFIG_DIR}/hud-trends--${profileName}.json`;

const listProfiles = async () => {
    const list = new Set([defaultProfileKey]);
    try {
        if (await app.vault.adapter.exists(CONFIG_DIR)) {
            const res = await app.vault.adapter.list(CONFIG_DIR);
            if (res && res.files) {
                res.files.forEach(f => {
                    const filename = f.split(/[\\/]/).pop();
                    const m = filename.match(/^hud-trends--(.+)\.json$/);
                    if (m) list.add(m[1]);
                });
            }
        }
    } catch(e) {}
    return Array.from(list);
};

const readProfileConfig = async (profileName) => {
    try {
        let targetPath = getConfigPath(profileName);
        if (!(await app.vault.adapter.exists(targetPath))) {
            const legacyPath = getLegacyConfigPath(profileName);
            if (await app.vault.adapter.exists(legacyPath)) targetPath = legacyPath;
        }
        if (await app.vault.adapter.exists(targetPath)) {
            const data = await app.vault.adapter.read(targetPath);
            let parsed = JSON.parse(data);
            if (parsed) {
                return {
                    heading: parsed.heading || DEFAULT_HEADING,
                    mediaFolder: parsed.mediaFolder !== undefined ? parsed.mediaFolder : "",
                    dateWatchedProp: parsed.dateWatchedProp !== undefined ? parsed.dateWatchedProp : "",
                    granularity: parsed.granularity || "yearly",
                    yearsVisibility: parsed.yearsVisibility || {}
                };
            }
        }
    } catch(e) {}
    return {
        heading: DEFAULT_HEADING,
        mediaFolder: "",
        dateWatchedProp: "",
        granularity: "yearly",
        yearsVisibility: {}
    };
};

const loadProfileData = async (profileName) => {
    const pConf = await readProfileConfig(profileName);
    config.heading = pConf.heading;
    config.mediaFolder = pConf.mediaFolder;
    config.dateWatchedProp = pConf.dateWatchedProp;
    config.granularity = pConf.granularity;
    config.yearsVisibility = pConf.yearsVisibility;
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
                config.heading = parsed.heading || DEFAULT_HEADING;
                config.mediaFolder = parsed.mediaFolder !== undefined ? parsed.mediaFolder : "";
                config.dateWatchedProp = parsed.dateWatchedProp !== undefined ? parsed.dateWatchedProp : "";
                config.granularity = parsed.granularity || "yearly";
                config.yearsVisibility = parsed.yearsVisibility || {};
                return;
            }
        } else {
            // Fresh note profile with default settings
            activeProfile = defaultProfileKey;
            config = {
                heading: DEFAULT_HEADING,
                mediaFolder: "",
                dateWatchedProp: "",
                granularity: "yearly",
                yearsVisibility: {}
            };
            return;
        }
        await loadProfileData(activeProfile);
    } catch(e) {
        config = {
            heading: DEFAULT_HEADING,
            mediaFolder: "",
            dateWatchedProp: "",
            granularity: "yearly",
            yearsVisibility: {}
        };
    }
};

const saveProfileConfig = async (profileName, conf) => {
    try {
        await ensureConfigDir();
        const targetPath = getConfigPath(profileName);
        const toSave = {
            heading: conf.heading || DEFAULT_HEADING,
            mediaFolder: conf.mediaFolder !== undefined ? conf.mediaFolder : "",
            dateWatchedProp: conf.dateWatchedProp !== undefined ? conf.dateWatchedProp : "",
            granularity: conf.granularity || "yearly",
            yearsVisibility: conf.yearsVisibility || {}
        };
        await app.vault.adapter.write(targetPath, JSON.stringify(toSave, null, 2));
    } catch(e) { console.error("Failed to save profile:", e); }
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
            return;
        }
        let existing = {};
        if (await app.vault.adapter.exists(noteConfigPath)) {
            try {
                existing = JSON.parse(await app.vault.adapter.read(noteConfigPath)) || {};
            } catch(e) {}
        }
        existing.mirrors = targetProfileName;
        await app.vault.adapter.write(noteConfigPath, JSON.stringify(existing, null, 2));
    } catch(e) { console.error("Failed to save note pointer:", e); }
};

// ==========================================
// 2.5 VAULT AUTOFILL HELPERS
// ==========================================
const getVaultFolders = () => {
    const folders = new Set();
    try {
        if (typeof app !== "undefined" && app.vault) {
            if (app.vault.getAllLoadedFiles) {
                app.vault.getAllLoadedFiles().forEach(f => {
                    if (f && f.children) {
                        if (f.path && f.path !== "/") {
                            folders.add(f.path.replace(/^\/+|\/+$/g, ''));
                        }
                    } else if (f && f.parent && f.parent.path && f.parent.path !== "/") {
                        folders.add(f.parent.path.replace(/^\/+|\/+$/g, ''));
                    }
                });
            } else if (app.vault.getFiles) {
                app.vault.getFiles().forEach(f => {
                    if (f && f.parent && f.parent.path && f.parent.path !== "/") {
                        folders.add(f.parent.path.replace(/^\/+|\/+$/g, ''));
                    }
                });
            }
        }
    } catch (e) {
        console.error("Failed to get vault folders:", e);
    }

    try {
        if (folders.size === 0 && typeof dv !== "undefined" && dv.pages) {
            dv.pages().forEach(p => {
                if (p && p.file && p.file.folder && p.file.folder !== "") {
                    folders.add(p.file.folder.replace(/^\/+|\/+$/g, ''));
                }
            });
        }
    } catch (e) {}

    return Array.from(folders).filter(Boolean).sort();
};

const getVaultProperties = () => {
    const props = new Set();
    try {
        if (typeof app !== "undefined" && app.metadataCache) {
            if (app.metadataCache.getAllPropertyInfos) {
                const infos = app.metadataCache.getAllPropertyInfos();
                if (infos) {
                    Object.keys(infos).forEach(k => {
                        if (k && !k.startsWith("_") && k !== "position") {
                            props.add(k);
                        }
                    });
                }
            }
            if (app.vault && app.vault.getMarkdownFiles) {
                const mdFiles = app.vault.getMarkdownFiles();
                const limit = Math.min(mdFiles.length, 300);
                for (let i = 0; i < limit; i++) {
                    const cache = app.metadataCache.getFileCache(mdFiles[i]);
                    if (cache && cache.frontmatter) {
                        Object.keys(cache.frontmatter).forEach(k => {
                            if (k !== "position") props.add(k);
                        });
                    }
                }
            }
        }
    } catch (e) {
        console.error("Failed to get vault properties:", e);
    }

    try {
        if (typeof dv !== "undefined" && dv.pages) {
            const pages = dv.pages().slice(0, 300);
            pages.forEach(p => {
                if (p && p.file && p.file.frontmatter) {
                    Object.keys(p.file.frontmatter).forEach(k => {
                        if (k !== "position") props.add(k);
                    });
                }
            });
        }
    } catch (e) {}

    return Array.from(props).filter(Boolean).sort();
};

// ==========================================
// 3. TARGET NOTE SCANNER & DATA QUERY
// ==========================================
let yearlyMoviesMap = {};
let monthlyMoviesMap = {};
let detectedYearsSet = new Set();
let allYears = [];
let activeYearVisibility = {};
let activeGranularity = "yearly";

const scanMediaFiles = () => {
    let folder = (config.mediaFolder || "").trim().replace(/^\/+|\/+$/g, "");
    let propName = (config.dateWatchedProp || "").trim();
    const escFolder = folder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const folderRegex = folder ? new RegExp(`(^|/)${escFolder}(/|$)`, "i") : null;
    const yearSubfolderRegex = folder ? new RegExp(`(?:^|/)${escFolder}/(\\d{4})(?:/|$)`, "i") : null;

    let movieFiles = app.vault.getFiles().filter(f => {
        if (f.extension !== "md" && f.extension !== "base") return false;
        if (!folder) return true;
        let p = f.path.replace(/\\/g, "/");
        return folderRegex.test("/" + p) || folderRegex.test(p);
    });

    yearlyMoviesMap = {};
    monthlyMoviesMap = {};
    detectedYearsSet = new Set();

    movieFiles.forEach(file => {
        let normPath = file.path.replace(/\\/g, "/");
        let yearMatch = yearSubfolderRegex ? normPath.match(yearSubfolderRegex) : normPath.match(/\/(\d{4})\//);
        let folderYr = yearMatch ? parseInt(yearMatch[1]) : null;

        let dateWatchedVal = null;
        if (propName) {
            const cache = app.metadataCache ? app.metadataCache.getFileCache(file) : null;
            if (cache && cache.frontmatter && cache.frontmatter[propName] !== undefined && cache.frontmatter[propName] !== null) {
                dateWatchedVal = cache.frontmatter[propName];
            } else {
                let page = dv.page(file.path);
                if (page && page[propName] !== undefined && page[propName] !== null) {
                    dateWatchedVal = page[propName];
                }
            }
        }

        let fDate = null;
        if (dateWatchedVal !== null && dateWatchedVal !== undefined && String(dateWatchedVal).trim() !== "") {
            let dateStr = typeof dateWatchedVal === 'object' && dateWatchedVal.path ? dateWatchedVal.path : String(dateWatchedVal);
            let m = moment(dateStr);
            if (m.isValid()) fDate = m;
        }

        if (!fDate && !folderYr) return;
        if (!fDate) fDate = moment(`${folderYr}-01-01`, "YYYY-MM-DD");

        let yr = folderYr || fDate.year();
        let monthKey = `${yr}-${fDate.format("MM")}`;

        detectedYearsSet.add(yr);
        yearlyMoviesMap[yr] = (yearlyMoviesMap[yr] || 0) + 1;
        monthlyMoviesMap[monthKey] = (monthlyMoviesMap[monthKey] || 0) + 1;
    });

    allYears = Array.from(detectedYearsSet).sort((a, b) => a - b);
    if (allYears.length === 0) {
        const curYr = moment().year();
        allYears = [curYr - 4, curYr - 3, curYr - 2, curYr - 1, curYr];
    }

    activeYearVisibility = config.yearsVisibility || {};
    allYears.forEach(yr => {
        if (activeYearVisibility[yr] === undefined) activeYearVisibility[yr] = true;
    });
    activeGranularity = config.granularity || "yearly";
};

// ==========================================
// 4. BUILD DOM LAYOUT & SETTINGS MODAL
// ==========================================
const outerContainer = document.createElement("div");
outerContainer.className = "hud-trends-container";

const sqPanel = document.createElement("div");
sqPanel.className = "hud-trends-tactical-panel";

let sqHeader = document.createElement("div");
sqHeader.className = "hud-trends-panel-header";

const getHeaderTitleText = () => {
    const rawFolder = (config.mediaFolder || "").replace(/^"(.*)"$/, '$1').trim();
    const fName = (rawFolder ? rawFolder.split('/').pop() : "ARCHIVE").toUpperCase();
    const t = config.heading || DEFAULT_HEADING;
    return t.replace(/\{FOLDER\}/gi, fName);
};

sqHeader.innerHTML = `
    <div class="hud-trends-panel-bracket-tl"></div><div class="hud-trends-panel-bracket-br"></div>
    <div class="hud-trends-panel-title">${getHeaderTitleText()}</div>
`;
const sqTitleEl = sqHeader.querySelector(".hud-trends-panel-title");

let headerControls = document.createElement("div");
headerControls.className = "hud-trends-sq-header-controls";

let yearlyBtn = document.createElement("button");
yearlyBtn.className = `hud-trends-sq-mode-btn ${activeGranularity === 'yearly' ? 'hud-trends-active' : ''}`;
yearlyBtn.innerHTML = "📅 YEARLY";

let monthlyBtn = document.createElement("button");
monthlyBtn.className = `hud-trends-sq-mode-btn ${activeGranularity === 'monthly' ? 'hud-trends-active' : ''}`;
monthlyBtn.innerHTML = "📊 MONTHLY";

let last12mBtn = document.createElement("button");
last12mBtn.className = `hud-trends-sq-mode-btn ${activeGranularity === 'last12m' ? 'hud-trends-active' : ''}`;
last12mBtn.innerHTML = "🔄 RECENT 12M";

const updateBtnState = () => {
    yearlyBtn.className = `hud-trends-sq-mode-btn ${activeGranularity === 'yearly' ? 'hud-trends-active' : ''}`;
    monthlyBtn.className = `hud-trends-sq-mode-btn ${activeGranularity === 'monthly' ? 'hud-trends-active' : ''}`;
    last12mBtn.className = `hud-trends-sq-mode-btn ${activeGranularity === 'last12m' ? 'hud-trends-active' : ''}`;
    config.granularity = activeGranularity;
    saveProfileConfig(activeProfile, config);
};

yearlyBtn.onclick = () => { activeGranularity = "yearly"; updateBtnState(); updateSideQuestsChart(); };
monthlyBtn.onclick = () => { activeGranularity = "monthly"; updateBtnState(); updateSideQuestsChart(); };
last12mBtn.onclick = () => { activeGranularity = "last12m"; updateBtnState(); updateSideQuestsChart(); };

headerControls.appendChild(yearlyBtn);
headerControls.appendChild(monthlyBtn);
headerControls.appendChild(last12mBtn);

let yearWrapper = document.createElement("div");
yearWrapper.className = "hud-trends-sq-dropdown-wrapper";
let yearBtn = document.createElement("div");
yearBtn.className = "hud-trends-sq-dropdown-btn";
let yearPopup = document.createElement("div");
yearPopup.className = "hud-trends-sq-dropdown-popup";

yearBtn.onclick = (e) => {
    e.stopPropagation();
    let isShowing = yearPopup.classList.toggle("hud-trends-show");
    if (isShowing) sqPanel.classList.add("hud-trends-panel-active-popup");
    else sqPanel.classList.remove("hud-trends-panel-active-popup");
};

yearWrapper.appendChild(yearBtn);
yearWrapper.appendChild(yearPopup);
headerControls.appendChild(yearWrapper);

// ⚙️ Settings Button
let settingsBtn = document.createElement("button");
settingsBtn.className = "hud-trends-sq-mode-btn hud-trends-sq-settings-btn";
settingsBtn.innerHTML = "⚙️";
settingsBtn.title = "Settings";
headerControls.appendChild(settingsBtn);

sqHeader.appendChild(headerControls);
sqPanel.appendChild(sqHeader);

document.addEventListener("click", (e) => {
    if (!yearWrapper.contains(e.target)) {
        yearPopup.classList.remove("hud-trends-show");
        sqPanel.classList.remove("hud-trends-panel-active-popup");
    }
});

let sqReadout = document.createElement("div");
sqReadout.className = "hud-trends-trace-readout";

let sqChartBody = document.createElement("div");
sqPanel.appendChild(sqChartBody);
sqPanel.appendChild(sqReadout);
outerContainer.appendChild(sqPanel);

// --- SETTINGS MODAL ---
let settingsModalInstance = null;

const showSettingsModal = async () => {
    if (settingsModalInstance) settingsModalInstance.remove();

    const overlay = document.createElement("div");
    overlay.className = "hud-trends-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "hud-trends-modal";

    const profiles = await listProfiles();
    const allProfiles = new Set(profiles);
    allProfiles.add(activeProfile);

    const profileOptionsHtml = Array.from(allProfiles).map(p => {
        const label = (p === defaultProfileKey) ? `[Current Note: ${p}]` : p;
        return `<option value="${p}" ${p === activeProfile ? 'selected' : ''}>${label}</option>`;
    }).join('') + `<option value="__new__">+ Create New Named Profile...</option>`;

    // Vault autofill options & suggestions (strictly from vault)
    const detectedFolders = getVaultFolders();
    const folderDatalistHtml = detectedFolders.filter(Boolean).sort().map(f => `<option value="${f.replace(/"/g, '&quot;')}"></option>`).join('');

    const detectedProps = getVaultProperties();
    const datePropDatalistHtml = detectedProps.filter(Boolean).sort().map(p => `<option value="${p.replace(/"/g, '&quot;')}"></option>`).join('');

    modal.innerHTML = `
        <h3>⚙️ Completion Trends Settings</h3>

        <div class="hud-trends-form-group">
            <label>Profile</label>
            <select id="mc-profile-select" style="height: 38px !important; min-height: 38px !important; line-height: normal !important; font-size: 13px !important; padding: 6px 12px !important; box-sizing: border-box;">
                ${profileOptionsHtml}
            </select>
            <div class="hud-trends-form-desc">Independent note profile by default, or select a shared profile to mirror.</div>
        </div>

        <div class="hud-trends-form-group" id="mc-new-profile-group" style="display: none; background: rgba(251, 113, 133, 0.08); padding: 10px; border: 1px dashed rgba(251, 113, 133, 0.3); border-radius: 2px;">
            <label style="color: #ffffff;">New Profile Name</label>
            <input type="text" id="mc-new-profile-name" placeholder="e.g. global, archive, milestones" />
            <div class="hud-trends-form-desc">Creates hud-trends--[name].json in HUD Config. This note will mirror it.</div>
        </div>

        <div class="hud-trends-form-group">
            <label>Widget Heading</label>
            <input type="text" id="mc-heading" value="${(config.heading || DEFAULT_HEADING).replace(/"/g, '&quot;')}" placeholder="e.g. 📈 COMPLETION TRENDS // '{FOLDER}' ARCHIVE" />
            <div class="hud-trends-form-desc">Widget heading text. Supports dynamic token {FOLDER} to auto-insert target folder name.</div>
        </div>

        <div class="hud-trends-form-group">
            <label>Target / Items Folder</label>
            <input type="text" id="mc-target-folder" list="mc-target-folder-list" value="${config.mediaFolder || ''}" placeholder="e.g. Archive, Projects, Completed" />
            <datalist id="mc-target-folder-list">
                ${folderDatalistHtml}
            </datalist>
            
            <div class="hud-trends-form-desc">Vault folder containing completed notes. Scans {folder}/YYYY/ and root. Leave blank to scan whole vault.</div>
        </div>

        <div class="hud-trends-form-group">
            <label>Completion Date Property</label>
            <input type="text" id="mc-date-prop" list="mc-date-prop-list" value="${config.dateWatchedProp || ''}" placeholder="e.g. date-watched, completedDate, date" />
            <datalist id="mc-date-prop-list">
                ${datePropDatalistHtml}
            </datalist>
            
            <div class="hud-trends-form-desc">Frontmatter property storing completion or milestone date (e.g. completedDate, completed, date, finish-date).</div>
        </div>

        <div class="hud-trends-modal-actions">
            <button id="mc-btn-cancel" class="hud-trends-mod-btn hud-trends-mod-cancel">Cancel</button>
            <button id="mc-btn-save" class="hud-trends-mod-btn hud-trends-mod-primary">Save Settings</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    settingsModalInstance = overlay;

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.remove();
            settingsModalInstance = null;
        }
    };

    const profileSelect = modal.querySelector("#mc-profile-select");
    const newProfGroup = modal.querySelector("#mc-new-profile-group");
    const newProfInput = modal.querySelector("#mc-new-profile-name");
    const headingInput = modal.querySelector("#mc-heading");
    const folderInput = modal.querySelector("#mc-target-folder");
    const datePropInput = modal.querySelector("#mc-date-prop");

    profileSelect.onchange = async (e) => {
        const val = e.target.value;
        if (val === "__new__") {
            newProfGroup.style.display = "block";
            newProfInput.focus();
            return;
        }
        newProfGroup.style.display = "none";
        const profConf = await readProfileConfig(val);
        headingInput.value = profConf.heading || DEFAULT_HEADING;
        folderInput.value = profConf.mediaFolder || "";
        datePropInput.value = profConf.dateWatchedProp || "";
    };

    modal.querySelector("#mc-btn-cancel").onclick = () => {
        overlay.remove();
        settingsModalInstance = null;
    };

    modal.querySelector("#mc-btn-save").onclick = async () => {
        const selectedProfile = profileSelect.value;
        const headingVal = headingInput.value.trim() || DEFAULT_HEADING;
        const mediaFolderVal = folderInput.value.trim();
        const dateWatchedPropVal = datePropInput.value.trim();

        let targetProfile = selectedProfile;

        if (selectedProfile === "__new__") {
            const rawName = newProfInput.value.trim();
            const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_');
            if (!cleanName) {
                if (typeof Notice !== "undefined") new Notice("⚠️ Please enter a name for the new profile!");
                newProfInput.focus();
                return;
            }
            targetProfile = cleanName;

            config.heading = headingVal;
            config.mediaFolder = mediaFolderVal;
            config.dateWatchedProp = dateWatchedPropVal;

            await saveProfileConfig(targetProfile, config);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        } else if (selectedProfile === defaultProfileKey) {
            targetProfile = defaultProfileKey;
            config.heading = headingVal;
            config.mediaFolder = mediaFolderVal;
            config.dateWatchedProp = dateWatchedPropVal;

            await saveProfileConfig(targetProfile, config);
            activeProfile = targetProfile;
        } else {
            targetProfile = selectedProfile;
            config.heading = headingVal;
            config.mediaFolder = mediaFolderVal;
            config.dateWatchedProp = dateWatchedPropVal;

            await saveProfileConfig(targetProfile, config);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        }

        overlay.remove();
        settingsModalInstance = null;

        // Re-scan notes with new settings & re-render!
        scanMediaFiles();
        if (sqTitleEl) sqTitleEl.textContent = getHeaderTitleText();
        updateBtnState();
        updateSideQuestsChart();

        if (typeof Notice !== "undefined") new Notice("⚙️ Completion Trends settings saved!");
    };
};

settingsBtn.onclick = () => showSettingsModal();

// ==========================================
// 5. CHART RE-RENDER ENGINE
// ==========================================
const updateSideQuestsChart = () => {
    let selectedYearsList = allYears.filter(y => activeYearVisibility[y]);
    yearBtn.innerHTML = `<span>YEARS (${selectedYearsList.length}/${allYears.length}) ▼</span>`;

    yearPopup.innerHTML = "";
    let yearSelectAll = document.createElement("div");
    yearSelectAll.className = "hud-trends-sq-dropdown-action";
    let allYearsActive = selectedYearsList.length === allYears.length;
    yearSelectAll.innerHTML = allYearsActive ? "[ DESELECT ALL ]" : "[ SELECT ALL ]";
    yearSelectAll.onclick = (e) => {
        e.stopPropagation();
        allYears.forEach(y => { activeYearVisibility[y] = !allYearsActive; });
        config.yearsVisibility = activeYearVisibility;
        saveProfileConfig(activeProfile, config);
        updateSideQuestsChart();
    };
    yearPopup.appendChild(yearSelectAll);

    allYears.forEach(yr => {
        let isActive = activeYearVisibility[yr];
        let opt = document.createElement("div");
        opt.className = `hud-trends-sq-dropdown-option ${isActive ? 'hud-trends-active-opt' : ''}`;
        opt.onclick = (e) => {
            e.stopPropagation();
            activeYearVisibility[yr] = !activeYearVisibility[yr];
            config.yearsVisibility = activeYearVisibility;
            saveProfileConfig(activeProfile, config);
            updateSideQuestsChart();
        };
        opt.innerHTML = `
            <span class="hud-trends-hud-radio-dot ${isActive ? 'hud-trends-checked' : ''}"></span>
            <span style="color:${isActive ? '#ffffff' : '#71717a'}; font-weight:bold;">${yr}</span>
        `;
        yearPopup.appendChild(opt);
    });

    sqChartBody.innerHTML = "";

    let plotPoints = [];
    let totalSelectedMoviesCount = 0;

    if (activeGranularity === "last12m") {
        let curM = moment().subtract(11, 'months').startOf('month');
        let endM = moment().endOf('month');
        
        while (curM.isBefore(endM) || curM.isSame(endM, 'month')) {
            let yr = curM.year();
            let mKey = curM.format("YYYY-MM");
            let mName = curM.format("MMM").toUpperCase();
            let yr2Digit = curM.format("YY");
            let val = monthlyMoviesMap[mKey] || 0;
            totalSelectedMoviesCount += val;

            plotPoints.push({
                label: `${mName} ${yr2Digit}`,
                fullLabel: `${mName} ${yr}`,
                val: val
            });
            curM.add(1, 'month');
        }
    } else if (activeGranularity === "yearly") {
        selectedYearsList.forEach(yr => {
            let val = yearlyMoviesMap[yr] || 0;
            totalSelectedMoviesCount += val;
            plotPoints.push({
                label: String(yr),
                fullLabel: `YEAR: ${yr}`,
                val: val
            });
        });
    } else {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        selectedYearsList.forEach(yr => {
            totalSelectedMoviesCount += (yearlyMoviesMap[yr] || 0);
            let yr2Digit = String(yr).slice(-2);
            for (let m = 0; m < 12; m++) {
                let mKey = `${yr}-${String(m + 1).padStart(2, '0')}`;
                let mName = monthNames[m];
                let val = monthlyMoviesMap[mKey] || 0;

                plotPoints.push({
                    label: `${mName} ${yr2Digit}`,
                    fullLabel: `${mName} ${yr}`,
                    val: val
                });
            }
        });
    }

    const defaultSqReadout = `<div class="hud-trends-readout-idle">> HOVER ANY DATA NODE TO INSPECT COMPLETIONS <span class="hud-trends-readout-divider">│</span> TOTAL: <span style="color:#fb7185; font-size:12px; font-weight:bold;">${totalSelectedMoviesCount.toLocaleString()}</span></div>`;
    sqReadout.innerHTML = defaultSqReadout;

    if (plotPoints.length > 0) {
        let maxVal = Math.max(1, ...plotPoints.map(p => p.val));

        let sqLayout = document.createElement("div");
        sqLayout.className = "hud-trends-sq-layout";
        
        sqLayout.innerHTML = `
            <div class="hud-trends-sq-y-axis">
                <div class="hud-trends-sq-y-label" style="top:12px; transform:translateY(-50%);">${maxVal}</div>
                <div class="hud-trends-sq-y-label" style="top:86px; transform:translateY(-50%);">${Math.round(maxVal/2)}</div>
                <div class="hud-trends-sq-y-label" style="top:160px; transform:translateY(-50%);">0</div>
            </div>
        `;
        
        let sqSvgContainer = document.createElement("div");
        sqSvgContainer.className = "hud-trends-sq-svg-container";
        
        let traceColor = "#fb7185";
        
        // 1-TO-1 PERCENTAGE CENTER POSITIONS (0% to 100%) FOR SVG & DOTS
        let pts = plotPoints.map((p, i) => {
            let pct = (plotPoints.length <= 1) ? 50 : (i / (plotPoints.length - 1)) * 100;
            let x = (pct / 100) * 1000;
            let y = 160 - ((p.val / maxVal) * 148);
            return { x, y, pct, val: p.val, label: p.label, fullLabel: p.fullLabel, idx: i };
        });

        let strPts = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
        let polylinesHTML = `<polyline points="${strPts}" fill="none" stroke="${traceColor}" stroke-width="1.5" opacity="0.9" />`;

        let dotsContainer = document.createElement("div");
        pts.forEach(p => {
            let dot = document.createElement("div");
            dot.className = `hud-trends-sq-point hud-trends-sq-dot-idx-${p.idx}`;
            dot.style.left = `${p.pct.toFixed(2)}%`;
            dot.style.top = `${(p.y / 160) * 100}%`;
            dot.style.background = traceColor;
            dot.style.border = `1px solid ${traceColor}`;
            dot.style.boxShadow = `0 0 6px ${traceColor}`;
            dotsContainer.appendChild(dot);
        });

        sqSvgContainer.innerHTML = `
            <svg class="hud-trends-svg-layer" viewBox="0 0 1000 160" preserveAspectRatio="none">
                ${polylinesHTML}
            </svg>
        `;
        sqSvgContainer.appendChild(dotsContainer);

        // Hover Column Readouts
        plotPoints.forEach((p, i) => {
            let colWidthPct = 100 / plotPoints.length;
            let pctLeft = pts[i].pct;
            
            let hoverCol = document.createElement("div");
            hoverCol.className = "hud-trends-sq-hover-column";
            hoverCol.style.width = `${colWidthPct}%`;
            hoverCol.style.left = `${pctLeft - colWidthPct/2}%`;

            hoverCol.addEventListener("mouseover", () => {
                let dot = sqSvgContainer.querySelector(`.hud-trends-sq-dot-idx-${i}`);
                if (dot) dot.classList.add("hud-trends-highlighted");

                sqReadout.innerHTML = `
                    <div class="hud-trends-readout-group">
                        <span>DATE: <span class="hud-trends-readout-highlight">${p.fullLabel}</span></span>
                        <span class="hud-trends-readout-divider">│</span>
                        <span>COMPLETED: <span class="hud-trends-readout-rose">${p.val}</span></span>
                    </div>
                `;
            });

            hoverCol.addEventListener("mouseout", () => {
                let dot = sqSvgContainer.querySelector(`.hud-trends-sq-dot-idx-${i}`);
                if (dot) dot.classList.remove("hud-trends-highlighted");
                sqReadout.innerHTML = defaultSqReadout;
            });

            sqSvgContainer.appendChild(hoverCol);
        });

        // X-Axis Labels (Exact 1:1 Center Alignment with transform: translateX(-50%))
        let sqXAxis = document.createElement("div");
        sqXAxis.className = "hud-trends-sq-x-axis";

        let step = 1;
        if (activeGranularity === "monthly" && plotPoints.length > 24) step = 3;
        else if (activeGranularity === "monthly" && plotPoints.length > 12) step = 2;

        plotPoints.forEach((p, i) => {
            if (i % step === 0 || i === plotPoints.length - 1) {
                let pctLeft = pts[i].pct;
                sqXAxis.innerHTML += `<div class="hud-trends-sq-x-label" style="left: ${pctLeft.toFixed(2)}%; transform: translateX(-50%);">${p.label}</div>`;
            }
        });

        sqLayout.appendChild(sqSvgContainer);
        sqChartBody.appendChild(sqLayout);
        sqChartBody.appendChild(sqXAxis);

    } else {
        sqChartBody.innerHTML = `<div style="text-align:center; padding: 45px 20px; font-size:11px; color:#71717a; letter-spacing:1px;">[ NO YEARS SELECTED — SELECT AT LEAST ONE YEAR FROM DROPDOWN ABOVE ]</div>`;
    }
};

// ==========================================
// 6. INITIALIZATION & EXECUTION
// ==========================================
loadConfig().then(() => {
    scanMediaFiles();
    if (sqTitleEl) sqTitleEl.textContent = getHeaderTitleText();
    updateBtnState();
    updateSideQuestsChart();

    // DIRECT DATAVIEW WRAPPER OVERFLOW LOCK
    dv.container.style.overflow = "hidden";
    dv.container.style.maxWidth = "100%";
    dv.container.style.boxSizing = "border-box";
    if (dv.container.parentElement) {
        dv.container.parentElement.style.overflow = "hidden";
        dv.container.parentElement.style.maxWidth = "100%";
    }

    dv.container.appendChild(outerContainer);
});