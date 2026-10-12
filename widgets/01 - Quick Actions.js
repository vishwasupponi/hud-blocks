// ==========================================
// 1. INJECT STYLES (DYNAMIC QUICK ACTIONS V10)
// ==========================================
// Force cache clear every time the script runs
document.querySelectorAll("style[id^='qa-dynamic-style']").forEach(el => el.remove());

const style = document.createElement("style");
style.id = "qa-dynamic-style-" + Date.now();
document.head.appendChild(style);

style.innerHTML = `
    @keyframes qa3ScanSheen {
        0% { left: -100%; opacity: 0; }
        20% { opacity: 0.3; }
        50% { left: 120%; opacity: 0; }
        100% { left: 120%; opacity: 0; }
    }

    @keyframes qa3PulseDynamic {
        0%, 100% { 
            border-color: rgba(var(--c-rgb), 0.4); 
            color: var(--c-hex); 
            text-shadow: 0 0 3px rgba(var(--c-rgb), 0.3); 
            box-shadow: 0 0 4px rgba(var(--c-rgb), 0.1); 
        }
        50% { 
            border-color: rgba(var(--c-rgb), 0.9); 
            color: var(--c-hex); 
            text-shadow: 0 0 8px rgba(var(--c-rgb), 0.65); 
            box-shadow: 0 0 12px rgba(var(--c-rgb), 0.25); 
        }
    }
    .qa3-btn-dynamic { animation: qa3PulseDynamic 3.2s infinite ease-in-out; }

    @keyframes qa3PulseCrazy {
        0% { border-color: #ff007f; color: #ff007f; text-shadow: 0 0 8px #ff007f; box-shadow: 0 0 10px rgba(255, 0, 127, 0.4); }
        25% { border-color: #00f3ff; color: #00f3ff; text-shadow: 0 0 8px #00f3ff; box-shadow: 0 0 10px rgba(0, 243, 255, 0.4); }
        50% { border-color: #ffe600; color: #ffe600; text-shadow: 0 0 8px #ffe600; box-shadow: 0 0 10px rgba(255, 230, 0, 0.4); }
        75% { border-color: #a100ff; color: #a100ff; text-shadow: 0 0 8px #a100ff; box-shadow: 0 0 10px rgba(161, 0, 255, 0.4); }
        100% { border-color: #ff007f; color: #ff007f; text-shadow: 0 0 8px #ff007f; box-shadow: 0 0 10px rgba(255, 0, 127, 0.4); }
    }
    .qa3-btn-cyberpunk { animation: qa3PulseCrazy 2.5s infinite linear !important; }
    .qa3-btn-cyberpunk:hover { animation-duration: 0.8s !important; filter: brightness(1.6); }

    /* STRICT THEME RESET - FIXED */
    .qa3-wrapper, .qa3-top-bar, .qa3-header-text, .qa3-grid {
        margin: 0 !important; padding: 0 !important; box-sizing: border-box !important;
    }
    .qa3-wrapper button {
        margin: 0 !important; box-sizing: border-box !important;
    }

    /* LAYOUT & GRID */
    .qa3-wrapper {
        margin-top: 8px !important; font-family: 'JetBrains Mono', 'Courier New', monospace; 
        background: #09090b; padding: 12px !important; border-radius: 4px;
        border: 1px dashed rgba(255, 255, 255, 0.15); width: 100%;
        display: flex; flex-direction: column; gap: 12px !important;
    }
    
    .qa3-top-bar {
        display: flex; align-items: center; justify-content: center;
        width: 100%; position: relative; min-height: 28px !important;
    }

    .qa3-header-text {
        color: #ffffff !important; font-weight: 800 !important; font-size: 15px !important;
        letter-spacing: 2.5px !important; text-transform: uppercase !important; 
        pointer-events: none; line-height: 1 !important;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
    }

    .qa3-settings-btn {
        position: absolute; right: 0; top: 50%; transform: translateY(-50%);
        background: #121215 !important; border: 1px solid rgba(255,255,255,0.2);
        color: #e4e4e7; border-radius: 4px; width: 28px; height: 28px;
        cursor: pointer; padding: 0 !important; transition: all 0.2s; font-size: 13px;
        display: inline-flex; align-items: center; justify-content: center; z-index: 2; font-family: inherit;
    }
    .qa3-settings-btn:hover { color: #ffffff; border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.12) !important; }

    .qa3-grid { 
        display: grid; gap: 12px !important; width: 100%;
    }

    .qa3-btn {
        height: 52px !important; border-radius: 2px; font-weight: 800; font-size: 13px;
        cursor: pointer; transition: transform 0.2s ease, filter 0.2s ease;
        display: flex; align-items: center; justify-content: center; gap: 10px !important;
        letter-spacing: 1.2px; text-transform: uppercase; font-family: inherit;
        position: relative; background: #121215 !important; padding: 0 16px !important;
        overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.2); width: 100%;
    }
    .qa3-btn::after {
        content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
        pointer-events: none; animation: qa3ScanSheen 4.5s infinite linear;
    }
    .qa3-btn:hover { filter: brightness(1.4); transform: translateY(-2px); }
    .qa3-btn:active { transform: translateY(1px); filter: brightness(0.9); }

    /* POPUP MODAL UI */
    .qa3-modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .qa3-modal {
        background: #191919; border: 1px solid rgba(255,255,255,0.15);
        border-radius: 8px; padding: 26px; width: 620px; max-width: 92vw;
        box-shadow: 0 12px 36px rgba(0,0,0,0.7); color: #fff;
        box-sizing: border-box;
    }
    .qa3-checkbox-label {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        user-select: none;
        padding: 7px 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        transition: all 0.15s ease;
    }
    .qa3-checkbox-label:hover {
        background: rgba(46, 170, 220, 0.1);
        border-color: #2EAADC;
    }
    .qa3-custom-check {
        display: none !important;
    }
    .qa3-check-box {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: 1.5px solid rgba(255, 255, 255, 0.4);
        background: rgba(0, 0, 0, 0.5);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
        flex-shrink: 0;
    }
    .qa3-check-svg {
        width: 12px;
        height: 12px;
        stroke: #ffffff;
        display: none;
    }
    .qa3-custom-check:checked + .qa3-check-box {
        background: #2EAADC;
        border-color: #2EAADC;
    }
    .qa3-custom-check:checked + .qa3-check-box .qa3-check-svg {
        display: block;
    }
    
    .qa3-input-group { margin-bottom: 16px; position: relative; }
    .qa3-input-group label { display: block; font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 6px; font-weight: 500;}
    .qa3-input-group input:not([type="radio"]):not([type="checkbox"]),
    .qa3-input-group select {
        width: 100%;
        height: 38px !important;
        min-height: 38px !important;
        line-height: normal !important;
        padding: 6px 12px !important;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 4px;
        color: #ffffff;
        font-size: 13px !important;
        font-family: inherit;
        outline: none;
        box-sizing: border-box;
        vertical-align: middle;
    }
    .qa3-input-group select {
        cursor: pointer;
    }
    .qa3-input-group input:focus, .qa3-input-group select:focus { border-color: #2EAADC; }
    .qa3-input-group select option { background-color: #191919; color: #ffffff; }
    
    .qa3-input-desc { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px; }
    
    .qa3-modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
    .qa3-mod-btn { background: #121215 !important; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;}
    .qa3-mod-btn:hover { background: rgba(255,255,255,0.1) !important; }
    .qa3-mod-primary { background: #2EAADC; border-color: #2EAADC; font-weight: 500; color: #fff;}
    .qa3-mod-primary:hover { background: #0690C9; }

    /* LIST MANAGER & DRAG UI */
    .qa3-remove-list { display: flex; flex-direction: column; gap: 8px; max-height: 250px; overflow-y: auto; margin-bottom: 10px;}
    .qa3-remove-item { 
        display: flex; justify-content: space-between; align-items: center; 
        background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 4px; 
        transition: transform 0.1s, background 0.1s;
    }
    .qa3-drag-over { border: 1px dashed #2EAADC !important; background: rgba(46,170,220,0.1) !important; }
    .qa3-drag-handle { cursor: grab; padding-right: 8px; color: rgba(255,255,255,0.3); font-size: 16px; }
    .qa3-drag-handle:active { cursor: grabbing; }

    .qa3-edit-btn { background: rgba(255,255,255,0.1); color: white; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;}
    .qa3-edit-btn:hover { background: rgba(255,255,255,0.2); }
    .qa3-del-btn { background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;}
    .qa3-del-btn:hover { background: #dc2626; }

    /* AUTOCOMPLETE DROPDOWN */
    

    /* SUGGESTION & COLOR PRESET PILLS */
    .qa3-pill-container {
        display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;
    }
    .qa3-pill {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 12px;
        padding: 4px 10px;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.85);
        cursor: pointer;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-family: inherit;
        line-height: 1.2;
    }
    .qa3-pill:hover {
        background: rgba(46, 170, 220, 0.2);
        border-color: #2EAADC;
        color: #fff;
        transform: translateY(-1px);
    }
    .qa3-pill:active {
        transform: translateY(0);
    }
    .qa3-pill-active {
        background: rgba(46, 170, 220, 0.25) !important;
        border-color: #2EAADC !important;
        color: #fff !important;
        box-shadow: 0 0 6px rgba(46, 170, 220, 0.4);
    }
    .qa3-color-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        flex-shrink: 0;
    }
    
`;

// ==========================================
// 2. DATA MANAGEMENT
// ==========================================
const CONFIG_DIR = `${app.vault.configDir}/HUD Config`;

const currentNote = dv.current();
const notePath = currentNote && currentNote.file ? currentNote.file.path.replace(/\.md$/i, '') : "default";
const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, "_");

let activeProfile = defaultProfileKey;
let config = { profile: activeProfile, settings: { columns: 0 }, buttons: [] };

const ensureConfigDir = async () => {
    try {
        if (!(await app.vault.adapter.exists(CONFIG_DIR))) {
            await app.vault.adapter.mkdir(CONFIG_DIR);
        }
    } catch(e) {}
};

const getConfigPath = (profileName) => `${CONFIG_DIR}/quick-actions--${profileName}.json`;

const listProfiles = async () => {
    const list = new Set([defaultProfileKey]);
    try {
        await ensureConfigDir();
        if (await app.vault.adapter.exists(CONFIG_DIR)) {
            const res = await app.vault.adapter.list(CONFIG_DIR);
            if (res && res.files) {
                res.files.forEach(f => {
                    const filename = f.split(/[\\/]/).pop();
                    const m = filename.match(/^quick-actions--(.+)\.json$/);
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
            const data = await app.vault.adapter.read(targetPath);
            let parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
                config.buttons = parsed;
                config.settings = { columns: 0, heading: "Quick Actions" };
            } else if (parsed && typeof parsed === 'object') {
                config.buttons = parsed.buttons || [];
                config.settings = { columns: 0, heading: "Quick Actions", ...(parsed.settings || {}) };
            }
        } else {
            config.buttons = [];
            config.settings = { columns: 0, heading: "Quick Actions" };
        }
    } catch(e) {
        config.buttons = [];
        config.settings = { columns: 0, heading: "Quick Actions" };
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
            } else {
                activeProfile = defaultProfileKey;
                if (Array.isArray(parsed)) {
                    config.buttons = parsed;
                    config.settings = { columns: 0, heading: "Quick Actions" };
                    return;
                } else if (parsed && parsed.buttons) {
                    config.buttons = parsed.buttons;
                    config.settings = { columns: 0, heading: "Quick Actions", ...(parsed.settings || {}) };
                    return;
                }
            }
        } else {
            // Fresh note starts blank (0 buttons)
            activeProfile = defaultProfileKey;
            config = { profile: activeProfile, settings: { columns: 0, heading: "Quick Actions" }, buttons: [] };
            return;
        }

        await loadProfileData(activeProfile);
    } catch(e) {
        config = { profile: activeProfile, settings: { columns: 0, heading: "Quick Actions" }, buttons: [] }; 
    }
};

const saveProfileConfig = async (profileName, conf) => {
    try {
        await ensureConfigDir();
        const targetPath = getConfigPath(profileName);
        await app.vault.adapter.write(targetPath, JSON.stringify({
            profile: profileName,
            settings: conf.settings || { columns: 0 },
            buttons: conf.buttons || []
        }, null, 2));
    } catch(e) { console.error("Failed to save profile:", e); }
};

const saveNotePointer = async (targetProfileName) => {
    try {
        const noteConfigPath = getConfigPath(defaultProfileKey);
        await ensureConfigDir();
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
// VAULT INSPECTION HELPER (COMMANDS & QUICKADD)
// ==========================================
function getObsidianApp() {
    if (typeof app !== "undefined" && app) return app;
    if (typeof window !== "undefined" && window.app) return window.app;
    return null;
}

function inspectQuickAddChoices() {
    const obsidianApp = getObsidianApp();
    const list = [];
    if (!obsidianApp) return list;
    
    const qa = obsidianApp.plugins?.plugins?.quickadd || obsidianApp.plugins?.getPlugin?.("quickadd");
    if (qa && qa.settings?.choices) {
        const extract = (arr) => {
            if (!Array.isArray(arr)) return;
            arr.forEach(ch => {
                if (ch && ch.name) {
                    list.push({
                        name: ch.name,
                        id: ch.id || ch.name,
                        type: "QuickAdd",
                        choiceType: ch.type || "Choice"
                    });
                }
                if (ch && ch.subChoices) {
                    extract(ch.subChoices);
                }
            });
        };
        extract(qa.settings.choices);
    }
    return list;
}

function inspectObsidianCommands() {
    const obsidianApp = getObsidianApp();
    const list = [];
    if (!obsidianApp || !obsidianApp.commands) return list;
    
    try {
        let rawCommands = [];
        if (typeof obsidianApp.commands.listCommands === "function") {
            rawCommands = obsidianApp.commands.listCommands();
        } else if (obsidianApp.commands.commands && typeof obsidianApp.commands.commands === "object") {
            rawCommands = Object.values(obsidianApp.commands.commands);
        }
        
        rawCommands.forEach(c => {
            if (c && c.name) {
                list.push({
                    name: c.name,
                    id: c.id || c.name,
                    icon: c.icon || "",
                    type: "Command"
                });
            }
        });
    } catch(e) {}
    return list;
}

function inspectVaultActions() {
    const quickAddChoices = inspectQuickAddChoices();
    const commands = inspectObsidianCommands();
    const all = [...quickAddChoices, ...commands];
    const recommended = [];
    
    // Prioritize vault QuickAdd choices created by the user
    quickAddChoices.slice(0, 6).forEach(qa => {
        let cleanName = qa.name.replace(/^QuickAdd:\s*/i, "").trim();
        recommended.push({
            name: qa.name,
            label: cleanName.length > 22 ? cleanName.substring(0, 20) + "…" : cleanName,
            icon: qa.choiceType === "Capture" ? "📥" : (qa.choiceType === "Template" ? "📋" : "⚡"),
            type: "QuickAdd"
        });
    });
    
    // Curated high-frequency Obsidian commands found in the vault
    const priorityKeywords = [
        { key: "daily notes: open today", label: "Daily Note", icon: "📅" },
        { key: "daily note", label: "Daily Note", icon: "📅" },
        { key: "quick switcher: open", label: "Switcher", icon: "🔍" },
        { key: "command palette: open", label: "Commands", icon: "⚡" },
        { key: "graph view: open", label: "Graph View", icon: "🕸️" },
        { key: "canvas: create new", label: "Canvas", icon: "🎨" },
        { key: "templates: insert", label: "Templates", icon: "📋" },
        { key: "random note", label: "Random Note", icon: "🎲" }
    ];
    
    const addedKeys = new Set(recommended.map(r => r.name.toLowerCase()));
    
    for (const pk of priorityKeywords) {
        if (recommended.length >= 8) break;
        const matched = commands.find(c => c.name && c.name.toLowerCase().includes(pk.key) && !addedKeys.has(c.name.toLowerCase()));
        if (matched) {
            addedKeys.add(matched.name.toLowerCase());
            recommended.push({
                name: matched.name,
                label: pk.label,
                icon: pk.icon,
                type: "Command"
            });
        }
    }
    
    // Fallback recommended presets when vault commands are sparse or mock environment
    const fallbackPresets = [
        { name: "Daily notes: Open today's note", label: "Daily Note", icon: "📅", type: "Command" },
        { name: "Quick switcher: Open quick switcher", label: "Switcher", icon: "🔍", type: "Command" },
        { name: "Command palette: Open command palette", label: "Commands", icon: "⚡", type: "Command" },
        { name: "Graph view: Open graph view", label: "Graph View", icon: "🕸️", type: "Command" },
        { name: "Canvas: Create new canvas", label: "Canvas", icon: "🎨", type: "Command" }
    ];
    
    for (const fb of fallbackPresets) {
        if (recommended.length >= 6) break;
        if (!addedKeys.has(fb.name.toLowerCase())) {
            addedKeys.add(fb.name.toLowerCase());
            recommended.push(fb);
        }
    }
    
    return {
        commands,
        quickAddChoices,
        all,
        recommended
    };
}

// Autocomplete suggestions provider (backwards-compatible)
function getActionSuggestions() {
    return inspectVaultActions().all;
}

const COLOR_PRESETS = [
    { name: "Neon Blue", value: "#38bdf8", color: "#38bdf8" },
    { name: "Emerald", value: "#10b981", color: "#10b981" },
    { name: "Amber", value: "#f59e0b", color: "#f59e0b" },
    { name: "Purple", value: "#a100ff", color: "#a100ff" },
    { name: "Rainbow", value: "rainbow", color: "linear-gradient(135deg, #ff007f, #00f3ff, #ffe600, #a100ff)" },
    { name: "Indigo", value: "#6366f1", color: "#6366f1" },
    { name: "Rose Pink", value: "#ec4899", color: "#ec4899" },
    { name: "Crimson", value: "#ef4444", color: "#ef4444" },
    { name: "Slate Gray", value: "#64748b", color: "#64748b" }
];


// ==========================================
// 3. UI GENERATION & MODALS
// ==========================================
const wrapper = document.createElement("div");
wrapper.className = "qa3-wrapper";
wrapper.appendChild(style.cloneNode(true));

const topBar = document.createElement("div");
topBar.className = "qa3-top-bar";

const headerText = document.createElement("div");
headerText.innerHTML = "Quick Actions";
headerText.className = "qa3-header-text";

const settingsBtn = document.createElement("button");
settingsBtn.className = "qa3-settings-btn";
settingsBtn.innerHTML = "⚙️";
settingsBtn.title = "Settings";

topBar.appendChild(headerText);
topBar.appendChild(settingsBtn);

const gridContainer = document.createElement("div");
gridContainer.className = "qa3-grid";

wrapper.appendChild(topBar);
wrapper.appendChild(gridContainer);

const renderGrid = () => {
    gridContainer.innerHTML = "";
    headerText.innerHTML = (config.settings && config.settings.heading !== undefined) ? config.settings.heading : "Quick Actions";
    
    const cols = parseInt(config.settings.columns) || 0;
    if (cols > 0) {
        gridContainer.style.setProperty("grid-template-columns", `repeat(${cols}, 1fr)`, "important");
    } else {
        gridContainer.style.setProperty("grid-template-columns", `repeat(auto-fit, minmax(220px, 1fr))`, "important");
    }

    if (config.buttons.length === 0) {
        gridContainer.innerHTML = `<div style="color: rgba(255,255,255,0.3); font-style: italic; width: 100%; text-align: center; padding: 12px; cursor: pointer;">No buttons found. Click Settings.</div>`;
        gridContainer.querySelector("div").onclick = () => showSettingsModal();
        return;
    }
    
    config.buttons.forEach(b => {
        const btn = document.createElement("button");
        btn.className = `qa3-btn`;
        btn.innerHTML = b.icon ? `${b.icon} ${b.text}` : b.text;
        
        const delayOffset = (parseInt(String(b.id).slice(-4)) % 2000) / 1000;
        
        if (b.color && b.color.toLowerCase() === "rainbow") {
            btn.classList.add("qa3-btn-cyberpunk");
            btn.style.animationDelay = `${delayOffset}s`;
        } else {
            btn.classList.add("qa3-btn-dynamic");
            let rgb = {r: 255, g: 179, b: 124}; 
            let hexStr = String(b.color || "#3b82f6").trim();
            if(!hexStr.startsWith('#')) hexStr = '#' + hexStr;
            
            try {
                let h = hexStr.replace('#', '');
                if(h.length === 3) h = h.split('').map(c=>c+c).join('');
                if(h.length === 6) {
                    rgb.r = parseInt(h.substring(0,2), 16);
                    rgb.g = parseInt(h.substring(2,4), 16);
                    rgb.b = parseInt(h.substring(4,6), 16);
                }
            } catch(e) {}
            
            btn.style.setProperty('--c-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
            btn.style.setProperty('--c-hex', hexStr);
            btn.style.animationDelay = `${delayOffset}s`;
        }
        
        btn.onclick = () => {
            let cleanChoiceName = (b.choice || "").replace(/^QuickAdd:\s*/i, "").trim();
            if (window.app && window.app.plugins && window.app.plugins.plugins.quickadd && window.app.plugins.plugins.quickadd.api) {
                try {
                    window.app.plugins.plugins.quickadd.api.executeChoice(cleanChoiceName);
                    return;
                } catch(e) {}
            }
            const cmd = window.app.commands.listCommands().find(c => 
                c.name === cleanChoiceName || c.id === cleanChoiceName || 
                c.name.toLowerCase() === cleanChoiceName.toLowerCase() ||
                c.name.toLowerCase().includes(cleanChoiceName.toLowerCase())
            );
            if (cmd) {
                window.app.commands.executeCommandById(cmd.id);
            } else {
                new Notice("⚠️ QuickAdd Choice or Command not found: " + cleanChoiceName);
            }
        };
        gridContainer.appendChild(btn);
    });
};

// --- ADD/EDIT MODAL ---
const showEditModal = (existingBtn, parentState = null) => {
    const isNew = !existingBtn;
    const btn = existingBtn || { id: Date.now().toString(), text: "", icon: "", choice: "", color: "#38bdf8" };
    
    const modal = document.createElement("div");
    modal.className = "qa3-modal-overlay";
    modal.innerHTML = `
        <div class="qa3-modal">
            <h3 style="margin: 0 0 20px 0; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; font-weight: 600;">
                ${isNew ? 'Add New Quick Action' : 'Edit Quick Action'}
            </h3>
            
            <div class="qa3-input-group">
                <label>Button Text</label>
                <input type="text" id="qa3-new-text" value="${btn.text.replace(/"/g, '&quot;')}" placeholder="e.g. New Meeting Note" />
            </div>
            
            <div class="qa3-input-group">
                <label>Icon (Optional)</label>
                <input type="text" id="qa3-new-icon" value="${btn.icon.replace(/"/g, '&quot;')}" placeholder="e.g. 📝" />
            </div>
            
            <div class="qa3-input-group" style="position: relative;">
                <label>QuickAdd Choice Name or Command</label>
                <input type="text" id="qa3-new-choice" value="${btn.choice.replace(/"/g, '&quot;')}" placeholder="e.g. Capture Idea or Open Settings" autocomplete="off" list="qa3-choice-datalist" />
                <datalist id="qa3-choice-datalist"></datalist>
                <div class="qa3-input-desc">Type to search choices & commands, or use ↑/↓ arrows and Enter.</div>
                
                
            </div>
            
            <div class="qa3-input-group">
                <label>Color Theme / Custom HEX</label>
                <select id="qa3-new-color-preset" style="margin-bottom: 8px; height: 38px !important; min-height: 38px !important; line-height: normal !important; font-size: 13px !important; padding: 6px 12px !important; box-sizing: border-box;">
                    <option value="custom">Use Custom HEX Code</option>
                    <option value="#38bdf8">Neon Blue (#38bdf8)</option>
                    <option value="#10b981">Emerald (#10b981)</option>
                    <option value="#f59e0b">Amber (#f59e0b)</option>
                    <option value="#a100ff">Purple (#a100ff)</option>
                    <option value="#6366f1">Indigo Purple (#6366f1)</option>
                    <option value="#ec4899">Rose Pink (#ec4899)</option>
                    <option value="#ef4444">Crimson Red (#ef4444)</option>
                    <option value="#64748b">Slate Gray (#64748b)</option>
                    <option value="rainbow">Cyberpunk Rainbow</option>
                </select>
                <input type="text" id="qa3-new-color" value="${btn.color.replace(/"/g, '&quot;')}" placeholder="e.g. #38bdf8 or rainbow" />
                
            </div>
            
            <div class="qa3-modal-actions" style="margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
                <button id="qa3-btn-cancel-edit" class="qa3-mod-btn">Cancel</button>
                <button id="qa3-btn-save-edit" class="qa3-mod-btn qa3-mod-primary">Save to List</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const presetSelect = modal.querySelector("#qa3-new-color-preset");
    const colorInput = modal.querySelector("#qa3-new-color");
    const choiceInput = modal.querySelector("#qa3-new-choice");
    const choiceDatalist = modal.querySelector("#qa3-choice-datalist");
    
    
    
    
    // Inspect vault for actions & populate datalist
    const vaultData = inspectVaultActions();
    if (choiceDatalist) {
        vaultData.all.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.name;
            opt.label = `[${item.type}] ${item.name}`;
            choiceDatalist.appendChild(opt);
        });
    }

    // Populate clickable suggestion pills below choice/action input
    

    // Populate color preset pills
    

    const matchedPreset = Array.from(presetSelect.options).find(opt => opt.value.toLowerCase() === (btn.color || "").toLowerCase());
    if (matchedPreset) {
        presetSelect.value = matchedPreset.value;
        if (btn.color === 'rainbow') colorInput.style.display = 'none';
    } else {
        presetSelect.value = "custom";
    }
    

    presetSelect.onchange = (e) => {
        if (e.target.value === "rainbow") {
            colorInput.value = "rainbow";
            colorInput.style.display = "none";
        } else if (e.target.value !== "custom") {
            colorInput.value = e.target.value;
            colorInput.style.display = "block";
        } else {
            colorInput.style.display = "block";
        }
        
    };
    
    colorInput.oninput = () => {
        const matched = Array.from(presetSelect.options).find(opt => opt.value.toLowerCase() === colorInput.value.trim().toLowerCase());
        if (matched) {
            presetSelect.value = matched.value;
        } else if (colorInput.value !== "rainbow") {
            presetSelect.value = "custom";
        }
        
    };

    
    
    modal.querySelector("#qa3-btn-cancel-edit").onclick = () => {
        modal.remove();
        showSettingsModal(parentState);
    };
    
    modal.querySelector("#qa3-btn-save-edit").onclick = async () => {
        const text = modal.querySelector("#qa3-new-text").value.trim();
        const icon = modal.querySelector("#qa3-new-icon").value.trim();
        const choice = modal.querySelector("#qa3-new-choice").value.trim();
        const color = modal.querySelector("#qa3-new-color").value.trim();
        
        if (!text || !choice) {
            new Notice("Button Text and QuickAdd Choice are required!");
            return;
        }
        
        btn.text = text;
        btn.icon = icon;
        btn.choice = choice;
        btn.color = color;
        
        if (isNew) {
            btn.id = Date.now().toString();
            if (parentState && Array.isArray(parentState.buttons)) {
                parentState.buttons.push(btn);
            } else {
                config.buttons.push(btn);
            }
        }
        
        modal.remove();
        showSettingsModal(parentState);
    };
};

// --- SETTINGS DASHBOARD MODAL ---
let settingsModalInstance = null;
const showSettingsModal = (incomingState = null) => {
    if (settingsModalInstance) settingsModalInstance.remove();
    
    settingsModalInstance = document.createElement("div");
    settingsModalInstance.className = "qa3-modal-overlay";
    
    let tempButtons = (incomingState && incomingState.buttons) ? incomingState.buttons : JSON.parse(JSON.stringify(config.buttons));
    let initialHeading = (incomingState && incomingState.heading !== undefined) ? incomingState.heading : ((config.settings && config.settings.heading !== undefined) ? config.settings.heading : "Quick Actions");
    let initialColumns = (incomingState && incomingState.columns !== undefined) ? incomingState.columns : (config.settings.columns || 0);
    let selectedProfVal = (incomingState && incomingState.selectedProfile) ? incomingState.selectedProfile : activeProfile;
    let newProfNameVal = (incomingState && incomingState.newProfileName) ? incomingState.newProfileName : "";
    
    const inner = document.createElement("div");
    inner.className = "qa3-modal";
    inner.style.width = "620px";
    inner.style.maxWidth = "92vw";
    
    inner.innerHTML = `
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            ⚙️ Quick Action Settings
        </h3>

        <div class="qa3-input-group">
            <label>Profile</label>
            <select id="qa3-profile-select" style="height: 38px !important; min-height: 38px !important; line-height: normal !important; font-size: 13px !important; padding: 6px 12px !important; box-sizing: border-box;">
                <option value="${activeProfile}">[Current: ${activeProfile}]</option>
                <option value="__new__">+ Create New Named Profile...</option>
            </select>
        </div>

        <div class="qa3-input-group" id="qa3-new-profile-group" style="display: none; background: rgba(46,170,220,0.06); padding: 12px; border: 1px dashed rgba(46,170,220,0.3); border-radius: 4px;">
            <label style="color: #2EAADC; font-weight: 600; margin-bottom: 6px;">New Profile Name</label>
            <input type="text" id="qa3-new-profile-name" value="${newProfNameVal.replace(/"/g, '&quot;')}" placeholder="e.g. sidebar, daily, dashboard" style="margin-bottom: 6px;" />
            <div class="qa3-input-desc" style="margin-bottom: 8px;">Enter a unique name. Configuration will be saved as quick-actions--[name].json.</div>
            <div style="margin-top: 10px;">
                <label class="qa3-checkbox-label">
                    <input type="checkbox" id="qa3-copy-buttons-check" class="qa3-custom-check" />
                    <span class="qa3-check-box">
                        <svg class="qa3-check-svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3.5 8.5 6.5 11.5 12.5 5.5"></polyline>
                        </svg>
                    </span>
                    <span style="font-size: 12.5px; color: #ffffff; font-weight: 500;">Copy current buttons to new profile</span>
                </label>
            </div>
        </div>

        <div class="qa3-input-group">
            <label>Widget Heading</label>
            <input type="text" id="qa3-set-heading" value="${(initialHeading || '').replace(/"/g, '&quot;')}" placeholder="e.g. Quick Actions" />
        </div>
        
        <div class="qa3-input-group">
            <label>Buttons per Row (0 for auto-fit)</label>
            <input type="number" id="qa3-set-columns" value="${initialColumns}" min="0" max="10" />
        </div>

        <label style="display: block; font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 6px; font-weight: 500;">
            Manage Buttons (Drag ☰ to reorder)
        </label>
        <div id="qa3-list-container" class="qa3-remove-list"></div>
        
        <button id="qa3-btn-add-new" class="qa3-mod-btn qa3-mod-primary" style="width: 100%; margin-top: 10px;">+ Add New Button</button>
        
        <div class="qa3-input-group" style="position: relative; margin-top: 14px; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.15);">
            <label style="display: block; font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 6px; font-weight: 500;">
                Quick Add Action (Choice or Command)
            </label>
            <div style="display: flex; gap: 8px;">
                <input type="text" id="qa3-settings-choice" placeholder="e.g. Daily Note, Switcher, or QuickAdd choice..." autocomplete="off" list="qa3-settings-choice-datalist" style="flex: 1;" />
                <button id="qa3-btn-quick-add" class="qa3-mod-btn qa3-mod-primary" style="white-space: nowrap; padding: 6px 14px; font-size: 13px;">+ Add</button>
            </div>
            <datalist id="qa3-settings-choice-datalist"></datalist>
            
            
        </div>
        
        <div class="qa3-modal-actions" style="margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
            <button id="qa3-btn-cancel-settings" class="qa3-mod-btn">Cancel</button>
            <button id="qa3-btn-save-settings" class="qa3-mod-btn qa3-mod-primary">Save Settings</button>
        </div>
    `;
    
    settingsModalInstance.appendChild(inner);
    document.body.appendChild(settingsModalInstance);
    
    const listContainer = inner.querySelector("#qa3-list-container");
    const profileSelect = inner.querySelector("#qa3-profile-select");
    const newProfGroup = inner.querySelector("#qa3-new-profile-group");
    const newProfInput = inner.querySelector("#qa3-new-profile-name");

    const getSnapshotState = () => {
        return {
            selectedProfile: profileSelect.value,
            newProfileName: newProfInput ? newProfInput.value.trim() : "",
            columns: parseInt(inner.querySelector("#qa3-set-columns").value) || 0,
            buttons: tempButtons
        };
    };

    if (selectedProfVal === "__new__") {
        newProfGroup.style.display = "block";
    }

    // Populate profile dropdown
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
            const copyCheck = inner.querySelector("#qa3-copy-buttons-check");
            const isCopy = copyCheck ? copyCheck.checked : false;
            tempButtons = isCopy ? JSON.parse(JSON.stringify(config.buttons)) : [];
            renderList();
            return;
        }
        
        newProfGroup.style.display = "none";
        await loadProfileData(chosen);
        tempButtons = JSON.parse(JSON.stringify(config.buttons));
        inner.querySelector("#qa3-set-heading").value = (config.settings && config.settings.heading !== undefined) ? config.settings.heading : "Quick Actions";
        inner.querySelector("#qa3-set-columns").value = config.settings.columns || 0;
        renderList();
    };

    const copyCheck = inner.querySelector("#qa3-copy-buttons-check");
    if (copyCheck) {
        copyCheck.onchange = (e) => {
            if (e.target.checked) {
                tempButtons = JSON.parse(JSON.stringify(config.buttons));
            } else {
                tempButtons = [];
            }
            renderList();
        };
    }
    
    const renderList = () => {
        listContainer.innerHTML = "";
        if (tempButtons.length === 0) {
            listContainer.innerHTML = `<div style="color: rgba(255,255,255,0.5); font-style: italic; padding: 10px;">No buttons added yet.</div>`;
            return;
        }
        
        let draggedIndex = null;
        
        tempButtons.forEach((b, index) => {
            const item = document.createElement("div");
            item.className = "qa3-remove-item";
            item.draggable = true;
            
            item.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="qa3-drag-handle">☰</span>
                    <span style="font-size: 14px; font-weight: 500;">${b.icon ? b.icon + ' ' : ''}${b.text}</span>
                </div>
                <div style="display: flex; gap: 6px;">
                    <button class="qa3-edit-btn" data-id="${b.id}">✏️ Edit</button>
                    <button class="qa3-del-btn" data-id="${b.id}">🗑️</button>
                </div>
            `;
            
            item.addEventListener("dragstart", (e) => {
                draggedIndex = index;
                e.dataTransfer.effectAllowed = "move";
                setTimeout(() => item.style.opacity = "0.4", 0);
            });
            item.addEventListener("dragend", () => {
                item.style.opacity = "1";
                draggedIndex = null;
                item.classList.remove("qa3-drag-over");
            });
            item.addEventListener("dragover", (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                item.classList.add("qa3-drag-over");
            });
            item.addEventListener("dragleave", () => item.classList.remove("qa3-drag-over"));
            item.addEventListener("drop", (e) => {
                e.preventDefault();
                item.classList.remove("qa3-drag-over");
                if (draggedIndex === null || draggedIndex === index) return;
                
                const draggedBtn = tempButtons.splice(draggedIndex, 1)[0];
                tempButtons.splice(index, 0, draggedBtn);
                renderList(); 
            });
            
            item.querySelector(".qa3-edit-btn").onclick = () => {
                const state = getSnapshotState();
                settingsModalInstance.remove();
                showEditModal(b, state);
            };
            
            item.querySelector(".qa3-del-btn").onclick = () => {
                tempButtons = tempButtons.filter(x => x.id !== b.id);
                renderList();
            };
            
            listContainer.appendChild(item);
        });
    };
    
    renderList();
    
    inner.querySelector("#qa3-btn-add-new").onclick = () => {
        const state = getSnapshotState();
        settingsModalInstance.remove();
        showEditModal(null, state);
    };

    const settingsChoiceInput = inner.querySelector("#qa3-settings-choice");
    const settingsChoiceDatalist = inner.querySelector("#qa3-settings-choice-datalist");
    
    
    const quickAddBtn = inner.querySelector("#qa3-btn-quick-add");
    
    const vaultDataSettings = inspectVaultActions();
    
    // Attach and populate <datalist> in settings modal
    if (settingsChoiceDatalist) {
        vaultDataSettings.all.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.name;
            opt.label = `[${item.type}] ${item.name}`;
            settingsChoiceDatalist.appendChild(opt);
        });
    }

    const addActionToButtons = (actionName, label = null, icon = null) => {
        if (!actionName) return;
        const cleanName = actionName.replace(/^QuickAdd:\s*/i, "").trim();
        const displayLabel = label || cleanName;
        const displayIcon = icon || (actionName.toLowerCase().includes("daily") ? "📅" : (actionName.toLowerCase().includes("switcher") ? "🔍" : (actionName.toLowerCase().includes("palette") ? "⚡" : "📝")));
        const newBtn = {
            id: Date.now().toString(),
            text: displayLabel,
            icon: displayIcon,
            choice: actionName,
            color: "#38bdf8"
        };
        tempButtons.push(newBtn);
        renderList();
        if (settingsChoiceInput) settingsChoiceInput.value = "";
        
        new Notice(`Added: ${displayLabel}`);
    };

    if (quickAddBtn) {
        quickAddBtn.onclick = () => {
            const val = (settingsChoiceInput.value || "").trim();
            if (!val) {
                new Notice("Please select or enter an action first!");
                return;
            }
            addActionToButtons(val);
        };
    }

    

    if (settingsChoiceInput) {
        settingsChoiceInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (quickAddBtn) quickAddBtn.click();
            }
        });
    }
    
    inner.querySelector("#qa3-btn-cancel-settings").onclick = () => {
        settingsModalInstance.remove();
    };
    
    inner.querySelector("#qa3-btn-save-settings").onclick = async () => {
        const selectedProfile = profileSelect.value;
        const headingVal = (inner.querySelector("#qa3-set-heading").value || "").trim();
        const saveHeading = headingVal !== "" ? headingVal : "Quick Actions";
        const cols = parseInt(inner.querySelector("#qa3-set-columns").value) || 0;
        
        let targetProfile = selectedProfile;
        
        if (selectedProfile === "__new__") {
            const rawName = (newProfInput.value || "").trim();
            const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_');
            if (!cleanName) {
                new Notice("⚠️ Please enter a name for the new profile!");
                newProfInput.focus();
                return;
            }
            targetProfile = cleanName;
            
            await saveProfileConfig(targetProfile, { settings: { columns: cols, heading: saveHeading }, buttons: tempButtons });
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        } else if (selectedProfile === defaultProfileKey) {
            targetProfile = defaultProfileKey;
            await saveProfileConfig(targetProfile, { settings: { columns: cols, heading: saveHeading }, buttons: tempButtons });
            activeProfile = targetProfile;
        } else {
            targetProfile = selectedProfile;
            await saveProfileConfig(targetProfile, { settings: { columns: cols, heading: saveHeading }, buttons: tempButtons });
            await saveNotePointer(targetProfile);
            activeProfile = targetProfile;
        }
        
        config.buttons = tempButtons;
        config.settings.columns = cols;
        config.settings.heading = saveHeading;
        config.profile = activeProfile;
        
        renderGrid();
        settingsModalInstance.remove();
        new Notice(`Settings Saved!`);
    };
};

settingsBtn.onclick = () => showSettingsModal();

// Execute
loadConfig().then(() => {
    renderGrid();
    dv.container.appendChild(wrapper);
});