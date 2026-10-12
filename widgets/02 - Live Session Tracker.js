// ==========================================
// 2. UNIVERSAL ACTIVITY / LIVE SESSION TRACKER
// ==========================================

(async function() {
    // ------------------------------------------
    // CONFIGURATION & MULTI-PROFILE ARCHITECTURE
    // ------------------------------------------
    const CONFIG_DIR = `${app.vault.configDir}/HUD Config`;
    const WIDGET_ID = "live-session-tracker";

    const DEFAULT_CONFIG = {
        heading: "LIVE SESSION TRACKER",
        activitiesFolder: "",
        logFolder: "",
        startTimeProp: "",
        endTimeProp: "",
        gameProp: "",
        baseLink: "",
        useAcronym: true,
        startCommand: "",
        endCommand: "",
        termTitle: "⚡ SESSION CONTROLS"
    };

    const currentNote = dv.current();
    const notePath = currentNote?.file?.path?.replace(/\.md$/i, '') || 'default';
    const defaultProfileKey = notePath.replace(/[^a-zA-Z0-9_-]/g, '_');

    async function ensureConfigDir() {
        try {
            if (!(await app.vault.adapter.exists(CONFIG_DIR))) {
                await app.vault.adapter.mkdir(CONFIG_DIR);
            }
        } catch (e) {
            console.error("Failed to ensure HUD Config directory:", e);
        }
    }

    function getProfilePath(profileName) {
        return `${CONFIG_DIR}/${WIDGET_ID}--${profileName}.json`;
    }

    async function getProfileConfig(profileName) {
        if (!profileName) return { ...DEFAULT_CONFIG };
        const pPath = getProfilePath(profileName);
        if (await app.vault.adapter.exists(pPath)) {
            try {
                const raw = await app.vault.adapter.read(pPath);
                let d = JSON.parse(raw);
                if (d && typeof d === 'object') {
                    const hasFields = ['heading', 'activitiesFolder', 'logFolder', 'gameProp', 'startTimeProp', 'endTimeProp'].some(k => d[k] !== undefined);
                    if (hasFields) {
                        const clean = { ...DEFAULT_CONFIG, ...d };
                        delete clean.mirrors;
                        return clean;
                    }
                }
            } catch (e) {
                console.error("Failed to read profile config:", e);
            }
        }
        return { ...DEFAULT_CONFIG };
    }

    async function loadConfig() {
        await ensureConfigDir();
        const noteConfigPath = getProfilePath(defaultProfileKey);
        let targetProfile = null;

        // Check if note-specific config exists
        if (await app.vault.adapter.exists(noteConfigPath)) {
            try {
                const raw = await app.vault.adapter.read(noteConfigPath);
                const data = JSON.parse(raw);
                if (data && data.mirrors && typeof data.mirrors === 'string') {
                    targetProfile = data.mirrors;
                } else if (data) {
                    return {
                        config: { ...DEFAULT_CONFIG, ...data },
                        profileName: defaultProfileKey,
                        isMirrored: false
                    };
                }
            } catch (e) {
                console.error("Failed to read note config:", e);
            }
        }

        // If mirroring is active, load target profile
        if (targetProfile) {
            const targetPath = getProfilePath(targetProfile);
            if (await app.vault.adapter.exists(targetPath)) {
                try {
                    const raw = await app.vault.adapter.read(targetPath);
                    const data = JSON.parse(raw);
                    return {
                        config: { ...DEFAULT_CONFIG, ...data },
                        profileName: targetProfile,
                        isMirrored: true
                    };
                } catch (e) {
                    console.error("Failed to read mirrored profile config:", e);
                }
            }
        }

        return {
            config: { ...DEFAULT_CONFIG },
            profileName: defaultProfileKey,
            isMirrored: false
        };
    }

    async function listProfiles() {
        await ensureConfigDir();
        const profiles = new Set();
        profiles.add(defaultProfileKey);
        try {
            const list = await app.vault.adapter.list(CONFIG_DIR);
            if (list && list.files) {
                for (const file of list.files) {
                    const filename = file.split(/[\\/]/).pop();
                    const m = filename.match(/^(?:live-session-tracker|gaming-terminal)--(.+)\.json$/);
                    if (m && m[1]) profiles.add(m[1]);
                }
            }
        } catch (e) {
            console.error("Failed to list profiles:", e);
        }
        return Array.from(profiles);
    }

    // ------------------------------------------
    // STYLES
    // ------------------------------------------
    document.querySelectorAll("style[id^='obsidian-hud-live-session-tracker'], style[id^='obsidian-hud-gaming-terminal']").forEach(el => el.remove());

    const style = document.createElement("style");
    style.id = "obsidian-hud-live-session-tracker-v2";
    style.innerHTML = `
        @keyframes hudCmdScan {
            0% { top: -20%; opacity: 0; }
            50% { opacity: 0.12; }
            100% { top: 120%; opacity: 0; }
        }
        @keyframes hudCmdPulseRec { 
            0%, 100% { opacity: 1; text-shadow: 0 0 6px rgba(248, 113, 113, 0.8); color: #f87171; } 
            50% { opacity: 0.45; text-shadow: none; color: #ef4444; } 
        }
        @keyframes hudCmdEq { 
            0%, 100% { height: 4px; } 
            50% { height: 16px; } 
        }
        @keyframes hudCmdButtonPulseRed {
            0%, 100% { border-color: rgba(248, 113, 113, 0.35); color: #f87171; text-shadow: 0 0 3px rgba(248, 113, 113, 0.3); box-shadow: 0 0 4px rgba(248, 113, 113, 0.1); }
            50% { border-color: rgba(248, 113, 113, 0.85); color: #ff85a1; text-shadow: 0 0 8px rgba(248, 113, 113, 0.65); box-shadow: 0 0 12px rgba(248, 113, 113, 0.25); }
        }
        @keyframes hudCmdButtonPulseLime {
            0%, 100% { border-color: rgba(163, 230, 53, 0.35); color: #bef264; text-shadow: 0 0 3px rgba(163, 230, 53, 0.3); box-shadow: 0 0 4px rgba(163, 230, 53, 0.1); }
            50% { border-color: rgba(163, 230, 53, 0.85); color: #d9f99d; text-shadow: 0 0 8px rgba(163, 230, 53, 0.65); box-shadow: 0 0 12px rgba(163, 230, 53, 0.25); }
        }
        @keyframes hudCmdButtonScanSheen {
            0% { left: -100%; opacity: 0; }
            20% { opacity: 0.3; }
            50% { left: 120%; opacity: 0; }
            100% { left: 120%; opacity: 0; }
        }

        .hud-cmd-container-term { 
            display: flex; flex-direction: column; width: 100%; 
            font-family: 'JetBrains Mono', 'Courier New', monospace; 
            color: #a1a1aa; background: #09090b; padding: 12px 18px 18px 18px; border-radius: 4px;
            border: 1px dashed rgba(255, 255, 255, 0.15); box-sizing: border-box;
            position: relative;
        }

        .hud-cmd-session-btn, .hud-cmd-game-btn {
            height: 58px; border-radius: 2px; font-weight: 800; font-size: 13px;
            cursor: pointer; transition: transform 0.2s ease, filter 0.2s ease;
            display: flex; align-items: center; justify-content: center; gap: 10px;
            letter-spacing: 1.2px; text-transform: uppercase; font-family: inherit;
            position: relative; box-sizing: border-box; background: #121215 !important;
            overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.2); width: 100%;
        }
        .hud-cmd-session-btn::after, .hud-cmd-game-btn::after {
            content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
            pointer-events: none; animation: hudCmdButtonScanSheen 4.5s infinite linear;
        }
        .hud-cmd-btn-start { animation: hudCmdButtonPulseLime 3.2s infinite ease-in-out; animation-delay: 0.4s; }
        .hud-cmd-btn-start::after { animation-delay: 0.6s; }
        .hud-cmd-btn-end { animation: hudCmdButtonPulseRed 3.2s infinite ease-in-out; animation-delay: 1.2s; }
        .hud-cmd-btn-end::after { animation-delay: 1.8s; }
        .hud-cmd-session-btn:hover, .hud-cmd-game-btn:hover { filter: brightness(1.4); transform: translateY(-2px); }
        .hud-cmd-session-btn:active, .hud-cmd-game-btn:active { transform: translateY(1px); filter: brightness(0.9); }

        .hud-cmd-session-terminal, .hud-cmd-gaming-terminal {
            background: #000000; border: 1px dotted rgba(255, 255, 255, 0.15);
            border-radius: 2px; padding: 20px; 
            display: grid; grid-template-columns: 280px 1fr; gap: 20px;
            position: relative; box-sizing: border-box; overflow: hidden;
        }
        @media (max-width: 800px) { .hud-cmd-session-terminal, .hud-cmd-gaming-terminal { grid-template-columns: 1fr; } }
        
        .hud-cmd-session-terminal::after, .hud-cmd-gaming-terminal::after {
            content: ''; position: absolute; left: 0; right: 0; height: 35px;
            background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.08), transparent);
            pointer-events: none; animation: hudCmdScan 9s ease-in-out infinite; z-index: 1;
        }
        .hud-cmd-bracket-tl { position: absolute; top: -1px; left: -1px; width: 8px; height: 8px; border-top: 1px solid #ffffff; border-left: 1px solid #ffffff; z-index: 2; pointer-events: none; }
        .hud-cmd-bracket-br { position: absolute; bottom: -1px; right: -1px; width: 8px; height: 8px; border-bottom: 1px solid #ffffff; border-right: 1px solid #ffffff; z-index: 2; pointer-events: none; }
        
        .hud-cmd-term-controls { display: flex; flex-direction: column; justify-content: center; gap: 14px; border-right: 1px dotted rgba(255, 255, 255, 0.2); padding-right: 20px; z-index: 5; }
        .hud-cmd-term-title { color: #ffffff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 800; margin-bottom: 2px; text-align: center; }
        
        .hud-cmd-term-hud {
            border-radius: 2px; display: flex; flex-direction: column; justify-content: center; min-height: 140px;
            transition: all 0.3s ease; position: relative; z-index: 5; box-sizing: border-box;
        }

        .hud-cmd-idle {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            height: 100%; border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 2px;
            padding: 24px; position: relative; overflow: hidden; background: #000000;
        }
        .hud-cmd-idle-icon { font-size: 24px; margin-bottom: 4px; }
        .hud-cmd-idle-title { color: #e4e4e7; font-size: 14px; font-weight: 800; letter-spacing: 2.5px; }
        .hud-cmd-idle-sub { color: #d4d4d8; font-size: 11.5px; letter-spacing: 1.5px; margin-top: 4px; }

        .hud-cmd-active {
            display: flex; flex-direction: column; justify-content: space-between;
            height: 100%; border: 1px solid rgba(45, 212, 191, 0.4); border-radius: 2px;
            padding: 16px; position: relative; overflow: hidden; background: #000000;
            box-shadow: 0 0 15px rgba(45, 212, 191, 0.05);
        }
        .hud-cmd-header { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .hud-cmd-activity-title, .hud-cmd-game-title { 
            font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: 2px; 
            text-transform: uppercase; text-shadow: 0 0 10px rgba(45, 212, 191, 0.4);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
            text-align: center; margin: 4px 0;
        }
        .hud-cmd-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
        .hud-cmd-stat-box { 
            background: rgba(255, 255, 255, 0.03); border: 1px dotted rgba(255, 255, 255, 0.2); 
            padding: 8px 12px; border-radius: 2px; display: flex; flex-direction: column; gap: 3px;
        }
        .hud-cmd-stat-label { font-size: 8.5px; color: #71717a; letter-spacing: 1.2px; font-weight: 700; }
        .hud-cmd-stat-value { font-size: 13px; font-weight: 800; color: #ffffff; letter-spacing: 1px; }

        .hud-cmd-top-bar {
            display: flex; align-items: center; justify-content: center;
            width: 100%; position: relative; min-height: 28px; margin-bottom: 10px;
        }

        .hud-cmd-top-title {
            color: #ffffff !important; font-size: 15px !important; text-transform: uppercase !important;
            letter-spacing: 2.5px !important; font-weight: 800 !important; font-family: inherit !important;
            text-align: center !important; text-shadow: 0 0 10px rgba(255, 255, 255, 0.35) !important;
            line-height: 1 !important;
        }

        .hud-cmd-settings-btn {
            position: absolute; right: 0; top: 50%; transform: translateY(-50%);
            background: #121215 !important; border: 1px solid rgba(255, 255, 255, 0.2);
            color: #e4e4e7; font-family: inherit; font-size: 13px; font-weight: 700;
            width: 28px; height: 28px; padding: 0; border-radius: 4px; cursor: pointer; transition: all 0.2s ease;
            display: inline-flex; align-items: center; justify-content: center; z-index: 5;
        }
        .hud-cmd-settings-btn:hover {
            border-color: #2dd4bf; color: #2dd4bf; background: rgba(45, 212, 191, 0.1) !important;
        }

        /* Picker Modal */
        .hud-picker-modal {
            background: #09090b; border: 1px solid #2dd4bf; border-radius: 4px;
            padding: 22px; width: 480px; max-width: 92vw; color: #e4e4e7;
            box-shadow: 0 14px 40px rgba(0,0,0,0.95), 0 0 16px rgba(45, 212, 191, 0.2);
            box-sizing: border-box; display: flex; flex-direction: column; gap: 14px;
            font-family: 'JetBrains Mono', 'Courier New', monospace; position: relative;
        }
        .hud-picker-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 10px 14px; background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 2px;
            cursor: pointer; transition: all 0.15s ease;
        }
        .hud-picker-item:hover, .hud-picker-item.active {
            background: rgba(45, 212, 191, 0.15); border-color: #2dd4bf;
            color: #ffffff; transform: translateX(3px);
        }
        .hud-picker-badge {
            font-size: 10px; font-weight: 800; background: rgba(45, 212, 191, 0.2);
            color: #2dd4bf; padding: 2px 7px; border-radius: 2px; letter-spacing: 1px;
        }
    `;
    document.head.appendChild(style);

    // ------------------------------------------
    // VAULT INTROSPECTION HELPERS
    // ------------------------------------------
    function getVaultFolders() {
        try {
            const folders = new Set();
            if (app?.vault?.getAllLoadedFiles) {
                const files = app.vault.getAllLoadedFiles();
                for (const f of files) {
                    if (f.children) {
                        folders.add(f.path);
                    }
                }
            }
            return Array.from(folders).filter(f => f && f !== "/").sort();
        } catch (e) {
            console.error("Error getting vault folders:", e);
            return [];
        }
    }

    function getVaultProperties() {
        try {
            const props = new Set();
            if (app?.metadataCache?.getAllPropertyInfos) {
                const infos = app.metadataCache.getAllPropertyInfos();
                for (const key of Object.keys(infos)) {
                    if (key && !key.startsWith("_")) props.add(key);
                }
            }
            if (app?.vault?.getMarkdownFiles) {
                const mdFiles = app.vault.getMarkdownFiles().slice(0, 200);
                for (const f of mdFiles) {
                    const cache = app.metadataCache.getFileCache(f);
                    if (cache?.frontmatter) {
                        for (const k of Object.keys(cache.frontmatter)) {
                            if (k && k !== "position") props.add(k);
                        }
                    }
                }
            }
            return Array.from(props).sort();
        } catch (e) {
            console.error("Error getting vault properties:", e);
            return [];
        }
    }

    function getCommandSuggestions() {
        try {
            const commands = new Set();
            if (app?.commands?.listCommands) {
                const list = app.commands.listCommands();
                for (const cmd of list) {
                    if (cmd.name) commands.add(cmd.name);
                    if (cmd.id) commands.add(cmd.id);
                }
            }
            return Array.from(commands).sort();
        } catch (e) {
            return [];
        }
    }

    // ------------------------------------------
    // ACRONYM GENERATOR
    // ------------------------------------------
    function generateAcronym(name) {
        if (!name) return "ACT";
        const words = name.split(/\s+/);
        let acronym = words
            .map(w => w.replace(/[^a-zA-Z0-9]/g, ""))
            .filter(w => w.length > 0)
            .map(w => w.charAt(0).toUpperCase())
            .join("");
        return acronym || name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 4) || "ACT";
    }

    // ------------------------------------------
    // NATIVE SESSION ENGINE
    // ------------------------------------------
    async function nativeStartSession(config) {
        const actFolder = (config.activitiesFolder || DEFAULT_CONFIG.activitiesFolder || "").trim().replace(/^\/+|\/+$/g, '');
        const logFolder = (config.logFolder || DEFAULT_CONFIG.logFolder || "").trim().replace(/^\/+|\/+$/g, '');
        const startTimeProp = (config.startTimeProp || DEFAULT_CONFIG.startTimeProp || "").trim();
        const endTimeProp = (config.endTimeProp || DEFAULT_CONFIG.endTimeProp || "").trim();
        const gameProp = (config.gameProp || DEFAULT_CONFIG.gameProp || "").trim();
        const useAcronym = config.useAcronym !== false;
        const baseLink = (config.baseLink || "").trim();

        if (!actFolder) {
            new Notice("⚠️ Please configure an Activities folder in settings (⚙️)!");
            return;
        }
        if (!logFolder) {
            new Notice("⚠️ Please configure a Session Logs folder in settings (⚙️)!");
            return;
        }
        if (!gameProp || !startTimeProp || !endTimeProp) {
            new Notice("⚠️ Please configure Activity, Start Time, and End Time properties in settings (⚙️)!");
            return;
        }

        // 1. Get all candidate activity notes
        const allFiles = app.vault.getMarkdownFiles();
        const activityFiles = allFiles
            .filter(f => f.path.startsWith(actFolder + "/") || f.path === actFolder + ".md")
            .map(f => f.basename);

        if (activityFiles.length === 0) {
            new Notice(`⚠️ No notes found inside '${actFolder}'!`);
            return;
        }

        // 2. Open interactive Activity Picker Modal
        openActivityPicker(activityFiles, async (selectedActivity) => {
            if (!selectedActivity) return;

            const nowIso = moment().format("YYYY-MM-DDTHH:mm:ss");
            const endFormatted = moment().format("DD-MM-YY hh:mm:ss A");
            const startFormatted = moment().format("DD-MM-YY hh:mm:ss A");

            // 3. Auto-close any un-ended sessions in logFolder
            const logFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith(logFolder + "/"));
            for (const file of logFiles) {
                const cache = app.metadataCache.getFileCache(file);
                const fm = cache ? cache.frontmatter : null;
                if (fm && fm[startTimeProp] && (!fm[endTimeProp] || fm[endTimeProp] === "")) {
                    await app.fileManager.processFrontMatter(file, (f) => {
                        f[endTimeProp] = nowIso;
                    });
                    await app.vault.append(file, `Ended: ${endFormatted}\n`);
                    const prevAct = fm[gameProp] || "Previous activity";
                    new Notice(`ℹ️ Auto-closed previous session for ${prevAct}`);
                }
            }

            // 4. Ensure target folder exists
            const targetSubFolder = `${logFolder}/${selectedActivity}`;
            if (!(await app.vault.adapter.exists(targetSubFolder))) {
                await app.vault.createFolder(targetSubFolder).catch(() => {});
            }

            // 5. Generate filename: <ACRONYM/NAME> - <DDMMYY-HHmm AM/PM>.md
            const acronym = generateAcronym(selectedActivity);
            const prefix = useAcronym ? acronym : selectedActivity;
            const timeStamp = moment().format("DDMMYY-hhmmA");
            const logFileName = `${targetSubFolder}/${prefix} - ${timeStamp}.md`;

            // 6. Write note content
            let frontmatterBlock = `---\n`;
            if (baseLink) frontmatterBlock += `base: "${baseLink}"\n`;
            frontmatterBlock += `${gameProp}:\n  - "[[${selectedActivity}]]"\n`;
            frontmatterBlock += `${startTimeProp}: ${nowIso}\n`;
            frontmatterBlock += `${endTimeProp}: \n---\n`;

            const bodyContent = `# 🎮 ${selectedActivity} Session\nStarted: ${startFormatted}\n`;
            const fullContent = frontmatterBlock + bodyContent;

            try {
                await app.vault.create(logFileName, fullContent);
                new Notice(`🚀 Started session for ${selectedActivity}!`);
                await renderWidget({ [gameProp]: `[[${selectedActivity}]]`, [startTimeProp]: nowIso });
                return;
            } catch (err) {
                new Notice(`❌ Failed to create session note: ${err.message}`);
            }

            await renderWidget();
        });
    }

    async function nativeEndSession(config) {
        const logFolder = (config.logFolder || DEFAULT_CONFIG.logFolder || "").trim().replace(/^\/+|\/+$/g, '');
        const startTimeProp = (config.startTimeProp || DEFAULT_CONFIG.startTimeProp || "").trim();
        const endTimeProp = (config.endTimeProp || DEFAULT_CONFIG.endTimeProp || "").trim();
        const gameProp = (config.gameProp || DEFAULT_CONFIG.gameProp || "").trim();

        if (!logFolder || !startTimeProp || !endTimeProp) {
            new Notice("⚠️ Please configure Session Logs folder and properties in settings (⚙️)!");
            return;
        }

        const logFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith(logFolder + "/"));
        let activeLog = null;
        let latestStart = "";

        for (const file of logFiles) {
            const cache = app.metadataCache.getFileCache(file);
            const fm = cache ? cache.frontmatter : null;
            if (fm && fm[startTimeProp] && (!fm[endTimeProp] || fm[endTimeProp] === "")) {
                const sTime = String(fm[startTimeProp]);
                if (sTime > latestStart) {
                    latestStart = sTime;
                    activeLog = file;
                }
            }
        }

        if (!activeLog) {
            new Notice("⚠️ No active session found to end!");
            return;
        }

        const nowIso = moment().format("YYYY-MM-DDTHH:mm:ss");
        const endFormatted = moment().format("DD-MM-YY hh:mm:ss A");

        await app.fileManager.processFrontMatter(activeLog, (fm) => {
            fm[endTimeProp] = nowIso;
        });
        await app.vault.append(activeLog, `Ended: ${endFormatted}\n`);

        const cache = app.metadataCache.getFileCache(activeLog);
        const gameVal = cache?.frontmatter ? cache.frontmatter[gameProp] : null;
        const actName = Array.isArray(gameVal) ? gameVal[0] : (gameVal || "Session");

        new Notice(`🛑 Ended session for ${actName}!`);
        await renderWidget(null, true);
    }

    // ------------------------------------------
    // INTERACTIVE ACTIVITY PICKER MODAL
    // ------------------------------------------
    function openActivityPicker(activities, onSelect) {
        document.querySelectorAll("#hud-activity-picker-modal").forEach(m => m.remove());

        const overlay = document.createElement("div");
        overlay.id = "hud-activity-picker-modal";
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(6px);
            z-index: 100000; display: flex; align-items: center; justify-content: center;
            box-sizing: border-box;
        `;

        const modal = document.createElement("div");
        modal.className = "hud-picker-modal";

        let selectedIdx = 0;
        let filtered = [...activities];

        modal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dotted rgba(45, 212, 191, 0.3); padding-bottom: 10px;">
                <span style="color: #2dd4bf; font-weight: 800; font-size: 13px; letter-spacing: 1.5px;">⚡ SELECT ACTIVITY TO INITIALIZE</span>
                <button type="button" id="hud-picker-close" style="background: none; border: none; color: #71717a; font-size: 16px; cursor: pointer;">✕</button>
            </div>
            
            <input type="text" id="hud-picker-search" placeholder="🔍 Type to filter activities..." style="
                background: #000; border: 1px solid rgba(45, 212, 191, 0.4); color: #fff;
                padding: 9px 12px; font-family: inherit; font-size: 13px; border-radius: 2px;
                outline: none; width: 100%; box-sizing: border-box;
            " />

            <div id="hud-picker-list" style="
                display: flex; flex-direction: column; gap: 6px; max-height: 280px;
                overflow-y: auto; padding-right: 4px;
            "></div>

            <div style="font-size: 9.5px; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; border-top: 1px dotted rgba(255,255,255,0.1); padding-top: 8px;">
                Use ↑/↓ arrows and Enter to choose, or click with mouse
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const searchInput = modal.querySelector("#hud-picker-search");
        const listContainer = modal.querySelector("#hud-picker-list");
        const closeBtn = modal.querySelector("#hud-picker-close");

        const closePicker = () => {
            overlay.remove();
        };

        closeBtn.onclick = closePicker;
        overlay.onclick = (e) => {
            if (e.target === overlay) closePicker();
        };

        const renderItems = () => {
            listContainer.innerHTML = "";
            if (filtered.length === 0) {
                listContainer.innerHTML = `<div style="color: #71717a; font-style: italic; padding: 12px; text-align: center;">No matching activities found.</div>`;
                return;
            }

            filtered.forEach((act, idx) => {
                const item = document.createElement("div");
                item.className = `hud-picker-item ${idx === selectedIdx ? 'active' : ''}`;
                const acronym = generateAcronym(act);
                item.innerHTML = `
                    <span style="font-weight: 700; font-size: 12.5px;">🎮 ${act}</span>
                    <span class="hud-picker-badge">${acronym}</span>
                `;
                item.onclick = () => {
                    closePicker();
                    onSelect(act);
                };
                listContainer.appendChild(item);
            });

            const activeEl = listContainer.children[selectedIdx];
            if (activeEl) activeEl.scrollIntoView({ block: "nearest" });
        };

        renderItems();
        searchInput.focus();

        searchInput.oninput = () => {
            const query = searchInput.value.toLowerCase().trim();
            filtered = activities.filter(a => a.toLowerCase().includes(query));
            selectedIdx = 0;
            renderItems();
        };

        searchInput.onkeydown = (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (filtered.length > 0) {
                    selectedIdx = (selectedIdx + 1) % filtered.length;
                    renderItems();
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (filtered.length > 0) {
                    selectedIdx = (selectedIdx - 1 + filtered.length) % filtered.length;
                    renderItems();
                }
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filtered.length > 0 && filtered[selectedIdx]) {
                    const chosen = filtered[selectedIdx];
                    closePicker();
                    onSelect(chosen);
                }
            } else if (e.key === "Escape") {
                closePicker();
            }
        };
    }

    // ------------------------------------------
    // BUTTON TRIGGER DISPATCHER
    // ------------------------------------------
    const createBtn = (text, icon, commandName, extraClass = "", isStartAction = false, config = {}) => {
        const btn = document.createElement("button");
        btn.className = extraClass;
        btn.innerHTML = icon ? `${icon} ${text}` : text; 
        btn.onclick = async () => {
            const customCmd = (commandName || "").trim();
            if (customCmd) {
                // If custom command is specified, try running it
                const cmd = app.commands.listCommands().find(c => c.name === customCmd || c.id === customCmd);
                if (cmd) {
                    app.commands.executeCommandById(cmd.id);
                    return;
                }
            }
            // Built-in universal session engine fallback
            if (isStartAction) {
                await nativeStartSession(config);
            } else {
                await nativeEndSession(config);
            }
        };
        return btn;
    };

    const createMatrixCanvas = (container, opacityVal = 0.22) => {
        let canvas = document.createElement("canvas");
        canvas.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: ${opacityVal};`;
        container.appendChild(canvas);

        setTimeout(() => {
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            let width = canvas.width = canvas.offsetWidth || 400;
            let height = canvas.height = canvas.offsetHeight || 140;
            
            const chars = "010101010101010101010101⚡SESSIONDATAHUD";
            const fontSize = 10;
            const columns = Math.floor(width / fontSize);
            const drops = [];
            for (let i = 0; i < columns; i++) drops[i] = Math.random() * -40;
            
            if (window.hudMatrixInterval) clearInterval(window.hudMatrixInterval);
            
            window.hudMatrixInterval = setInterval(() => {
                ctx.fillStyle = "rgba(9, 9, 11, 0.25)";
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = "#2dd4bf";
                ctx.font = fontSize + "px 'JetBrains Mono', monospace";
                
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
            }, 45);
        }, 50);
    };

    // ------------------------------------------
    // SETTINGS MODAL
    // ------------------------------------------
    async function openSettingsModal(currentConfig, currentProfileName, isMirrored) {
        document.querySelectorAll("#obsidian-hud-gaming-terminal-modal").forEach(el => el.remove());

        const overlay = document.createElement("div");
        overlay.id = "obsidian-hud-gaming-terminal-modal";
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(6px);
            z-index: 10000; display: flex; align-items: center; justify-content: center;
            font-family: 'JetBrains Mono', 'Courier New', monospace; box-sizing: border-box;
        `;

        const modalBox = document.createElement("div");
        modalBox.style.cssText = `
            background: #09090b; border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.95); border-radius: 4px;
            padding: 22px; width: 580px; max-width: 92vw; max-height: 88vh;
            overflow-y: auto; color: #e4e4e7; box-sizing: border-box;
            display: flex; flex-direction: column; gap: 14px; position: relative;
        `;

        const closeModal = () => overlay.remove();
        overlay.onclick = (e) => {
            if (e.target === overlay) closeModal();
        };

        // Header
        const header = document.createElement("div");
        header.style.cssText = "display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dotted rgba(255, 255, 255, 0.2); padding-bottom: 10px;";
        header.innerHTML = `
            <div style="color: #2dd4bf; font-weight: 800; font-size: 13px; letter-spacing: 1.5px;">⚙️ TERMINAL & SESSION CONFIG</div>
            <button id="hud-modal-close" style="background: none; border: none; color: #ffffff; font-size: 16px; cursor: pointer;">✕</button>
        `;
        modalBox.appendChild(header);

        // Profile Selector Section
        const profileSection = document.createElement("div");
        profileSection.style.cssText = "display: flex; flex-direction: column; gap: 8px; background: rgba(255, 255, 255, 0.03); border: 1px dotted rgba(255, 255, 255, 0.15); padding: 12px; border-radius: 2px;";
        
        const profileLbl = document.createElement("label");
        profileLbl.style.cssText = "color: #ffffff; font-size: 12.5px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;";
        profileLbl.innerText = "ACTIVE CONFIG PROFILE:";
        profileSection.appendChild(profileLbl);

        const profileSelect = document.createElement("select");
        profileSelect.style.cssText = "width: 100%; height: 38px !important; min-height: 38px !important; line-height: normal !important; background: #000000; border: 1px solid rgba(255, 255, 255, 0.25); color: #ffffff; padding: 6px 10px; font-family: inherit; font-size: 13px; border-radius: 2px; outline: none; box-sizing: border-box;";

        const profiles = await listProfiles();
        const noteOpt = document.createElement("option");
        noteOpt.value = defaultProfileKey;
        noteOpt.innerText = `Current Note Profile (${defaultProfileKey})${!isMirrored ? ' (Active)' : ''}`;
        profileSelect.appendChild(noteOpt);

        for (const p of profiles) {
            if (p !== defaultProfileKey) {
                const opt = document.createElement("option");
                opt.value = p;
                opt.innerText = `Profile: ${p}${isMirrored && p === currentProfileName ? ' (Active)' : ''}`;
                profileSelect.appendChild(opt);
            }
        }

        const newOpt = document.createElement("option");
        newOpt.value = "__NEW_PROFILE__";
        newOpt.innerText = "+ Create New Named Profile...";
        profileSelect.appendChild(newOpt);

        if (isMirrored && currentProfileName) {
            profileSelect.value = currentProfileName;
        } else {
            profileSelect.value = defaultProfileKey;
        }

        profileSection.appendChild(profileSelect);

        // New Profile Name Input Row
        const newProfileRow = document.createElement("div");
        newProfileRow.style.cssText = `display: ${profileSelect.value === "__NEW_PROFILE__" ? "flex" : "none"}; flex-direction: column; gap: 6px; margin-top: 6px; padding: 10px; background: rgba(45, 212, 191, 0.05); border: 1px dashed rgba(45, 212, 191, 0.3); border-radius: 2px;`;
        newProfileRow.innerHTML = `
            <label style="font-size: 12px; color: #2dd4bf; font-weight: 700; letter-spacing: 1px;">NEW PROFILE NAME:</label>
            <input type="text" id="hud-new-profile-input" placeholder="e.g. daily-focus, work-tracker" style="background: #000; border: 1px solid rgba(45, 212, 191, 0.4); color: #fff; padding: 7px 10px; font-family: inherit; font-size: 13px; border-radius: 2px; outline: none;">
            <div style="display: flex; gap: 16px; margin-top: 4px; font-size: 11px; align-items: center;">
                <label style="display: flex; align-items: center; gap: 5px; cursor: pointer; color: #ffffff; margin: 0; font-size: 11px;">
                    <input type="radio" name="hud-term-new-prof-source" value="default" checked style="accent-color: #2dd4bf; cursor: pointer; margin: 0;"> Start with default template
                </label>
                <label style="display: flex; align-items: center; gap: 5px; cursor: pointer; color: #ffffff; margin: 0; font-size: 11px;">
                    <input type="radio" name="hud-term-new-prof-source" value="copy" style="accent-color: #2dd4bf; cursor: pointer; margin: 0;"> Copy current settings
                </label>
            </div>
        `;
        profileSection.appendChild(newProfileRow);

        modalBox.appendChild(profileSection);

        // Form Fields
        const fieldsContainer = document.createElement("div");
        fieldsContainer.style.cssText = "display: flex; flex-direction: column; gap: 12px;";

        const vaultFolders = getVaultFolders();
        const vaultProps = getVaultProperties();
        const allCommands = getCommandSuggestions();
        const vaultBaseLinks = (app?.vault?.getFiles ? app.vault.getFiles() : [])
            .filter(f => f.extension === "base" || f.name.endsWith(".base"))
            .map(f => `[[${f.name}]]`);

        const createField = (label, key, defaultValue, datalistOptions = [], desc = "", placeholder = "") => {
            const fieldWrap = document.createElement("div");
            fieldWrap.style.cssText = "display: flex; flex-direction: column; gap: 4px;";
            
            const lbl = document.createElement("label");
            lbl.style.cssText = "color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;";
            lbl.innerText = label;
            
            const input = document.createElement("input");
            input.type = "text";
            input.id = `hud-field-${key}`;
            input.value = currentConfig[key] !== undefined ? currentConfig[key] : defaultValue;
            input.placeholder = placeholder || defaultValue;
            input.style.cssText = "background: #000000; border: 1px solid rgba(255, 255, 255, 0.2); color: #2dd4bf; padding: 7px 10px; font-family: inherit; font-size: 13px; border-radius: 2px; outline: none; transition: border-color 0.2s;";
            input.onfocus = () => { input.style.borderColor = "#2dd4bf"; };
            input.onblur = () => { input.style.borderColor = "rgba(255, 255, 255, 0.2)"; };

            fieldWrap.appendChild(lbl);
            fieldWrap.appendChild(input);

            // Datalist for native autocomplete
            if (datalistOptions && datalistOptions.length > 0) {
                const dl = document.createElement("datalist");
                const dlId = `hud-dl-${key}-${Math.random().toString(36).substring(2, 7)}`;
                dl.id = dlId;
                input.setAttribute("list", dlId);
                const uniqueOptions = Array.from(new Set(datalistOptions));
                for (const optVal of uniqueOptions) {
                    if (optVal) {
                        const opt = document.createElement("option");
                        opt.value = optVal;
                        dl.appendChild(opt);
                    }
                }
                fieldWrap.appendChild(dl);
            }

            if (desc) {
                const descEl = document.createElement("div");
                descEl.style.cssText = "font-size: 10.5px; color: #ffffff; margin-top: 1px;";
                descEl.innerText = desc;
                fieldWrap.appendChild(descEl);
            }

            return { wrap: fieldWrap, input, key };
        };

        const fieldDefs = [
            { 
                label: "Widget Heading", 
                key: "heading", 
                defaultVal: DEFAULT_CONFIG.heading,
                placeholder: "e.g. LIVE SESSION TRACKER",
                datalist: [],
                desc: "Main heading displayed at the top of the widget."
            },
            { 
                label: "Activities / Items Folder", 
                key: "activitiesFolder", 
                defaultVal: DEFAULT_CONFIG.activitiesFolder,
                placeholder: "e.g. Activities, Projects",
                datalist: vaultFolders,
                desc: "Folder containing your activity or project notes. Scanned when starting a session."
            },
            { 
                label: "Session Logs Folder", 
                key: "logFolder", 
                defaultVal: DEFAULT_CONFIG.logFolder,
                placeholder: "e.g. Logs/Sessions",
                datalist: vaultFolders,
                desc: "Folder where session log notes are created and tracked."
            },
            { 
                label: "Activity / Item Property", 
                key: "gameProp", 
                defaultVal: DEFAULT_CONFIG.gameProp,
                placeholder: "e.g. activity",
                datalist: vaultProps,
                desc: "YAML property referencing the selected activity."
            },
            { 
                label: "Start Time Property", 
                key: "startTimeProp", 
                defaultVal: DEFAULT_CONFIG.startTimeProp,
                placeholder: "e.g. start-time",
                datalist: vaultProps,
                desc: "YAML property storing the session start timestamp."
            },
            { 
                label: "End Time Property", 
                key: "endTimeProp", 
                defaultVal: DEFAULT_CONFIG.endTimeProp,
                placeholder: "e.g. end-time",
                datalist: vaultProps,
                desc: "YAML property storing the session end timestamp."
            },
            { 
                label: "Base Link (Optional)", 
                key: "baseLink", 
                defaultVal: DEFAULT_CONFIG.baseLink,
                placeholder: "e.g. [[Sessions.base]]",
                datalist: vaultBaseLinks,
                desc: "Optional base file link added to note frontmatter (leave blank to omit)."
            },
            { 
                label: "Terminal Title", 
                key: "termTitle", 
                defaultVal: DEFAULT_CONFIG.termTitle,
                placeholder: "e.g. ⚡ SESSION CONTROLS",
                datalist: [],
                desc: "Title displayed above terminal buttons."
            },
            { 
                label: "Custom Start Command (Optional Override)", 
                key: "startCommand", 
                defaultVal: "",
                placeholder: "Optional command override",
                datalist: allCommands,
                desc: "Leave blank to use built-in session runner, or specify custom command name."
            },
            { 
                label: "Custom End Command (Optional Override)", 
                key: "endCommand", 
                defaultVal: "",
                placeholder: "Optional command override",
                datalist: allCommands,
                desc: "Leave blank to use built-in session runner, or specify custom command name."
            }
        ];

        const fieldsMap = {};
        for (const def of fieldDefs) {
            const f = createField(def.label, def.key, def.defaultVal, def.datalist, def.desc, def.placeholder);
            fieldsContainer.appendChild(f.wrap);
            fieldsMap[def.key] = f.input;
        }

        // Acronym Option Checkbox
        const acronymWrap = document.createElement("div");
        acronymWrap.style.cssText = "display: flex; align-items: center; gap: 8px; margin-top: 4px; padding: 8px 10px; background: rgba(255,255,255,0.03); border: 1px dotted rgba(255,255,255,0.15); border-radius: 2px;";
        const isAcronymChecked = currentConfig.useAcronym !== undefined ? currentConfig.useAcronym : DEFAULT_CONFIG.useAcronym;
        acronymWrap.innerHTML = `
            <input type="checkbox" id="hud-field-useAcronym" ${isAcronymChecked ? "checked" : ""} style="cursor: pointer; accent-color: #2dd4bf; width: 16px; height: 16px; margin: 0;">
            <label for="hud-field-useAcronym" style="font-size: 12px; color: #ffffff; cursor: pointer; user-select: none;">
                Auto-generate Acronym for note filenames (e.g. Need For Speed ➔ NFS - [Timestamp].md)
            </label>
        `;
        fieldsContainer.appendChild(acronymWrap);

        modalBox.appendChild(fieldsContainer);

        // Profile Source Radio Listeners
        const sourceRadios = newProfileRow.querySelectorAll("input[name='hud-term-new-prof-source']");
        sourceRadios.forEach(r => {
            r.onchange = () => {
                if (r.value === "copy") {
                    for (const def of fieldDefs) {
                        fieldsMap[def.key].value = currentConfig[def.key] !== undefined ? currentConfig[def.key] : def.defaultVal;
                    }
                    const acChk = modalBox.querySelector("#hud-field-useAcronym");
                    if (acChk) acChk.checked = currentConfig.useAcronym !== undefined ? currentConfig.useAcronym : DEFAULT_CONFIG.useAcronym;
                } else {
                    for (const def of fieldDefs) {
                        fieldsMap[def.key].value = def.defaultVal;
                    }
                    const acChk = modalBox.querySelector("#hud-field-useAcronym");
                    if (acChk) acChk.checked = DEFAULT_CONFIG.useAcronym;
                }
            };
        });

        // Profile select change listener
        profileSelect.onchange = async () => {
            const val = profileSelect.value;
            if (val === "__NEW_PROFILE__") {
                newProfileRow.style.display = "flex";
                const inp = modalBox.querySelector("#hud-new-profile-input");
                if (inp) {
                    inp.value = "";
                    inp.focus();
                }
                const defRadio = newProfileRow.querySelector("input[value='default']");
                if (defRadio) defRadio.checked = true;
                for (const def of fieldDefs) {
                    fieldsMap[def.key].value = def.defaultVal;
                }
                const acChk = modalBox.querySelector("#hud-field-useAcronym");
                if (acChk) acChk.checked = DEFAULT_CONFIG.useAcronym;
                return;
            }
            newProfileRow.style.display = "none";

            const loaded = await getProfileConfig(val);
            for (const k of Object.keys(fieldsMap)) {
                fieldsMap[k].value = loaded[k] !== undefined ? loaded[k] : (DEFAULT_CONFIG[k] || "");
            }
            const acChk = modalBox.querySelector("#hud-field-useAcronym");
            if (acChk) acChk.checked = loaded.useAcronym !== undefined ? loaded.useAcronym : true;
        };

        // Footer Actions
        const footer = document.createElement("div");
        footer.style.cssText = "display: flex; justify-content: space-between; align-items: center; border-top: 1px dotted rgba(255, 255, 255, 0.2); padding-top: 14px; margin-top: 6px;";

        const resetBtn = document.createElement("button");
        resetBtn.style.cssText = "background: transparent; border: 1px dashed rgba(248, 113, 113, 0.4); color: #f87171; font-family: inherit; font-size: 11px; padding: 6px 12px; border-radius: 2px; cursor: pointer;";
        resetBtn.innerText = "↺ RESET DEFAULTS";
        resetBtn.onclick = () => {
            for (const def of fieldDefs) {
                fieldsMap[def.key].value = def.defaultVal;
            }
            const acChk = modalBox.querySelector("#hud-field-useAcronym");
            if (acChk) acChk.checked = DEFAULT_CONFIG.useAcronym;
            new Notice("Values reset to default template.");
        };

        const btnGroup = document.createElement("div");
        btnGroup.style.cssText = "display: flex; gap: 10px;";

        const cancelBtn = document.createElement("button");
        cancelBtn.style.cssText = "background: transparent; border: 1px solid rgba(255, 255, 255, 0.35); color: #ffffff; font-family: inherit; font-size: 11px; padding: 7px 14px; border-radius: 2px; cursor: pointer; text-transform: uppercase;";
        cancelBtn.innerText = "CANCEL";
        cancelBtn.onclick = closeModal;

        const saveBtn = document.createElement("button");
        saveBtn.style.cssText = "background: rgba(45, 212, 191, 0.15); border: 1px solid #2dd4bf; color: #2dd4bf; font-family: inherit; font-size: 11px; font-weight: 800; padding: 7px 18px; border-radius: 2px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase;";
        saveBtn.innerText = "SAVE & APPLY";
        saveBtn.onclick = async () => {
            const val = profileSelect.value;
            let targetProfile = "";

            if (val === "__NEW_PROFILE__") {
                const inp = modalBox.querySelector("#hud-new-profile-input");
                const raw = inp ? inp.value.trim() : "";
                if (!raw) {
                    new Notice("⚠️ Please provide a name for the new profile.");
                    if (inp) inp.focus();
                    return;
                }
                targetProfile = raw.replace(/[^a-zA-Z0-9_-]/g, '_');
            } else if (val === defaultProfileKey) {
                targetProfile = defaultProfileKey;
            } else {
                targetProfile = val;
            }

            const configToSave = {};
            for (const def of fieldDefs) {
                configToSave[def.key] = fieldsMap[def.key].value.trim();
            }
            const acChk = modalBox.querySelector("#hud-field-useAcronym");
            configToSave.useAcronym = acChk ? acChk.checked : true;

            await ensureConfigDir();

            const noteConfigPath = getProfilePath(defaultProfileKey);

            if (targetProfile === defaultProfileKey) {
                delete configToSave.mirrors;
                try {
                    await app.vault.adapter.write(noteConfigPath, JSON.stringify(configToSave, null, 2));
                } catch (e) {
                    new Notice("❌ Failed to save note config: " + e.message);
                    return;
                }
            } else {
                delete configToSave.mirrors;
                const targetPath = getProfilePath(targetProfile);
                try {
                    await app.vault.adapter.write(targetPath, JSON.stringify(configToSave, null, 2));
                } catch (e) {
                    new Notice("❌ Failed to save profile config: " + e.message);
                    return;
                }

                try {
                    let existingNoteConfig = {};
                    if (await app.vault.adapter.exists(noteConfigPath)) {
                        const rawNote = await app.vault.adapter.read(noteConfigPath);
                        existingNoteConfig = JSON.parse(rawNote) || {};
                    }
                    const mergedNoteConfig = {
                        ...DEFAULT_CONFIG,
                        ...existingNoteConfig,
                        mirrors: targetProfile
                    };
                    await app.vault.adapter.write(noteConfigPath, JSON.stringify(mergedNoteConfig, null, 2));
                } catch (e) {
                    console.error("Failed to update note mirror pointer:", e);
                }
            }

            new Notice(`✅ Profile [${targetProfile}] saved successfully!`);
            closeModal();
            await renderWidget();
        };

        btnGroup.appendChild(cancelBtn);
        btnGroup.appendChild(saveBtn);

        footer.appendChild(resetBtn);
        footer.appendChild(btnGroup);
        modalBox.appendChild(footer);

        const closeBtn = header.querySelector("#hud-modal-close");
        if (closeBtn) closeBtn.onclick = closeModal;

        overlay.appendChild(modalBox);
        document.body.appendChild(overlay);
    }

    // ------------------------------------------
    // MAIN WIDGET RENDERER
    // ------------------------------------------
    async function renderWidget(immediateSession = null, forceIdle = false) {
        if (window.hudMatrixInterval) {
            clearInterval(window.hudMatrixInterval);
            window.hudMatrixInterval = null;
        }
        if (window.hudTimerInterval) {
            clearInterval(window.hudTimerInterval);
            window.hudTimerInterval = null;
        }

        dv.container.innerHTML = "";

        const { config, profileName, isMirrored } = await loadConfig();

        const wrapper = document.createElement("div");
        wrapper.className = "hud-cmd-container-term";

        // Top Bar with Heading and Settings Button
        const topBar = document.createElement("div");
        topBar.className = "hud-cmd-top-bar";

        const headingText = config.heading !== undefined ? config.heading : DEFAULT_CONFIG.heading;
        const headingEl = document.createElement("div");
        headingEl.className = "hud-cmd-top-title";
        headingEl.innerText = headingText || "";
        topBar.appendChild(headingEl);

        const settingsBtn = document.createElement("button");
        settingsBtn.className = "hud-cmd-settings-btn";
        settingsBtn.innerHTML = "⚙️";
        settingsBtn.title = "Settings";
        settingsBtn.onclick = () => {
            openSettingsModal(config, profileName, isMirrored);
        };
        topBar.appendChild(settingsBtn);
        wrapper.appendChild(topBar);

        const terminal = document.createElement("div");
        terminal.className = "hud-cmd-session-terminal";

        // Corner Brackets
        const bracketTL = document.createElement("div");
        bracketTL.className = "hud-cmd-bracket-tl";
        const bracketBR = document.createElement("div");
        bracketBR.className = "hud-cmd-bracket-br";
        terminal.appendChild(bracketTL);
        terminal.appendChild(bracketBR);

        // Controls Column
        const controls = document.createElement("div");
        controls.className = "hud-cmd-term-controls";

        const termTitle = document.createElement("div");
        termTitle.className = "hud-cmd-term-title";
        termTitle.innerText = config.termTitle || DEFAULT_CONFIG.termTitle;

        controls.append(
            termTitle,
            createBtn("START SESSION", "⚡", config.startCommand, "hud-cmd-game-btn hud-cmd-btn-start", true, config),
            createBtn("End Session", "⏹️", config.endCommand, "hud-cmd-game-btn hud-cmd-btn-end", false, config)
        );
        terminal.appendChild(controls);

        // HUD Display Column
        const hud = document.createElement("div");
        hud.className = "hud-cmd-term-hud";

        let folderQuery = (config.logFolder || DEFAULT_CONFIG.logFolder || "").trim();
        const startTimeProp = (config.startTimeProp || DEFAULT_CONFIG.startTimeProp || "").trim();
        const endTimeProp = (config.endTimeProp || DEFAULT_CONFIG.endTimeProp || "").trim();
        const gameProp = (config.gameProp || DEFAULT_CONFIG.gameProp || "").trim();

        let activeLogs = [];
        if (forceIdle) {
            activeLogs = [];
        } else if (immediateSession) {
            activeLogs = [immediateSession];
        } else if (folderQuery && startTimeProp && endTimeProp) {
            const cleanLogFolder = folderQuery.replace(/^["']|["']$/g, '').replace(/^\/+|\/+$/g, '');
            try {
                const nativeMatches = [];
                const logFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith(cleanLogFolder + "/"));
                for (const file of logFiles) {
                    const cache = app.metadataCache.getFileCache(file);
                    const fm = cache ? cache.frontmatter : null;
                    if (fm && fm[startTimeProp] && (!fm[endTimeProp] || fm[endTimeProp] === "")) {
                        nativeMatches.push({ ...fm, file });
                    }
                }
                if (nativeMatches.length > 0) {
                    nativeMatches.sort((a, b) => String(b[startTimeProp]).localeCompare(String(a[startTimeProp])));
                    activeLogs = nativeMatches;
                } else {
                    let queryArg = folderQuery;
                    if (!queryArg.startsWith('"') && !queryArg.startsWith('#') && !queryArg.startsWith('(')) {
                        queryArg = `"${folderQuery}"`;
                    }
                    const pages = dv.pages(queryArg);
                    if (pages) {
                        activeLogs = pages
                            .where(p => p && p[startTimeProp] && (!p[endTimeProp] || p[endTimeProp] === ""))
                            .sort(p => p[startTimeProp], 'desc');
                    }
                }
            } catch (e) {
                console.error("Session Tracker query error:", e);
            }
        }

        if (!activeLogs || activeLogs.length === 0) {
            let idleContainer = document.createElement("div");
            idleContainer.className = "hud-cmd-idle";
            createMatrixCanvas(idleContainer, 0.22);
            let textOverlay = document.createElement("div");
            textOverlay.style.cssText = "position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; text-align: center;";
            textOverlay.innerHTML = `
                <span class="hud-cmd-idle-icon">⚡</span>
                <span class="hud-cmd-idle-title">SYSTEM IDLE</span>
                <span class="hud-cmd-idle-sub">AWAITING SESSION INITIALIZATION SEQUENCE...</span>
            `;
            idleContainer.appendChild(textOverlay);
            hud.appendChild(idleContainer);
            if (window.hudTimerInterval) { clearInterval(window.hudTimerInterval); window.hudTimerInterval = null; }
        } else {
            let activeContainer = document.createElement("div");
            activeContainer.className = "hud-cmd-active";
            createMatrixCanvas(activeContainer, 0.08);

            let session = activeLogs[0];
            let gameRaw = session[gameProp];
            let gameName = "Unknown Activity";
            if (gameRaw) {
                if (typeof gameRaw === 'object' && gameRaw.path) {
                    gameName = gameRaw.display || gameRaw.path.split('/').pop().replace('.md', '');
                } else if (Array.isArray(gameRaw)) {
                    let first = gameRaw[0];
                    if (first && typeof first === 'object' && first.path) {
                        gameName = first.display || first.path.split('/').pop().replace('.md', '');
                    } else {
                        let str = String(first || '');
                        let match = str.match(/\[\[(?:.*\|)?([^\]]+)\]\]/);
                        gameName = match ? match[1] : str.replace(/[\[\]"]/g, '');
                    }
                } else {
                    let str = String(gameRaw);
                    let match = str.match(/\[\[(?:.*\|)?([^\]]+)\]\]/);
                    gameName = match ? match[1] : str.replace(/[\[\]"]/g, '');
                }
            }

            let startRaw = session[startTimeProp];
            let startMom = (startRaw && startRaw.toJSDate) 
                ? moment(startRaw.toJSDate()) 
                : moment(startRaw);

            let activeOverlay = document.createElement("div");
            activeOverlay.style.cssText = "position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; height: 100%; gap: 12px; width: 100%; align-items: center;";
            activeOverlay.innerHTML = `
                <div class="hud-cmd-header">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="display: flex; align-items: flex-end; gap: 3px; height: 16px;">
                            <div style="width: 3px; background: #2dd4bf; animation: hudCmdEq 0.8s infinite ease-in-out;"></div>
                            <div style="width: 3px; background: #2dd4bf; animation: hudCmdEq 0.6s infinite ease-in-out; animation-delay: 0.2s;"></div>
                            <div style="width: 3px; background: #2dd4bf; animation: hudCmdEq 1s infinite ease-in-out; animation-delay: 0.4s;"></div>
                        </div>
                        <span style="color: #2dd4bf; font-size: 11px; font-weight: 800; letter-spacing: 2px;">LINK ESTABLISHED</span>
                    </div>
                    <span style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; animation: hudCmdPulseRec 1.5s infinite;">● RECORDING</span>
                </div>
                
                <div class="hud-cmd-activity-title">${gameName}</div>
                
                <div class="hud-cmd-stat-grid">
                    <div class="hud-cmd-stat-box">
                        <div class="hud-cmd-stat-label">START TIME</div>
                        <div class="hud-cmd-stat-value" style="color: #2dd4bf;">${startMom.isValid() ? startMom.format("hh:mm A") : "--:--"}</div>
                    </div>
                    <div class="hud-cmd-stat-box">
                        <div class="hud-cmd-stat-label">ACTIVE DURATION</div>
                        <div class="hud-cmd-stat-value hud-cmd-live-timer" style="color: #fbbf24; font-variant-numeric: tabular-nums;">⏱️ Calculating...</div>
                    </div>
                </div>
            `;

            activeContainer.appendChild(activeOverlay);
            hud.appendChild(activeContainer);

            if (window.hudTimerInterval) clearInterval(window.hudTimerInterval);
            window.hudTimerInterval = setInterval(() => {
                const timerElements = document.querySelectorAll(".hud-cmd-live-timer");
                if (timerElements.length > 0) {
                    let totalSeconds = moment().diff(startMom, 'seconds');
                    let hours = Math.floor(totalSeconds / 3600);
                    let minutes = Math.floor((totalSeconds % 3600) / 60);
                    let seconds = totalSeconds % 60;
                    let timeString = `⏱️ ${hours}h ${minutes.toString().padStart(2, '0')}m&nbsp;${seconds.toString().padStart(2, '0')}s`;
                    timerElements.forEach(el => {
                        if (el.innerHTML !== timeString) el.innerHTML = timeString;
                    });
                }
            }, 1000);
        }

        terminal.appendChild(hud);
        wrapper.appendChild(terminal);
        dv.container.appendChild(wrapper);
    }

    await renderWidget();
})();