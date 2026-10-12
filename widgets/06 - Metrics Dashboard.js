// ==========================================
// 1. INJECT STYLES (MAIN ACTIVITY HUD V50 NAMESPACED)
// ==========================================
// AGGRESSIVE PURGE: Destroy all previous ghost versions so they don't override the layout
document.querySelectorAll("style[id^='obsidian-bottom-charts']").forEach(el => el.remove());
document.querySelectorAll("style[id^='obsidian-main-hud']").forEach(el => el.remove());

const existingStyle = document.createElement("style");
existingStyle.id = "obsidian-main-hud-v50-namespaced";
document.head.appendChild(existingStyle);

existingStyle.innerHTML = `
    @keyframes hudMainTraceFlow {
        from { stroke-dashoffset: 70; }
        to { stroke-dashoffset: 0; }
    }
    @keyframes hudMainTextGlowPulse {
        0%, 100% { color: #a1a1aa; text-shadow: 0 0 2px rgba(255, 255, 255, 0.2); }
        50% { color: #ffffff; text-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
    }

    /* LOCKED PROPORTIONS GRID: FIXED 360px LEFT SIDEBAR, BROAD 1fr RIGHT CHARTS */
    .hud-main-dash-grid { 
        display: grid !important; 
        grid-template-columns: 360px minmax(0, 1fr) !important; 
        gap: 14px !important; 
        width: 100% !important; 
        margin-top: 6px; margin-bottom: 6px; font-family: 'JetBrains Mono', 'Courier New', monospace; 
        color: #a1a1aa; background: #09090b; padding: 12px; border-radius: 4px;
        border: 1px dashed rgba(255, 255, 255, 0.15); box-sizing: border-box !important;
        overflow: hidden !important; max-width: 100% !important; align-items: stretch !important;
    }
    @media (max-width: 960px) {
        .hud-main-dash-grid { grid-template-columns: 1fr !important; }
    }
    .hud-main-right-col { display: flex; flex-direction: column; gap: 14px; min-width: 0; flex-grow: 1; justify-content: flex-start; }
    
    /* Shared Panel Styles */
    .hud-main-panel { 
        background: #000000; border: 1px solid rgba(255, 255, 255, 0.15); 
        padding: 12px 14px; display: flex; flex-direction: column; width: 100%; 
        position: relative; box-sizing: border-box !important; border-radius: 2px;
        z-index: 1; justify-content: flex-start !important; gap: 10px !important;
        flex: 1 0 auto;
    }
    
    /* Dedicated height stretch for left panel only */
    .hud-main-left-metrics-panel {
        height: 100% !important;
    }
    
    .hud-main-panel.hud-main-active-popup {
        overflow: visible !important; z-index: 99999 !important;
    }
    
    /* CORNER BRACKETS WITH BREATHING ROOM */
    .hud-main-bracket-tl { position: absolute; top: -2px; left: -2px; width: 8px; height: 8px; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; z-index: 2; pointer-events: none; }
    .hud-main-bracket-br { position: absolute; bottom: -2px; right: -2px; width: 8px; height: 8px; border-bottom: 1px solid #ffffff; border-right: 1px solid #ffffff; z-index: 2; pointer-events: none; }
    
    /* BASE HEADER (USED BY BOTTOM GRAPH BLOCK - LEFT ALIGNED WITH PADDING) */
    .hud-main-header { 
        display: flex; justify-content: space-between; align-items: center; 
        border-bottom: 1px dotted rgba(255, 255, 255, 0.15); 
        padding: 14px 10px 8px 18px;
        margin-bottom: 8px; position: relative; z-index: 5; flex-wrap: wrap; gap: 8px;
    }
    
    /* MODIFIER FOR TOP PANELS (OVERVIEW & LOAD) */
    .hud-main-header.hud-main-centered {
        flex-direction: column; justify-content: center; text-align: center;
        padding: 14px 10px 12px 10px; gap: 12px;
    }
    
    .hud-main-title { 
        color: #ffffff !important; font-size: 14px !important; text-transform: uppercase !important; 
        letter-spacing: 2.5px !important; font-weight: 800 !important; margin: 0; 
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important;
    }
    .hud-main-header.hud-main-centered .hud-main-title {
        text-align: center; width: 100%;
    }

    /* SETTINGS BUTTON */
    .hud-main-settings-btn {
        position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
        background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2);
        color: #e4e4e7; font-size: 13px; width: 28px; height: 28px; padding: 0; border-radius: 4px;
        cursor: pointer; transition: all 0.2s ease; display: inline-flex;
        align-items: center; justify-content: center; user-select: none; font-family: inherit;
        z-index: 10;
    }
    .hud-main-settings-btn:hover {
        border-color: rgba(255, 255, 255, 0.6); color: #ffffff; background: rgba(255, 255, 255, 0.12) !important;
    }
    .hud-main-sq-settings-btn {
        width: 28px; height: 28px; padding: 0 !important; border-radius: 4px !important;
        display: inline-flex !important; align-items: center; justify-content: center; font-size: 13px;
        background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; color: #e4e4e7 !important;
    }
    .hud-main-sq-settings-btn:hover {
        border-color: rgba(255, 255, 255, 0.6) !important; color: #ffffff !important; background: rgba(255, 255, 255, 0.12) !important;
    }
    
    /* COMPACT DATE CONTROLS */
    .hud-main-date-filter-row { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 2px; z-index: 5; position: relative; }
    .hud-main-date-inputs { display: flex; align-items: center; gap: 6px; justify-content: center; }
    .hud-main-date-input { 
        background: #000000; border: 1px solid rgba(255, 255, 255, 0.25); color: #ffffff; 
        font-family: inherit; font-size: 10px; padding: 4px 6px; border-radius: 2px; outline: none; width: 130px; flex-shrink: 0; text-align: center;
    }
    .hud-main-date-input:focus { border-color: #ffffff; }
    .hud-main-preset-btn-group { display: flex; gap: 6px; justify-content: space-between; }
    .hud-main-preset-btn { 
        flex: 1; text-align: center; font-size: 9px; font-weight: bold; padding: 5px 0; 
        background: #121215 !important; border: 1px dotted rgba(255, 255, 255, 0.2); color: #a1a1aa; 
        cursor: pointer; border-radius: 2px; transition: all 0.2s; user-select: none;
    }
    .hud-main-preset-btn:hover { border-color: #ffffff; color: #ffffff; background: rgba(255, 255, 255, 0.15) !important; }
    .hud-main-preset-btn.hud-main-active { background: rgba(255, 255, 255, 0.15) !important; color: #ffffff; border-color: #ffffff; }

    /* METRICS CARDS */
    .hud-main-metrics-grid { 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        gap: 8px; margin-bottom: 2px; z-index: 5; position: relative; 
    }
    .hud-main-metric-card { 
        background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2); 
        padding: 8px 10px; border-radius: 2px; display: flex; flex-direction: column; 
        gap: 4px; transition: all 0.2s; min-height: 65px; justify-content: space-between;
    }
    .hud-main-metric-card:hover { border-color: #ffffff; transform: translateY(-1px); }
    .hud-main-metric-label { font-size: 9px; color: #d4d4d8; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
    .hud-main-metric-value { font-size: 13.5px; color: #ffffff; font-weight: bold; letter-spacing: 0.5px; }
    .hud-main-metric-sub { font-size: 8.5px; color: #a1a1aa; text-transform: uppercase; font-weight: 500; }

    /* READOUT BOX - ANCHORED AT BOTTOM OF LEFT PANEL */
    .hud-main-readout { 
        background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2); padding: 8px 12px; 
        font-size: 11px; color: #e4e4e7; display: flex; align-items: center; justify-content: center;
        min-height: 36px; border-radius: 2px; box-sizing: border-box !important; 
        flex-shrink: 0; line-height: 1; z-index: 1; position: relative; text-align: center;
        overflow: hidden !important; text-overflow: ellipsis; margin-top: auto !important; width: 100%;
    }
    .hud-main-readout-group { display: flex; align-items: center; justify-content: center; gap: 14px; font-size: 11px; width: 100%; white-space: nowrap; }
    .hud-main-readout-divider { color: #52525b; font-weight: normal; margin: 0 6px; }
    .hud-main-readout-highlight { color: #ffffff; font-weight: bold; font-size: 12px; text-shadow: 0 0 6px rgba(255,255,255,0.7); }
    .hud-main-readout-idle { 
        font-size: 10.5px; letter-spacing: 1px; font-weight: bold; white-space: nowrap; color: #a1a1aa;
        animation: hudMainTextGlowPulse 3s ease-in-out infinite;
    }

    /* WEEKLY DISTRIBUTION */
    .hud-main-weekly-container { display: flex; align-items: flex-end; justify-content: space-between; height: 150px; padding: 0 14px; border-bottom: 1px dotted rgba(255, 255, 255, 0.15); z-index: 5; position: relative; margin-bottom: 24px; }
    .hud-main-weekly-col { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; flex: 1; position: relative; gap: 4px; cursor: crosshair; }
    .hud-main-weekly-bar { 
        width: 36%; 
        background: repeating-linear-gradient(to top, rgba(255, 255, 255, 0.85) 0px, rgba(255, 255, 255, 0.85) 3px, transparent 3px, transparent 5px); 
        border-bottom: 1px solid #ffffff; 
        transition: filter 0.2s; pointer-events: none;
    }
    .hud-main-weekly-col:hover .hud-main-weekly-bar { filter: brightness(1.6); box-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
    .hud-main-weekly-label { position: absolute; bottom: -20px; font-size: 10px; color: #a1a1aa; pointer-events: none; font-weight: bold; }
    .hud-main-weekend-lbl { color: #ffffff !important; }

    /* ITEMS COMPLETED LINE CHART */
    .hud-main-sq-layout { display: flex; width: 100%; height: 180px; position: relative; z-index: 2; overflow: visible; }
    .hud-main-sq-y-axis { width: 45px; border-right: 1px dotted rgba(255, 255, 255, 0.25); position: relative; flex-shrink: 0; }
    .hud-main-sq-y-label { position: absolute; right: 8px; font-size: 10px; color: #a1a1aa; transform: translateY(-50%); font-weight: 500; }
    .hud-main-sq-svg-container { flex-grow: 1; position: relative; border-bottom: 1px dotted rgba(255, 255, 255, 0.25); overflow: visible; }
    
    .hud-main-svg-layer {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: block; pointer-events: none; overflow: visible;
    }

    .hud-main-sq-svg-container polyline {
        stroke-dasharray: 4, 3;
        stroke-width: 1.5px !important;
        opacity: 0.9 !important;
        animation: hudMainTraceFlow 24s linear infinite;
    }
    
    .hud-main-sq-point { 
        position: absolute; width: 5px; height: 5px; 
        border-radius: 50%; transform: translate(-50%, -50%); z-index: 3; 
        pointer-events: none; transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
        opacity: 0.9;
    }
    .hud-main-sq-point.hud-main-highlighted { 
        transform: translate(-50%, -50%) scale(2.2) !important; 
        background: #ffffff !important; 
        border-color: #ffffff !important;
        box-shadow: 0 0 8px #ffffff !important; 
        z-index: 25 !important; opacity: 1 !important;
    }
    
    .hud-main-sq-hover-column { 
        position: absolute; top: 0; height: 100%; cursor: crosshair; z-index: 4; 
        background: transparent !important; border: none !important; outline: none !important;
    }

    .hud-main-sq-x-axis { margin-left: 45px; height: 28px; position: relative; margin-top: 6px; z-index: 2; overflow: visible; }
    .hud-main-sq-x-label { 
        position: absolute; top: 8px; font-size: 9.5px; color: #a1a1aa; 
        font-weight: bold; white-space: nowrap; transform: translateX(-50%);
    }

    /* RIGHT ALIGNED HEADER CONTROLS (FOR ITEMS GRAPH) */
    .hud-main-sq-header-controls { 
        display: flex; gap: 6px; align-items: center; z-index: 99999; flex-wrap: wrap; justify-content: flex-end; flex-grow: 1;
    }
    
    .hud-main-sq-mode-btn {
        display: flex; align-items: center; gap: 4px; font-size: 9px;
        padding: 3px 8px; border-radius: 2px; cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.3); background: #121215 !important;
        color: #ffffff; font-weight: bold; letter-spacing: 1px; user-select: none;
        transition: all 0.2s;
    }
    .hud-main-sq-mode-btn:hover { border-color: #ffffff; color: #ffffff; }
    .hud-main-sq-mode-btn.hud-main-active {
        border-color: #ffffff !important; background: rgba(255, 255, 255, 0.15) !important;
        color: #ffffff !important;
    }

    .hud-main-sq-dropdown-wrapper { position: relative; display: inline-block; z-index: 99999; }
    .hud-main-sq-dropdown-btn { 
        display: flex; align-items: center; gap: 6px; font-size: 9px; 
        padding: 3px 8px; border-radius: 2px; cursor: pointer; 
        border: 1px solid rgba(255, 255, 255, 0.3); background: #121215 !important; 
        color: #ffffff; font-weight: bold; letter-spacing: 1px; user-select: none; 
        transition: all 0.2s; position: relative; z-index: 100000;
    }
    .hud-main-sq-dropdown-btn:hover { border-color: #ffffff; background: rgba(255, 255, 255, 0.15) !important; }
    
    .hud-main-sq-dropdown-popup { 
        position: absolute; right: 0; top: 100%; margin-top: 4px; 
        background: #0d0d10; border: 1px solid #ffffff; 
        padding: 8px; border-radius: 2px; display: none; flex-direction: column; gap: 4px; 
        min-width: 160px; max-height: 220px; overflow-y: auto; 
        z-index: 9999999 !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 1); 
        pointer-events: auto !important;
    }
    .hud-main-sq-dropdown-popup.hud-main-show { display: flex !important; }
    
    .hud-main-sq-dropdown-action { 
        font-size: 9px; color: #ffffff; font-weight: bold; text-align: center; 
        padding: 6px; background: rgba(255, 255, 255, 0.15); border-radius: 2px; 
        cursor: pointer; user-select: none; margin-bottom: 6px; letter-spacing: 1px; 
        position: relative; z-index: 10000000 !important; pointer-events: auto !important;
    }
    .hud-main-sq-dropdown-action:hover { background: rgba(255, 255, 255, 0.3); }

    .hud-main-sq-dropdown-option { 
        display: flex; align-items: center; gap: 8px; font-size: 10px; 
        color: #a1a1aa; cursor: pointer; padding: 6px 8px; border-radius: 2px; 
        user-select: none; transition: background 0.15s; 
        position: relative; z-index: 10000000 !important; pointer-events: auto !important;
    }
    .hud-main-sq-dropdown-option:hover { background: rgba(255, 255, 255, 0.2); color: #ffffff; }
    .hud-main-sq-dropdown-option.hud-main-active-opt { background: rgba(255, 255, 255, 0.12); }

    .hud-main-radio-dot { 
        width: 12px; height: 12px; border-radius: 50%; 
        border: 1px solid rgba(255, 255, 255, 0.4); 
        background: #000000; flex-shrink: 0; transition: all 0.2s; pointer-events: none;
    }
    .hud-main-radio-dot.hud-main-checked { 
        background: #ffffff !important; border-color: #ffffff !important; 
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
    }

    /* SETTINGS MODAL */
    .hud-main-modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        z-index: 999999; font-family: 'JetBrains Mono', 'Courier New', monospace;
    }
    .hud-main-modal {
        background: #09090b; border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 4px; padding: 22px; width: 580px; max-width: 92vw;
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8); color: #ffffff;
        position: relative; box-sizing: border-box; max-height: 90vh; overflow-y: auto;
    }
    .hud-main-modal::-webkit-scrollbar { width: 4px; }
    .hud-main-modal::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 2px; }
    .hud-main-modal h3 {
        margin: 0 0 16px 0; font-size: 15px; font-weight: 700;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.2); padding-bottom: 10px;
        color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;
        display: flex; align-items: center; justify-content: space-between;
    }
    .hud-main-modal-close {
        cursor: pointer; color: #a1a1aa; font-size: 18px; line-height: 1;
        transition: color 0.2s;
    }
    .hud-main-modal-close:hover { color: #ffffff; }

    .hud-main-input-group { margin-bottom: 14px; position: relative; }
    .hud-main-input-group label {
        display: block; font-size: 12px; color: #ffffff !important; margin-bottom: 5px;
        font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;
    }
    .hud-main-input-group input, .hud-main-input-group select {
        width: 100%; padding: 8px 12px; background: #000000;
        border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 2px;
        color: #ffffff !important; font-size: 13px; outline: none; box-sizing: border-box;
        font-family: inherit; transition: border-color 0.2s;
        min-height: 38px !important; height: 38px !important; line-height: normal !important;
    }
    .hud-main-input-group select {
        padding: 6px 12px !important;
    }
    .hud-main-input-group input:focus, .hud-main-input-group select:focus {
        border-color: #ffffff;
    }
    .hud-main-input-group select option { background-color: #09090b; color: #ffffff; }
    
    .hud-main-input-desc {
        font-size: 11.5px; color: #e4e4e7 !important; margin-top: 3px; line-height: 1.4;
    }
    
    .hud-main-modal-actions {
        display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
        border-top: 1px dotted rgba(255, 255, 255, 0.2); padding-top: 14px;
    }
    .hud-main-mod-btn {
        background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.3);
        color: #ffffff !important; padding: 8px 18px; border-radius: 2px; cursor: pointer;
        font-size: 13px; font-family: inherit; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; transition: all 0.2s;
    }
    .hud-main-mod-btn:hover { border-color: #ffffff; color: #ffffff !important; background: rgba(255, 255, 255, 0.15) !important; }
    .hud-main-mod-primary {
        background: #ffffff !important; border-color: #ffffff !important; color: #000000 !important; font-weight: 700;
    }
    .hud-main-mod-primary:hover {
        background: rgba(255, 255, 255, 0.85) !important; color: #000000 !important; box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
    }

    /* AUTOFILL SUGGESTION PILLS */
    
`;

// ==========================================
// 2. DATA MANAGEMENT & MULTI-PROFILE ARCHITECTURE
// ==========================================
const CONFIG_FOLDER = (typeof app !== "undefined" && app.vault && app.vault.configDir) 
    ? `${app.vault.configDir}/HUD Config` 
    : "HUD Config";

const currentNote = (typeof dv !== "undefined" && dv.current) ? dv.current() : null;
const notePath = (currentNote && currentNote.file) ? currentNote.file.path.replace(/\.md$/i, '') : "default";
const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, "_");

let activeProfile = defaultProfileKey;

const DEFAULT_CONFIG = {
    headingOverview: "OVERVIEW // SYSTEM METRICS",
    headingWeekly: "LOAD // WEEKLY DISTRIBUTION",
    headingTelemetry: "📊 {FOLDER} TELEMETRY",
    sessionsFolder: "",
    gamesFolder: "",
    startTimeProp: "",
    endTimeProp: "",
    completionDateProp: "",
    yearProp: "",
    granularity: "yearly",
    yearsVisibility: {}
};

let config = { ...DEFAULT_CONFIG };

const getConfigPath = (profileName) => `${CONFIG_FOLDER}/main-hud--${profileName}.json`;

const ensureConfigFolder = async () => {
    try {
        if (typeof app !== "undefined" && app.vault && app.vault.adapter) {
            if (!(await app.vault.adapter.exists(CONFIG_FOLDER))) {
                if (app.vault.createFolder) {
                    await app.vault.createFolder(CONFIG_FOLDER).catch(() => {});
                } else if (app.vault.adapter.mkdir) {
                    await app.vault.adapter.mkdir(CONFIG_FOLDER).catch(() => {});
                }
            }
        }
    } catch(e) {}
};

const listProfiles = async () => {
    const list = new Set([defaultProfileKey]);
    try {
        if (typeof app !== "undefined" && app.vault && app.vault.adapter) {
            if (await app.vault.adapter.exists(CONFIG_FOLDER)) {
                const res = await app.vault.adapter.list(CONFIG_FOLDER);
                if (res && res.files) {
                    res.files.forEach(f => {
                        const filename = f.split(/[\\/]/).pop();
                        const m = filename.match(/^main-hud--(.+)\.json$/);
                        if (m) list.add(m[1]);
                    });
                }
            }
        }
    } catch(e) {}
    return Array.from(list);
};

const loadProfileData = async (profileName) => {
    try {
        const targetPath = getConfigPath(profileName);
        if (typeof app !== "undefined" && app.vault && app.vault.adapter && (await app.vault.adapter.exists(targetPath))) {
            const data = await app.vault.adapter.read(targetPath);
            let parsed = JSON.parse(data);
            const clean = { ...DEFAULT_CONFIG, ...parsed };
            delete clean.mirrors;
            config = clean;
        } else {
            config = { ...DEFAULT_CONFIG };
        }
    } catch(e) {
        config = { ...DEFAULT_CONFIG };
    }
};

const loadConfig = async () => {
    try {
        await ensureConfigFolder();
        const noteConfigPath = getConfigPath(defaultProfileKey);
        if (typeof app !== "undefined" && app.vault && app.vault.adapter && (await app.vault.adapter.exists(noteConfigPath))) {
            const rawNote = await app.vault.adapter.read(noteConfigPath);
            let parsed = JSON.parse(rawNote);
            if (parsed && parsed.mirrors) {
                activeProfile = parsed.mirrors;
                await loadProfileData(activeProfile);
                return;
            } else if (parsed) {
                activeProfile = defaultProfileKey;
                config = { ...DEFAULT_CONFIG, ...parsed };
                return;
            }
        }
        activeProfile = defaultProfileKey;
        config = { ...DEFAULT_CONFIG };
    } catch(e) {
        activeProfile = defaultProfileKey;
        config = { ...DEFAULT_CONFIG };
    }
};

const saveProfileConfig = async (profileName, conf) => {
    try {
        await ensureConfigFolder();
        const targetPath = getConfigPath(profileName);
        if (typeof app !== "undefined" && app.vault && app.vault.adapter) {
            const dataToSave = {
                headingOverview: conf.headingOverview !== undefined ? conf.headingOverview : DEFAULT_CONFIG.headingOverview,
                headingWeekly: conf.headingWeekly !== undefined ? conf.headingWeekly : DEFAULT_CONFIG.headingWeekly,
                headingTelemetry: conf.headingTelemetry !== undefined ? conf.headingTelemetry : DEFAULT_CONFIG.headingTelemetry,
                sessionsFolder: conf.sessionsFolder !== undefined ? conf.sessionsFolder : DEFAULT_CONFIG.sessionsFolder,
                gamesFolder: conf.gamesFolder !== undefined ? conf.gamesFolder : DEFAULT_CONFIG.gamesFolder,
                startTimeProp: conf.startTimeProp !== undefined ? conf.startTimeProp : DEFAULT_CONFIG.startTimeProp,
                endTimeProp: conf.endTimeProp !== undefined ? conf.endTimeProp : DEFAULT_CONFIG.endTimeProp,
                completionDateProp: conf.completionDateProp !== undefined ? conf.completionDateProp : DEFAULT_CONFIG.completionDateProp,
                yearProp: conf.yearProp !== undefined ? conf.yearProp : DEFAULT_CONFIG.yearProp,
                granularity: conf.granularity || "yearly",
                yearsVisibility: conf.yearsVisibility || {}
            };
            await app.vault.adapter.write(targetPath, JSON.stringify(dataToSave, null, 2));
        }
    } catch(e) {
        console.error("Failed to save profile:", e);
    }
};

const saveNotePointer = async (targetProfileName) => {
    try {
        await ensureConfigFolder();
        const noteConfigPath = getConfigPath(defaultProfileKey);
        if (typeof app !== "undefined" && app.vault && app.vault.adapter) {
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
        }
    } catch(e) {
        console.error("Failed to save note pointer:", e);
    }
};

// ==========================================
// 3. HELPER FUNCTIONS & DATA QUERIES
// ==========================================
const getVaultFolders = () => {
    const folders = new Set();
    try {
        if (typeof app !== "undefined" && app.vault) {
            if (typeof app.vault.getAllLoadedFiles === "function") {
                const allFiles = app.vault.getAllLoadedFiles();
                allFiles.forEach(item => {
                    if (item && item.children) {
                        const p = item.path ? item.path.trim().replace(/^\/+|\/+$/g, '') : "";
                        if (p && p !== "/" && p !== ".") folders.add(p);
                    }
                });
            }
            if (typeof app.vault.getFiles === "function") {
                const files = app.vault.getFiles();
                files.forEach(f => {
                    if (f && f.parent && f.parent.path) {
                        const p = f.parent.path.trim().replace(/^\/+|\/+$/g, '');
                        if (p && p !== "/" && p !== ".") folders.add(p);
                    } else if (f && f.path && f.path.includes("/")) {
                        const parts = f.path.split("/");
                        parts.pop();
                        const p = parts.join("/").trim().replace(/^\/+|\/+$/g, '');
                        if (p) folders.add(p);
                    }
                });
            }
        }
        if (typeof dv !== "undefined" && typeof dv.pages === "function") {
            dv.pages().forEach(p => {
                if (p && p.file && p.file.folder) {
                    const f = p.file.folder.trim().replace(/^\/+|\/+$/g, '');
                    if (f) folders.add(f);
                }
            });
        }
    } catch (e) {
        console.error("Error detecting vault folders:", e);
    }
    return Array.from(folders).sort((a, b) => a.localeCompare(b));
};

const getVaultProperties = () => {
    const props = new Set();
    try {
        if (typeof app !== "undefined" && app.metadataCache && typeof app.vault !== "undefined") {
            const files = app.vault.getMarkdownFiles ? app.vault.getMarkdownFiles() : [];
            files.forEach(f => {
                const cache = app.metadataCache.getFileCache(f);
                if (cache && cache.frontmatter) {
                    Object.keys(cache.frontmatter).forEach(k => {
                        if (k && k !== "position") props.add(k);
                    });
                }
            });
        }
        if (typeof dv !== "undefined" && typeof dv.pages === "function") {
            dv.pages().forEach(p => {
                if (p && p.file && p.file.frontmatter) {
                    Object.keys(p.file.frontmatter).forEach(k => {
                        if (k && k !== "position") props.add(k);
                    });
                }
            });
        }
    } catch (e) {
        console.error("Error detecting vault properties:", e);
    }
    return Array.from(props).sort((a, b) => a.localeCompare(b));
};

const formatTime = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

const parseToMoment = (val) => {
    if (!val) return null;
    if (val.toJSDate) return moment(val.toJSDate());
    if (typeof val === 'object' && val.ts) return moment(val.ts);
    let str = String(val).trim();
    let m = moment(str, ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm", "YYYY-MM-DD", "DD-MM-YYYY HH:mm", "DD-MM-YYYY"], true);
    if (m.isValid()) return m;
    return moment(str);
};

const getPropValue = (page, propName) => {
    if (!page || !propName) return undefined;
    if (page[propName] !== undefined && page[propName] !== null) return page[propName];
    const kebab = propName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    if (page[kebab] !== undefined && page[kebab] !== null) return page[kebab];
    const snake = propName.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    if (page[snake] !== undefined && page[snake] !== null) return page[snake];
    const lower = propName.toLowerCase();
    if (page[lower] !== undefined && page[lower] !== null) return page[lower];
    if (page.file && page.file.frontmatter) {
        const fm = page.file.frontmatter;
        if (fm[propName] !== undefined && fm[propName] !== null) return fm[propName];
        if (fm[kebab] !== undefined && fm[kebab] !== null) return fm[kebab];
        if (fm[snake] !== undefined && fm[snake] !== null) return fm[snake];
        if (fm[lower] !== undefined && fm[lower] !== null) return fm[lower];
    }
    return undefined;
};

const escapeHtml = (str) => {
    if (str === null || str === undefined) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};

let sessionLogs = [];
let allActiveDatesSet = new Set();
let yearlyGamesMap = {};
let monthlyGamesMap = {};
let detectedGameYearsSet = new Set();
let allGameYears = [];

let activeGamesGranularity = "yearly";
let activeGamesYearVisibility = {};

const scanSessions = () => {
    sessionLogs = [];
    allActiveDatesSet.clear();

    const folder = (config.sessionsFolder || "").trim();
    if (!folder) return;
    const queryStr = (folder.startsWith('"') || folder.startsWith('#')) ? folder : `"${folder}"`;

    let rawPages = [];
    try {
        if (typeof dv !== "undefined" && dv.pages) {
            rawPages = dv.pages(queryStr);
        }
    } catch(e) {
        console.error("Failed to query sessions:", e);
    }

    const startProp = (config.startTimeProp || "").trim();
    const endProp = (config.endTimeProp || "").trim();
    if (!startProp) return;

    rawPages.forEach(p => {
        let startVal = getPropValue(p, startProp);
        if (!startVal) return;

        let sTime = parseToMoment(startVal);
        if (sTime && sTime.isValid()) {
            let dateStr = sTime.format("YYYY-MM-DD");
            allActiveDatesSet.add(dateStr);

            let mins = 0;
            let endVal = endProp ? getPropValue(p, endProp) : null;
            if (endVal) {
                let eTime = parseToMoment(endVal);
                if (eTime && eTime.isValid()) mins = eTime.diff(sTime, 'minutes');
            } else {
                mins = 30;
            }

            if (mins >= 0) {
                sessionLogs.push({ sTime, mins, dateStr });
            }
        }
    });
};

const scanGames = () => {
    yearlyGamesMap = {};
    monthlyGamesMap = {};
    detectedGameYearsSet.clear();

    const folder = (config.gamesFolder || "").trim();
    if (!folder) return;
    const queryStr = (folder.startsWith('"') || folder.startsWith('#')) ? folder : `"${folder}"`;

    const yrProp = (config.yearProp || "").trim();
    const compProp = (config.completionDateProp || "").trim();
    if (!yrProp && !compProp) {
        allGameYears = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
        activeGamesYearVisibility = config.yearsVisibility || {};
        allGameYears.forEach(yr => {
            if (activeGamesYearVisibility[yr] === undefined) activeGamesYearVisibility[yr] = true;
        });
        return;
    }

    let rawPages = [];
    try {
        if (typeof dv !== "undefined" && dv.pages) {
            rawPages = dv.pages(queryStr).where(p => {
                let yrVal = yrProp ? getPropValue(p, yrProp) : null;
                let compVal = compProp ? getPropValue(p, compProp) : null;
                return (yrVal !== undefined && yrVal !== null && String(yrVal).trim() !== "") ||
                       (compVal !== undefined && compVal !== null && String(compVal).trim() !== "");
            });
        }
    } catch(e) {
        console.error("Failed to query items:", e);
    }

    rawPages.forEach(p => {
        let rawDate = compProp ? getPropValue(p, compProp) : null;
        let fDate = null;
        if (rawDate) {
            let dateStr = typeof rawDate === 'object' && rawDate.path ? rawDate.path : String(rawDate);
            let m = moment(dateStr);
            if (m.isValid()) fDate = m;
        }

        let rawYr = yrProp ? getPropValue(p, yrProp) : null;
        let yr = rawYr ? parseInt(String(rawYr).match(/\d{4}/)?.[0] || rawYr) : (fDate ? fDate.year() : NaN);
        if (!yr || isNaN(yr)) return;

        if (!fDate) {
            fDate = moment(`${yr}-01-01`, "YYYY-MM-DD");
        }

        let monthKey = `${yr}-${fDate.format("MM")}`;

        detectedGameYearsSet.add(yr);
        yearlyGamesMap[yr] = (yearlyGamesMap[yr] || 0) + 1;
        monthlyGamesMap[monthKey] = (monthlyGamesMap[monthKey] || 0) + 1;
    });

    allGameYears = Array.from(detectedGameYearsSet).sort((a, b) => a - b);
    if (allGameYears.length === 0) {
        allGameYears = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
    }

    activeGamesYearVisibility = config.yearsVisibility || {};
    allGameYears.forEach(yr => {
        if (activeGamesYearVisibility[yr] === undefined) activeGamesYearVisibility[yr] = true;
    });
    config.yearsVisibility = activeGamesYearVisibility;
};

const saveGamesState = async () => {
    config.granularity = activeGamesGranularity;
    config.yearsVisibility = activeGamesYearVisibility;
    await saveProfileConfig(activeProfile, config);
};

let defaultFrom = moment().subtract(30, 'days').format("YYYY-MM-DD");
let defaultTo = moment().format("YYYY-MM-DD");

let filterFromDate = defaultFrom;
let filterToDate = defaultTo;

// ==========================================
// 4. BUILD DOM LAYOUT
// ==========================================
const bottomGrid = document.createElement("div");
bottomGrid.className = "hud-main-dash-grid";

const getTelemetryHeading = () => {
    const rawGameFolder = (config.gamesFolder || "ITEMS").replace(/^"(.*)"$/, '$1').trim();
    const folderClean = (rawGameFolder.split('/').pop() || "ITEMS").toUpperCase();
    const t = config.headingTelemetry || "🎮 {FOLDER} TELEMETRY";
    return t.replace(/\{FOLDER\}/gi, folderClean);
};

// LEFT COLUMN: SUMMARY METRICS PANEL WITH DATE FILTER
const leftMetricsPanel = document.createElement("div");
leftMetricsPanel.className = "hud-main-panel hud-main-left-metrics-panel";

let leftHeader = document.createElement("div");
leftHeader.className = "hud-main-header hud-main-centered";
leftHeader.style.position = "relative";
leftHeader.innerHTML = `
    <div class="hud-main-bracket-tl"></div><div class="hud-main-bracket-br"></div>
`;
let leftHeaderTitle = document.createElement("div");
leftHeaderTitle.className = "hud-main-title";
leftHeaderTitle.innerText = config.headingOverview || "OVERVIEW // SYSTEM METRICS";
leftHeader.appendChild(leftHeaderTitle);
leftMetricsPanel.appendChild(leftHeader);

let dateFilterRow = document.createElement("div");
dateFilterRow.className = "hud-main-date-filter-row";

dateFilterRow.innerHTML = `
    <div class="hud-main-date-inputs">
        <input type="date" class="hud-main-date-input" id="hud-main-from-date" value="${defaultFrom}" />
        <span style="font-weight:bold; font-size:10px; color:#52525b;">TO</span>
        <input type="date" class="hud-main-date-input" id="hud-main-to-date" value="${defaultTo}" />
    </div>
    <div class="hud-main-preset-btn-group">
        <div class="hud-main-preset-btn" data-preset="7D">7D</div>
        <div class="hud-main-preset-btn hud-main-active" data-preset="30D">30D</div>
        <div class="hud-main-preset-btn" data-preset="90D">90D</div>
        <div class="hud-main-preset-btn" data-preset="ALL">ALL</div>
    </div>
`;
leftMetricsPanel.appendChild(dateFilterRow);

let metricsGridContainer = document.createElement("div");
metricsGridContainer.className = "hud-main-metrics-grid";
leftMetricsPanel.appendChild(metricsGridContainer);

let bottomRow = document.createElement("div");
bottomRow.style.cssText = "display: flex; gap: 8px; align-items: center; width: 100%; margin-top: auto; z-index: 5;";

let metricsReadout = document.createElement("div");
metricsReadout.className = "hud-main-readout";
metricsReadout.style.cssText = "flex: 1; min-width: 0; margin-top: 0 !important; width: auto;";
metricsReadout.innerHTML = `<div class="hud-main-readout-idle">> SYSTEM STATUS: OPERATIONAL</div>`;
bottomRow.appendChild(metricsReadout);

leftMetricsPanel.appendChild(bottomRow);

bottomGrid.appendChild(leftMetricsPanel);

// RIGHT COLUMN
const rightCol = document.createElement("div");
rightCol.className = "hud-main-right-col";

// PANEL 1: WEEKLY DISTRIBUTION
const weeklyPanel = document.createElement("div");
weeklyPanel.className = "hud-main-panel";
weeklyPanel.innerHTML = `
    <div class="hud-main-bracket-tl"></div><div class="hud-main-bracket-br"></div>
`;
let weeklyHeader = document.createElement("div");
weeklyHeader.className = "hud-main-header hud-main-centered";
let weeklyHeaderTitle = document.createElement("div");
weeklyHeaderTitle.className = "hud-main-title";
weeklyHeaderTitle.innerText = config.headingWeekly || "LOAD // WEEKLY DISTRIBUTION";
weeklyHeader.appendChild(weeklyHeaderTitle);

let settingsBtn = document.createElement("button");
settingsBtn.className = "hud-main-settings-btn";
settingsBtn.title = "Configure HUD Settings";
settingsBtn.innerHTML = "⚙️";
settingsBtn.onclick = () => showSettingsModal();
weeklyHeader.appendChild(settingsBtn);

weeklyPanel.appendChild(weeklyHeader);

let weeklyContainer = document.createElement("div");
weeklyContainer.className = "hud-main-weekly-container";

const defaultWeeklyReadout = `<div class="hud-main-readout-idle">> HOVER BAR FOR VOLUME</div>`;
let weeklyReadout = document.createElement("div");
weeklyReadout.className = "hud-main-readout";
weeklyReadout.innerHTML = defaultWeeklyReadout;

weeklyPanel.appendChild(weeklyContainer);
weeklyPanel.appendChild(weeklyReadout);
rightCol.appendChild(weeklyPanel);

// PANEL 2: ITEMS ARCHIVE GRAPH
const sqPanel = document.createElement("div");
sqPanel.className = "hud-main-panel";

let sqHeader = document.createElement("div");
sqHeader.className = "hud-main-header";

let sqHeaderTitle = document.createElement("div");
sqHeaderTitle.className = "hud-main-title";
sqHeaderTitle.innerText = getTelemetryHeading();

sqHeader.innerHTML = `
    <div class="hud-main-bracket-tl"></div><div class="hud-main-bracket-br"></div>
`;
sqHeader.appendChild(sqHeaderTitle);

let headerControls = document.createElement("div");
headerControls.className = "hud-main-sq-header-controls";

let yearlyBtn = document.createElement("button");
yearlyBtn.className = "hud-main-sq-mode-btn";
yearlyBtn.innerHTML = "📅 YEARLY";

let monthlyBtn = document.createElement("button");
monthlyBtn.className = "hud-main-sq-mode-btn";
monthlyBtn.innerHTML = "📊 MONTHLY";

let last12mBtn = document.createElement("button");
last12mBtn.className = "hud-main-sq-mode-btn";
last12mBtn.innerHTML = "🔄 RECENT 12M";

const updateBtnState = () => {
    yearlyBtn.className = `hud-main-sq-mode-btn ${activeGamesGranularity === 'yearly' ? 'hud-main-active' : ''}`;
    monthlyBtn.className = `hud-main-sq-mode-btn ${activeGamesGranularity === 'monthly' ? 'hud-main-active' : ''}`;
    last12mBtn.className = `hud-main-sq-mode-btn ${activeGamesGranularity === 'last12m' ? 'hud-main-active' : ''}`;
    saveGamesState();
};

yearlyBtn.onclick = () => { activeGamesGranularity = "yearly"; updateBtnState(); updateSideQuestsChart(); };
monthlyBtn.onclick = () => { activeGamesGranularity = "monthly"; updateBtnState(); updateSideQuestsChart(); };
last12mBtn.onclick = () => { activeGamesGranularity = "last12m"; updateBtnState(); updateSideQuestsChart(); };

headerControls.appendChild(yearlyBtn);
headerControls.appendChild(monthlyBtn);
headerControls.appendChild(last12mBtn);

let yearWrapper = document.createElement("div");
yearWrapper.className = "hud-main-sq-dropdown-wrapper";
let yearBtn = document.createElement("div");
yearBtn.className = "hud-main-sq-dropdown-btn";
let yearPopup = document.createElement("div");
yearPopup.className = "hud-main-sq-dropdown-popup";

yearBtn.onclick = (e) => {
    e.stopPropagation();
    let isShowing = yearPopup.classList.toggle("hud-main-show");
    if (isShowing) sqPanel.classList.add("hud-main-active-popup");
    else sqPanel.classList.remove("hud-main-active-popup");
};
yearWrapper.appendChild(yearBtn);
yearWrapper.appendChild(yearPopup);
headerControls.appendChild(yearWrapper);

sqHeader.appendChild(headerControls);
sqPanel.appendChild(sqHeader);

document.addEventListener("click", (e) => {
    if (!yearWrapper.contains(e.target)) {
        yearPopup.classList.remove("hud-main-show");
        sqPanel.classList.remove("hud-main-active-popup");
    }
});

let sqReadout = document.createElement("div");
sqReadout.className = "hud-main-readout";

let sqChartBody = document.createElement("div");
sqPanel.appendChild(sqChartBody);
sqPanel.appendChild(sqReadout);
rightCol.appendChild(sqPanel);

bottomGrid.appendChild(rightCol);

// ==========================================
// 5. RE-RENDER FUNCTIONS
// ==========================================
const updateMetricsAndWeekly = () => {
    let fStart = moment(filterFromDate);
    let fEnd = moment(filterToDate).endOf('day');

    let filteredSessions = sessionLogs.filter(s => s.sTime.isSameOrAfter(fStart) && s.sTime.isSameOrBefore(fEnd));

    let weekTotals = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 0:0 };
    let totalMins = 0;
    let sessionCount = filteredSessions.length;
    let dateVolumeMap = {};
    let rangeActiveDatesSet = new Set();

    filteredSessions.forEach(s => {
        totalMins += s.mins;
        weekTotals[s.sTime.day()] += s.mins;
        rangeActiveDatesSet.add(s.dateStr);
        dateVolumeMap[s.dateStr] = (dateVolumeMap[s.dateStr] || 0) + s.mins;
    });

    let peakDateFormatted = "N/A";
    let peakDayOfWeek = "NO DATA";
    let maxDateVol = 0;
    Object.keys(dateVolumeMap).forEach(dStr => {
        if (dateVolumeMap[dStr] > maxDateVol) {
            maxDateVol = dateVolumeMap[dStr];
            let mDate = moment(dStr, "YYYY-MM-DD");
            peakDateFormatted = mDate.format("DD-MM-YYYY");
            peakDayOfWeek = mDate.format("dddd").toUpperCase();
        }
    });

    let activeDayCount = rangeActiveDatesSet.size > 0 ? rangeActiveDatesSet.size : 1;
    let dailyAvgMins = Math.round(totalMins / activeDayCount);

    let streak = 0;
    let checkD = moment();
    if (!allActiveDatesSet.has(checkD.format("YYYY-MM-DD"))) {
        checkD.subtract(1, 'days');
    }
    while (allActiveDatesSet.has(checkD.format("YYYY-MM-DD"))) {
        streak++;
        checkD.subtract(1, 'days');
    }

    metricsGridContainer.innerHTML = `
        <div class="hud-main-metric-card">
            <div class="hud-main-metric-label">TOTAL TIME</div>
            <div class="hud-main-metric-value">${formatTime(totalMins)}</div>
            <div class="hud-main-metric-sub">LOGGED HOURS</div>
        </div>
        <div class="hud-main-metric-card">
            <div class="hud-main-metric-label">SESSIONS</div>
            <div class="hud-main-metric-value">${sessionCount}</div>
            <div class="hud-main-metric-sub">TOTAL LOGS</div>
        </div>
        <div class="hud-main-metric-card">
            <div class="hud-main-metric-label">ACTIVE STREAK</div>
            <div class="hud-main-metric-value">${streak} DAYS</div>
            <div class="hud-main-metric-sub">ACTIVE SEQUENCES</div>
        </div>
        <div class="hud-main-metric-card">
            <div class="hud-main-metric-label">DAILY AVG</div>
            <div class="hud-main-metric-value">${formatTime(dailyAvgMins)}</div>
            <div class="hud-main-metric-sub">PER ACTIVE DAY</div>
        </div>
        <div class="hud-main-metric-card">
            <div class="hud-main-metric-label">PEAK DATE</div>
            <div class="hud-main-metric-value" style="font-size:12px; color:#ffffff;">${peakDateFormatted}</div>
            <div style="font-size:9.5px; color:#ffffff; font-weight:bold;">${peakDayOfWeek}</div>
            <div class="hud-main-metric-sub">${maxDateVol > 0 ? `TIME: <span style="color:#ffffff; font-weight:bold;">${formatTime(maxDateVol)}</span>` : 'NO LOGS'}</div>
        </div>
        <div class="hud-main-metric-card">
            <div class="hud-main-metric-label">ACTIVE DAYS</div>
            <div class="hud-main-metric-value">${rangeActiveDatesSet.size}</div>
            <div class="hud-main-metric-sub">IN DATE RANGE</div>
        </div>
    `;

    weeklyContainer.innerHTML = "";
    let maxEq = Math.max(...Object.values(weekTotals), 1);
    let dayLabelsMap = { 1:"MON", 2:"TUE", 3:"WED", 4:"THU", 5:"FRI", 6:"SAT", 0:"SUN" };

    [1, 2, 3, 4, 5, 6, 0].forEach(day => {
        let heightPct = Math.max((weekTotals[day] / maxEq) * 100, 2);
        let isWeekend = (day === 0 || day === 6);
        let col = document.createElement("div");
        col.className = "hud-main-weekly-col";
        
        let bar = document.createElement("div");
        bar.className = "hud-main-weekly-bar";
        bar.style.height = `${heightPct}%`;
        
        let durStr = formatTime(weekTotals[day]);
        
        col.addEventListener("mouseover", () => {
            weeklyReadout.innerHTML = `
                <div class="hud-main-readout-group">
                    <span>DAY: <span class="hud-main-readout-highlight">${dayLabelsMap[day]}</span></span>
                    <span class="hud-main-readout-divider">│</span>
                    <span>TOTAL TIME: <span class="hud-main-readout-highlight">${durStr}</span></span>
                </div>
            `;
        });

        col.addEventListener("mouseout", () => {
            weeklyReadout.innerHTML = defaultWeeklyReadout;
        });

        col.appendChild(bar);
        col.innerHTML += `<div class="hud-main-weekly-label ${isWeekend ? 'hud-main-weekend-lbl' : ''}">${dayLabelsMap[day]}</div>`;
        weeklyContainer.appendChild(col);
    });
};

const updateSideQuestsChart = () => {
    let selectedYearsList = allGameYears.filter(y => activeGamesYearVisibility[y]);
    yearBtn.innerHTML = `<span>YEARS (${selectedYearsList.length}/${allGameYears.length}) ▼</span>`;

    yearPopup.innerHTML = "";
    let yearSelectAll = document.createElement("div");
    yearSelectAll.className = "hud-main-sq-dropdown-action";
    let allYearsActive = selectedYearsList.length === allGameYears.length;
    yearSelectAll.innerHTML = allYearsActive ? "[ DESELECT ALL ]" : "[ SELECT ALL ]";
    yearSelectAll.onclick = (e) => {
        e.stopPropagation();
        allGameYears.forEach(y => { activeGamesYearVisibility[y] = !allYearsActive; });
        saveGamesState();
        updateSideQuestsChart();
    };
    yearPopup.appendChild(yearSelectAll);

    allGameYears.forEach(yr => {
        let isActive = !!activeGamesYearVisibility[yr];
        let opt = document.createElement("div");
        opt.className = `hud-main-sq-dropdown-option ${isActive ? 'hud-main-active-opt' : ''}`;
        opt.onclick = (e) => {
            e.stopPropagation();
            activeGamesYearVisibility[yr] = !activeGamesYearVisibility[yr];
            saveGamesState();
            updateSideQuestsChart();
        };
        opt.innerHTML = `
            <span class="hud-main-radio-dot ${isActive ? 'hud-main-checked' : ''}"></span>
            <span style="color:${isActive ? '#ffffff' : '#71717a'}; font-weight:bold;">${yr}</span>
        `;
        yearPopup.appendChild(opt);
    });

    sqChartBody.innerHTML = "";

    let plotPoints = [];
    let totalSelectedGamesCount = 0;

    if (activeGamesGranularity === "last12m") {
        let curM = moment().subtract(11, 'months').startOf('month');
        let endM = moment().endOf('month');
        
        while (curM.isBefore(endM) || curM.isSame(endM, 'month')) {
            let yr = curM.year();
            let mKey = curM.format("YYYY-MM");
            let mName = curM.format("MMM").toUpperCase();
            let yr2Digit = curM.format("YY");
            let val = monthlyGamesMap[mKey] || 0;
            totalSelectedGamesCount += val;

            plotPoints.push({
                label: `${mName} ${yr2Digit}`,
                fullLabel: `${mName} ${yr}`,
                val: val
            });
            curM.add(1, 'month');
        }
    } else if (activeGamesGranularity === "yearly") {
        selectedYearsList.forEach(yr => {
            let val = yearlyGamesMap[yr] || 0;
            totalSelectedGamesCount += val;
            plotPoints.push({
                label: String(yr),
                fullLabel: `YEAR: ${yr}`,
                val: val
            });
        });
    } else {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        selectedYearsList.forEach(yr => {
            totalSelectedGamesCount += (yearlyGamesMap[yr] || 0);
            let yr2Digit = String(yr).slice(-2);
            for (let m = 0; m < 12; m++) {
                let mKey = `${yr}-${String(m + 1).padStart(2, '0')}`;
                let mName = monthNames[m];
                let val = monthlyGamesMap[mKey] || 0;

                plotPoints.push({
                    label: `${mName} ${yr2Digit}`,
                    fullLabel: `${mName} ${yr}`,
                    val: val
                });
            }
        });
    }

    const defaultSqReadout = `<div class="hud-main-readout-idle">> HOVER ANY DATA NODE TO INSPECT COMPLETED ITEMS <span class="hud-main-readout-divider">│</span> TOTAL COMPLETED: <span style="color:#ffffff; font-size:12px; font-weight:bold;">${totalSelectedGamesCount.toLocaleString()} ITEMS</span></div>`;
    sqReadout.innerHTML = defaultSqReadout;

    if (plotPoints.length > 0) {
        let maxVal = Math.max(1, ...plotPoints.map(p => p.val));

        let sqLayout = document.createElement("div");
        sqLayout.className = "hud-main-sq-layout";
        
        sqLayout.innerHTML = `
            <div class="hud-main-sq-y-axis">
                <div class="hud-main-sq-y-label" style="top:12px; transform:translateY(-50%);">${maxVal}</div>
                <div class="hud-main-sq-y-label" style="top:90px; transform:translateY(-50%);">${Math.round(maxVal/2)}</div>
                <div class="hud-main-sq-y-label" style="top:180px; transform:translateY(-50%);">0</div>
            </div>
        `;
        
        let sqSvgContainer = document.createElement("div");
        sqSvgContainer.className = "hud-main-sq-svg-container";
        
        let gameColor = "#ffffff";
        let pts = plotPoints.map((p, i) => {
            let pct = (plotPoints.length <= 1) ? 50 : (i / (plotPoints.length - 1)) * 100;
            let x = (pct / 100) * 1000;
            let y = 180 - ((p.val / maxVal) * 168);
            return { x, y, pct, val: p.val, label: p.label, fullLabel: p.fullLabel, idx: i };
        });

        let strPts = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
        let polylinesHTML = `<polyline points="${strPts}" fill="none" stroke="${gameColor}" stroke-width="1.5" opacity="0.9" />`;

        let dotsContainer = document.createElement("div");
        pts.forEach(p => {
            let dot = document.createElement("div");
            dot.className = `hud-main-sq-point hud-main-sq-dot-idx-${p.idx}`;
            dot.style.left = `${p.pct.toFixed(2)}%`;
            dot.style.top = `${(p.y / 180) * 100}%`;
            dot.style.background = gameColor;
            dot.style.border = `1px solid ${gameColor}`;
            dot.style.boxShadow = `0 0 6px ${gameColor}`;
            dotsContainer.appendChild(dot);
        });

        sqSvgContainer.innerHTML = `
            <svg class="hud-main-svg-layer" viewBox="0 0 1000 180" preserveAspectRatio="none">
                ${polylinesHTML}
            </svg>
        `;
        sqSvgContainer.appendChild(dotsContainer);

        // Hover Column Readouts
        plotPoints.forEach((p, i) => {
            let colWidthPct = 100 / plotPoints.length;
            let pctLeft = pts[i].pct;
            
            let hoverCol = document.createElement("div");
            hoverCol.className = "hud-main-sq-hover-column";
            hoverCol.style.width = `${colWidthPct}%`;
            hoverCol.style.left = `${pctLeft - colWidthPct/2}%`;

            hoverCol.addEventListener("mouseover", () => {
                let dot = sqSvgContainer.querySelector(`.hud-main-sq-dot-idx-${i}`);
                if (dot) dot.classList.add("hud-main-highlighted");

                sqReadout.innerHTML = `
                    <div class="hud-main-readout-group">
                        <span>DATE: <span class="hud-main-readout-highlight">${p.fullLabel}</span></span>
                        <span class="hud-main-readout-divider">│</span>
                        <span>COMPLETED: <span class="hud-main-readout-highlight">${p.val}</span></span>
                    </div>
                `;
            });

            hoverCol.addEventListener("mouseout", () => {
                let dot = sqSvgContainer.querySelector(`.hud-main-sq-dot-idx-${i}`);
                if (dot) dot.classList.remove("hud-main-highlighted");
                sqReadout.innerHTML = defaultSqReadout;
            });

            sqSvgContainer.appendChild(hoverCol);
        });

        // X-Axis Labels
        let sqXAxis = document.createElement("div");
        sqXAxis.className = "hud-main-sq-x-axis";

        let step = 1;
        if (activeGamesGranularity === "monthly" && plotPoints.length > 24) step = 3;
        else if (activeGamesGranularity === "monthly" && plotPoints.length > 12) step = 2;

        plotPoints.forEach((p, i) => {
            if (i % step === 0 || i === plotPoints.length - 1) {
                let pctLeft = pts[i].pct;
                sqXAxis.innerHTML += `<div class="hud-main-sq-x-label" style="left: ${pctLeft.toFixed(2)}%; transform: translateX(-50%);">${p.label}</div>`;
            }
        });

        sqLayout.appendChild(sqSvgContainer);
        sqChartBody.appendChild(sqLayout);
        sqChartBody.appendChild(sqXAxis);

    } else {
        sqChartBody.innerHTML = `<div style="text-align:center; padding: 45px 20px; font-size:11px; color:#71717a; letter-spacing:1px;">[ NO YEARS SELECTED — SELECT AT LEAST ONE YEAR FROM DROPDOWN ABOVE ]</div>`;
    }
};

const refreshAll = () => {
    scanSessions();
    scanGames();
    activeGamesGranularity = config.granularity || "yearly";
    activeGamesYearVisibility = config.yearsVisibility || {};

    if (leftHeaderTitle) {
        leftHeaderTitle.innerText = config.headingOverview || "OVERVIEW // SYSTEM METRICS";
    }
    if (weeklyHeaderTitle) {
        weeklyHeaderTitle.innerText = config.headingWeekly || "LOAD // WEEKLY DISTRIBUTION";
    }
    if (sqHeaderTitle) {
        sqHeaderTitle.innerText = getTelemetryHeading();
    }

    yearlyBtn.className = `hud-main-sq-mode-btn ${activeGamesGranularity === 'yearly' ? 'hud-main-active' : ''}`;
    monthlyBtn.className = `hud-main-sq-mode-btn ${activeGamesGranularity === 'monthly' ? 'hud-main-active' : ''}`;
    last12mBtn.className = `hud-main-sq-mode-btn ${activeGamesGranularity === 'last12m' ? 'hud-main-active' : ''}`;

    updateMetricsAndWeekly();
    updateSideQuestsChart();
};

let fromInput = leftMetricsPanel.querySelector("#hud-main-from-date");
let toInput = leftMetricsPanel.querySelector("#hud-main-to-date");
let presetBtns = leftMetricsPanel.querySelectorAll(".hud-main-preset-btn");

fromInput.onchange = () => {
    filterFromDate = fromInput.value;
    presetBtns.forEach(b => b.classList.remove("hud-main-active"));
    updateMetricsAndWeekly();
};

toInput.onchange = () => {
    filterToDate = toInput.value;
    presetBtns.forEach(b => b.classList.remove("hud-main-active"));
    updateMetricsAndWeekly();
};

presetBtns.forEach(btn => {
    btn.onclick = () => {
        presetBtns.forEach(b => b.classList.remove("hud-main-active"));
        btn.classList.add("hud-main-active");
        let p = btn.getAttribute("data-preset");
        
        let toM = moment();
        let fromM = moment();
        
        if (p === "7D") fromM.subtract(7, 'days');
        else if (p === "30D") fromM.subtract(30, 'days');
        else if (p === "90D") fromM.subtract(90, 'days');
        else if (p === "ALL") fromM = moment("2000-01-01");

        filterFromDate = fromM.format("YYYY-MM-DD");
        filterToDate = toM.format("YYYY-MM-DD");

        fromInput.value = filterFromDate;
        toInput.value = filterToDate;

        updateMetricsAndWeekly();
    };
});

// ==========================================
// 6. SETTINGS MODAL & PROFILE MANAGER
// ==========================================
let settingsModalInstance = null;
const showSettingsModal = async () => {
    if (settingsModalInstance) settingsModalInstance.remove();

    settingsModalInstance = document.createElement("div");
    settingsModalInstance.className = "hud-main-modal-overlay";

    let tempConfig = { ...config };
    let selectedProfVal = activeProfile;

    const inner = document.createElement("div");
    inner.className = "hud-main-modal";

    inner.innerHTML = `
        <h3>
            <span>⚙️ MAIN ACTIVITY HUD SETTINGS</span>
            <span class="hud-main-modal-close" id="hud-main-modal-close-btn">&times;</span>
        </h3>

        <div class="hud-main-input-group">
            <label>Profile</label>
            <select id="hud-main-profile-select" style="height: 38px !important; min-height: 38px !important; line-height: normal !important; font-size: 13px !important; padding: 6px 12px !important; box-sizing: border-box;">
                <option value="${activeProfile}">[Current: ${activeProfile}]</option>
                <option value="__new__">+ Create New Named Profile...</option>
            </select>
            <div class="hud-main-input-desc">Each note can have its own profile or mirror another profile.</div>
        </div>

        <div class="hud-main-input-group" id="hud-main-new-profile-group" style="display: none; background: rgba(255,255,255,0.04); padding: 10px; border: 1px dashed rgba(255,255,255,0.25); border-radius: 2px;">
            <label style="color: #ffffff; margin-bottom: 6px;">New Profile Name</label>
            <input type="text" id="hud-main-new-profile-name" placeholder="e.g. general, study, projects" style="margin-bottom: 6px;" />
            <div class="hud-main-input-desc" style="margin-bottom: 8px;">Saved as HUD Config/main-hud--[name].json</div>
            <div style="display: flex; gap: 14px; font-size: 12px; align-items: center;">
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; margin: 0; color: #ffffff;">
                    <input type="radio" name="hud-main-new-prof-source" value="default" checked style="width: auto; margin: 0;" /> Start with default settings
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; margin: 0; color: #ffffff;">
                    <input type="radio" name="hud-main-new-prof-source" value="copy" style="width: auto; margin: 0;" /> Copy current settings
                </label>
            </div>
        </div>

        <div class="hud-main-input-group">
            <label>Overview Heading</label>
            <input type="text" id="hud-main-set-heading-overview" value="${escapeHtml(tempConfig.headingOverview || DEFAULT_CONFIG.headingOverview)}" placeholder="e.g. OVERVIEW // SYSTEM METRICS" />
            <div class="hud-main-input-desc">Title displayed above the metrics & filters panel</div>
        </div>

        <div class="hud-main-input-group">
            <label>Weekly Distribution Heading</label>
            <input type="text" id="hud-main-set-heading-weekly" value="${escapeHtml(tempConfig.headingWeekly || DEFAULT_CONFIG.headingWeekly)}" placeholder="e.g. LOAD // WEEKLY DISTRIBUTION" />
            <div class="hud-main-input-desc">Title displayed above the weekly load chart</div>
        </div>

        <div class="hud-main-input-group">
            <label>Telemetry Heading</label>
            <input type="text" id="hud-main-set-heading-telemetry" value="${escapeHtml(tempConfig.headingTelemetry || DEFAULT_CONFIG.headingTelemetry)}" placeholder="e.g. 📊 {FOLDER} TELEMETRY" />
            <div class="hud-main-input-desc">Title for bottom chart. Supports dynamic token {FOLDER} to auto-insert target folder name.</div>
        </div>

        <div class="hud-main-input-group">
            <label>Sessions Folder / Query</label>
            <input type="text" id="hud-main-set-sessions-folder" value="${escapeHtml(tempConfig.sessionsFolder)}" placeholder="e.g. Logs/Sessions" />
            <div class="hud-main-input-desc">Dataview folder containing session logs</div>
        </div>

        <div class="hud-main-input-group">
            <label>Target / Items Folder</label>
            <input type="text" id="hud-main-set-target-folder" value="${escapeHtml(tempConfig.gamesFolder)}" placeholder="e.g. Archive, Completed, Notes" />
            <div class="hud-main-input-desc">Folder containing completed milestones, tasks, or items</div>
        </div>

        <div class="hud-main-input-group">
            <label>Start Time Property</label>
            <input type="text" id="hud-main-set-start-prop" value="${escapeHtml(tempConfig.startTimeProp)}" placeholder="e.g. start-time" />
            <div class="hud-main-input-desc">Frontmatter property for session start timestamp</div>
        </div>

        <div class="hud-main-input-group">
            <label>End Time Property</label>
            <input type="text" id="hud-main-set-end-prop" value="${escapeHtml(tempConfig.endTimeProp)}" placeholder="e.g. end-time" />
            <div class="hud-main-input-desc">Frontmatter property for session end timestamp</div>
        </div>

        <div class="hud-main-input-group">
            <label>Completion Date Property</label>
            <input type="text" id="hud-main-set-comp-date-prop" value="${escapeHtml(tempConfig.completionDateProp)}" placeholder="e.g. date-of-completion" />
            <div class="hud-main-input-desc">Frontmatter property for completion date</div>
        </div>

        <div class="hud-main-input-group">
            <label>Year Property</label>
            <input type="text" id="hud-main-set-year-prop" value="${escapeHtml(tempConfig.yearProp)}" placeholder="e.g. year" />
            <div class="hud-main-input-desc">Frontmatter property for release or completed year</div>
        </div>

        <div class="hud-main-modal-actions">
            <button id="hud-main-btn-cancel-settings" class="hud-main-mod-btn">Cancel</button>
            <button id="hud-main-btn-save-settings" class="hud-main-mod-btn hud-main-mod-primary">Save Settings</button>
        </div>
    `;

    settingsModalInstance.appendChild(inner);
    document.body.appendChild(settingsModalInstance);

    const profileSelect = inner.querySelector("#hud-main-profile-select");
    const newProfGroup = inner.querySelector("#hud-main-new-profile-group");
    const newProfInput = inner.querySelector("#hud-main-new-profile-name");
    const headingOverviewInput = inner.querySelector("#hud-main-set-heading-overview");
    const headingWeeklyInput = inner.querySelector("#hud-main-set-heading-weekly");
    const headingTelemetryInput = inner.querySelector("#hud-main-set-heading-telemetry");
    const sessionsFolderInput = inner.querySelector("#hud-main-set-sessions-folder");
    const targetFolderInput = inner.querySelector("#hud-main-set-target-folder");
    const startPropInput = inner.querySelector("#hud-main-set-start-prop");
    const endPropInput = inner.querySelector("#hud-main-set-end-prop");
    const compDatePropInput = inner.querySelector("#hud-main-set-comp-date-prop");
    const yearPropInput = inner.querySelector("#hud-main-set-year-prop");

    // Populate profile dropdown
    try {
        const profiles = await listProfiles();
        const allProfiles = new Set(profiles);
        allProfiles.add(activeProfile);

        profileSelect.innerHTML = Array.from(allProfiles).map(p => {
            const label = (p === defaultProfileKey) ? `[Current Note: ${p}]` : p;
            return `<option value="${p}" ${p === selectedProfVal ? 'selected' : ''}>${label}</option>`;
        }).join('') + `<option value="__new__">+ Create New Named Profile...</option>`;
    } catch(e) {}

    // Vault Autofill & Recommendation Setup
    const detectedFolders = getVaultFolders();
    const detectedProps = getVaultProperties();

    const attachAutofill = (input, datalistId, datalistOptions) => {
        let dl = inner.querySelector(`#${datalistId}`);
        if (!dl) {
            dl = document.createElement("datalist");
            dl.id = datalistId;
            input.parentNode.appendChild(dl);
        }
        input.setAttribute("list", datalistId);
        const uniqueOptions = Array.from(new Set((datalistOptions || []).filter(Boolean)));
        dl.innerHTML = uniqueOptions.map(opt => `<option value="${escapeHtml(opt)}"></option>`).join("");
    };

    attachAutofill(
        sessionsFolderInput,
        "hud-main-list-sessions-folder",
        detectedFolders
    );

    attachAutofill(
        targetFolderInput,
        "hud-main-list-target-folder",
        detectedFolders
    );

    attachAutofill(
        startPropInput,
        "hud-main-list-start-prop",
        detectedProps
    );

    attachAutofill(
        endPropInput,
        "hud-main-list-end-prop",
        detectedProps
    );

    attachAutofill(
        compDatePropInput,
        "hud-main-list-comp-date-prop",
        detectedProps
    );

    attachAutofill(
        yearPropInput,
        "hud-main-list-year-prop",
        detectedProps
    );

    const updateFormValues = (c) => {
        headingOverviewInput.value = c.headingOverview !== undefined ? c.headingOverview : DEFAULT_CONFIG.headingOverview;
        headingWeeklyInput.value = c.headingWeekly !== undefined ? c.headingWeekly : DEFAULT_CONFIG.headingWeekly;
        headingTelemetryInput.value = c.headingTelemetry !== undefined ? c.headingTelemetry : DEFAULT_CONFIG.headingTelemetry;
        sessionsFolderInput.value = c.sessionsFolder || "";
        targetFolderInput.value = c.gamesFolder || "";
        startPropInput.value = c.startTimeProp || "";
        endPropInput.value = c.endTimeProp || "";
        compDatePropInput.value = c.completionDateProp || "";
        yearPropInput.value = c.yearProp || "";
    };

    profileSelect.onchange = async (e) => {
        const chosen = e.target.value;
        if (chosen === "__new__") {
            newProfGroup.style.display = "block";
            newProfInput.focus();
            const isCopy = inner.querySelector("input[name='hud-main-new-prof-source']:checked")?.value === "copy";
            tempConfig = isCopy ? { ...config } : { ...DEFAULT_CONFIG };
            updateFormValues(tempConfig);
            return;
        }

        newProfGroup.style.display = "none";
        const targetPath = getConfigPath(chosen);
        let loaded = { ...DEFAULT_CONFIG };
        try {
            if (typeof app !== "undefined" && app.vault && app.vault.adapter && (await app.vault.adapter.exists(targetPath))) {
                const raw = await app.vault.adapter.read(targetPath);
                let parsed = JSON.parse(raw);
                if (parsed) {
                    if (parsed.mirrors) {
                        const mirrorPath = getConfigPath(parsed.mirrors);
                        if (await app.vault.adapter.exists(mirrorPath)) {
                            const mirrorRaw = await app.vault.adapter.read(mirrorPath);
                            const mirrorParsed = JSON.parse(mirrorRaw);
                            loaded = { ...DEFAULT_CONFIG, ...mirrorParsed };
                        }
                    } else {
                        loaded = { ...DEFAULT_CONFIG, ...parsed };
                    }
                }
                delete loaded.mirrors;
            }
        } catch(err) {}
        tempConfig = loaded;
        updateFormValues(tempConfig);
    };

    inner.querySelectorAll("input[name='hud-main-new-prof-source']").forEach(radio => {
        radio.onchange = (e) => {
            if (e.target.value === "copy") {
                tempConfig = { ...config };
            } else {
                tempConfig = { ...DEFAULT_CONFIG };
            }
            updateFormValues(tempConfig);
        };
    });

    const closeModal = () => {
        if (settingsModalInstance) {
            settingsModalInstance.remove();
            settingsModalInstance = null;
        }
    };

    inner.querySelector("#hud-main-modal-close-btn").onclick = closeModal;
    inner.querySelector("#hud-main-btn-cancel-settings").onclick = closeModal;
    settingsModalInstance.onclick = (e) => {
        if (e.target === settingsModalInstance) closeModal();
    };

    inner.querySelector("#hud-main-btn-save-settings").onclick = async () => {
        const selectedProfile = profileSelect.value;
        let targetProfile = "";

        const newConfig = {
            headingOverview: headingOverviewInput.value.trim() || DEFAULT_CONFIG.headingOverview,
            headingWeekly: headingWeeklyInput.value.trim() || DEFAULT_CONFIG.headingWeekly,
            headingTelemetry: headingTelemetryInput.value.trim() || DEFAULT_CONFIG.headingTelemetry,
            sessionsFolder: sessionsFolderInput.value.trim(),
            gamesFolder: targetFolderInput.value.trim(),
            startTimeProp: startPropInput.value.trim(),
            endTimeProp: endPropInput.value.trim(),
            completionDateProp: compDatePropInput.value.trim(),
            yearProp: yearPropInput.value.trim(),
            granularity: config.granularity || "yearly",
            yearsVisibility: config.yearsVisibility || {}
        };

        if (selectedProfile === "__new__") {
            const rawName = newProfInput ? newProfInput.value.trim() : "";
            if (!rawName) {
                if (typeof Notice !== "undefined") new Notice("Please enter a name for the new profile!");
                return;
            }
            targetProfile = rawName.replace(/[^a-zA-Z0-9_-]/g, "_");
            await saveProfileConfig(targetProfile, newConfig);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        } else if (selectedProfile === defaultProfileKey) {
            targetProfile = defaultProfileKey;
            await saveProfileConfig(targetProfile, newConfig);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        } else {
            targetProfile = selectedProfile;
            await saveProfileConfig(targetProfile, newConfig);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        }

        config = { ...newConfig };
        closeModal();
        if (typeof Notice !== "undefined") new Notice(`HUD Settings saved to profile: ${activeProfile}`);
        refreshAll();
    };
};

// ==========================================
// 7. INITIALIZATION & MOUNTING
// ==========================================
loadConfig().then(() => {
    refreshAll();
    if (typeof dv !== "undefined" && dv.container) {
        dv.container.style.overflow = "hidden";
        dv.container.style.maxWidth = "100%";
        dv.container.style.boxSizing = "border-box";
        if (dv.container.parentElement) {
            dv.container.parentElement.style.overflow = "hidden";
            dv.container.parentElement.style.maxWidth = "100%";
        }
        dv.container.appendChild(bottomGrid);
    }
});