// ==========================================
// 1. INJECT STYLES (MAIN ACTIVITY TRACE V27 NAMESPACED)
// ==========================================
// AGGRESSIVE PURGE: Destroy all previous ghost versions so they don't override the layout
document.querySelectorAll("style[id^='obsidian-main-trace']").forEach(el => el.remove());

const style = document.createElement("style");
style.id = "obsidian-main-trace-v27-namespaced";
document.head.appendChild(style);

style.innerHTML = `
    @keyframes mainChartTraceFlow {
        from { stroke-dashoffset: 70; }
        to { stroke-dashoffset: 0; }
    }
    @keyframes mainChartHudScan {
        0% { top: -20%; opacity: 0; }
        50% { opacity: 0.12; }
        100% { top: 120%; opacity: 0; }
    }
    @keyframes mainChartTextGlowPulse {
        0%, 100% { color: #a1a1aa; text-shadow: 0 0 2px rgba(255, 255, 255, 0.2); }
        50% { color: #ffffff; text-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
    }
    @keyframes mainChartReticleSpin { 
        0% { transform: rotate(0deg); } 
        100% { transform: rotate(360deg); } 
    }

    .main-chart-hud-trace-container { 
        display: flex; flex-direction: column; gap: 16px; width: 100%; 
        margin-top: 10px; font-family: 'JetBrains Mono', 'Courier New', monospace; 
        color: #a1a1aa; background: #09090b; padding: 20px; border-radius: 4px;
        border: 1px dashed rgba(255, 255, 255, 0.15); box-sizing: border-box;
    }

    /* CREATIVE SPACESHIP HUD HEADER */
    .main-chart-hud-header { 
        display: flex; align-items: center; justify-content: space-between; gap: 16px; 
        border-bottom: 1px dotted rgba(255, 255, 255, 0.2); padding: 12px 16px; 
        background: rgba(255, 255, 255, 0.02); border-radius: 2px;
        border: 1px dotted rgba(255, 255, 255, 0.15);
    }
    
    .main-chart-hud-brand { display: flex; align-items: center; gap: 12px; font-size: 14px !important; color: #ffffff !important; letter-spacing: 2.5px !important; text-transform: uppercase !important; font-weight: 800 !important; flex-shrink: 0; text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important; }
    
    /* DUAL RING RADAR TARGET RETICLE */
    .main-chart-hud-target-reticle { 
        width: 18px; height: 18px; border: 1px solid rgba(255, 255, 255, 0.4); 
        border-radius: 50%; position: relative; display: flex; align-items: center; 
        justify-content: center; flex-shrink: 0; 
    }
    .main-chart-hud-target-reticle::before {
        content: ''; width: 8px; height: 8px; border: 1px dotted #ffffff; 
        border-radius: 50%; animation: mainChartReticleSpin 4s linear infinite reverse;
    }
    .main-chart-hud-target-reticle::after {
        content: ''; position: absolute; width: 100%; height: 1px; background: rgba(255, 255, 255, 0.6);
        animation: mainChartReticleSpin 3s linear infinite;
    }

    /* SPACESHIP DUAL LASER SWEEPER TRACK */
    .main-chart-signal-track-container { flex-grow: 1; display: flex; flex-direction: column; gap: 4px; position: relative; }
    .main-chart-signal-track-meta { display: flex; justify-content: space-between; font-size: 8px; color: #71717a; letter-spacing: 1.5px; text-transform: uppercase; }
    
    .main-chart-signal-track { 
        width: 100%; height: 6px; background: rgba(255, 255, 255, 0.03); 
        border: 1px dotted rgba(255, 255, 255, 0.2); position: relative; overflow: hidden; 
        border-radius: 1px; display: flex; align-items: center;
    }
    
    /* LASER BEAMS */
    .main-chart-laser-beam-1 { 
        position: absolute; height: 2px; width: 40px; 
        background: linear-gradient(90deg, transparent, #ffffff, #ffffff); 
        box-shadow: 0 0 8px #ffffff; 
        animation: mainChartLaserSweep1 2.4s ease-in-out infinite; 
    }
    @keyframes mainChartLaserSweep1 { 
        0% { left: -40px; opacity: 0; } 
        15% { opacity: 1; } 
        85% { opacity: 1; } 
        100% { left: 100%; opacity: 0; } 
    }
    .main-chart-laser-beam-2 { 
        position: absolute; height: 1.5px; width: 20px; 
        background: linear-gradient(-90deg, transparent, rgba(255, 255, 255, 0.8), #ffffff); 
        box-shadow: 0 0 6px #ffffff; 
        animation: mainChartLaserSweep2 3.6s ease-in-out infinite 0.8s; 
    }
    @keyframes mainChartLaserSweep2 { 
        0% { right: -20px; opacity: 0; } 
        20% { opacity: 1; } 
        80% { opacity: 1; } 
        100% { right: 100%; opacity: 0; } 
    }

    .main-chart-track-blip-grid { position: absolute; width: 100%; height: 100%; display: flex; justify-content: space-between; pointer-events: none; padding: 0 4px; box-sizing: border-box; }
    .main-chart-track-tick { width: 1px; height: 100%; background: rgba(255, 255, 255, 0.1); }
    
    .main-chart-header-actions {
        display: flex; align-items: center; gap: 12px; flex-shrink: 0;
    }
    .main-chart-hud-stats-ticker { font-size: 10px; color: #a1a1aa; letter-spacing: 1px; flex-shrink: 0; font-family: monospace; }

    .main-chart-settings-btn {
        background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2);
        color: #e4e4e7; font-family: inherit; font-size: 13px; width: 28px; height: 28px; padding: 0;
        border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
        transition: all 0.2s ease;
    }
    .main-chart-settings-btn:hover {
        border-color: rgba(255, 255, 255, 0.6); color: #ffffff; background: rgba(255, 255, 255, 0.12) !important;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
    }

    /* LEFT-ALIGNED COMPACT DATE CONTROLS */
    .main-chart-date-filter-row { display: flex; flex-direction: column; gap: 10px; background: #000000; border: 1px dotted rgba(255, 255, 255, 0.2); padding: 12px 14px; border-radius: 2px; }
    .main-chart-date-inputs-row { display: flex; align-items: center; justify-content: flex-start; gap: 8px; }
    .main-chart-hud-date-input-sm { 
        background: #09090b; border: 1px solid rgba(255, 255, 255, 0.25); color: #ffffff; 
        font-family: inherit; font-size: 10px; padding: 5px 8px; border-radius: 2px; outline: none; 
        width: 140px; flex-shrink: 0; box-sizing: border-box;
    }
    .main-chart-hud-date-input-sm:focus { border-color: #ffffff; }
    
    /* TALLER DURATION PRESET BUTTONS */
    .main-chart-preset-btn-group { display: flex; gap: 6px; justify-content: space-between; width: 100%; }
    .main-chart-preset-btn { 
        flex: 1; text-align: center; font-size: 10px; font-weight: bold; padding: 8px 0; 
        background: #121215 !important; border: 1px dotted rgba(255, 255, 255, 0.2); color: #a1a1aa; 
        cursor: pointer; border-radius: 2px; transition: all 0.2s; user-select: none; letter-spacing: 1px;
    }
    .main-chart-preset-btn:hover { border-color: #ffffff; color: #ffffff; background: rgba(255, 255, 255, 0.08) !important; }
    .main-chart-preset-btn.main-chart-active { background: rgba(255, 255, 255, 0.18) !important; color: #ffffff; border-color: #ffffff; box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2); }

    /* TACTICAL MAIN PANEL */
    .main-chart-tactical-panel { 
        background: #000000; border: 1px dotted rgba(255, 255, 255, 0.15); 
        padding: 20px; display: flex; flex-direction: column; width: 100%; 
        position: relative; box-sizing: border-box; border-radius: 2px; overflow: hidden;
    }
    .main-chart-tactical-panel::after {
        content: ''; position: absolute; left: 0; right: 0; height: 35px;
        background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.08), transparent);
        pointer-events: none; animation: mainChartHudScan 9s ease-in-out infinite; z-index: 1;
    }
    .main-chart-panel-bracket-tl { position: absolute; top: -1px; left: -1px; width: 8px; height: 8px; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; z-index: 2; }
    .main-chart-panel-bracket-br { position: absolute; bottom: -1px; right: -1px; width: 8px; height: 8px; border-bottom: 1px solid #ffffff; border-right: 1px solid #ffffff; z-index: 2; }
    
    /* CENTERED PANEL HEADER */
    .main-chart-panel-header { 
        display: flex; justify-content: space-between; align-items: center; 
        border-bottom: 1px dotted rgba(255, 255, 255, 0.15); padding: 0 15px 10px 15px; 
        margin-bottom: 20px; position: relative; z-index: 5;
    }
    .main-chart-panel-title { 
        color: #ffffff !important; font-size: 14px !important; text-transform: uppercase !important; 
        letter-spacing: 2.5px !important; font-weight: 800 !important;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important;
    }
    .main-chart-panel-stat { display: flex; align-items: center; gap: 8px; }
    .main-chart-stat-lbl { color: #d4d4d8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
    .main-chart-stat-val { color: #ffffff; font-size: 18px; font-weight: bold; letter-spacing: 0.5px; }

    /* CHART LAYOUT WITH INVISIBLE VERTICAL HOVER SLICES */
    .main-chart-chart-layout-wrapper { display: flex; flex-direction: column; width: 100%; z-index: 5; position: relative; }
    .main-chart-chart-main-row { display: flex; width: 100%; height: 200px; position: relative; }
    
    .main-chart-y-axis-sidebar { width: 100px; display: flex; flex-direction: row; border-right: 1px dotted rgba(255, 255, 255, 0.25); flex-shrink: 0; }
    .main-chart-y-axis-title-box { width: 28px; display: flex; align-items: center; justify-content: center; }
    .main-chart-y-axis-title { transform: rotate(-90deg); color: #d4d4d8; font-size: 10px; letter-spacing: 2px; white-space: nowrap; font-weight: bold; }
    .main-chart-y-axis-labels-box { flex-grow: 1; position: relative; height: 100%; }
    .main-chart-y-label-text { position: absolute; right: 10px; font-size: 10px; color: #a1a1aa; transform: translateY(-50%); line-height: 0; font-weight: 500; }

    .main-chart-chart-svg-container { flex-grow: 1; position: relative; border-bottom: 1px dotted rgba(255, 255, 255, 0.25); }
    .main-chart-svg-grid-lines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; }
    .main-chart-grid-line-h { width: 100%; border-top: 1px dotted rgba(255, 255, 255, 0.12); }
    .main-chart-svg-layer { width: 100%; height: 100%; overflow: visible; position: absolute; top:0; left:0; }
    
    /* THINNER TRACE LINE */
    .main-chart-trace-line { 
        fill: none; stroke: #ffffff; stroke-width: 1px; stroke-dasharray: 4, 3; 
        opacity: 0.75; animation: mainChartTraceFlow 24s linear infinite;
    }
    .main-chart-trace-area { fill: rgba(255, 255, 255, 0.03); stroke: none; }
    
    /* DATA POINTS */
    .main-chart-data-point { 
        position: absolute; width: 5px; height: 5px; background: #000000; 
        border: 1px solid #ffffff; border-radius: 50%; transform: translate(-50%, -50%); 
        z-index: 10; transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease; pointer-events: none; opacity: 0.85;
    }
    .main-chart-data-point.main-chart-highlighted { 
        transform: translate(-50%, -50%) scale(2.5) !important; 
        background: #ffffff !important; box-shadow: 0 0 10px rgba(255, 255, 255, 0.9) !important; 
        z-index: 20 !important; opacity: 1 !important;
    }

    /* INVISIBLE VERTICAL HOVER SLICES */
    .main-chart-vert-hover-column { 
        position: absolute; top: 0; height: 100%; cursor: crosshair; z-index: 15; 
        background: transparent !important; border: none !important; outline: none !important;
    }
    
    /* X-AXIS ROW WITH GAP */
    .main-chart-x-axis-row { margin-left: 100px; position: relative; height: 55px; margin-top: 8px; }
    .main-chart-x-label-container { position: absolute; top: 0; display: flex; flex-direction: column; align-items: center; width: 0; }
    .main-chart-x-tick { width: 1px; height: 6px; background: rgba(255, 255, 255, 0.4); margin-bottom: 8px; }
    .main-chart-x-label { font-size: 9px; color: #a1a1aa; transform: rotate(-35deg) translateX(-12px); transform-origin: top center; white-space: nowrap; font-weight: 500; margin-top: 4px; }
    .main-chart-x-axis-title { text-align: center; color: #d4d4d8; font-size: 10px; letter-spacing: 2px; margin-top: 12px; margin-bottom: 12px; margin-left: 100px; font-weight: bold; }

    /* CENTER-ALIGNED READOUT BOX WITH DIVIDER & PROPER SPACING */
    .main-chart-trace-readout { 
        background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2); 
        padding: 12px 18px; font-size: 12px; color: #e4e4e7; display: flex; 
        flex-direction: column; align-items: center; justify-content: center; gap: 8px; 
        min-height: 56px; max-height: 140px; border-radius: 2px; box-sizing: border-box; 
        line-height: 1.4; margin-top: 10px; overflow-y: auto; text-align: center;
    }
    .main-chart-readout-header { 
        display: flex; justify-content: center; align-items: center; 
        border-bottom: 1px dotted rgba(255, 255, 255, 0.15); padding-bottom: 6px; 
        font-size: 12px; width: 100%; gap: 18px; flex-wrap: wrap; text-align: center;
    }
    .main-chart-readout-title { color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
    .main-chart-readout-highlight { color: #ffffff; font-weight: bold; font-size: 13px; text-shadow: 0 0 6px rgba(255,255,255,0.7); }
    
    .main-chart-activity-list, .main-chart-game-list { 
        color: #d4d4d8; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; 
        gap: 12px 20px; font-size: 11px; font-weight: 500; width: 100%; box-sizing: border-box;
    }
    .main-chart-activity-item, .main-chart-game-item { display: flex; align-items: center; white-space: nowrap; }
    .main-chart-activity-item span, .main-chart-game-item span { color: #ffffff; font-weight: bold; margin-left: 6px; }
    .main-chart-readout-idle { 
        font-size: 11px; letter-spacing: 1.2px; font-weight: bold; text-align: center; margin: auto 0;
        animation: mainChartTextGlowPulse 3s ease-in-out infinite; 
    }

    /* SETTINGS MODAL STYLING */
    .main-trace-modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.75); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        z-index: 999999; font-family: 'JetBrains Mono', 'Courier New', monospace;
    }
    .main-trace-modal {
        background: #09090b; border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 16px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.05);
        border-radius: 4px; padding: 22px; width: 580px; max-width: 92vw;
        color: #ffffff; box-sizing: border-box; max-height: 90vh; overflow-y: auto;
    }
    .main-trace-modal::-webkit-scrollbar { width: 4px; }
    .main-trace-modal::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 2px; }
    .main-trace-modal-title {
        margin: 0 0 16px 0; font-size: 17px; font-weight: bold;
        color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;
        border-bottom: 1px dotted rgba(255,255,255,0.2); padding-bottom: 10px;
        display: flex; align-items: center; justify-content: space-between;
    }
    .main-trace-input-group { margin-bottom: 14px; }
    .main-trace-input-group label {
        display: block; font-size: 13px; color: #ffffff !important; margin-bottom: 5px;
        text-transform: uppercase; letter-spacing: 1px; font-weight: 700;
    }
    .main-trace-input-group input, .main-trace-input-group select {
        width: 100%; padding: 8px 12px; background: #000000;
        border: 1px solid rgba(255,255,255,0.3); border-radius: 2px;
        color: #ffffff !important; font-size: 13px; font-family: inherit; outline: none;
        box-sizing: border-box; transition: border-color 0.2s;
        min-height: 38px !important; height: 38px !important; line-height: normal !important;
    }
    .main-trace-input-group select {
        padding: 6px 12px !important;
    }
    .main-trace-input-group input:focus, .main-trace-input-group select:focus {
        border-color: #ffffff; box-shadow: 0 0 6px rgba(255,255,255,0.3);
    }
    .main-trace-input-group select option { background: #09090b; color: #ffffff; }
    .main-trace-input-desc { font-size: 12px; color: #e4e4e7 !important; margin-top: 4px; line-height: 1.4; }
    .main-trace-pills-container {
        display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; margin-bottom: 4px;
    }
    .main-trace-pill {
        background: rgba(255, 255, 255, 0.05); border: 1px dotted rgba(255, 255, 255, 0.25);
        color: #ffffff; font-size: 12px; padding: 2px 7px; border-radius: 2px;
        cursor: pointer; transition: all 0.15s ease; font-family: inherit;
        user-select: none; line-height: 1.3; outline: none;
    }
    .main-trace-pill:hover {
        background: rgba(255, 255, 255, 0.15); border-color: #ffffff; color: #ffffff;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
    }
    
    .main-trace-modal-actions {
        display: flex; justify-content: flex-end; gap: 10px;
        margin-top: 20px; border-top: 1px dotted rgba(255,255,255,0.15); padding-top: 14px;
    }
    .main-trace-mod-btn {
        background: #121215 !important; border: 1px solid rgba(255,255,255,0.3);
        color: #ffffff !important; padding: 8px 18px; border-radius: 2px;
        cursor: pointer; font-size: 13px; font-family: inherit; font-weight: bold;
        letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s ease;
    }
    .main-trace-mod-btn:hover {
        background: rgba(255,255,255,0.12) !important; color: #ffffff !important; border-color: #ffffff;
    }
    .main-trace-mod-primary {
        background: #ffffff !important; border-color: #ffffff !important; color: #000000 !important; font-weight: bold;
    }
    .main-trace-mod-primary:hover {
        background: #e4e4e7 !important; box-shadow: 0 0 10px rgba(255,255,255,0.5); color: #000000 !important;
    }
`;

// ==========================================
// 2. HUD CONFIG & MULTI-PROFILE ARCHITECTURE
// ==========================================
const CONFIG_DIR = `${app.vault.configDir}/HUD Config`;

const DEFAULT_CONFIG = {
    headingScanner: "SYS_SCANNER // LINK_STABLE",
    headingTitle: "TELEMETRY // ACTIVITY TRACE",
    sessionsFolder: "",
    startTimeProp: "",
    endTimeProp: "",
    itemProp: "",
    defaultDaysRange: 20
};

const currentNote = dv.current();
const notePath = currentNote && currentNote.file ? currentNote.file.path.replace(/\.md$/i, '') : "default";
const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, "_");

let activeProfile = defaultProfileKey;
let config = { ...DEFAULT_CONFIG };

const getConfigPath = (profileName) => `${CONFIG_DIR}/main-trace--${profileName}.json`;

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

const listProfiles = async () => {
    const list = new Set([defaultProfileKey]);
    try {
        if (await app.vault.adapter.exists(CONFIG_DIR)) {
            const res = await app.vault.adapter.list(CONFIG_DIR);
            if (res && res.files) {
                res.files.forEach(f => {
                    const filename = f.split(/[\\/]/).pop();
                    const m = filename.match(/^main-trace--(.+)\.json$/);
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
            let parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                const loaded = {
                    headingScanner: parsed.headingScanner !== undefined ? parsed.headingScanner : DEFAULT_CONFIG.headingScanner,
                    headingTitle: parsed.headingTitle !== undefined ? parsed.headingTitle : DEFAULT_CONFIG.headingTitle,
                    sessionsFolder: parsed.sessionsFolder !== undefined ? parsed.sessionsFolder : DEFAULT_CONFIG.sessionsFolder,
                    startTimeProp: parsed.startTimeProp !== undefined ? parsed.startTimeProp : DEFAULT_CONFIG.startTimeProp,
                    endTimeProp: parsed.endTimeProp !== undefined ? parsed.endTimeProp : DEFAULT_CONFIG.endTimeProp,
                    itemProp: parsed.itemProp !== undefined ? parsed.itemProp : DEFAULT_CONFIG.itemProp,
                    defaultDaysRange: Number(parsed.defaultDaysRange) || DEFAULT_CONFIG.defaultDaysRange
                };
                config = { ...loaded };
                return loaded;
            }
        }
    } catch(e) {}
    config = { ...DEFAULT_CONFIG };
    return { ...DEFAULT_CONFIG };
};

const loadConfig = async () => {
    try {
        await ensureConfigDir();
        const noteConfigPath = getConfigPath(defaultProfileKey);
        if (await app.vault.adapter.exists(noteConfigPath)) {
            const rawNote = await app.vault.adapter.read(noteConfigPath);
            const parsed = JSON.parse(rawNote);
            if (parsed && parsed.mirrors) {
                activeProfile = parsed.mirrors;
                await loadProfileData(activeProfile);
                return;
            } else {
                activeProfile = defaultProfileKey;
                await loadProfileData(defaultProfileKey);
                return;
            }
        } else {
            activeProfile = defaultProfileKey;
            config = { ...DEFAULT_CONFIG };
        }
    } catch(e) {
        config = { ...DEFAULT_CONFIG };
    }
};

const saveProfileConfig = async (profileName, conf) => {
    try {
        await ensureConfigDir();
        const targetPath = getConfigPath(profileName);
        const dataToSave = {
            headingScanner: conf.headingScanner !== undefined ? conf.headingScanner : DEFAULT_CONFIG.headingScanner,
            headingTitle: conf.headingTitle !== undefined ? conf.headingTitle : DEFAULT_CONFIG.headingTitle,
            sessionsFolder: conf.sessionsFolder !== undefined ? conf.sessionsFolder : DEFAULT_CONFIG.sessionsFolder,
            startTimeProp: conf.startTimeProp !== undefined ? conf.startTimeProp : DEFAULT_CONFIG.startTimeProp,
            endTimeProp: conf.endTimeProp !== undefined ? conf.endTimeProp : DEFAULT_CONFIG.endTimeProp,
            itemProp: conf.itemProp !== undefined ? conf.itemProp : DEFAULT_CONFIG.itemProp,
            defaultDaysRange: Number(conf.defaultDaysRange) || DEFAULT_CONFIG.defaultDaysRange
        };
        await app.vault.adapter.write(targetPath, JSON.stringify(dataToSave, null, 2));
    } catch(e) {
        console.error("Failed to save profile:", e);
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
        await app.vault.adapter.write(noteConfigPath, JSON.stringify({ ...DEFAULT_CONFIG, ...existing }, null, 2));
    } catch(e) {
        console.error("Failed to save note pointer:", e);
    }
};

// ==========================================
// 3. DATA QUERIES & HELPERS
// ==========================================
const getVaultFolders = () => {
    try {
        const folders = new Set();
        if (typeof app !== "undefined" && app.vault) {
            if (typeof app.vault.getAllLoadedFiles === "function") {
                const files = app.vault.getAllLoadedFiles();
                files.forEach(f => {
                    if (f.children) {
                        if (f.path && f.path !== "/") folders.add(f.path);
                    } else if (f.parent && f.parent.path && f.parent.path !== "/") {
                        folders.add(f.parent.path);
                    }
                });
            }
        }
        if (typeof dv !== "undefined" && dv.pages) {
            try {
                dv.pages().forEach(p => {
                    if (p.file && p.file.folder) folders.add(p.file.folder);
                });
            } catch(e) {}
        }
        return Array.from(folders).filter(Boolean).sort();
    } catch(e) {
        return [];
    }
};

const getVaultProperties = () => {
    try {
        const props = new Set();
        if (typeof app !== "undefined" && app.metadataCache) {
            if (typeof app.metadataCache.getAllPropertyInfos === "function") {
                const infos = app.metadataCache.getAllPropertyInfos();
                if (infos) {
                    Object.keys(infos).forEach(k => props.add(k));
                }
            }
            if (app.vault && typeof app.vault.getMarkdownFiles === "function") {
                const mdFiles = app.vault.getMarkdownFiles();
                mdFiles.forEach(file => {
                    const cache = app.metadataCache.getFileCache(file);
                    if (cache && cache.frontmatter) {
                        Object.keys(cache.frontmatter).forEach(k => {
                            if (k !== "position") props.add(k);
                        });
                    }
                });
            }
        }
        if (typeof dv !== "undefined" && dv.pages) {
            try {
                const sample = dv.pages().limit(100);
                sample.forEach(p => {
                    Object.keys(p).forEach(k => {
                        if (!["file", "aliases", "tags", "position"].includes(k)) {
                            props.add(k);
                        }
                    });
                });
            } catch(e) {}
        }
        return Array.from(props).filter(Boolean).sort();
    } catch(e) {
        return [];
    }
};

const getItemName = (p) => {
    let propKey = (config.itemProp || "").trim();
    if (!propKey) return "Unknown Target";
    let raw = p[propKey];
    if (!raw) return "Unknown Target";
    if (typeof raw === 'object' && raw.path) return raw.display || raw.path.split('/').pop().replace('.md', '');
    let str = String(raw);
    let match = str.match(/\[\[(?:.*\|)?([^\]]+)\]\]/);
    return match ? match[1] : str.replace(/[\[\]"]/g, '');
};

const formatTime = (mins) => `${Math.floor(mins/60)}h ${mins%60}m`;

const fetchSessions = () => {
    try {
        const cleanFolder = config.sessionsFolder ? config.sessionsFolder.trim().replace(/^["']|["']$/g, '') : "";
        const sProp = (config.startTimeProp || "").trim();
        const eProp = (config.endTimeProp || "").trim();
        if (!cleanFolder || !sProp || !eProp) return [];
        const queryFolder = `"${cleanFolder}"`;
        return dv.pages(queryFolder).where(p => {
            const startVal = p[sProp];
            const endVal = p[eProp];
            return startVal && endVal && endVal !== "";
        });
    } catch(err) {
        console.error("Failed to query sessions:", err);
        return [];
    }
};

let rawSessions = [];

// ==========================================
// 4. BUILD DOM
// ==========================================
const dashWrapper = document.createElement("div");
dashWrapper.className = "main-chart-hud-trace-container";

// CREATIVE SPACESHIP HUD HEADER DOM
const hudHeader = document.createElement("div");
hudHeader.className = "main-chart-hud-header";
hudHeader.innerHTML = `
    <div class="main-chart-hud-brand">
        <div class="main-chart-hud-target-reticle"></div>
        <span id="main-chart-scanner-title">${(config.headingScanner || DEFAULT_CONFIG.headingScanner).replace(/"/g, '&quot;')}</span>
    </div>
    <div class="main-chart-signal-track-container">
        <div class="main-chart-signal-track-meta">
            <span>RADAR TRACE // FREQ: 142.8MHz</span>
            <span>BEAM_LOCK: 99.8%</span>
        </div>
        <div class="main-chart-signal-track">
            <div class="main-chart-track-blip-grid">
                <div class="main-chart-track-tick"></div><div class="main-chart-track-tick"></div>
                <div class="main-chart-track-tick"></div><div class="main-chart-track-tick"></div>
                <div class="main-chart-track-tick"></div><div class="main-chart-track-tick"></div>
            </div>
            <div class="main-chart-laser-beam-1"></div>
            <div class="main-chart-laser-beam-2"></div>
        </div>
    </div>
    <div class="main-chart-header-actions">
        <div class="main-chart-hud-stats-ticker" id="main-chart-live-ticker">
            0x4F8A | TX:420Kb/s | RX:48Kb/s
        </div>
        <button class="main-chart-settings-btn" id="main-chart-btn-settings" title="Telemetry Settings">⚙️</button>
    </div>
`;
dashWrapper.appendChild(hudHeader);

const updateHeaderTitles = () => {
    const scannerTitleEl = hudHeader.querySelector("#main-chart-scanner-title");
    if (scannerTitleEl) {
        scannerTitleEl.innerText = config.headingScanner || DEFAULT_CONFIG.headingScanner;
    }
};

// Ticker Update Interval
if (window.mainChartTickerInterval) clearInterval(window.mainChartTickerInterval);
window.mainChartTickerInterval = setInterval(() => {
    let el = document.getElementById("main-chart-live-ticker");
    if (!el || !document.body.contains(el)) {
        clearInterval(window.mainChartTickerInterval);
        return;
    }
    let hex = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    let tx = Math.floor(Math.random() * 700 + 200);
    let rx = Math.floor(Math.random() * 120 + 15);
    el.innerText = `0x${hex} | TX:${tx}Kb/s | RX:${rx}Kb/s`;
}, 1000);

// LEFT-ALIGNED COMPACT [FROM DATE] TO [TO DATE] CONTROLS
let defaultEnd = moment().format("YYYY-MM-DD");
let defaultStart = moment().subtract((config.defaultDaysRange || 20) - 1, 'days').format("YYYY-MM-DD");

let filterFromDate = defaultStart;
let filterToDate = defaultEnd;

const controlsDiv = document.createElement("div");
controlsDiv.className = "main-chart-date-filter-row";

controlsDiv.innerHTML = `
    <div class="main-chart-date-inputs-row">
        <input type="date" class="main-chart-hud-date-input-sm" id="main-from-date" value="${defaultStart}" />
        <span style="font-weight:bold; font-size:10px; color:#52525b;">TO</span>
        <input type="date" class="main-chart-hud-date-input-sm" id="main-to-date" value="${defaultEnd}" />
    </div>
    <div class="main-chart-preset-btn-group">
        <div class="main-chart-preset-btn" data-preset="7D">7D</div>
        <div class="main-chart-preset-btn main-chart-active" data-preset="20D">20D</div>
        <div class="main-chart-preset-btn" data-preset="30D">30D</div>
        <div class="main-chart-preset-btn" data-preset="90D">90D</div>
    </div>
`;
dashWrapper.appendChild(controlsDiv);

// Chart Mount
const chartMount = document.createElement("div");
dashWrapper.appendChild(chartMount);

const defaultReadoutHTML = `<div class="main-chart-readout-idle">> SYSTEM IDLE : HOVER DATA NODE FOR LOG BREAKDOWN</div>`;

// Render Chart Function
const renderChart = (startDateStr, endDateStr) => {
    chartMount.innerHTML = "";
    
    let startMom = moment(startDateStr, "YYYY-MM-DD").startOf('day');
    let endMom = moment(endDateStr, "YYYY-MM-DD").endOf('day');
    let totalDays = endMom.diff(startMom, 'days') + 1;
    
    if (totalDays <= 0) {
        chartMount.innerHTML = `<div class="main-chart-tactical-panel" style="text-align:center; padding: 30px; color:#ef4444;">[ ERR: INVALID TIMEFRAME ]</div>`;
        return;
    }

    let filteredSessions = (rawSessions && rawSessions.where) ? rawSessions.where(p => {
        let rawS = p[config.startTimeProp];
        if (!rawS) return false;
        let sTime = rawS.toJSDate ? moment(rawS.toJSDate()) : moment(rawS);
        return sTime.isValid() && sTime.isBetween(startMom, endMom, 'day', '[]');
    }) : [];

    let dateMap = {}; 
    if (filteredSessions && filteredSessions.forEach) {
        filteredSessions.forEach(p => {
            let rawS = p[config.startTimeProp];
            let rawE = p[config.endTimeProp];
            if (!rawS || !rawE) return;
            let sTime = rawS.toJSDate ? moment(rawS.toJSDate()) : moment(rawS);
            let eTime = rawE.toJSDate ? moment(rawE.toJSDate()) : moment(rawE);
            if (!sTime.isValid() || !eTime.isValid()) return;
            let durationMins = eTime.diff(sTime, 'minutes');
            if (durationMins > 0) {
                let dateKey = sTime.format("YYYY-MM-DD");
                let itemName = getItemName(p);
                
                if (!dateMap[dateKey]) dateMap[dateKey] = { totalMins: 0, items: {} };
                dateMap[dateKey].totalMins += durationMins;
                if (!dateMap[dateKey].items[itemName]) dateMap[dateKey].items[itemName] = 0;
                dateMap[dateKey].items[itemName] += durationMins;
            }
        });
    }

    let timeline = [];
    let totalDuration = 0;
    for (let i = 0; i < totalDays; i++) {
        let d = startMom.clone().add(i, 'days');
        let key = d.format("YYYY-MM-DD");
        let dayData = dateMap[key] || { totalMins: 0, items: {} };
        timeline.push({ date: d, data: dayData });
        totalDuration += dayData.totalMins;
    }

    let avgPlay = formatTime(Math.round(totalDuration / totalDays));
    
    const tracePanel = document.createElement("div");
    tracePanel.className = "main-chart-tactical-panel";
    tracePanel.innerHTML = `
        <div class="main-chart-panel-bracket-tl"></div><div class="main-chart-panel-bracket-br"></div>
        <div class="main-chart-panel-header">
            <div class="main-chart-panel-title">${config.headingTitle || DEFAULT_CONFIG.headingTitle}</div>
            <div class="main-chart-panel-stat">
                <span class="main-chart-stat-lbl">DAILY AVG:</span>
                <span class="main-chart-stat-val">${avgPlay}</span>
            </div>
        </div>
    `;

    let maxDur = Math.max(...timeline.map(d => d.data.totalMins), 60); 
    let yMaxStr = formatTime(maxDur);
    let yMidStr = formatTime(Math.round(maxDur/2));

    let layoutWrapper = document.createElement("div");
    layoutWrapper.className = "main-chart-chart-layout-wrapper";

    let chartRow = document.createElement("div");
    chartRow.className = "main-chart-chart-main-row";
    
    chartRow.innerHTML += `
        <div class="main-chart-y-axis-sidebar">
            <div class="main-chart-y-axis-title-box">
                <div class="main-chart-y-axis-title">DURATION</div>
            </div>
            <div class="main-chart-y-axis-labels-box">
                <div class="main-chart-y-label-text" style="top: 0%;">${yMaxStr}</div>
                <div class="main-chart-y-label-text" style="top: 50%;">${yMidStr}</div>
                <div class="main-chart-y-label-text" style="top: 100%;">0h 0m</div>
            </div>
        </div>
    `;

    let svgContainer = document.createElement("div");
    svgContainer.className = "main-chart-chart-svg-container";
    svgContainer.innerHTML = `
        <div class="main-chart-svg-grid-lines">
            <div class="main-chart-grid-line-h"></div>
            <div class="main-chart-grid-line-h"></div>
            <div class="main-chart-grid-line-h" style="border-top: none;"></div>
        </div>
    `;

    let points = timeline.map((d, i) => {
        let x = (i / (totalDays <= 1 ? 1 : totalDays - 1)) * 1000; 
        let y = 200 - ((d.data.totalMins / maxDur) * 190);
        return { x, y, dayObj: d };
    });

    let polylineStr = points.map(p => `${p.x},${p.y}`).join(" ");
    svgContainer.innerHTML += `
        <svg class="main-chart-svg-layer" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <polygon points="0,200 ${polylineStr} 1000,200" class="main-chart-trace-area" />
            <polyline points="${polylineStr}" class="main-chart-trace-line" />
        </svg>
    `;

    let xAxisRow = document.createElement("div");
    xAxisRow.className = "main-chart-x-axis-row";

    let readoutBox = document.createElement("div");
    readoutBox.className = "main-chart-trace-readout";
    readoutBox.innerHTML = defaultReadoutHTML;

    // Render DD-MM-YYYY Dates & Data Points
    points.forEach((p, i) => {
        let pctLeft = (p.x/1000) * 100;
        let dateFormatted = p.dayObj.date.format("DD-MM-YYYY");
        let dayAbbr = p.dayObj.date.format("DD-MM");
        
        xAxisRow.innerHTML += `
            <div class="main-chart-x-label-container" style="left: ${pctLeft}%;">
                <div class="main-chart-x-tick"></div>
                <div class="main-chart-x-label">${dayAbbr}</div>
            </div>
        `;

        let dot = document.createElement("div");
        dot.className = `main-chart-data-point main-chart-node-pt-${i}`;
        dot.style.left = `${pctLeft}%`;
        dot.style.top = `${(p.y/200)*100}%`;
        svgContainer.appendChild(dot);

        // Invisible Vertical Hover Slice
        let colWidthPct = 100 / totalDays;
        let hoverCol = document.createElement("div");
        hoverCol.className = "main-chart-vert-hover-column";
        hoverCol.style.width = `${colWidthPct}%`;
        hoverCol.style.left = `${pctLeft - colWidthPct/2}%`;

        let durStr = formatTime(p.dayObj.data.totalMins);
        
        let itemDetails = [];
        if (p.dayObj.data.totalMins > 0) {
            for (let [iName, iMins] of Object.entries(p.dayObj.data.items)) {
                itemDetails.push(`<div class="main-chart-activity-item">• ${iName}: <span>${formatTime(iMins)}</span></div>`);
            }
        }
        let itemHtml = itemDetails.length > 0 ? itemDetails.join("") : `<span style="color:#71717a;">NO SESSION RECORDED</span>`;
        
        // HOVER IN
        hoverCol.addEventListener("mouseover", () => {
            dot.classList.add("main-chart-highlighted");
            readoutBox.innerHTML = `
                <div class="main-chart-readout-header">
                    <span>NODE SECURED // <span class="main-chart-readout-highlight">${dateFormatted}</span></span>
                    <span style="color:#52525b;">│</span>
                    <span>TOTAL TIME: <span class="main-chart-readout-highlight">${durStr}</span></span>
                </div>
                <div class="main-chart-activity-list">ACTIVE PROTOCOLS: ${itemHtml}</div>
            `;
        });

        // HOVER OUT
        hoverCol.addEventListener("mouseout", () => {
            dot.classList.remove("main-chart-highlighted");
            readoutBox.innerHTML = defaultReadoutHTML;
        });

        svgContainer.appendChild(hoverCol);
    });

    chartRow.appendChild(svgContainer);
    layoutWrapper.appendChild(chartRow);
    layoutWrapper.appendChild(xAxisRow);

    let xAxisTitle = document.createElement("div");
    xAxisTitle.className = "main-chart-x-axis-title";
    xAxisTitle.innerText = "TIMELINE SEQUENCE";
    layoutWrapper.appendChild(xAxisTitle);
    layoutWrapper.appendChild(readoutBox);

    tracePanel.appendChild(layoutWrapper);
    chartMount.appendChild(tracePanel);
};

// Event Listeners for Date Inputs & Presets
let fromInput = controlsDiv.querySelector("#main-from-date");
let toInput = controlsDiv.querySelector("#main-to-date");
let presetBtns = controlsDiv.querySelectorAll(".main-chart-preset-btn");

let updateAndBroadcast = () => {
    renderChart(filterFromDate, filterToDate);
    window.dispatchEvent(new CustomEvent("hud-date-synced", {
        detail: { from: filterFromDate, to: filterToDate }
    }));
};

fromInput.onchange = () => {
    filterFromDate = fromInput.value;
    presetBtns.forEach(b => b.classList.remove("main-chart-active"));
    updateAndBroadcast();
};

toInput.onchange = () => {
    filterToDate = toInput.value;
    presetBtns.forEach(b => b.classList.remove("main-chart-active"));
    updateAndBroadcast();
};

presetBtns.forEach(btn => {
    btn.onclick = () => {
        presetBtns.forEach(b => b.classList.remove("main-chart-active"));
        btn.classList.add("main-chart-active");
        let p = btn.getAttribute("data-preset");
        
        let toM = moment();
        let fromM = moment();
        
        if (p === "7D") fromM.subtract(7, 'days');
        else if (p === "20D") fromM.subtract(19, 'days');
        else if (p === "30D") fromM.subtract(30, 'days');
        else if (p === "90D") fromM.subtract(90, 'days');

        filterFromDate = fromM.format("YYYY-MM-DD");
        filterToDate = toM.format("YYYY-MM-DD");

        fromInput.value = filterFromDate;
        toInput.value = filterToDate;

        updateAndBroadcast();
    };
});

// LISTEN TO BOTTOM BLOCK DATE SYNC EVENTS
if (window.topChartSyncHandler) {
    window.removeEventListener("hud-date-synced", window.topChartSyncHandler);
}
window.topChartSyncHandler = (e) => {
    if (e.detail && e.detail.from && e.detail.to) {
        if (filterFromDate !== e.detail.from || filterToDate !== e.detail.to) {
            filterFromDate = e.detail.from;
            filterToDate = e.detail.to;
            if (fromInput) fromInput.value = filterFromDate;
            if (toInput) toInput.value = filterToDate;
            renderChart(filterFromDate, filterToDate);
        }
    }
};
window.addEventListener("hud-date-synced", window.topChartSyncHandler);

// ==========================================
// 5. SETTINGS MODAL
// ==========================================
let settingsModalInstance = null;

const showSettingsModal = async () => {
    if (settingsModalInstance) settingsModalInstance.remove();

    settingsModalInstance = document.createElement("div");
    settingsModalInstance.className = "main-trace-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "main-trace-modal";

    const profilesList = await listProfiles();
    const allProfiles = new Set(profilesList);
    allProfiles.add(activeProfile);

    let profileOptions = Array.from(allProfiles).map(p => {
        const label = (p === defaultProfileKey) ? `[Current Note: ${p}]` : p;
        return `<option value="${p}" ${p === activeProfile ? 'selected' : ''}>${label}</option>`;
    }).join('');
    profileOptions += `<option value="__new__">+ Create New Named Profile...</option>`;

    const detectedFolders = getVaultFolders();
    const detectedProps = getVaultProperties();

    const folderDatalistOptions = detectedFolders.filter(Boolean).map(f => `<option value="${f.replace(/"/g, '&quot;')}"></option>`).join('');
    const propDatalistOptions = detectedProps.filter(Boolean).map(p => `<option value="${p.replace(/"/g, '&quot;')}"></option>`).join('');
    const startPropDatalistOptions = propDatalistOptions;
    const endPropDatalistOptions = propDatalistOptions;
    const itemPropDatalistOptions = propDatalistOptions;

    modal.innerHTML = `
        <div class="main-trace-modal-title">
            <span>⚙️ ACTIVITY TRACE SETTINGS</span>
            <span style="font-size: 12px; color: #ffffff; font-weight: normal;">SYS_CONF_V2</span>
        </div>

        <div class="main-trace-input-group">
            <label>Profile</label>
            <select id="main-trace-profile-select" style="height: 38px !important; min-height: 38px !important; line-height: normal !important; font-size: 13px !important; padding: 6px 12px !important; box-sizing: border-box;">
                ${profileOptions}
            </select>
            <div class="main-trace-input-desc">Select an existing profile or create a new one.</div>
        </div>

        <div class="main-trace-input-group" id="main-trace-new-prof-group" style="display: none; background: rgba(255,255,255,0.03); padding: 10px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 2px;">
            <label style="color: #ffffff; font-weight: bold;">New Profile Name</label>
            <input type="text" id="main-trace-new-prof-name" placeholder="e.g. focus, workout, coding, projects" style="margin-bottom: 6px;" />
            <div class="main-trace-input-desc">Will be saved as main-trace--[name].json in HUD Config.</div>
        </div>

        <div class="main-trace-input-group">
            <label>Scanner Brand Heading</label>
            <input type="text" id="main-trace-scanner-heading" value="${(config.headingScanner || DEFAULT_CONFIG.headingScanner).replace(/"/g, '&quot;')}" placeholder="e.g. SYS_SCANNER // LINK_STABLE" />
            <div class="main-trace-input-desc">Top HUD bar brand text next to the reticle.</div>
        </div>

        <div class="main-trace-input-group">
            <label>Chart Panel Title</label>
            <input type="text" id="main-trace-panel-heading" value="${(config.headingTitle || DEFAULT_CONFIG.headingTitle).replace(/"/g, '&quot;')}" placeholder="e.g. TELEMETRY // ACTIVITY TRACE" />
            <div class="main-trace-input-desc">Title displayed at the top of the activity chart panel.</div>
        </div>

        <div class="main-trace-input-group">
            <label>Sessions Folder</label>
            <input type="text" id="main-trace-folder" list="main-trace-folder-list" value="${(config.sessionsFolder || "").replace(/"/g, '&quot;')}" placeholder="e.g. Logs/Sessions" />
            <datalist id="main-trace-folder-list">
                ${folderDatalistOptions}
            </datalist>
            
            <div class="main-trace-input-desc">Vault path containing session log notes.</div>
        </div>

        <div class="main-trace-input-group">
            <label>Start Time Property</label>
            <input type="text" id="main-trace-start-prop" list="main-trace-start-prop-list" value="${(config.startTimeProp || "").replace(/"/g, '&quot;')}" placeholder="e.g. start-time" />
            <datalist id="main-trace-start-prop-list">
                ${startPropDatalistOptions}
            </datalist>
            
            <div class="main-trace-input-desc">Frontmatter key for session start timestamp.</div>
        </div>

        <div class="main-trace-input-group">
            <label>End Time Property</label>
            <input type="text" id="main-trace-end-prop" list="main-trace-end-prop-list" value="${(config.endTimeProp || "").replace(/"/g, '&quot;')}" placeholder="e.g. end-time" />
            <datalist id="main-trace-end-prop-list">
                ${endPropDatalistOptions}
            </datalist>
            
            <div class="main-trace-input-desc">Frontmatter key for session end timestamp.</div>
        </div>

        <div class="main-trace-input-group">
            <label>Item / Activity Property</label>
            <input type="text" id="main-trace-item-prop" list="main-trace-item-prop-list" value="${(config.itemProp || "").replace(/"/g, '&quot;')}" placeholder="e.g. activity" />
            <datalist id="main-trace-item-prop-list">
                ${itemPropDatalistOptions}
            </datalist>
            
            <div class="main-trace-input-desc">Frontmatter key for target activity, task, or project name.</div>
        </div>

        <div class="main-trace-input-group">
            <label>Default Days Range</label>
            <input type="number" id="main-trace-days-range" value="${config.defaultDaysRange || 20}" min="1" max="365" />
            <div class="main-trace-input-desc">Default span of days displayed in the activity timeline.</div>
        </div>

        <div class="main-trace-modal-actions">
            <button class="main-trace-mod-btn" id="main-trace-btn-cancel">Cancel</button>
            <button class="main-trace-mod-btn main-trace-mod-primary" id="main-trace-btn-save">Save Settings</button>
        </div>
    `;

    settingsModalInstance.appendChild(modal);
    document.body.appendChild(settingsModalInstance);

    const profileSelect = modal.querySelector("#main-trace-profile-select");
    const newProfGroup = modal.querySelector("#main-trace-new-prof-group");
    const newProfInput = modal.querySelector("#main-trace-new-prof-name");
    const scannerHeadingInput = modal.querySelector("#main-trace-scanner-heading");
    const panelHeadingInput = modal.querySelector("#main-trace-panel-heading");
    const folderInput = modal.querySelector("#main-trace-folder");
    const startPropInput = modal.querySelector("#main-trace-start-prop");
    const endPropInput = modal.querySelector("#main-trace-end-prop");
    const itemPropInput = modal.querySelector("#main-trace-item-prop");
    const daysRangeInput = modal.querySelector("#main-trace-days-range");

    

    profileSelect.onchange = async (e) => {
        const val = e.target.value;
        if (val === "__new__") {
            newProfGroup.style.display = "block";
            newProfInput.focus();
            return;
        }
        newProfGroup.style.display = "none";

        const loadedConf = await loadProfileData(val);
        scannerHeadingInput.value = loadedConf.headingScanner;
        panelHeadingInput.value = loadedConf.headingTitle;
        folderInput.value = loadedConf.sessionsFolder;
        startPropInput.value = loadedConf.startTimeProp;
        endPropInput.value = loadedConf.endTimeProp;
        itemPropInput.value = loadedConf.itemProp;
        daysRangeInput.value = loadedConf.defaultDaysRange;
    };

    modal.querySelector("#main-trace-btn-cancel").onclick = () => {
        settingsModalInstance.remove();
        settingsModalInstance = null;
    };

    settingsModalInstance.onclick = (e) => {
        if (e.target === settingsModalInstance) {
            settingsModalInstance.remove();
            settingsModalInstance = null;
        }
    };

    modal.querySelector("#main-trace-btn-save").onclick = async () => {
        const chosenProfile = profileSelect.value;
        let targetProfile = chosenProfile;

        if (chosenProfile === "__new__") {
            const rawName = (newProfInput.value || "").trim();
            const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_');
            if (!cleanName) {
                if (typeof Notice !== 'undefined') new Notice("⚠️ Please enter a valid profile name!");
                newProfInput.focus();
                return;
            }
            targetProfile = cleanName;
        }

        const newConf = {
            headingScanner: scannerHeadingInput.value.trim() || DEFAULT_CONFIG.headingScanner,
            headingTitle: panelHeadingInput.value.trim() || DEFAULT_CONFIG.headingTitle,
            sessionsFolder: folderInput.value.trim(),
            startTimeProp: startPropInput.value.trim(),
            endTimeProp: endPropInput.value.trim(),
            itemProp: itemPropInput.value.trim(),
            defaultDaysRange: parseInt(daysRangeInput.value) || DEFAULT_CONFIG.defaultDaysRange
        };

        await saveProfileConfig(targetProfile, newConf);
        await saveNotePointer(targetProfile);

        activeProfile = targetProfile;
        config = { ...newConf };
        updateHeaderTitles();

        // Refresh queried data and chart
        rawSessions = fetchSessions();
        let daysRange = parseInt(config.defaultDaysRange) || 20;
        let toM = moment();
        let fromM = moment().subtract(Math.max(1, daysRange) - 1, 'days');
        filterFromDate = fromM.format("YYYY-MM-DD");
        filterToDate = toM.format("YYYY-MM-DD");
        fromInput.value = filterFromDate;
        toInput.value = filterToDate;

        presetBtns.forEach(btn => {
            btn.classList.toggle("main-chart-active", btn.getAttribute("data-preset") === `${daysRange}D`);
        });

        updateAndBroadcast();

        if (typeof Notice !== 'undefined') new Notice(`✅ Profile [${targetProfile}] settings saved!`);

        settingsModalInstance.remove();
        settingsModalInstance = null;
    };
};

hudHeader.querySelector("#main-chart-btn-settings").onclick = () => {
    showSettingsModal();
};

// ==========================================
// 6. INITIALIZATION
// ==========================================
loadConfig().then(() => {
    updateHeaderTitles();
    rawSessions = fetchSessions();

    let daysRange = parseInt(config.defaultDaysRange) || 20;
    let defaultEnd = moment().format("YYYY-MM-DD");
    let defaultStart = moment().subtract(Math.max(1, daysRange) - 1, 'days').format("YYYY-MM-DD");

    filterFromDate = defaultStart;
    filterToDate = defaultEnd;

    fromInput.value = filterFromDate;
    toInput.value = filterToDate;

    presetBtns.forEach(btn => {
        btn.classList.toggle("main-chart-active", btn.getAttribute("data-preset") === `${daysRange}D`);
    });

    renderChart(filterFromDate, filterToDate);
    dv.container.appendChild(dashWrapper);
});