(function () {
  if (window.__chromeKeysBound) return;
  window.__chromeKeysBound = true;

  const PANEL_ID = "__chrome-keys-cheatsheet-root";

  const DEFAULT_SETTINGS = {
    triggerCode: "AltRight",
    holdMs: 800,
    sheetPlatform: "auto",
  };

  const TRIGGER_LABELS = {
    AltRight: "右侧 Alt",
    AltLeft: "左侧 Alt",
    ShiftRight: "右侧 Shift",
    ShiftLeft: "左侧 Shift",
    ControlRight: "右侧 Ctrl",
  };

  /** @type {typeof DEFAULT_SETTINGS} */
  const config = { ...DEFAULT_SETTINGS };

  /** 按分类列出；略去约 20% 较少用项 */
  const MAC_SECTIONS = [
    {
      title: "标签页与窗口",
      rows: [
        ["新建窗口", "⌘ + N"],
        ["新建无痕窗口", "⌘ + Shift + N"],
        ["退出 Chrome", "⌘ + Q"],
        ["全屏 / 退出全屏", "Fn + F（或 Esc）"],
        ["新建标签页", "⌘ + T"],
        ["恢复刚关的标签页", "⌘ + Shift + T"],
        ["关闭当前标签", "⌘ + W"],
        ["下一 / 上一标签", "⌘ + Option + → / ←"],
        ["第 1–8 个标签", "⌘ + 1 … 8"],
        ["最后一个标签", "⌘ + 9"],
        ["后退 / 前进", "⌘ + [ / ] 或 ← / →"],
      ],
    },
    {
      title: "地址栏与搜索",
      rows: [
        ["聚焦地址栏", "⌘ + L"],
        ["用默认引擎搜索", "输入关键词后按 Return"],
        ["换搜索引擎", "输入引擎名后按 Tab"],
        ["补全 www…com 并打开", "Ctrl + Return"],
        ["后台新标签打开网址", "输入后 ⌘ + Return"],
      ],
    },
    {
      title: "鼠标与拖拽",
      rows: [
        ["后台新标签打开链接", "⌘ + 点击链接"],
        ["前台新标签打开链接", "⌘ + Shift + 点击链接"],
        ["新窗口打开链接", "Shift + 点击链接"],
        ["下载链接", "Option + 点击链接"],
        ["标签拖成新窗口", "将标签拖出标签栏"],
        ["标签并入其他窗口", "将标签拖入窗口"],
      ],
    },
    {
      title: "网页与视图",
      rows: [
        ["打印", "⌘ + P"],
        ["保存网页", "⌘ + S"],
        ["强制刷新（忽略缓存）", "⌘ + Shift + R"],
        ["停止加载", "Esc"],
        ["下一个 / 上一个可聚焦项", "Tab / Shift + Tab"],
        ["向下一屏 / 向上一屏", "空格 / Shift + 空格"],
        ["放大 / 缩小 / 默认", "⌘ + + / − / 0"],
        ["添加书签", "⌘ + D"],
        ["全部标签存为书签文件夹", "⌘ + Shift + D"],
        ["查看源代码", "⌘ + Option + U"],
        ["打开控制台", "⌘ + Option + J"],
      ],
    },
    {
      title: "查找与 Chrome 功能",
      rows: [
        ["显示/隐藏书签栏", "⌘ + Shift + B"],
        ["书签管理器", "⌘ + Option + B"],
        ["设置", "⌘ + ,"],
        ["历史记录", "⌘ + Y"],
        ["下载内容", "⌘ + Shift + J"],
        ["在网页中查找", "⌘ + F"],
        ["查找下一处 / 上一处", "⌘ + G / ⌘ + Shift + G"],
        ["开发者工具", "⌘ + Option + I"],
        ["清除浏览数据", "⌘ + Shift + Delete"],
        ["切换用户 / 访客", "⌘ + Shift + M"],
      ],
    },
  ];

  const WIN_SECTIONS = [
    {
      title: "标签页与窗口",
      rows: [
        ["新建窗口", "Ctrl + N"],
        ["新建无痕窗口", "Ctrl + Shift + N"],
        ["关闭当前窗口", "Alt + F4"],
        ["全屏 / 退出全屏", "F11"],
        ["新建标签页", "Ctrl + T"],
        ["恢复刚关的标签页", "Ctrl + Shift + T"],
        ["关闭当前标签", "Ctrl + W"],
        ["下一 / 上一标签", "Ctrl + Tab / Shift + Tab 或 Ctrl + PgDn / PgUp"],
        ["第 1–8 个标签", "Ctrl + 1 … 8"],
        ["最后一个标签", "Ctrl + 9"],
        ["后退 / 前进", "Alt + ← / →"],
      ],
    },
    {
      title: "地址栏与搜索",
      rows: [
        ["聚焦地址栏", "Ctrl + L"],
        ["用默认引擎搜索", "输入关键词后按 Enter"],
        ["换搜索引擎", "输入引擎名后按 Tab"],
        ["补全 www…com 并打开", "Ctrl + Enter"],
        ["后台新标签打开网址", "输入网址后 Alt + Enter"],
      ],
    },
    {
      title: "鼠标与拖拽",
      rows: [
        ["后台新标签打开链接", "Ctrl + 点击链接"],
        ["前台新标签打开链接", "Ctrl + Shift + 点击链接"],
        ["新窗口打开链接", "Shift + 点击链接"],
        ["下载链接", "Alt + 点击链接"],
        ["标签拖成新窗口", "将标签拖出标签栏"],
        ["标签并入其他窗口", "将标签拖入窗口"],
      ],
    },
    {
      title: "网页与视图",
      rows: [
        ["打印", "Ctrl + P"],
        ["保存网页", "Ctrl + S"],
        ["强制刷新（忽略缓存）", "Ctrl + Shift + R"],
        ["停止加载", "Esc"],
        ["下一个 / 上一个可聚焦项", "Tab / Shift + Tab"],
        ["向下一屏 / 向上一屏", "空格 / Shift + 空格"],
        ["放大 / 缩小 / 默认", "Ctrl + + / − / 0"],
        ["添加书签", "Ctrl + D"],
        ["全部标签存为书签文件夹", "Ctrl + Shift + D"],
        ["查看源代码", "Ctrl + U"],
        ["打开控制台", "Ctrl + Shift + J"],
      ],
    },
    {
      title: "查找与 Chrome 功能",
      rows: [
        ["显示/隐藏书签栏", "Ctrl + Shift + B"],
        ["书签管理器", "Ctrl + Shift + O"],
        ["设置", "Ctrl + ,"],
        ["历史记录", "Ctrl + H"],
        ["下载内容", "Ctrl + J"],
        ["在网页中查找", "Ctrl + F"],
        ["查找下一处 / 上一处", "Ctrl + G / Ctrl + Shift + G"],
        ["开发者工具", "F12 或 Ctrl + Shift + I"],
        ["清除浏览数据", "Ctrl + Shift + Delete"],
        ["切换用户 / 访客", "Ctrl + Shift + M"],
      ],
    },
  ];

  function detectMacLike() {
    try {
      const p = navigator.userAgentData?.platform;
      if (p) return /mac|iphone|ipad/i.test(p);
    } catch (_) {}
    return /Mac|iPhone|iPod|iPad/i.test(navigator.platform || "");
  }

  /** @returns {"mac"|"win"} */
  function resolveSheetKind() {
    if (config.sheetPlatform === "mac") return "mac";
    if (config.sheetPlatform === "win") return "win";
    return detectMacLike() ? "mac" : "win";
  }

  function formatHoldSeconds(ms) {
    const s = ms / 1000;
    if (s >= 1 && ms % 1000 === 0) return String(s);
    return s.toFixed(1).replace(/\.0$/, "");
  }

  function buildHint(kind) {
    const name = TRIGGER_LABELS[config.triggerCode] || config.triggerCode;
    const sec = formatHoldSeconds(config.holdMs);
    const os = kind === "mac" ? "Mac" : "Windows";
    return `当前：${os} 布局。按住 ${name} 约 ${sec} 秒后显示；松开即关闭。完整列表见 Chrome 帮助中心；触发键与时长可在扩展选项中修改。`;
  }

  function buildSectionBlock(section) {
    const block = document.createElement("section");
    block.className = "chrome-keys-block";

    const title = document.createElement("h3");
    title.className = "block-title";
    title.textContent = section.title;

    const table = document.createElement("table");
    for (const [action, combo] of section.rows) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = action;
      const td2 = document.createElement("td");
      td2.textContent = combo;
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    }

    block.appendChild(title);
    block.appendChild(table);
    return block;
  }

  function injectPanelStyles(root) {
    const style = document.createElement("style");
    style.textContent = `
#${PANEL_ID} {
  all: initial;
  position: fixed;
  z-index: 2147483647;
  top: 10px;
  right: 10px;
  width: min(1100px, calc(100vw - 20px));
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 12px;
  line-height: 1.32;
  color: #e8eaed;
  background: rgba(32, 33, 36, 0.95);
  border: none;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  padding: 12px 14px 10px 14px;
  display: none;
  box-sizing: border-box;
}
#${PANEL_ID} .chrome-keys-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  gap: 10px 14px;
  align-items: stretch;
}
#${PANEL_ID} .chrome-keys-block {
  margin: 0;
  min-width: 0;
  padding: 8px 10px 10px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
}
#${PANEL_ID} .chrome-keys-block .block-title {
  margin: 0 0 6px 0;
  padding: 0;
  font-size: 11px;
  font-weight: 600;
  color: #bdc1c6;
  letter-spacing: 0.02em;
  line-height: 1.25;
}
@media (max-width: 900px) {
  #${PANEL_ID} {
    width: calc(100vw - 20px);
  }
  #${PANEL_ID} .chrome-keys-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
  }
}
@media (max-width: 560px) {
  #${PANEL_ID} .chrome-keys-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-height: 700px) {
  #${PANEL_ID} {
    font-size: 11px;
    top: 6px;
  }
  #${PANEL_ID} td {
    padding: 3px 5px;
  }
  #${PANEL_ID} h2 {
    margin-bottom: 6px;
  }
}
#${PANEL_ID}.visible { display: block; }
#${PANEL_ID} h2 {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
#${PANEL_ID} table { width: 100%; border-collapse: collapse; }
#${PANEL_ID} td {
  padding: 4px 6px;
  vertical-align: top;
  border-bottom: none;
}
#${PANEL_ID} td:last-child {
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: #9aa0a6;
}
#${PANEL_ID} .hint {
  margin-top: 8px;
  font-size: 10px;
  line-height: 1.35;
  color: #9aa0a6;
}
`;
    root.appendChild(style);
  }

  function populatePanelBody(root) {
    const kind = resolveSheetKind();
    const sections = kind === "mac" ? MAC_SECTIONS : WIN_SECTIONS;
    const titleText =
      kind === "mac" ? "Chrome（Mac）常用快捷键" : "Chrome（Windows）常用快捷键";

    const h2 = root.querySelector("h2.chrome-keys-title");
    const grid = root.querySelector(".chrome-keys-grid");
    const hint = root.querySelector(".hint");
    if (!h2 || !grid || !hint) return;

    h2.textContent = titleText;
    grid.replaceChildren();
    for (const section of sections) {
      grid.appendChild(buildSectionBlock(section));
    }
    hint.textContent = buildHint(kind);
  }

  function ensurePanel() {
    let root = document.getElementById(PANEL_ID);
    if (root) {
      populatePanelBody(root);
      return root;
    }

    root = document.createElement("div");
    root.id = PANEL_ID;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", "Chrome 快捷键");

    injectPanelStyles(root);

    const h2 = document.createElement("h2");
    h2.className = "chrome-keys-title";

    const grid = document.createElement("div");
    grid.className = "chrome-keys-grid";

    const hint = document.createElement("div");
    hint.className = "hint";

    root.appendChild(h2);
    root.appendChild(grid);
    root.appendChild(hint);

    document.documentElement.appendChild(root);
    populatePanelBody(root);
    return root;
  }

  function showPanel() {
    ensurePanel().classList.add("visible");
  }

  function hidePanel() {
    const el = document.getElementById(PANEL_ID);
    if (el) el.classList.remove("visible");
  }

  let triggerHeld = false;
  let holdTimer = null;

  function clearHoldTimer() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  }

  function onKeyDown(e) {
    if (e.code !== config.triggerCode || e.repeat) return;
    triggerHeld = true;
    clearHoldTimer();
    holdTimer = window.setTimeout(() => {
      holdTimer = null;
      if (triggerHeld) showPanel();
    }, config.holdMs);
  }

  function onKeyUp(e) {
    if (e.code !== config.triggerCode) return;
    triggerHeld = false;
    clearHoldTimer();
    hidePanel();
  }

  function resetOnBlur() {
    triggerHeld = false;
    clearHoldTimer();
    hidePanel();
  }

  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("keyup", onKeyUp, true);
  window.addEventListener("blur", resetOnBlur, true);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) resetOnBlur();
  });

  function refreshPanelIfOpen() {
    const root = document.getElementById(PANEL_ID);
    if (root) populatePanelBody(root);
  }

  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    Object.assign(config, items);
    try {
      ensurePanel();
    } catch (_) {}
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    for (const k of Object.keys(DEFAULT_SETTINGS)) {
      if (changes[k]) config[k] = changes[k].newValue;
    }
    refreshPanelIfOpen();
  });
})();
