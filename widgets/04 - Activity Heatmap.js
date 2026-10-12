// ==========================================
// 1. INJECT STYLES (STANDALONE HEATMAP MATRIX V9 NAMESPACED)
// ==========================================
// AGGRESSIVE PURGE TO PREVENT GHOST STYLES
document.querySelectorAll("style[id^='obsidian-heatmap-matrix']").forEach(el => el.remove());

const existingStyle = document.createElement("style");
existingStyle.id = "obsidian-heatmap-matrix-v9-namespaced";
document.head.appendChild(existingStyle);

existingStyle.innerHTML = `
    @keyframes hudHeatTextGlowPulse {
        0%, 100% { color: #a1a1aa; text-shadow: 0 0 2px rgba(255, 255, 255, 0.2); }
        50% { color: #ffffff; text-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
    }
    @keyframes hudHeatSoftMicroGlow {
        0%, 100% { 
            filter: drop-shadow(0 0 2px currentColor); 
            transform: scale(1);
        }
        50% { 
            filter: drop-shadow(0 0 3.5px currentColor); 
            transform: scale(1.04);
        }
    }

    .hud-heat-container {
        display: flex; flex-direction: column; gap: 14px; width: 100%;
        margin-top: 10px; font-family: 'JetBrains Mono', 'Courier New', monospace;
        color: #a1a1aa; background: #09090b; padding: 16px; border-radius: 4px;
        border: 1px dashed rgba(255, 255, 255, 0.15); box-sizing: border-box !important;
        position: relative; overflow: hidden !important; max-width: 100% !important;
    }

    /* BRIGHT HEADER & CONTROLS */
    .hud-heat-header {
        display: flex; flex-direction: column; gap: 12px; width: 100%;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.15); padding-bottom: 14px;
        position: relative;
    }
    
    /* CORNER BRACKETS AT EXACT 0px */
    .hud-heat-bracket-tl { position: absolute; top: 0px; left: 0px; width: 8px; height: 8px; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; z-index: 2; pointer-events: none; }
    .hud-heat-bracket-br { position: absolute; bottom: 0px; right: 0px; width: 8px; height: 8px; border-bottom: 1px solid #ffffff; border-right: 1px solid #ffffff; z-index: 2; pointer-events: none; }

    .hud-heat-header-top {
        display: flex; justify-content: space-between; align-items: center; width: 100%;
        flex-wrap: wrap; gap: 10px;
    }
    .hud-heat-title {
        color: #ffffff !important; font-size: 15px !important; text-transform: uppercase !important;
        letter-spacing: 2.5px !important; font-weight: 800 !important; margin: 0;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important;
        text-align: center !important; flex-grow: 1;
    }

    .hud-heat-controls-group {
        display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    }

    .hud-heat-theme-select {
        background: #000000; border: 1px solid rgba(255, 255, 255, 0.3);
        color: #ffffff; font-family: inherit; font-size: 9.5px; font-weight: bold;
        padding: 4px 8px; border-radius: 2px; outline: none; cursor: pointer;
        text-transform: uppercase; letter-spacing: 1px;
    }
    .hud-heat-theme-select:focus { border-color: #38bdf8; }

    .hud-heat-view-btn {
        background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.3);
        color: #ffffff; font-size: 9.5px; font-weight: bold; letter-spacing: 1px;
        padding: 4px 10px; border-radius: 2px; cursor: pointer; text-transform: uppercase;
        transition: all 0.2s ease;
    }
    .hud-heat-view-btn:hover { border-color: #38bdf8; color: #38bdf8; }
    .hud-heat-view-btn.hud-heat-active {
        border-color: #38bdf8 !important; background: rgba(56, 189, 248, 0.15) !important;
        color: #38bdf8 !important;
    }
    #hud-heat-btn-settings {
        width: 28px; height: 28px; padding: 0 !important; border-radius: 4px !important;
        display: inline-flex !important; align-items: center; justify-content: center; font-size: 13px;
        background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2); color: #e4e4e7;
    }
    #hud-heat-btn-settings:hover {
        border-color: rgba(255, 255, 255, 0.6) !important; color: #ffffff !important; background: rgba(255, 255, 255, 0.12) !important;
    }

    /* CUSTOM COLOR PICKER BAR */
    .hud-heat-custom-pickers-bar {
        display: flex; align-items: center; gap: 14px; background: #000000;
        padding: 8px 14px; border: 1px dotted rgba(255, 255, 255, 0.2); border-radius: 2px;
        width: 100%; box-sizing: border-box; flex-wrap: wrap; font-size: 10px;
        color: #ffffff; font-weight: bold; letter-spacing: 1px;
    }
    .hud-heat-picker-item { display: flex; align-items: center; gap: 6px; }
    .hud-heat-color-picker-input {
        width: 26px; height: 22px; border: 1px solid rgba(255,255,255,0.3); background: none; cursor: pointer;
        padding: 0; border-radius: 2px; vertical-align: middle;
    }

    /* HUD STAT BOXES */
    .hud-heat-stats-row {
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px; flex-wrap: wrap; background: #000000; padding: 12px 16px;
        border: 1px dotted rgba(255, 255, 255, 0.25); border-radius: 2px; width: 100%;
        box-sizing: border-box;
    }
    .hud-heat-stat-item {
        display: flex; align-items: center; gap: 8px; font-size: 11px;
        color: #ffffff; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;
    }
    .hud-heat-stat-lbl { color: #ffffff; font-weight: bold; }
    
    .hud-heat-stat-val {
        font-weight: 800; font-size: 12px; color: #ffffff !important;
        padding: 4px 12px; border-radius: 2px; transition: all 0.25s ease;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9) !important;
    }

    /* FULL WIDTH WRAPPER & MATRIX GRID WITH ZERO BLANK SPACE */
    .hud-heat-scroll-wrapper {
        width: 100%; box-sizing: border-box !important; overflow: hidden !important;
        padding: 4px 0px;
    }

    .hud-heat-matrix-grid {
        display: flex; flex-direction: column; gap: 6px; width: 100%;
        user-select: none; box-sizing: border-box !important; padding: 0 !important;
    }
    
    /* MONTH LABELS */
    .hud-heat-months-row {
        display: flex; margin-left: 26px; height: 18px; position: relative;
        font-size: 10.5px !important; font-weight: bold !important; color: #ffffff !important; letter-spacing: 1.2px;
        width: calc(100% - 26px) !important; box-sizing: border-box !important; padding: 0 !important;
    }
    .hud-heat-month-label {
        position: absolute; text-transform: uppercase; white-space: nowrap;
        color: #ffffff !important; text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }

    .hud-heat-body-row {
        display: flex; gap: 6px; align-items: stretch; width: 100%;
        box-sizing: border-box !important; padding: 0 !important;
    }

    .hud-heat-days-col {
        display: grid; grid-template-rows: repeat(7, 1fr); gap: 3px;
        font-size: 8.5px; color: #a1a1aa; font-weight: bold; width: 20px; flex-shrink: 0;
    }
    .hud-heat-day-lbl { 
        display: flex; align-items: center; justify-content: center;
        text-transform: uppercase;
    }

    /* PERFECT 100% AUTO-STRETCH GRID (NO BLANK GAP ON RIGHT) */
    .hud-heat-grid-auto {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(7, 1fr);
        gap: 3px;
        flex: 1 !important;
        width: calc(100% - 26px) !important;
        min-width: 0 !important;
        box-sizing: border-box !important;
        padding: 2px 2px 2px 0px !important;
    }

    /* CELL TILES - PERFECT STRETCH FIT */
    .hud-heat-cell {
        width: 100%; height: 100%; min-height: 10px; aspect-ratio: 1 / 1; border-radius: 2px;
        box-sizing: border-box; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease;
        position: relative;
    }
    .hud-heat-cell:hover {
        transform: scale(1.22); z-index: 100 !important;
        box-shadow: 0 0 8px #ffffff !important; border-color: #ffffff !important;
    }

    .hud-heat-cell.hud-heat-lvl0 { background: var(--color-lvl0-bg, #141416); border: 1px solid var(--color-lvl0-border, rgba(255,255,255,0.08)); }
    .hud-heat-cell.hud-heat-lvl1 { background: var(--color-lvl1-bg, #06324f); border: 1px solid var(--color-lvl1-border, #38bdf8); color: var(--color-lvl1-text, #38bdf8); }
    .hud-heat-cell.hud-heat-lvl2 { background: var(--color-lvl2-bg, #026aa7); border: 1px solid var(--color-lvl2-border, #38bdf8); color: var(--color-lvl2-text, #38bdf8); }
    .hud-heat-cell.hud-heat-lvl3 { background: var(--color-lvl3-bg, #047857); border: 1px solid var(--color-lvl3-border, #34d399); color: var(--color-lvl3-text, #34d399); }
    .hud-heat-cell.hud-heat-lvl4 { 
        background: var(--color-lvl4-bg, #6b21a8); border: 1px solid var(--color-lvl4-border, #c084fc); color: var(--color-lvl4-text, #c084fc);
        animation: hudHeatSoftMicroGlow 1.8s infinite ease-in-out;
    }

    /* LEGEND BAR & READOUT */
    .hud-heat-footer-row {
        display: flex; justify-content: space-between; align-items: center;
        width: 100%; border-top: 1px dotted rgba(255, 255, 255, 0.15);
        padding-top: 10px; margin-top: 4px; gap: 10px; flex-wrap: wrap;
    }
    
    .hud-heat-legend {
        display: flex; align-items: center; gap: 6px; font-size: 9px;
        color: #ffffff; font-weight: bold; text-transform: uppercase;
    }
    .hud-heat-legend-square {
        width: 11px; height: 11px; border-radius: 2px;
    }

    .hud-heat-readout {
        background: #000000; border: 1px dotted rgba(255, 255, 255, 0.25);
        padding: 8px 12px; font-size: 11px; color: #e4e4e7; border-radius: 2px;
        line-height: 1; flex-grow: 1; text-align: center; white-space: nowrap;
        overflow: hidden; text-overflow: ellipsis; min-height: 34px;
        display: flex; align-items: center; justify-content: center;
    }
    .hud-heat-readout-highlight { color: #ffffff; font-weight: bold; }
    .hud-heat-readout-cyan { color: #38bdf8; font-weight: bold; }
    .hud-heat-readout-idle { font-weight: bold; letter-spacing: 1px; color: #a1a1aa; }

    /* SETTINGS MODAL */
    .hud-heat-modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.75); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(4px);
    }
    .hud-heat-modal {
        background: #09090b; border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
        border-radius: 4px; padding: 20px; font-family: 'JetBrains Mono', 'Courier New', monospace;
        color: #ffffff; width: 580px; max-width: 92vw; box-sizing: border-box;
    }
    .hud-heat-modal-title {
        margin: 0 0 16px 0; font-size: 16px; font-weight: 700;
        letter-spacing: 1.5px; text-transform: uppercase;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.2); padding-bottom: 10px;
        color: #ffffff; display: flex; align-items: center; gap: 8px;
    }
    .hud-heat-input-group {
        display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;
    }
    .hud-heat-input-group label {
        font-size: 12px; text-transform: uppercase; letter-spacing: 1px;
        color: #ffffff !important; font-weight: 700;
    }
    .hud-heat-input-group input, .hud-heat-input-group select {
        background: #000000; border: 1px solid rgba(255, 255, 255, 0.3);
        color: #ffffff !important; font-family: inherit; font-size: 13px;
        padding: 8px 12px; border-radius: 2px; outline: none; box-sizing: border-box; width: 100%;
        min-height: 38px !important; height: 38px !important; line-height: normal !important;
    }
    .hud-heat-input-group select {
        padding: 6px 12px !important;
    }
    .hud-heat-input-group select option {
        background: #09090b; color: #ffffff;
    }
    .hud-heat-input-group input:focus, .hud-heat-input-group select:focus {
        border-color: #38bdf8; box-shadow: 0 0 6px rgba(56, 189, 248, 0.3);
    }
    .hud-heat-input-desc {
        font-size: 12px; color: #e4e4e7 !important; line-height: 1.4;
    }
    
    .hud-heat-modal-actions {
        display: flex; justify-content: flex-end; gap: 10px;
        margin-top: 20px; border-top: 1px dotted rgba(255, 255, 255, 0.2); padding-top: 14px;
    }
    .hud-heat-modal-btn {
        background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.35);
        color: #ffffff !important; font-family: inherit; font-size: 12.5px; font-weight: bold;
        letter-spacing: 1px; text-transform: uppercase; padding: 8px 18px;
        border-radius: 2px; cursor: pointer; transition: all 0.2s ease;
    }
    .hud-heat-modal-btn:hover { border-color: #ffffff; background: rgba(255, 255, 255, 0.15); color: #ffffff !important; }
    .hud-heat-modal-btn-primary {
        border-color: #38bdf8; color: #ffffff !important; background: rgba(56, 189, 248, 0.25) !important;
    }
    .hud-heat-modal-btn-primary:hover {
        background: #38bdf8 !important; color: #000000 !important; box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
    }
`;

// ==========================================
// 2. HUD CONFIG & MULTI-PROFILE ARCHITECTURE
// ==========================================
const CONFIG_DIR = `${app.vault.configDir}/HUD Config`;
const getConfigPath = (profileName) => `${CONFIG_DIR}/heatmap-matrix--${profileName}.json`;

const currentNote = dv.current();
const notePath = currentNote && currentNote.file ? currentNote.file.path.replace(/\.md$/i, '') : "default";
const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, "_");

let activeProfile = defaultProfileKey;

const defaultConfig = {
    themeKey: "stealth",
    custom: {
        lvl1: "#06324f",
        lvl2: "#026aa7",
        lvl3: "#047857",
        lvl4: "#6b21a8"
    },
    viewMode: "year",
    excludedFolders: [],
    heading: "SYSTEM MATRIX // {MODE} HEATMAP"
};

let config = JSON.parse(JSON.stringify(defaultConfig));

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

const getLegacyLocalStorage = () => {
    try {
        const saved = localStorage.getItem("obsidian_hud_heatmap_theme_v5");
        if (saved) return JSON.parse(saved);
    } catch(e) {}
    return null;
};

const listProfiles = async () => {
    const list = new Set([defaultProfileKey]);
    try {
        if (await app.vault.adapter.exists(CONFIG_DIR)) {
            const res = await app.vault.adapter.list(CONFIG_DIR);
            if (res && res.files) {
                res.files.forEach(f => {
                    const filename = f.split(/[\\/]/).pop();
                    const m = filename.match(/^heatmap-matrix--(.+)\.json$/);
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
                return {
                    themeKey: parsed.themeKey || defaultConfig.themeKey,
                    custom: Object.assign({}, defaultConfig.custom, parsed.custom || {}),
                    viewMode: parsed.viewMode || defaultConfig.viewMode,
                    excludedFolders: Array.isArray(parsed.excludedFolders) ? parsed.excludedFolders : [],
                    heading: parsed.heading !== undefined ? parsed.heading : defaultConfig.heading
                };
            }
        }
    } catch(e) {}
    return JSON.parse(JSON.stringify(defaultConfig));
};

const loadConfig = async () => {
    await ensureConfigDir();
    const noteConfigPath = getConfigPath(defaultProfileKey);
    try {
        if (await app.vault.adapter.exists(noteConfigPath)) {
            const rawNote = await app.vault.adapter.read(noteConfigPath);
            const parsed = JSON.parse(rawNote);
            if (parsed && parsed.mirrors) {
                activeProfile = parsed.mirrors;
                config = await loadProfileData(activeProfile);
                return;
            } else if (parsed) {
                activeProfile = defaultProfileKey;
                config = {
                    themeKey: parsed.themeKey || defaultConfig.themeKey,
                    custom: Object.assign({}, defaultConfig.custom, parsed.custom || {}),
                    viewMode: parsed.viewMode || defaultConfig.viewMode,
                    excludedFolders: Array.isArray(parsed.excludedFolders) ? parsed.excludedFolders : [],
                    heading: parsed.heading !== undefined ? parsed.heading : defaultConfig.heading
                };
                return;
            }
        } else {
            // Check legacy localStorage migration
            const legacy = getLegacyLocalStorage();
            if (legacy) {
                activeProfile = defaultProfileKey;
                config = {
                    themeKey: legacy.themeKey || defaultConfig.themeKey,
                    custom: Object.assign({}, defaultConfig.custom, legacy.custom || {}),
                    viewMode: defaultConfig.viewMode,
                    excludedFolders: [],
                    heading: defaultConfig.heading
                };
                await saveProfileConfig(defaultProfileKey, config);
                return;
            }
        }
    } catch(e) {}
    activeProfile = defaultProfileKey;
    config = JSON.parse(JSON.stringify(defaultConfig));
};

const saveProfileConfig = async (profileName, conf) => {
    try {
        await ensureConfigDir();
        const targetPath = getConfigPath(profileName);
        const dataToSave = {
            themeKey: conf.themeKey || defaultConfig.themeKey,
            custom: conf.custom || defaultConfig.custom,
            viewMode: conf.viewMode || defaultConfig.viewMode,
            excludedFolders: conf.excludedFolders || [],
            heading: conf.heading !== undefined ? conf.heading : defaultConfig.heading
        };
        await app.vault.adapter.write(targetPath, JSON.stringify(dataToSave, null, 2));
    } catch(e) {
        console.error("Failed to save heatmap profile:", e);
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
    } catch(e) {
        console.error("Failed to save heatmap note pointer:", e);
    }
};

const hexToRgba = (hex, alpha = 0.12) => {
    if (!hex) return `rgba(255,255,255,${alpha})`;
    let clean = String(hex).replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    let num = parseInt(clean, 16);
    if (isNaN(num)) return `rgba(255,255,255,${alpha})`;
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const themePalettes = {
    stealth: {
        name: "STEALTH CYBER",
        lvl0: { bg: "#141416", border: "rgba(255,255,255,0.08)", color: "#a1a1aa" },
        lvl1: { bg: "#06324f", border: "rgba(56,189,248,0.4)", color: "#38bdf8" },
        lvl2: { bg: "#026aa7", border: "#38bdf8", color: "#38bdf8" },
        lvl3: { bg: "#047857", border: "#34d399", color: "#34d399" },
        lvl4: { bg: "#6b21a8", border: "#c084fc", color: "#c084fc" }
    },
    matrix: {
        name: "EMERALD MATRIX",
        lvl0: { bg: "#141416", border: "rgba(255,255,255,0.08)", color: "#a1a1aa" },
        lvl1: { bg: "#06382b", border: "rgba(52,211,153,0.35)", color: "#34d399" },
        lvl2: { bg: "#045e45", border: "#34d399", color: "#34d399" },
        lvl3: { bg: "#059669", border: "#6ee7b7", color: "#6ee7b7" },
        lvl4: { bg: "#10b981", border: "#a7f3d0", color: "#a7f3d0" }
    },
    cyan: {
        name: "ELECTRIC CYAN",
        lvl0: { bg: "#141416", border: "rgba(255,255,255,0.08)", color: "#a1a1aa" },
        lvl1: { bg: "#083344", border: "rgba(56,189,248,0.35)", color: "#38bdf8" },
        lvl2: { bg: "#164e63", border: "#38bdf8", color: "#38bdf8" },
        lvl3: { bg: "#0e7490", border: "#7dd3fc", color: "#7dd3fc" },
        lvl4: { bg: "#0284c7", border: "#bae6fd", color: "#bae6fd" }
    },
    amber: {
        name: "SOLAR AMBER",
        lvl0: { bg: "#141416", border: "rgba(255,191,36,0.35)", color: "#fbbf24" },
        lvl1: { bg: "#451a03", border: "rgba(251,191,36,0.35)", color: "#fbbf24" },
        lvl2: { bg: "#78350f", border: "#fbbf24", color: "#fbbf24" },
        lvl3: { bg: "#b45309", border: "#fde68a", color: "#fde68a" },
        lvl4: { bg: "#d97706", border: "#fef08a", color: "#fef08a" }
    },
    crimson: {
        name: "CRIMSON ROSE",
        lvl0: { bg: "#141416", border: "rgba(255,255,255,0.08)", color: "#a1a1aa" },
        lvl1: { bg: "#4c0519", border: "rgba(251,113,133,0.35)", color: "#fb7185" },
        lvl2: { bg: "#881337", border: "#fb7185", color: "#fb7185" },
        lvl3: { bg: "#be123c", border: "#fecdd3", color: "#fecdd3" },
        lvl4: { bg: "#e11d48", border: "#ffe4e6", color: "#ffe4e6" }
    }
};

// ==========================================
// 3. VAULT ACTIVITY SCANNER
// ==========================================
let daysActivityMap = {};
let totalModifications = 0;

const getVaultFolders = () => {
    try {
        const folders = new Set();
        if (app.vault && app.vault.getAllLoadedFiles) {
            app.vault.getAllLoadedFiles().forEach(item => {
                if (item && item.children && item.path) {
                    const p = item.path.trim().replace(/^[\/\\]+|[\/\\]+$/g, "");
                    if (p && p !== "/") folders.add(p);
                }
            });
        }
        if (app.vault && app.vault.getFiles) {
            app.vault.getFiles().forEach(f => {
                if (f && f.parent && f.parent.path) {
                    const p = f.parent.path.trim().replace(/^[\/\\]+|[\/\\]+$/g, "");
                    if (p && p !== "/") folders.add(p);
                } else if (f && f.path && f.path.includes("/")) {
                    const parts = f.path.split("/");
                    parts.pop();
                    const p = parts.join("/");
                    if (p) folders.add(p);
                }
            });
        }
        return Array.from(folders).sort();
    } catch (e) {
        return [];
    }
};

const isExcluded = (filePath) => {
    if (!config.excludedFolders || !Array.isArray(config.excludedFolders) || config.excludedFolders.length === 0) {
        return false;
    }
    const normalizedPath = filePath.replace(/\\/g, "/");
    return config.excludedFolders.some(rawFolder => {
        const folder = rawFolder.trim().replace(/^[\/\\]+|[\/\\]+$/g, "");
        if (!folder) return false;
        return normalizedPath === folder || normalizedPath.startsWith(folder + "/");
    });
};

const scanVaultActivity = () => {
    daysActivityMap = {};
    totalModifications = 0;

    const allFiles = app.vault.getFiles()
        .filter(f => f.extension === "md" || f.extension === "base" || f.name.endsWith(".base"))
        .filter(f => !isExcluded(f.path));

    allFiles.forEach(file => {
        let mDay = moment(file.stat.mtime).format("YYYY-MM-DD");
        let cDay = moment(file.stat.ctime).format("YYYY-MM-DD");

        daysActivityMap[mDay] = (daysActivityMap[mDay] || 0) + 1;
        totalModifications++;

        if (cDay !== mDay) {
            daysActivityMap[cDay] = (daysActivityMap[cDay] || 0) + 1;
        }
    });
};

const containerDiv = document.createElement("div");
containerDiv.className = "hud-heat-container";

const getActiveThemeObj = () => {
    if (config.themeKey === "custom") {
        return {
            name: "CUSTOM COLOR PALETTE",
            lvl0: { bg: "#141416", border: "rgba(255,255,255,0.08)", color: "#a1a1aa" },
            lvl1: { bg: config.custom.lvl1, border: config.custom.lvl1, color: config.custom.lvl1 },
            lvl2: { bg: config.custom.lvl2, border: config.custom.lvl2, color: config.custom.lvl2 },
            lvl3: { bg: config.custom.lvl3, border: config.custom.lvl3, color: config.custom.lvl3 },
            lvl4: { bg: config.custom.lvl4, border: config.custom.lvl4, color: config.custom.lvl4 }
        };
    }
    return themePalettes[config.themeKey] || themePalettes.stealth;
};

const updateCssVariables = (activeTheme) => {
    containerDiv.style.setProperty("--color-lvl0-bg", activeTheme.lvl0.bg);
    containerDiv.style.setProperty("--color-lvl0-border", activeTheme.lvl0.border);
    containerDiv.style.setProperty("--color-lvl1-bg", activeTheme.lvl1.bg);
    containerDiv.style.setProperty("--color-lvl1-border", activeTheme.lvl1.border);
    containerDiv.style.setProperty("--color-lvl1-text", activeTheme.lvl1.color);
    containerDiv.style.setProperty("--color-lvl2-bg", activeTheme.lvl2.bg);
    containerDiv.style.setProperty("--color-lvl2-border", activeTheme.lvl2.border);
    containerDiv.style.setProperty("--color-lvl2-text", activeTheme.lvl2.color);
    containerDiv.style.setProperty("--color-lvl3-bg", activeTheme.lvl3.bg);
    containerDiv.style.setProperty("--color-lvl3-border", activeTheme.lvl3.border);
    containerDiv.style.setProperty("--color-lvl3-text", activeTheme.lvl3.color);
    containerDiv.style.setProperty("--color-lvl4-bg", activeTheme.lvl4.bg);
    containerDiv.style.setProperty("--color-lvl4-border", activeTheme.lvl4.border);
    containerDiv.style.setProperty("--color-lvl4-text", activeTheme.lvl4.color);
};

// --- SETTINGS MODAL ---
let settingsModalInstance = null;

const showSettingsModal = async () => {
    if (settingsModalInstance) settingsModalInstance.remove();

    settingsModalInstance = document.createElement("div");
    settingsModalInstance.className = "hud-heat-modal-overlay";

    const inner = document.createElement("div");
    inner.className = "hud-heat-modal";

    const currentProfiles = await listProfiles();
    const allProfiles = new Set(currentProfiles);
    allProfiles.add(activeProfile);
    allProfiles.add(defaultProfileKey);

    const profileOptionsHtml = Array.from(allProfiles).map(p => {
        let label = p;
        if (p === defaultProfileKey) label = `[Current Note: ${p}]`;
        return `<option value="${p}" ${p === activeProfile ? "selected" : ""}>${label}</option>`;
    }).join("") + `<option value="__new__">+ Create New Named Profile...</option>`;

    const excludedVal = (config.excludedFolders || []).join(", ");
    const folderSuggestions = getVaultFolders();

    inner.innerHTML = `
        <div class="hud-heat-modal-title">
            <span>⚙️ HEATMAP MATRIX SETTINGS</span>
        </div>

        <div class="hud-heat-input-group">
            <label>Profile</label>
            <select id="hud-heat-modal-profile" style="height: 38px !important; min-height: 38px !important; line-height: normal !important; font-size: 13px !important; padding: 6px 12px !important; box-sizing: border-box;">
                ${profileOptionsHtml}
            </select>
            <div class="hud-heat-input-desc">Select a profile to load or link. Other notes can mirror this profile.</div>
        </div>

        <div class="hud-heat-input-group" id="hud-heat-new-profile-group" style="display: none; background: rgba(56,189,248,0.06); padding: 10px; border: 1px dashed rgba(56,189,248,0.3); border-radius: 2px;">
            <label style="color: #ffffff; font-weight: 700;">New Profile Name</label>
            <input type="text" id="hud-heat-new-profile-name" placeholder="e.g. global, vault, work" style="margin-bottom: 6px;" />
            <div class="hud-heat-input-desc">Enter a unique profile name. Will be saved as heatmap-matrix--[name].json</div>
        </div>

        <div class="hud-heat-input-group">
            <label>Widget Heading</label>
            <input type="text" id="hud-heat-modal-heading" value="${((config.heading !== undefined ? config.heading : defaultConfig.heading) || '').replace(/"/g, '&quot;')}" placeholder="e.g. SYSTEM MATRIX // {MODE} HEATMAP" />
            <div class="hud-heat-input-desc">Title displayed at the top. Supports dynamic token {MODE} for active Year / 365-Day Rolling mode.</div>
        </div>

        <div class="hud-heat-input-group">
            <label>Excluded Folders (comma-separated)</label>
            <input type="text" id="hud-heat-modal-excluded" list="hud-heat-datalist-folders" value="${excludedVal.replace(/"/g, '&quot;')}" placeholder="e.g. Templates, Archive, Private" />
            <datalist id="hud-heat-datalist-folders">
                ${folderSuggestions.map(f => `<option value="${f}"></option>`).join("")}
            </datalist>
            
            <div class="hud-heat-input-desc">Folder paths to exclude from vault activity scanning. Select from dropdown or type.</div>
        </div>

        <div class="hud-heat-modal-actions">
            <button class="hud-heat-modal-btn" id="hud-heat-modal-cancel">Cancel</button>
            <button class="hud-heat-modal-btn hud-heat-modal-btn-primary" id="hud-heat-modal-save">Save Settings</button>
        </div>
    `;

    settingsModalInstance.appendChild(inner);
    document.body.appendChild(settingsModalInstance);

    const profileSelect = inner.querySelector("#hud-heat-modal-profile");
    const newProfGroup = inner.querySelector("#hud-heat-new-profile-group");
    const newProfInput = inner.querySelector("#hud-heat-new-profile-name");
    const headingInput = inner.querySelector("#hud-heat-modal-heading");
    const excludedInput = inner.querySelector("#hud-heat-modal-excluded");

    profileSelect.onchange = async (e) => {
        const chosen = e.target.value;
        if (chosen === "__new__") {
            newProfGroup.style.display = "block";
            newProfInput.focus();
            return;
        }
        newProfGroup.style.display = "none";
        const loadedConf = await loadProfileData(chosen);
        config = loadedConf;
        if (headingInput) headingInput.value = loadedConf.heading !== undefined ? loadedConf.heading : defaultConfig.heading;
        excludedInput.value = (loadedConf.excludedFolders || []).join(", ");
    };

    inner.querySelector("#hud-heat-modal-cancel").onclick = () => {
        settingsModalInstance.remove();
    };

    settingsModalInstance.onclick = (e) => {
        if (e.target === settingsModalInstance) {
            settingsModalInstance.remove();
        }
    };

    inner.querySelector("#hud-heat-modal-save").onclick = async () => {
        const rawExcluded = excludedInput.value;
        const newExcluded = rawExcluded.split(",")
            .map(s => s.trim().replace(/^[\/\\]+|[\/\\]+$/g, ""))
            .filter(Boolean);

        const newHeading = (headingInput && headingInput.value.trim()) ? headingInput.value.trim() : defaultConfig.heading;
        config.heading = newHeading;
        config.excludedFolders = newExcluded;

        const selectedProfile = profileSelect.value;
        let targetProfile = selectedProfile;

        if (selectedProfile === "__new__") {
            const rawName = (newProfInput.value || "").trim();
            const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, "_");
            if (!cleanName) {
                if (typeof Notice !== "undefined") new Notice("⚠️ Please enter a name for the new profile!");
                newProfInput.focus();
                return;
            }
            targetProfile = cleanName;
            await saveProfileConfig(targetProfile, config);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        } else if (selectedProfile === defaultProfileKey) {
            targetProfile = defaultProfileKey;
            await saveProfileConfig(targetProfile, config);
            activeProfile = targetProfile;
        } else {
            targetProfile = selectedProfile;
            await saveProfileConfig(targetProfile, config);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        }

        scanVaultActivity();
        renderHeatmapWidget();
        settingsModalInstance.remove();
        if (typeof Notice !== "undefined") new Notice("Heatmap Settings Saved!");
    };
};

const renderHeatmapWidget = () => {
    containerDiv.innerHTML = "";
    let activeTheme = getActiveThemeObj();
    updateCssVariables(activeTheme);

    // Date calculations
    let startDate, endDate;
    if (config.viewMode === "year") {
        startDate = moment().startOf('year').startOf('week');
        endDate = moment().endOf('year').endOf('week');
    } else {
        endDate = moment().endOf('day');
        startDate = moment().subtract(51, 'weeks').startOf('week');
    }

    let activeDaysCount = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    let scanDate = startDate.clone();
    while (scanDate.isBefore(endDate) || scanDate.isSame(endDate, 'day')) {
        let dateStr = scanDate.format("YYYY-MM-DD");
        let count = daysActivityMap[dateStr] || 0;

        if (count > 0) {
            activeDaysCount++;
            tempStreak++;
            if (tempStreak > longestStreak) longestStreak = tempStreak;
        } else {
            tempStreak = 0;
        }
        scanDate.add(1, 'day');
    }

    let streakCheckDate = moment();
    if ((daysActivityMap[streakCheckDate.format("YYYY-MM-DD")] || 0) === 0) {
        streakCheckDate.subtract(1, 'day');
    }
    while ((daysActivityMap[streakCheckDate.format("YYYY-MM-DD")] || 0) > 0) {
        currentStreak++;
        streakCheckDate.subtract(1, 'day');
    }

    let totalDaysSpan = Math.max(1, endDate.diff(startDate, 'days'));
    let activeRatioPct = ((activeDaysCount / totalDaysSpan) * 100).toFixed(1);

    // --- Header & Controls Bar ---
    const headerDiv = document.createElement("div");
    headerDiv.className = "hud-heat-header";

    let customPickersHtml = "";
    if (config.themeKey === "custom") {
        customPickersHtml = `
            <div class="hud-heat-custom-pickers-bar">
                <span>⚙️ PICK CUSTOM PALETTE:</span>
                <div class="hud-heat-picker-item"><span>LVL 1:</span> <input type="color" class="hud-heat-color-picker-input" id="hud-heat-picker-lvl1" value="${config.custom.lvl1}" /></div>
                <div class="hud-heat-picker-item"><span>LVL 2:</span> <input type="color" class="hud-heat-color-picker-input" id="hud-heat-picker-lvl2" value="${config.custom.lvl2}" /></div>
                <div class="hud-heat-picker-item"><span>LVL 3:</span> <input type="color" class="hud-heat-color-picker-input" id="hud-heat-picker-lvl3" value="${config.custom.lvl3}" /></div>
                <div class="hud-heat-picker-item"><span>LVL 4:</span> <input type="color" class="hud-heat-color-picker-input" id="hud-heat-picker-lvl4" value="${config.custom.lvl4}" /></div>
            </div>
        `;
    }

    let getSubtleTintBoxStyle = (lvlObj) => `
        background: ${hexToRgba(lvlObj.bg, 0.12)};
        border: 1px solid ${hexToRgba(lvlObj.border, 0.45)};
        color: #ffffff !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
    `;

    const getHeatmapHeadingText = () => {
        const rawH = config.heading !== undefined ? config.heading : defaultConfig.heading;
        const modeStr = config.viewMode === 'year' ? `${moment().format('YYYY')} CALENDAR YEAR` : '365-DAY ROLLING';
        if (rawH.includes('{MODE}')) {
            return rawH.replace('{MODE}', modeStr);
        }
        return rawH;
    };

    headerDiv.innerHTML = `
        <div class="hud-heat-header-top">
            <div class="hud-heat-bracket-tl"></div><div class="hud-heat-bracket-br"></div>
            <div class="hud-heat-title">${getHeatmapHeadingText()}</div>
            <div class="hud-heat-controls-group">
                <select class="hud-heat-theme-select" id="hud-heat-theme-selector">
                    <option value="stealth" ${config.themeKey === 'stealth' ? 'selected' : ''}>🎨 STEALTH CYBER</option>
                    <option value="matrix" ${config.themeKey === 'matrix' ? 'selected' : ''}>💚 EMERALD MATRIX</option>
                    <option value="cyan" ${config.themeKey === 'cyan' ? 'selected' : ''}>💙 ELECTRIC CYAN</option>
                    <option value="amber" ${config.themeKey === 'amber' ? 'selected' : ''}>🟨 SOLAR AMBER</option>
                    <option value="crimson" ${config.themeKey === 'crimson' ? 'selected' : ''}>🔴 CRIMSON ROSE</option>
                    <option value="custom" ${config.themeKey === 'custom' ? 'selected' : ''}>⚙️ CUSTOM COLORS...</option>
                </select>
                <button class="hud-heat-view-btn ${config.viewMode === 'year' ? 'hud-heat-active' : ''}" id="hud-heat-btn-mode-year">📅 ${moment().format('YYYY')} YEAR</button>
                <button class="hud-heat-view-btn ${config.viewMode === 'rolling' ? 'hud-heat-active' : ''}" id="hud-heat-btn-mode-rolling">🔄 365 DAYS</button>
                <button class="hud-heat-view-btn" id="hud-heat-btn-settings" title="Settings">⚙️</button>
            </div>
        </div>
        ${customPickersHtml}
        <div class="hud-heat-stats-row">
            <div class="hud-heat-stat-item">
                <span class="hud-heat-stat-lbl">TOTAL ACTIVITY:</span>
                <span class="hud-heat-stat-val" id="hud-heat-stat-val-activity" style="${getSubtleTintBoxStyle(activeTheme.lvl2)}">${totalModifications.toLocaleString()} EDITS</span>
            </div>
            <div class="hud-heat-stat-item">
                <span class="hud-heat-stat-lbl">ACTIVE DAYS:</span>
                <span class="hud-heat-stat-val" id="hud-heat-stat-val-days" style="${getSubtleTintBoxStyle(activeTheme.lvl3)}">${activeDaysCount} DAYS (${activeRatioPct}%)</span>
            </div>
            <div class="hud-heat-stat-item">
                <span class="hud-heat-stat-lbl">CURRENT STREAK:</span>
                <span class="hud-heat-stat-val" id="hud-heat-stat-val-streak" style="${getSubtleTintBoxStyle(activeTheme.lvl4)}">${currentStreak} DAYS 🔥</span>
            </div>
            <div class="hud-heat-stat-item">
                <span class="hud-heat-stat-lbl">LONGEST STREAK:</span>
                <span class="hud-heat-stat-val" id="hud-heat-stat-val-longest" style="${getSubtleTintBoxStyle(activeTheme.lvl4)}">${longestStreak} DAYS ⚡</span>
            </div>
        </div>
    `;
    containerDiv.appendChild(headerDiv);

    // Event Handlers
    headerDiv.querySelector("#hud-heat-theme-selector").onchange = (e) => { 
        config.themeKey = e.target.value; 
        saveProfileConfig(activeProfile, config);
        renderHeatmapWidget(); 
    };
    headerDiv.querySelector("#hud-heat-btn-mode-year").onclick = () => { 
        config.viewMode = "year"; 
        saveProfileConfig(activeProfile, config);
        renderHeatmapWidget(); 
    };
    headerDiv.querySelector("#hud-heat-btn-mode-rolling").onclick = () => { 
        config.viewMode = "rolling"; 
        saveProfileConfig(activeProfile, config);
        renderHeatmapWidget(); 
    };
    headerDiv.querySelector("#hud-heat-btn-settings").onclick = () => {
        showSettingsModal();
    };

    if (config.themeKey === "custom") {
        ["lvl1", "lvl2", "lvl3", "lvl4"].forEach(lvl => {
            let picker = headerDiv.querySelector(`#hud-heat-picker-${lvl}`);
            if (picker) {
                picker.addEventListener("input", (e) => {
                    let hex = e.target.value;
                    config.custom[lvl] = hex;
                    
                    containerDiv.style.setProperty(`--color-${lvl}-bg`, hex);
                    containerDiv.style.setProperty(`--color-${lvl}-border`, hex);
                    containerDiv.style.setProperty(`--color-${lvl}-text`, hex);

                    let updatedTheme = getActiveThemeObj();
                    let actBox = headerDiv.querySelector("#hud-heat-stat-val-activity");
                    let daysBox = headerDiv.querySelector("#hud-heat-stat-val-days");
                    let strBox = headerDiv.querySelector("#hud-heat-stat-val-streak");
                    let lngBox = headerDiv.querySelector("#hud-heat-stat-val-longest");

                    if (actBox) actBox.style.cssText = getSubtleTintBoxStyle(updatedTheme.lvl2);
                    if (daysBox) daysBox.style.cssText = getSubtleTintBoxStyle(updatedTheme.lvl3);
                    if (strBox) strBox.style.cssText = getSubtleTintBoxStyle(updatedTheme.lvl4);
                    if (lngBox) lngBox.style.cssText = getSubtleTintBoxStyle(updatedTheme.lvl4);
                });
                picker.addEventListener("change", () => {
                    saveProfileConfig(activeProfile, config);
                });
            }
        });
    }

    // --- Matrix Grid System ---
    const scrollWrapper = document.createElement("div");
    scrollWrapper.className = "hud-heat-scroll-wrapper";

    const matrixGrid = document.createElement("div");
    matrixGrid.className = "hud-heat-matrix-grid";

    const monthsRow = document.createElement("div");
    monthsRow.className = "hud-heat-months-row";

    const bodyRow = document.createElement("div");
    bodyRow.className = "hud-heat-body-row";

    const daysCol = document.createElement("div");
    daysCol.className = "hud-heat-days-col";
    daysCol.innerHTML = `
        <div class="hud-heat-day-lbl"></div>
        <div class="hud-heat-day-lbl">MON</div>
        <div class="hud-heat-day-lbl"></div>
        <div class="hud-heat-day-lbl">WED</div>
        <div class="hud-heat-day-lbl"></div>
        <div class="hud-heat-day-lbl">FRI</div>
        <div class="hud-heat-day-lbl"></div>
    `;
    bodyRow.appendChild(daysCol);

    const gridAuto = document.createElement("div");
    gridAuto.className = "hud-heat-grid-auto";

    let currentPointer = startDate.clone();
    let lastMonthName = "";
    let totalWeeks = Math.ceil(endDate.diff(startDate, 'weeks', true));

    gridAuto.style.gridTemplateColumns = `repeat(${totalWeeks}, minmax(0, 1fr))`;

    for (let w = 0; w < totalWeeks; w++) {
        for (let d = 0; d < 7; d++) {
            let dateStr = currentPointer.format("YYYY-MM-DD");
            let displayDateStr = currentPointer.format("MMM DD, YYYY").toUpperCase();
            
            let mName = currentPointer.format("MMM").toUpperCase();
            let mYear = currentPointer.format("YY");
            let count = daysActivityMap[dateStr] || 0;

            let monthLabelText = `${mName} ${mYear}`;
            if (config.viewMode === "year" && w === 0 && mName === "DEC") {
                monthLabelText = "DEC";
            }

            if (d === 0 && monthNameKey(mName, mYear) !== lastMonthName) {
                let monthLbl = document.createElement("div");
                monthLbl.className = "hud-heat-month-label";
                monthLbl.textContent = monthLabelText;
                monthLbl.style.left = `${(w / totalWeeks * 100).toFixed(2)}%`;
                monthsRow.appendChild(monthLbl);
                lastMonthName = monthNameKey(mName, mYear);
            }

            let levelClass = "hud-heat-lvl0";
            if (count >= 10) levelClass = "hud-heat-lvl4";
            else if (count >= 6) levelClass = "hud-heat-lvl3";
            else if (count >= 3) levelClass = "hud-heat-lvl2";
            else if (count >= 1) levelClass = "hud-heat-lvl1";

            const cell = document.createElement("div");
            cell.className = `hud-heat-cell ${levelClass}`;
            cell.setAttribute("data-date", displayDateStr);
            cell.setAttribute("data-count", count);

            cell.addEventListener("mouseover", () => updateReadout(displayDateStr, count, levelClass));
            cell.addEventListener("mouseout", () => resetReadout());

            gridAuto.appendChild(cell);
            currentPointer.add(1, 'day');
        }
    }

    bodyRow.appendChild(gridAuto);
    matrixGrid.appendChild(monthsRow);
    matrixGrid.appendChild(bodyRow);
    scrollWrapper.appendChild(matrixGrid);
    containerDiv.appendChild(scrollWrapper);

    // --- Footer Bar ---
    const footerRow = document.createElement("div");
    footerRow.className = "hud-heat-footer-row";

    let readoutBox = document.createElement("div");
    readoutBox.className = "hud-heat-readout";
    const defaultReadout = `<span class="hud-heat-readout-idle">> HOVER ANY DAY SQUARE TO INSPECT VAULT ACTIVITY</span>`;
    readoutBox.innerHTML = defaultReadout;

    let legendDiv = document.createElement("div");
    legendDiv.className = "hud-heat-legend";
    legendDiv.innerHTML = `
        <span>LESS</span>
        <div class="hud-heat-legend-square hud-heat-cell hud-heat-lvl0"></div>
        <div class="hud-heat-legend-square hud-heat-cell hud-heat-lvl1"></div>
        <div class="hud-heat-legend-square hud-heat-cell hud-heat-lvl2"></div>
        <div class="hud-heat-legend-square hud-heat-cell hud-heat-lvl3"></div>
        <div class="hud-heat-legend-square hud-heat-cell hud-heat-lvl4"></div>
        <span>MORE</span>
    `;

    footerRow.appendChild(readoutBox);
    footerRow.appendChild(legendDiv);
    containerDiv.appendChild(footerRow);

    const updateReadout = (dateStr, count, levelStr) => {
        let levelNum = levelStr.replace('hud-heat-lvl', 'LEVEL ');
        let countStr = count === 1 ? `1 NOTE MODIFIED` : `${count} NOTES MODIFIED`;
        readoutBox.innerHTML = `
            <span>DATE: <span class="hud-heat-readout-highlight">${dateStr}</span></span>
            <span style="color:#52525b; margin: 0 8px;">│</span>
            <span>ACTIVITY: <span class="hud-heat-readout-cyan">${countStr}</span></span>
            <span style="color:#52525b; margin: 0 8px;">│</span>
            <span>STATUS: <span class="hud-heat-readout-highlight">${levelNum}</span></span>
        `;
    };

    const resetReadout = () => {
        readoutBox.innerHTML = defaultReadout;
    };
};

function monthNameKey(m, y) { return `${m}_${y}`; }

// Execute initialization
loadConfig().then(() => {
    scanVaultActivity();
    renderHeatmapWidget();

    // DIRECT DATAVIEW WRAPPER OVERFLOW LOCK
    dv.container.style.overflow = "hidden";
    dv.container.style.maxWidth = "100%";
    dv.container.style.boxSizing = "border-box";
    if (dv.container.parentElement) {
        dv.container.parentElement.style.overflow = "hidden";
        dv.container.parentElement.style.maxWidth = "100%";
    }

    dv.container.appendChild(containerDiv);
});