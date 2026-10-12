// ==========================================
// 1. INJECT STYLES (VAULT STATS HUD CHART - NAMESPACED)
// ==========================================
document.querySelectorAll("style[id^='obsidian-vault-stats'], style[id^='obsidian-vault-bases']").forEach(el => el.remove());
const style = document.createElement("style");
style.id = "obsidian-vault-stats-v17-namespaced";
style.innerHTML = `
        @keyframes hudStatsTextGlowPulse {
            0%, 100% { color: #a1a1aa; text-shadow: 0 0 2px rgba(255, 255, 255, 0.2); }
            50% { color: #ffffff; text-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
        }
        @keyframes hudStatsRadarSpinCW {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes hudStatsRadarSpinCCW {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
        }
        @keyframes hudStatsRadarSweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes hudStatsPodGlowPulse {
            0%, 100% { 
                stroke-opacity: 0.70; 
                stroke-width: 1.2px;
                filter: drop-shadow(0 0 1.5px currentColor);
            }
            50% { 
                stroke-opacity: 0.98; 
                stroke-width: 1.6px;
                filter: drop-shadow(0 0 4.5px currentColor);
            }
        }

        .hud-stats-wrapper {
            width: 100%;
            box-sizing: border-box;
        }

        .hud-stats-dash-grid { 
            display: grid !important; 
            grid-template-columns: 340px minmax(0, 1fr) !important; 
            gap: 14px !important; 
            width: 100% !important; 
            margin-top: 10px; font-family: 'JetBrains Mono', 'Courier New', monospace; 
            color: #a1a1aa; background: #09090b; padding: 14px; border-radius: 4px;
            border: 1px dashed rgba(255, 255, 255, 0.15); box-sizing: border-box;
        }
        @media (max-width: 960px) {
            .hud-stats-dash-grid { grid-template-columns: 1fr !important; }
        }

        /* Shared Panel Styles */
        .hud-stats-tactical-panel { 
            background: #000000; border: 1px dotted rgba(255, 255, 255, 0.15); 
            padding: 14px 16px; display: flex; flex-direction: column; width: 100%; 
            position: relative; box-sizing: border-box; border-radius: 2px;
            z-index: 1; height: 100%; justify-content: space-between;
        }
        .hud-stats-bracket-tl { position: absolute; top: -1px; left: -1px; width: 8px; height: 8px; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; z-index: 2; pointer-events: none; }
        .hud-stats-bracket-br { position: absolute; bottom: -1px; right: -1px; width: 8px; height: 8px; border-bottom: 1px solid #ffffff; border-right: 1px solid #ffffff; z-index: 2; pointer-events: none; }
        
        .hud-stats-panel-header { 
            display: flex; justify-content: center; align-items: center; 
            border-bottom: 1px dotted rgba(255, 255, 255, 0.15); padding: 0 10px 8px 10px; 
            margin-bottom: 10px; position: relative; z-index: 5; text-align: center;
            min-height: 28px;
        }
        .hud-stats-panel-title { 
            color: #ffffff !important; font-size: 15px !important; text-transform: uppercase !important; 
            letter-spacing: 2.5px !important; font-weight: 800 !important; text-align: center !important; margin: 0 auto; 
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important;
        }

        /* SETTINGS BUTTON */
        .hud-stats-settings-btn {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2);
            color: #e4e4e7; font-size: 13px; font-weight: bold;
            width: 28px; height: 28px; padding: 0; border-radius: 4px; cursor: pointer;
            transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center;
            line-height: 1; z-index: 10; font-family: inherit;
        }
        .hud-stats-settings-btn:hover {
            color: #ffffff; border-color: rgba(255, 255, 255, 0.6); background: rgba(255, 255, 255, 0.12) !important;
        }

        /* SETTINGS MODAL */
        .hud-stats-modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center;
            z-index: 10000; font-family: 'JetBrains Mono', 'Courier New', monospace;
        }
        .hud-stats-modal {
            background: #09090b; border: 1px dashed rgba(255, 255, 255, 0.25);
            border-radius: 4px; padding: 22px; width: 580px; max-width: 92vw;
            color: #e4e4e7; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.9);
            position: relative; box-sizing: border-box; max-height: 90vh; overflow-y: auto;
        }
        .hud-stats-modal::-webkit-scrollbar { width: 4px; }
        .hud-stats-modal::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 2px; }
        .hud-stats-modal-title {
            margin: 0 0 16px 0; font-size: 15px; font-weight: bold;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.2); padding-bottom: 10px;
            letter-spacing: 1.5px; text-transform: uppercase; color: #ffffff;
            display: flex; align-items: center; justify-content: space-between;
        }
        .hud-stats-input-group {
            margin-bottom: 14px; display: flex; flex-direction: column; gap: 5px;
        }
        .hud-stats-input-group label {
            font-size: 12.5px; font-weight: bold; color: #ffffff !important; letter-spacing: 0.8px;
            text-transform: uppercase;
        }
        .hud-stats-input-group input, .hud-stats-input-group select, .hud-stats-input-group textarea {
            background: #000000; border: 1px dotted rgba(255, 255, 255, 0.35);
            color: #ffffff !important; padding: 8px 12px; border-radius: 2px; font-family: inherit;
            font-size: 13px; outline: none; transition: border-color 0.2s; box-sizing: border-box; width: 100%;
            min-height: 38px !important; height: 38px !important; line-height: normal !important;
        }
        .hud-stats-input-group textarea { height: auto !important; }
        .hud-stats-input-group select {
            padding: 6px 12px !important;
        }
        .hud-stats-input-group select option {
            background: #09090b; color: #ffffff;
        }
        .hud-stats-input-group input:focus, .hud-stats-input-group select:focus, .hud-stats-input-group textarea:focus {
            border-color: #38bdf8; box-shadow: 0 0 6px rgba(56, 189, 248, 0.3);
        }
        .hud-stats-input-desc {
            font-size: 11.5px; color: #e4e4e7 !important; line-height: 1.4;
        }

        /* SUGGESTION PILLS & AUTOFILL */
        
        .hud-stats-modal-actions {
            display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
            border-top: 1px dotted rgba(255, 255, 255, 0.2); padding-top: 14px;
        }
        .hud-stats-mod-btn {
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.35);
            color: #ffffff !important; font-size: 12px; font-weight: bold; letter-spacing: 1px;
            padding: 8px 18px; border-radius: 2px; cursor: pointer; text-transform: uppercase;
            font-family: inherit; transition: all 0.2s ease;
        }
        .hud-stats-mod-btn:hover {
            color: #ffffff !important; border-color: #ffffff; background: rgba(255, 255, 255, 0.15) !important;
        }
        .hud-stats-mod-btn-primary {
            background: rgba(255, 255, 255, 0.15) !important; color: #ffffff !important; border-color: #ffffff !important;
        }
        .hud-stats-mod-btn-primary:hover {
            background: #ffffff !important; color: #000000 !important; box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }

        /* LEFT PANEL: BASES LIST WITH COUNT & % BADGES */
        .hud-stats-list-container {
            display: flex; flex-direction: column; gap: 6px; max-height: 275px;
            overflow-y: auto; padding-right: 4px; margin-bottom: 10px;
        }
        .hud-stats-list-container::-webkit-scrollbar { width: 4px; }
        .hud-stats-list-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 2px; }

        .hud-stats-item-card {
            background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2);
            padding: 8px 10px; border-radius: 2px; display: flex; flex-direction: column;
            gap: 5px; cursor: pointer; transition: all 0.2s ease; user-select: none;
        }
        .hud-stats-item-card:hover {
            border-color: #ffffff; background: rgba(255, 255, 255, 0.08);
            transform: translateX(2px);
        }
        .hud-stats-item-card.hud-stats-highlighted {
            border-color: #ffffff !important; background: rgba(255, 255, 255, 0.14) !important;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
        }
        .hud-stats-item-card.hud-stats-locked-selection {
            border-color: #ffffff !important; background: rgba(255, 255, 255, 0.18) !important;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.25); outline: 1px solid #ffffff;
        }

        .hud-stats-item-top {
            display: flex; align-items: center; justify-content: space-between; width: 100%;
        }
        .hud-stats-item-name {
            font-size: 11px; font-weight: bold; color: #ffffff; letter-spacing: 0.8px;
            display: flex; align-items: center; gap: 8px; text-transform: uppercase;
        }
        .hud-stats-item-badge {
            font-size: 9.5px; font-weight: bold; color: #ffffff;
            background: #000000; border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 2px 6px; border-radius: 2px; letter-spacing: 0.5px;
        }

        .hud-stats-progress-track {
            width: 100%; height: 4px; background: #18181b; border-radius: 2px; overflow: hidden;
        }
        .hud-stats-progress-fill {
            height: 100%; transition: width 0.3s ease; opacity: 0.85;
        }

        /* RIGHT PANEL: DONUT ON LEFT + RECENT FILES ON RIGHT (NO SCROLLBAR) */
        .hud-stats-chart-split-wrapper {
            display: flex; align-items: center; justify-content: space-between;
            height: 275px; position: relative; width: 100%; gap: 16px; padding: 0 2px;
            margin-bottom: 10px;
        }
        .hud-stats-donut-svg-wrapper {
            position: relative; width: 220px; height: 220px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
        }
        .hud-stats-donut-svg {
            transform: rotate(-90deg); width: 100%; height: 100%; overflow: visible;
        }
        
        /* HIGH-VISIBILITY RADAR ANIMATIONS */
        .hud-stats-donut-radar-outer {
            fill: transparent; stroke: rgba(56, 189, 248, 0.35); stroke-width: 1.2;
            stroke-dasharray: 6, 10; transform-origin: center; animation: hudStatsRadarSpinCW 18s linear infinite;
            pointer-events: none !important;
        }
        .hud-stats-donut-radar-inner {
            fill: transparent; stroke: rgba(255, 255, 255, 0.25); stroke-width: 1;
            stroke-dasharray: 3, 6; transform-origin: center; animation: hudStatsRadarSpinCCW 12s linear infinite;
            pointer-events: none !important;
        }
        .hud-stats-radar-sweep-beam {
            transform-origin: 110px 110px; animation: hudStatsRadarSweep 6s linear infinite;
            pointer-events: none !important; opacity: 0.7;
        }

        /* ENCLOSED POD STYLES WITH RHYTHMIC BREATHING ANIMATION */
        .hud-stats-donut-segment-group { cursor: pointer !important; fill: transparent; pointer-events: auto !important; }
        .hud-stats-donut-segment-group circle, .hud-stats-donut-segment-group line { 
            transition: all 0.22s ease; 
            cursor: pointer !important;
        }
        
        .hud-stats-donut-fill-arc { 
            fill: transparent; stroke-width: 22px; stroke-opacity: 0.14; 
            pointer-events: stroke !important; 
        }
        .hud-stats-donut-border-outer, .hud-stats-donut-border-inner, .hud-stats-donut-cap-line { 
            fill: transparent; stroke-width: 1.2px; stroke-opacity: 0.75; 
            animation: hudStatsPodGlowPulse 4s infinite ease-in-out;
            pointer-events: stroke !important;
        }

        /* HOVER & HIGHLIGHTED STATE */
        .hud-stats-donut-segment-group:hover .hud-stats-donut-fill-arc, 
        .hud-stats-donut-segment-group.hud-stats-highlighted .hud-stats-donut-fill-arc {
            stroke-opacity: 0.35 !important;
            stroke-width: 24px !important;
        }
        .hud-stats-donut-segment-group:hover .hud-stats-donut-border-outer, 
        .hud-stats-donut-segment-group:hover .hud-stats-donut-border-inner,
        .hud-stats-donut-segment-group:hover .hud-stats-donut-cap-line,
        .hud-stats-donut-segment-group.hud-stats-highlighted .hud-stats-donut-border-outer, 
        .hud-stats-donut-segment-group.hud-stats-highlighted .hud-stats-donut-border-inner,
        .hud-stats-donut-segment-group.hud-stats-highlighted .hud-stats-donut-cap-line {
            stroke-width: 2px !important; 
            stroke-opacity: 1 !important;
            animation: none !important;
            filter: drop-shadow(0 0 5px currentColor) !important;
        }

        /* CLICK-LOCKED STATE */
        .hud-stats-donut-segment-group.hud-stats-locked-selection .hud-stats-donut-fill-arc {
            stroke-opacity: 0.45 !important;
            stroke-width: 25px !important;
        }
        .hud-stats-donut-segment-group.hud-stats-locked-selection .hud-stats-donut-border-outer, 
        .hud-stats-donut-segment-group.hud-stats-locked-selection .hud-stats-donut-border-inner,
        .hud-stats-donut-segment-group.hud-stats-locked-selection .hud-stats-donut-cap-line {
            stroke-width: 2.4px !important; 
            stroke-opacity: 1 !important;
            animation: none !important;
            filter: drop-shadow(0 0 8px #ffffff) !important;
        }

        .hud-stats-donut-center-text {
            position: absolute; display: flex; flex-direction: column;
            align-items: center; justify-content: center; pointer-events: none !important; text-align: center;
        }
        .hud-stats-donut-center-val { font-size: 28px; font-weight: 800; color: #ffffff; line-height: 1; text-shadow: 0 0 8px rgba(255, 255, 255, 0.4); }
        .hud-stats-donut-center-lbl { font-size: 8px; color: #a1a1aa; letter-spacing: 1.8px; text-transform: uppercase; margin-top: 5px; font-weight: bold; }

        /* RECENT EDITED FILES PANEL: STRICT FIT WITH ZERO SCROLLBAR */
        .hud-stats-recent-files-container {
            display: flex; flex-direction: column; justify-content: flex-start; gap: 6px;
            height: 100%; flex-grow: 1; min-width: 0; box-sizing: border-box; overflow: hidden;
        }
        .hud-stats-recent-files-header {
            font-size: 10px; font-weight: bold; color: #ffffff; letter-spacing: 1.2px;
            text-transform: uppercase; margin-bottom: 2px; padding-bottom: 4px;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.2); display: flex;
            justify-content: space-between; align-items: center; flex-shrink: 0;
        }
        .hud-stats-recent-file-item {
            background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.22);
            padding: 8px 12px; border-radius: 2px; display: flex; align-items: center;
            justify-content: space-between; cursor: pointer; transition: all 0.2s ease;
            text-decoration: none !important; gap: 8px; box-sizing: border-box;
        }
        .hud-stats-recent-file-item:hover {
            border-color: #ffffff; background: rgba(255, 255, 255, 0.12);
            transform: translateX(2px);
        }
        .hud-stats-recent-file-title {
            font-size: 11px; font-weight: bold; color: #ffffff; text-transform: uppercase;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-grow: 1; min-width: 0;
            letter-spacing: 0.5px;
        }
        .hud-stats-recent-file-time {
            font-size: 9px; color: #a1a1aa; flex-shrink: 0; font-weight: 600;
        }

        /* READOUT BOX */
        .hud-stats-trace-readout { 
            background: #09090b; border: 1px dotted rgba(255, 255, 255, 0.2); padding: 10px 14px; 
            font-size: 11px; color: #e4e4e7; display: flex; align-items: center; justify-content: center;
            min-height: 42px; border-radius: 2px; box-sizing: border-box; 
            flex-shrink: 0; line-height: 1; z-index: 1; position: relative; text-align: center;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: auto; width: 100%;
        }
        .hud-stats-readout-group { display: flex; align-items: center; justify-content: center; gap: 14px; font-size: 11px; width: 100%; white-space: nowrap; }
        .hud-stats-readout-divider { color: #52525b; font-weight: normal; }
        .hud-stats-readout-highlight { color: #ffffff; font-weight: bold; font-size: 12px; text-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
        .hud-stats-readout-idle { 
            font-size: 11px; letter-spacing: 1.2px; font-weight: bold; white-space: nowrap;
            animation: hudStatsTextGlowPulse 3s ease-in-out infinite; 
        }
        .hud-stats-readout-locked {
            color: #38bdf8; font-weight: bold; font-size: 10px; letter-spacing: 1px;
        }
    `;
    document.head.appendChild(style);

// ==========================================
// 2. CONFIGURATION & MULTI-PROFILE ARCHITECTURE
// ==========================================
const CONFIG_FOLDER = `${app.vault.configDir}/HUD Config`;
const getConfigPath = (profileName) => `${CONFIG_FOLDER}/vault-stats--${profileName}.json`;
const getLegacyConfigPath = (profileName) => `${CONFIG_FOLDER}/vault-bases--${profileName}.json`;

const currentNote = dv.current();
const notePath = currentNote && currentNote.file ? currentNote.file.path.replace(/\.md$/i, '') : "default";
const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, "_");

let activeProfile = defaultProfileKey;
let config = {
    excludedFolders: [],
    baseProperties: "",
    topLimit: 8,
    headingLeft: "VAULT CATEGORIES & BASES",
    headingRight: "DISTRIBUTION & RECENT MODIFICATIONS"
};

const ensureConfigFolder = async () => {
    try {
        if (!(await app.vault.adapter.exists(CONFIG_FOLDER))) {
            if (app.vault.adapter.mkdir) {
                await app.vault.adapter.mkdir(CONFIG_FOLDER).catch(() => {});
            } else if (app.vault.createFolder) {
                await app.vault.createFolder(CONFIG_FOLDER).catch(() => {});
            }
        }
    } catch(e) {}
};

const listProfiles = async () => {
    const list = new Set([defaultProfileKey]);
    try {
        if (await app.vault.adapter.exists(CONFIG_FOLDER)) {
            const res = await app.vault.adapter.list(CONFIG_FOLDER);
            if (res && res.files) {
                res.files.forEach(f => {
                    const filename = f.split(/[\\/]/).pop();
                    const m = filename.match(/^(?:vault-stats|vault-bases)--(.+)\.json$/);
                    if (m) list.add(m[1]);
                });
            }
        }
    } catch(e) {}
    return Array.from(list);
};

const loadProfileData = async (profileName) => {
    try {
        let targetPath = getConfigPath(profileName);
        if (!(await app.vault.adapter.exists(targetPath))) {
            const legacyPath = getLegacyConfigPath(profileName);
            if (await app.vault.adapter.exists(legacyPath)) {
                targetPath = legacyPath;
            }
        }
        if (await app.vault.adapter.exists(targetPath)) {
            const data = await app.vault.adapter.read(targetPath);
            let parsed = JSON.parse(data);
            if (parsed) {
                let exc = [];
                if (Array.isArray(parsed.excludedFolders)) {
                    exc = parsed.excludedFolders;
                } else if (typeof parsed.excludedFolders === 'string') {
                    exc = parsed.excludedFolders.split(',').map(s => s.trim()).filter(Boolean);
                }
                let bp = "";
                if (typeof parsed.baseProperties === 'string') {
                    bp = parsed.baseProperties;
                } else if (Array.isArray(parsed.baseProperties)) {
                    bp = parsed.baseProperties.join(', ');
                }
                let tl = 8;
                if (parsed.topLimit !== undefined && parsed.topLimit !== null && !isNaN(parseInt(parsed.topLimit))) {
                    tl = parseInt(parsed.topLimit);
                }
                config = {
                    excludedFolders: exc,
                    baseProperties: bp,
                    topLimit: tl,
                    headingLeft: parsed.headingLeft || "VAULT CATEGORIES & BASES",
                    headingRight: parsed.headingRight || "DISTRIBUTION & RECENT MODIFICATIONS"
                };
                return;
            }
        }
    } catch(e) {}
    config = {
        excludedFolders: [],
        baseProperties: "",
        topLimit: 8,
        headingLeft: "VAULT CATEGORIES & BASES",
        headingRight: "DISTRIBUTION & RECENT MODIFICATIONS"
    };
};

const loadConfig = async () => {
    try {
        const noteConfigPath = getConfigPath(defaultProfileKey);
        if (await app.vault.adapter.exists(noteConfigPath)) {
            const rawNote = await app.vault.adapter.read(noteConfigPath);
            let parsed = JSON.parse(rawNote);
            if (parsed && parsed.mirrors) {
                activeProfile = parsed.mirrors;
                await loadProfileData(activeProfile);
                return;
            } else {
                activeProfile = defaultProfileKey;
                let exc = [];
                if (Array.isArray(parsed.excludedFolders)) {
                    exc = parsed.excludedFolders;
                } else if (typeof parsed.excludedFolders === 'string') {
                    exc = parsed.excludedFolders.split(',').map(s => s.trim()).filter(Boolean);
                }
                let bp = "";
                if (typeof parsed.baseProperties === 'string') {
                    bp = parsed.baseProperties;
                } else if (Array.isArray(parsed.baseProperties)) {
                    bp = parsed.baseProperties.join(', ');
                }
                let tl = 8;
                if (parsed.topLimit !== undefined && parsed.topLimit !== null && !isNaN(parseInt(parsed.topLimit))) {
                    tl = parseInt(parsed.topLimit);
                }
                config = {
                    excludedFolders: exc,
                    baseProperties: bp,
                    topLimit: tl,
                    headingLeft: parsed.headingLeft || "VAULT CATEGORIES & BASES",
                    headingRight: parsed.headingRight || "DISTRIBUTION & RECENT MODIFICATIONS"
                };
                return;
            }
        } else {
            activeProfile = defaultProfileKey;
            config = {
                excludedFolders: [],
                baseProperties: "",
                topLimit: 8,
                headingLeft: "VAULT CATEGORIES & BASES",
                headingRight: "DISTRIBUTION & RECENT MODIFICATIONS"
            };
            return;
        }
    } catch(e) {
        config = {
            excludedFolders: [],
            baseProperties: "",
            topLimit: 8,
            headingLeft: "VAULT CATEGORIES & BASES",
            headingRight: "DISTRIBUTION & RECENT MODIFICATIONS"
        };
    }
};

const saveProfileConfig = async (profileName, conf) => {
    try {
        await ensureConfigFolder();
        const targetPath = getConfigPath(profileName);
        await app.vault.adapter.write(targetPath, JSON.stringify({
            excludedFolders: conf.excludedFolders || [],
            baseProperties: conf.baseProperties !== undefined ? conf.baseProperties : "",
            topLimit: parseInt(conf.topLimit) || 8,
            headingLeft: conf.headingLeft || "VAULT BASE FILES",
            headingRight: conf.headingRight || "DISTRIBUTION & RECENT MODIFICATIONS"
        }, null, 2));
    } catch(e) {
        console.error("Failed to save profile:", e);
    }
};

const saveNotePointer = async (targetProfileName) => {
    try {
        await ensureConfigFolder();
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
        console.error("Failed to save note pointer:", e);
    }
};

// ==========================================
// 3. DATA COMPUTATION & DYNAMIC FILTERS
// ==========================================
const getVaultFolders = () => {
    try {
        const folders = new Set();
        // Method 1: app.vault.getAllLoadedFiles()
        if (app && app.vault && typeof app.vault.getAllLoadedFiles === "function") {
            const allLoaded = app.vault.getAllLoadedFiles();
            allLoaded.forEach(item => {
                if (item && item.children) {
                    if (item.path && item.path !== "/" && item.path !== ".") {
                        folders.add(item.path);
                    }
                }
            });
        }
        // Method 2: Inspect paths from app.vault.getFiles()
        if (app && app.vault && typeof app.vault.getFiles === "function") {
            app.vault.getFiles().forEach(f => {
                if (f && f.path && f.path.includes("/")) {
                    const parts = f.path.split("/");
                    parts.pop();
                    let cur = "";
                    for (const p of parts) {
                        cur = cur ? `${cur}/${p}` : p;
                        folders.add(cur);
                    }
                }
            });
        }
        // Method 3: Fallback from markdown files
        if (folders.size === 0 && app && app.vault && typeof app.vault.getMarkdownFiles === "function") {
            app.vault.getMarkdownFiles().forEach(f => {
                if (f && f.path && f.path.includes("/")) {
                    const parts = f.path.split("/");
                    parts.pop();
                    let cur = "";
                    for (const p of parts) {
                        cur = cur ? `${cur}/${p}` : p;
                        folders.add(cur);
                    }
                }
            });
        }
        return Array.from(folders).sort((a, b) => a.localeCompare(b));
    } catch (e) {
        return [];
    }
};

const getVaultProperties = () => {
    try {
        const props = new Set();
        // Method 1: metadataCache.getProperties()
        if (app && app.metadataCache && typeof app.metadataCache.getProperties === "function") {
            const pObj = app.metadataCache.getProperties();
            if (pObj && typeof pObj === "object") {
                Object.keys(pObj).forEach(k => {
                    if (k && k !== "position") props.add(k);
                });
            }
        }
        // Method 2: Iterate markdown files cache
        if (app && app.vault && typeof app.vault.getMarkdownFiles === "function") {
            const mdFiles = app.vault.getMarkdownFiles();
            mdFiles.forEach(f => {
                const cache = app.metadataCache ? app.metadataCache.getFileCache(f) : null;
                if (cache && cache.frontmatter) {
                    Object.keys(cache.frontmatter).forEach(k => {
                        if (k && k !== "position") props.add(k);
                    });
                }
            });
        }
        // Method 3: Dataview pages
        if (typeof dv !== "undefined" && dv && typeof dv.pages === "function") {
            try {
                dv.pages().forEach(p => {
                    if (p && p.file && p.file.frontmatter) {
                        Object.keys(p.file.frontmatter).forEach(k => {
                            if (k && k !== "position") props.add(k);
                        });
                    }
                });
            } catch (err) {}
        }
        return Array.from(props).sort((a, b) => a.localeCompare(b));
    } catch (e) {
        return [];
    }
};

const isExcluded = (filePath) => {
    if (!config.excludedFolders || config.excludedFolders.length === 0) return false;
    const normalized = filePath.replace(/\\/g, '/');
    return config.excludedFolders.some(folder => {
        const cleanFolder = folder.trim().replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
        if (!cleanFolder) return false;
        return normalized === cleanFolder || normalized.startsWith(cleanFolder + '/');
    });
};

const getBasePropKeys = () => {
    let raw = config.baseProperties;
    let list = [];
    if (typeof raw === 'string') {
        list = raw.split(',').map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(raw)) {
        list = raw.map(s => String(s).trim()).filter(Boolean);
    }
    return list;
};

// CURATED STEALTH TACTICAL HUD PALETTE (Matches Buttons)
const stealthHudPalette = [
    "#f87171", // Muted Crimson Red
    "#34d399", // Cyber Emerald
    "#c084fc", // Arcane Violet
    "#fbbf24", // Tactical Amber
    "#38bdf8", // Sky Blue
    "#f43f5e", // Cyber Magenta
    "#2dd4bf", // HUD Teal
    "#818cf8", // Indigo
    "#fb7185", // Dark Rose
    "#f59e0b"  // Amber
];

// Helper for relative time formatting
const getRelativeTime = (mtime) => {
    let m = moment(mtime);
    let now = moment();
    if (now.diff(m, 'hours') < 24) return m.format("hh:mm A");
    if (now.diff(m, 'days') < 7) return m.format("ddd");
    return m.format("DD-MM-YY");
};

// GLOBAL STATE
let allMarkdownFiles = [];
let totalVaultNotes = 0;
let chartData = [];
let lockedIdx = null;

const calculateVaultData = () => {
    allMarkdownFiles = app.vault.getMarkdownFiles().filter(f => !isExcluded(f.path));
    totalVaultNotes = allMarkdownFiles.length;

    // STRICTLY find ONLY files with extension .base or ending in .base (not excluded)
    let baseFiles = app.vault.getFiles().filter(f => (f.extension === "base" || f.name.endsWith(".base")) && !isExcluded(f.path));

    let baseMap = {};
    let baseCountsMap = {};
    let baseNoteFilesMap = {};

    baseFiles.forEach(f => {
        let rawName = f.name;
        let cleanName = rawName.replace(/\.base$/i, "").replace(/\.md$/i, "").toUpperCase();
        baseMap[cleanName] = rawName.toUpperCase();
        baseCountsMap[cleanName] = 0;
        baseNoteFilesMap[cleanName] = [];
    });

    // Also check markdown notes with explicit frontmatter `type: base`
    dv.pages().forEach(p => {
        if (!isExcluded(p.file.path)) {
            if (p.type === "base" || (p.file.frontmatter && p.file.frontmatter.type === "base")) {
                let cleanName = p.file.name.toUpperCase();
                if (!baseCountsMap[cleanName]) {
                    baseMap[cleanName] = p.file.name.toUpperCase();
                    baseCountsMap[cleanName] = 0;
                    baseNoteFilesMap[cleanName] = [];
                }
            }
        }
    });

    let unlinkedCount = 0;
    let unlinkedFiles = [];
    const propKeys = getBasePropKeys();

    // Classify each vault markdown file into a .base file or NOT LINKED TO BASE
    allMarkdownFiles.forEach(file => {
        let cache = app.metadataCache.getFileCache(file);
        let fm = cache ? cache.frontmatter : null;
        let linked = false;

        // Check frontmatter property dynamically configured in baseProperties
        if (fm) {
            let targetBase = null;
            for (const key of propKeys) {
                if (fm[key] !== undefined && fm[key] !== null) {
                    targetBase = fm[key];
                    break;
                }
            }
            if (targetBase) {
                let baseStr = Array.isArray(targetBase) ? targetBase[0] : String(targetBase);
                let cleanBaseStr = String(baseStr).replace(/\[\[(?:.*\|)?([^\]]+)\]\]/, "$1").replace(/\.base$/i, "").trim().toUpperCase();
                if (baseCountsMap[cleanBaseStr] !== undefined) {
                    baseCountsMap[cleanBaseStr]++;
                    baseNoteFilesMap[cleanBaseStr].push(file);
                    linked = true;
                } else {
                    baseCountsMap[cleanBaseStr] = (baseCountsMap[cleanBaseStr] || 0) + 1;
                    baseNoteFilesMap[cleanBaseStr] = baseNoteFilesMap[cleanBaseStr] || [];
                    baseNoteFilesMap[cleanBaseStr].push(file);
                    linked = true;
                }
            }
        }

        // If the note itself IS one of the .base files
        if (!linked) {
            let fileNameClean = file.name.replace(/\.base$/i, "").replace(/\.md$/i, "").toUpperCase();
            if (baseCountsMap[fileNameClean] !== undefined) {
                baseCountsMap[fileNameClean]++;
                baseNoteFilesMap[fileNameClean].push(file);
                linked = true;
            }
        }

        if (!linked) {
            unlinkedCount++;
            unlinkedFiles.push(file);
        }
    });

    // Build raw array of categories
    let rawCategories = [];
    Object.keys(baseCountsMap).forEach(bName => {
        rawCategories.push({
            name: bName,
            count: baseCountsMap[bName],
            files: baseNoteFilesMap[bName] || [],
            isUnlinked: false
        });
    });

    // Sort by note count descending
    rawCategories.sort((a,b) => b.count - a.count);

    // Apply topLimit if set
    let limit = (config.topLimit !== undefined && config.topLimit !== null) ? parseInt(config.topLimit) : 8;
    if (limit > 0 && rawCategories.length > limit) {
        let topCats = rawCategories.slice(0, limit);
        let otherCats = rawCategories.slice(limit);
        let otherCount = otherCats.reduce((sum, c) => sum + c.count, 0);
        let otherFiles = otherCats.flatMap(c => c.files);
        if (otherCount > 0) {
            topCats.push({
                name: "OTHER BASES",
                count: otherCount,
                files: otherFiles,
                isUnlinked: false
            });
        }
        rawCategories = topCats;
    }

    // Include NOT LINKED TO BASE category at bottom
    rawCategories.push({
        name: "NOT LINKED TO BASE",
        count: unlinkedCount,
        files: unlinkedFiles,
        isUnlinked: true
    });

    let activeCategories = rawCategories.filter(c => !c.isUnlinked);
    let totalActive = activeCategories.length;

    chartData = rawCategories.map((item, index) => {
        let color;
        if (item.isUnlinked) {
            color = "#71717a"; // Muted metallic zinc
        } else if (item.name === "OTHER BASES") {
            color = "#a1a1aa"; // Slate zinc for other
        } else if (index < stealthHudPalette.length) {
            color = stealthHudPalette[index];
        } else {
            let step = 360 / Math.max(totalActive, 1);
            let hue = (index * step) % 360;
            color = `hsl(${hue.toFixed(1)}, 65%, 60%)`;
        }
        return { ...item, color };
    });
};

// ==========================================
// 4. SETTINGS MODAL
// ==========================================
let settingsModalInstance = null;
const showSettingsModal = async (incomingState = null) => {
    if (settingsModalInstance) settingsModalInstance.remove();

    settingsModalInstance = document.createElement("div");
    settingsModalInstance.className = "hud-stats-modal-overlay";

    let selectedProfVal = (incomingState && incomingState.selectedProfile) ? incomingState.selectedProfile : activeProfile;
    let newProfNameVal = (incomingState && incomingState.newProfileName) ? incomingState.newProfileName : "";
    let excFoldersVal = (incomingState && incomingState.excludedFolders !== undefined) 
        ? incomingState.excludedFolders 
        : (Array.isArray(config.excludedFolders) ? config.excludedFolders.join(', ') : (config.excludedFolders || ""));
    let basePropsVal = (incomingState && incomingState.baseProperties !== undefined) 
        ? incomingState.baseProperties 
        : (config.baseProperties || "");
    let topLimitVal = (incomingState && incomingState.topLimit !== undefined) 
        ? incomingState.topLimit 
        : (config.topLimit !== undefined ? config.topLimit : 8);

    const inner = document.createElement("div");
    inner.className = "hud-stats-modal";

    // Recommendations for Excluded Folders (strictly from vault)
    const detectedFolders = getVaultFolders();
    const folderDatalistOptions = detectedFolders.filter(Boolean).map(f => `<option value="${f.replace(/"/g, '&quot;')}"></option>`).join("");

    // Recommendations for Base Properties (strictly from vault)
    const detectedProps = getVaultProperties();
    const basePropDatalistOptions = detectedProps.filter(Boolean).map(p => `<option value="${p.replace(/"/g, '&quot;')}"></option>`).join("");

    inner.innerHTML = `
        <div class="hud-stats-modal-title">
            <span>⚙️ VAULT BASES SETTINGS</span>
            <span style="font-size: 12px; color: #ffffff; font-weight: normal;">PROFILE: ${activeProfile}</span>
        </div>

        <div class="hud-stats-input-group">
            <label>Profile</label>
            <select id="hud-stats-profile-select" style="height: 38px !important; min-height: 38px !important; line-height: normal !important; font-size: 13px !important; padding: 6px 12px !important; box-sizing: border-box;">
                <option value="${activeProfile}">[Current: ${activeProfile}]</option>
                <option value="__new__">+ Create New Named Profile...</option>
            </select>
            <div class="hud-stats-input-desc">Select an existing profile to mirror or edit, or create a new profile.</div>
        </div>

        <div class="hud-stats-input-group" id="hud-stats-new-profile-group" style="display: none; background: rgba(56, 189, 248, 0.06); padding: 12px; border: 1px dashed rgba(56, 189, 248, 0.3); border-radius: 4px;">
            <label style="color: #ffffff; margin-bottom: 6px;">New Profile Name</label>
            <input type="text" id="hud-stats-new-profile-name" value="${newProfNameVal.replace(/"/g, '&quot;')}" placeholder="e.g. work, research, global" style="margin-bottom: 6px;" />
            <div class="hud-stats-input-desc" style="margin-bottom: 8px;">Saved as vault-stats--[name].json inside HUD Config.</div>
            <div style="display: flex; gap: 14px; font-size: 13px; align-items: center;">
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; margin: 0; color: #ffffff;">
                    <input type="radio" name="hud-stats-prof-source" value="current" checked style="width: auto; margin: 0;" /> Copy current settings
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; margin: 0; color: #ffffff;">
                    <input type="radio" name="hud-stats-prof-source" value="default" style="width: auto; margin: 0;" /> Use default settings
                </label>
            </div>
        </div>

        <div class="hud-stats-input-group">
            <label>Left Panel Heading</label>
            <input type="text" id="hud-stats-heading-left" value="${(config.headingLeft || 'VAULT CATEGORIES & BASES').replace(/"/g, '&quot;')}" placeholder="e.g. VAULT CATEGORIES & BASES" />
            <div class="hud-stats-input-desc">Title displayed at the top of the left category list panel.</div>
        </div>

        <div class="hud-stats-input-group">
            <label>Right Panel Heading</label>
            <input type="text" id="hud-stats-heading-right" value="${(config.headingRight || 'DISTRIBUTION & RECENT MODIFICATIONS').replace(/"/g, '&quot;')}" placeholder="e.g. DISTRIBUTION & RECENT MODIFICATIONS" />
            <div class="hud-stats-input-desc">Title displayed at the top of the right chart panel.</div>
        </div>

        <div class="hud-stats-input-group">
            <label>Excluded Folders</label>
            <input type="text" id="hud-stats-excluded-folders" list="hud-stats-exc-folders-datalist" value="${String(excFoldersVal).replace(/"/g, '&quot;')}" placeholder="e.g. Templates, .trash, Archive" />
            <datalist id="hud-stats-exc-folders-datalist">
                ${folderDatalistOptions}
            </datalist>
            
            <div class="hud-stats-input-desc">Comma-separated folder paths to exclude from indexing. Select from dropdown or type.</div>
        </div>

        <div class="hud-stats-input-group">
            <label>Base Properties</label>
            <input type="text" id="hud-stats-prop-keys" list="hud-stats-prop-keys-datalist" value="${String(basePropsVal).replace(/"/g, '&quot;')}" placeholder="e.g. base, database, category, type" />
            <datalist id="hud-stats-prop-keys-datalist">
                ${basePropDatalistOptions}
            </datalist>
            
            <div class="hud-stats-input-desc">Comma-separated frontmatter keys used to detect base links. Select from dropdown or type.</div>
        </div>

        <div class="hud-stats-input-group">
            <label>Top Categories Limit</label>
            <input type="number" id="hud-stats-top-limit" value="${topLimitVal}" min="0" max="50" />
            <div class="hud-stats-input-desc">Maximum number of top bases in radar chart (0 for unlimited).</div>
        </div>

        <div class="hud-stats-modal-actions">
            <button id="hud-stats-btn-cancel" class="hud-stats-mod-btn">Cancel</button>
            <button id="hud-stats-btn-save" class="hud-stats-mod-btn hud-stats-mod-btn-primary">Save Settings</button>
        </div>
    `;

    settingsModalInstance.appendChild(inner);
    document.body.appendChild(settingsModalInstance);

    const profileSelect = inner.querySelector("#hud-stats-profile-select");
    const newProfGroup = inner.querySelector("#hud-stats-new-profile-group");
    const newProfInput = inner.querySelector("#hud-stats-new-profile-name");
    const headingLeftInput = inner.querySelector("#hud-stats-heading-left");
    const headingRightInput = inner.querySelector("#hud-stats-heading-right");
    const excInput = inner.querySelector("#hud-stats-excluded-folders");
    const propInput = inner.querySelector("#hud-stats-prop-keys");
    const limitInput = inner.querySelector("#hud-stats-top-limit");

    if (selectedProfVal === "__new__") {
        newProfGroup.style.display = "block";
    }

    // Populate profile selector
    listProfiles().then(profiles => {
        if (profileSelect) {
            const allProfiles = new Set(profiles);
            allProfiles.add(activeProfile);

            profileSelect.innerHTML = Array.from(allProfiles).map(p => {
                const label = (p === defaultProfileKey) ? `[Current Note: ${p}]` : p;
                return `<option value="${p}" ${p === selectedProfVal ? 'selected' : ''}>${label}</option>`;
            }).join('') + `<option value="__new__" ${selectedProfVal === '__new__' ? 'selected' : ''}>+ Create New Named Profile...</option>`;

            if (profileSelect.value === "__new__") {
                newProfGroup.style.display = "block";
            }
        }
    }).catch(() => {});

    profileSelect.onchange = async (e) => {
        const chosen = e.target.value;
        if (chosen === "__new__") {
            newProfGroup.style.display = "block";
            newProfInput.focus();
            return;
        }

        newProfGroup.style.display = "none";
        // Load target profile data into fields
        await loadProfileData(chosen);
        if (headingLeftInput) headingLeftInput.value = config.headingLeft || "VAULT CATEGORIES & BASES";
        if (headingRightInput) headingRightInput.value = config.headingRight || "DISTRIBUTION & RECENT MODIFICATIONS";
        excInput.value = Array.isArray(config.excludedFolders) ? config.excludedFolders.join(', ') : (config.excludedFolders || "");
        propInput.value = config.baseProperties || "";
        limitInput.value = config.topLimit !== undefined ? config.topLimit : 8;
    };

    inner.querySelector("#hud-stats-btn-cancel").onclick = () => {
        settingsModalInstance.remove();
        settingsModalInstance = null;
    };

    settingsModalInstance.onclick = (e) => {
        if (e.target === settingsModalInstance) {
            settingsModalInstance.remove();
            settingsModalInstance = null;
        }
    };

    inner.querySelector("#hud-stats-btn-save").onclick = async () => {
        const selectedProfile = profileSelect.value;
        const hLeft = (headingLeftInput?.value || "").trim() || "VAULT BASE FILES";
        const hRight = (headingRightInput?.value || "").trim() || "DISTRIBUTION & RECENT MODIFICATIONS";
        const rawExc = excInput.value.split(',').map(s => s.trim()).filter(Boolean);
        const rawProps = propInput.value.trim();
        const rawLimit = parseInt(limitInput.value) || 0;

        const newConf = {
            excludedFolders: rawExc,
            baseProperties: rawProps,
            topLimit: rawLimit,
            headingLeft: hLeft,
            headingRight: hRight
        };

        let targetProfile = selectedProfile;

        if (selectedProfile === "__new__") {
            const rawName = (newProfInput.value || "").trim();
            const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_');
            if (!cleanName) {
                if (typeof Notice !== 'undefined') new Notice("⚠️ Please enter a name for the new profile!");
                newProfInput.focus();
                return;
            }
            targetProfile = cleanName;

            const isCopy = inner.querySelector("input[name='hud-stats-prof-source']:checked")?.value === "current";
            const saveConf = isCopy ? newConf : {
                excludedFolders: [],
                baseProperties: "",
                topLimit: 8,
                headingLeft: hLeft,
                headingRight: hRight
            };

            await saveProfileConfig(targetProfile, saveConf);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
            config = saveConf;
        } else if (selectedProfile === defaultProfileKey) {
            targetProfile = defaultProfileKey;
            await saveProfileConfig(targetProfile, newConf);
            activeProfile = targetProfile;
            config = newConf;
        } else {
            targetProfile = selectedProfile;
            await saveProfileConfig(targetProfile, newConf);
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
            config = newConf;
        }

        settingsModalInstance.remove();
        settingsModalInstance = null;
        if (typeof Notice !== 'undefined') new Notice("Vault Bases Settings Saved!");

        // Live refresh of dashboard
        refreshDashboard();
    };
};

// ==========================================
// 5. DOM LAYOUT & VIEW CONSTRUCTION
// ==========================================
const rootWrapper = document.createElement("div");
rootWrapper.className = "hud-stats-wrapper";

const defaultLeftReadout = `<div class="hud-stats-readout-idle">> CLICK OR HOVER BASE TO INSPECT</div>`;
const defaultRightReadout = `<div class="hud-stats-readout-idle">> STANDBY : CLICK SLICE TO LOCK SELECTION</div>`;

let listContainer;
let donutSvgWrapper;
let recentFilesContainer;
let leftReadout;
let rightReadout;

const buildLayout = () => {
    const bottomGrid = document.createElement("div");
    bottomGrid.className = "hud-stats-dash-grid";

    // LEFT PANEL: BASES LIST WITH COUNT & % BADGES
    const leftPanel = document.createElement("div");
    leftPanel.className = "hud-stats-tactical-panel";

    let leftHeader = document.createElement("div");
    leftHeader.className = "hud-stats-panel-header";
    leftHeader.innerHTML = `
        <div class="hud-stats-bracket-tl"></div><div class="hud-stats-bracket-br"></div>
        <div class="hud-stats-panel-title">${config.headingLeft || "VAULT BASE FILES"}</div>
    `;
    leftPanel.appendChild(leftHeader);

    listContainer = document.createElement("div");
    listContainer.className = "hud-stats-list-container";
    leftPanel.appendChild(listContainer);

    leftReadout = document.createElement("div");
    leftReadout.className = "hud-stats-trace-readout";
    leftReadout.innerHTML = defaultLeftReadout;
    leftPanel.appendChild(leftReadout);

    bottomGrid.appendChild(leftPanel);

    // RIGHT PANEL: DONUT ON LEFT + RECENT FILES ON RIGHT
    const rightPanel = document.createElement("div");
    rightPanel.className = "hud-stats-tactical-panel";

    let rightHeader = document.createElement("div");
    rightHeader.className = "hud-stats-panel-header";
    rightHeader.innerHTML = `
        <div class="hud-stats-bracket-tl"></div><div class="hud-stats-bracket-br"></div>
        <div class="hud-stats-panel-title">${config.headingRight || "DISTRIBUTION & RECENT MODIFICATIONS"}</div>
    `;

    const settingsBtn = document.createElement("button");
    settingsBtn.className = "hud-stats-settings-btn";
    settingsBtn.innerHTML = "⚙️";
    settingsBtn.title = "Settings";
    settingsBtn.onclick = (e) => {
        e.stopPropagation();
        showSettingsModal();
    };
    rightHeader.appendChild(settingsBtn);
    rightPanel.appendChild(rightHeader);

    let chartSplitWrapper = document.createElement("div");
    chartSplitWrapper.className = "hud-stats-chart-split-wrapper";

    donutSvgWrapper = document.createElement("div");
    donutSvgWrapper.className = "hud-stats-donut-svg-wrapper";

    recentFilesContainer = document.createElement("div");
    recentFilesContainer.className = "hud-stats-recent-files-container";

    chartSplitWrapper.appendChild(donutSvgWrapper);
    chartSplitWrapper.appendChild(recentFilesContainer);
    rightPanel.appendChild(chartSplitWrapper);

    rightReadout = document.createElement("div");
    rightReadout.className = "hud-stats-trace-readout";
    rightReadout.innerHTML = defaultRightReadout;
    rightPanel.appendChild(rightReadout);

    bottomGrid.appendChild(rightPanel);
    rootWrapper.appendChild(bottomGrid);
};

// ==========================================
// 6. RENDER LIST, ANIMATED RADAR DONUT & RECENT FILES
// ==========================================
const renderRecentFiles = (files, categoryName, categoryColor) => {
    let isLockedStr = lockedIdx !== null ? ` [🔒 LOCKED]` : ``;
    recentFilesContainer.innerHTML = `
        <div class="hud-stats-recent-files-header">
            <span>LAST EDITED (TOP 5)</span>
            <span style="color:${categoryColor || '#ffffff'}; font-size:8.5px;">${categoryName || 'VAULT'}${isLockedStr}</span>
        </div>
    `;

    let sortedFiles = [...files].sort((a,b) => b.stat.mtime - a.stat.mtime).slice(0, 5);

    if (sortedFiles.length > 0) {
        sortedFiles.forEach(file => {
            let item = document.createElement("div");
            item.className = "hud-stats-recent-file-item";
            item.onclick = (e) => {
                e.preventDefault();
                app.workspace.openLinkText(file.path, "", false);
            };

            let cleanFileName = file.basename.toUpperCase();
            let timeStr = getRelativeTime(file.stat.mtime);

            item.innerHTML = `
                <span style="color:${categoryColor || '#ffffff'}; font-size:10px;">📄</span>
                <span class="hud-stats-recent-file-title">${cleanFileName}</span>
                <span class="hud-stats-recent-file-time">${timeStr}</span>
            `;
            recentFilesContainer.appendChild(item);
        });
    } else {
        recentFilesContainer.innerHTML += `<div style="text-align:center; padding: 40px 0; font-size:10px; color:#71717a;">[ NO RECENT NOTES FOUND ]</div>`;
    }
};

const toggleLockIndex = (idx) => {
    if (lockedIdx === idx) {
        lockedIdx = null;
        resetHighlights();
    } else {
        lockedIdx = idx;
        highlightIndex(idx, true);
    }
};

const renderBasesDashboard = () => {
    listContainer.innerHTML = "";
    
    // SVG Donut Setup with Visible Radar Sweep & Breathing Pod Outlines
    const center = 110;
    const radius = 88;
    
    const circumferenceMid = 2 * Math.PI * radius;
    const circumferenceOuter = 2 * Math.PI * (radius + 11);
    const circumferenceInner = 2 * Math.PI * (radius - 11);
    
    let accumulatedAngle = 0;
    let svgSegmentGroupsHTML = "";

    chartData.forEach((item, idx) => {
        let pct = totalVaultNotes > 0 ? (item.count / totalVaultNotes) : 0;
        let pctFormatted = (pct * 100).toFixed(1);

        // Render Left Item Card
        let card = document.createElement("div");
        card.className = "hud-stats-item-card";
        card.setAttribute("data-index", idx);

        card.innerHTML = `
            <div class="hud-stats-item-top">
                <div class="hud-stats-item-name">
                    <span style="color:${item.color};">■</span> ${item.name}
                </div>
                <div class="hud-stats-item-badge">${item.count} NOTES (${pctFormatted}%)</div>
            </div>
            <div class="hud-stats-progress-track">
                <div class="hud-stats-progress-fill" style="width: ${pctFormatted}%; background: ${item.color};"></div>
            </div>
        `;

        card.addEventListener("click", () => toggleLockIndex(idx));
        card.addEventListener("mouseover", () => { if (lockedIdx === null) highlightIndex(idx); });
        card.addEventListener("mouseout", () => { if (lockedIdx === null) resetHighlights(); });
        listContainer.appendChild(card);

        // Continuous Arcs without dark gaps
        let strokeDashMid = `${pct * circumferenceMid} ${circumferenceMid}`;
        let strokeOffsetMid = -accumulatedAngle * circumferenceMid;

        let strokeDashOuter = `${pct * circumferenceOuter} ${circumferenceOuter}`;
        let strokeOffsetOuter = -accumulatedAngle * circumferenceOuter;

        let strokeDashInner = `${pct * circumferenceInner} ${circumferenceInner}`;
        let strokeOffsetInner = -accumulatedAngle * circumferenceInner;

        // Calculate Start & End Radial Cap Lines in SAME COLOR as the block!
        let startAngleRad = accumulatedAngle * 2 * Math.PI;
        let endAngleRad = (accumulatedAngle + pct) * 2 * Math.PI;

        let x1_start = center + (radius - 11) * Math.cos(startAngleRad);
        let y1_start = center + (radius - 11) * Math.sin(startAngleRad);
        let x2_start = center + (radius + 11) * Math.cos(startAngleRad);
        let y2_start = center + (radius + 11) * Math.sin(startAngleRad);

        let x1_end = center + (radius - 11) * Math.cos(endAngleRad);
        let y1_end = center + (radius - 11) * Math.sin(endAngleRad);
        let x2_end = center + (radius + 11) * Math.cos(endAngleRad);
        let y2_end = center + (radius + 11) * Math.sin(endAngleRad);

        svgSegmentGroupsHTML += `
            <g class="hud-stats-donut-segment-group hud-stats-segment-idx-${idx}" data-index="${idx}">
                <!-- Dark Inner Fill Arc -->
                <circle class="hud-stats-donut-fill-arc" cx="${center}" cy="${center}" r="${radius}" 
                        stroke="${item.color}" stroke-dasharray="${strokeDashMid}" 
                        stroke-dashoffset="${strokeOffsetMid}" />
                <!-- Outer Neon Border Arc -->
                <circle class="hud-stats-donut-border-outer" cx="${center}" cy="${center}" r="${radius + 11}" 
                        stroke="${item.color}" stroke-dasharray="${strokeDashOuter}" 
                        stroke-dashoffset="${strokeOffsetOuter}" />
                <!-- Inner Neon Border Arc -->
                <circle class="hud-stats-donut-border-inner" cx="${center}" cy="${center}" r="${radius - 11}" 
                        stroke="${item.color}" stroke-dasharray="${strokeDashInner}" 
                        stroke-dashoffset="${strokeOffsetInner}" />
                <!-- Start Radial Line (Same Color as Block) -->
                <line class="hud-stats-donut-cap-line" x1="${x1_start}" y1="${y1_start}" x2="${x2_start}" y2="${y2_start}" 
                      stroke="${item.color}" />
                <!-- End Radial Line (Same Color as Block) -->
                <line class="hud-stats-donut-cap-line" x1="${x1_end}" y1="${y1_end}" x2="${x2_end}" y2="${y2_end}" 
                      stroke="${item.color}" />
            </g>
        `;

        accumulatedAngle += pct;
    });

    donutSvgWrapper.innerHTML = `
        <svg class="hud-stats-donut-svg" viewBox="0 0 220 220">
            <defs>
                <linearGradient id="hudStatsSonarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <!-- DUAL COUNTER ROTATING RADAR RINGS -->
            <circle class="hud-stats-donut-radar-outer" cx="110" cy="110" r="${radius + 18}" />
            <circle class="hud-stats-donut-radar-inner" cx="110" cy="110" r="${radius - 18}" />
            
            <!-- SEGMENTED PODS -->
            ${svgSegmentGroupsHTML}
            
            <!-- ROTATING SONAR RADAR SWEEP BEAM -->
            <line class="hud-stats-radar-sweep-beam" x1="110" y1="110" x2="110" y2="10" stroke="url(#hudStatsSonarGrad)" stroke-width="2.5" stroke-linecap="round" />
        </svg>
        <div class="hud-stats-donut-center-text">
            <div class="hud-stats-donut-center-val" id="donut-val">${totalVaultNotes}</div>
            <div class="hud-stats-donut-center-lbl" id="donut-lbl">TOTAL NOTES</div>
        </div>
    `;

    // Render Idle Overall Top 5 Modified Files
    renderRecentFiles(allMarkdownFiles, "ALL VAULT", "#ffffff");

    // Attach Interactivity directly to BOTH <g> Groups AND all child elements
    let segmentGroups = donutSvgWrapper.querySelectorAll(".hud-stats-donut-segment-group");
    segmentGroups.forEach(group => {
        let idx = parseInt(group.getAttribute("data-index"));
        const handleSelect = (e) => {
            e.stopPropagation();
            toggleLockIndex(idx);
        };
        const handleHover = () => { if (lockedIdx === null) highlightIndex(idx); };
        const handleOut = () => { if (lockedIdx === null) resetHighlights(); };

        group.addEventListener("click", handleSelect);
        group.addEventListener("mouseover", handleHover);
        group.addEventListener("mouseout", handleOut);

        let children = group.querySelectorAll("circle, line");
        children.forEach(c => {
            c.addEventListener("click", handleSelect);
            c.addEventListener("mouseover", handleHover);
            c.addEventListener("mouseout", handleOut);
        });
    });
};

const highlightIndex = (idx, isExplicitLock = false) => {
    let item = chartData[idx];
    if (!item) return;

    let pctFormatted = totalVaultNotes > 0 ? ((item.count / totalVaultNotes) * 100).toFixed(1) : "0.0";

    // Highlight Left Card
    let cards = listContainer.querySelectorAll(".hud-stats-item-card");
    cards.forEach(c => {
        c.classList.remove("hud-stats-highlighted");
        c.classList.remove("hud-stats-locked-selection");
    });
    if (cards[idx]) {
        cards[idx].classList.add(isExplicitLock || lockedIdx === idx ? "hud-stats-locked-selection" : "hud-stats-highlighted");
    }

    // Highlight SVG Outlined Group
    let groups = donutSvgWrapper.querySelectorAll(".hud-stats-donut-segment-group");
    groups.forEach(g => {
        g.classList.remove("hud-stats-highlighted");
        g.classList.remove("hud-stats-locked-selection");
    });
    let activeGroup = donutSvgWrapper.querySelector(`.hud-stats-segment-idx-${idx}`);
    if (activeGroup) {
        activeGroup.classList.add(isExplicitLock || lockedIdx === idx ? "hud-stats-locked-selection" : "hud-stats-highlighted");
    }

    // Center Donut Text Update
    let valEl = donutSvgWrapper.querySelector("#donut-val");
    let lblEl = donutSvgWrapper.querySelector("#donut-lbl");
    if (valEl && lblEl) {
        valEl.textContent = item.count;
        valEl.style.color = item.color;
        lblEl.textContent = item.name;
    }

    // Render Selected Base's Top 5 Recently Edited Files
    renderRecentFiles(item.files, item.name, item.color);

    // Readout Updates
    let lockTag = (isExplicitLock || lockedIdx === idx) ? `<span class="hud-stats-readout-locked"> [🔒 LOCKED - CLICK AGAIN TO UNLOCK]</span>` : ``;

    leftReadout.innerHTML = `
        <div class="hud-stats-readout-group">
            <span>BASE: <span class="hud-stats-readout-highlight">${item.name}</span></span>
            <span class="hud-stats-readout-divider">│</span>
            <span>COUNT: <span class="hud-stats-readout-highlight">${item.count} NOTES</span>${lockTag}</span>
        </div>
    `;

    rightReadout.innerHTML = `
        <div class="hud-stats-readout-group">
            <span>SHARE: <span class="hud-stats-readout-highlight" style="color:${item.color};">${pctFormatted}%</span></span>
            <span class="hud-stats-readout-divider">│</span>
            <span>TOTAL VAULT: <span class="hud-stats-readout-highlight">${totalVaultNotes}</span>${lockTag}</span>
        </div>
    `;
};

const resetHighlights = () => {
    if (lockedIdx !== null) return; // Preserve locked selection

    let cards = listContainer.querySelectorAll(".hud-stats-item-card");
    cards.forEach(c => {
        c.classList.remove("hud-stats-highlighted");
        c.classList.remove("hud-stats-locked-selection");
    });

    let groups = donutSvgWrapper.querySelectorAll(".hud-stats-donut-segment-group");
    groups.forEach(g => {
        g.classList.remove("hud-stats-highlighted");
        g.classList.remove("hud-stats-locked-selection");
    });

    let valEl = donutSvgWrapper.querySelector("#donut-val");
    let lblEl = donutSvgWrapper.querySelector("#donut-lbl");
    if (valEl && lblEl) {
        valEl.textContent = totalVaultNotes;
        valEl.style.color = "#ffffff";
        lblEl.textContent = "TOTAL NOTES";
    }

    // Reset to overall Top 5 Modified Files
    renderRecentFiles(allMarkdownFiles, "ALL VAULT", "#ffffff");

    leftReadout.innerHTML = defaultLeftReadout;
    rightReadout.innerHTML = defaultRightReadout;
};

// ==========================================
// 7. INITIALIZATION & REFRESH DISPATCHER
// ==========================================
const refreshDashboard = () => {
    rootWrapper.innerHTML = "";
    lockedIdx = null;
    calculateVaultData();
    buildLayout();
    renderBasesDashboard();
};

const init = async () => {
    await loadConfig();
    refreshDashboard();
    dv.container.appendChild(rootWrapper);
};

init();