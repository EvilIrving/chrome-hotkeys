const DEFAULT_SETTINGS = {
  triggerCode: "AltRight",
  holdMs: 800,
  sheetPlatform: "auto",
};

const TRIGGER_OPTIONS = [
  { code: "AltRight", label: "右侧 Alt（AltRight）" },
  { code: "AltLeft", label: "左侧 Alt（AltLeft）" },
  { code: "ShiftRight", label: "右侧 Shift（ShiftRight）" },
  { code: "ShiftLeft", label: "左侧 Shift（ShiftLeft）" },
  { code: "ControlRight", label: "右侧 Ctrl（ControlRight）" },
];

const PLATFORM_OPTIONS = [
  { value: "auto", label: "自动（按系统识别）" },
  { value: "mac", label: "始终使用 Mac 布局" },
  { value: "win", label: "始终使用 Windows 布局" },
];

function fillSelect(select, options, getValue, getLabel) {
  select.innerHTML = "";
  for (const opt of options) {
    const o = document.createElement("option");
    o.value = getValue(opt);
    o.textContent = getLabel(opt);
    select.appendChild(o);
  }
}

function load() {
  const trigger = document.getElementById("trigger");
  const holdMs = document.getElementById("holdMs");
  const sheetPlatform = document.getElementById("sheetPlatform");

  fillSelect(
    trigger,
    TRIGGER_OPTIONS,
    (o) => o.code,
    (o) => o.label
  );
  fillSelect(
    sheetPlatform,
    PLATFORM_OPTIONS,
    (o) => o.value,
    (o) => o.label
  );

  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    trigger.value = items.triggerCode;
    holdMs.value = String(items.holdMs);
    sheetPlatform.value = items.sheetPlatform;
  });
}

function save() {
  const trigger = document.getElementById("trigger");
  const holdMs = document.getElementById("holdMs");
  const sheetPlatform = document.getElementById("sheetPlatform");
  const status = document.getElementById("status");

  let ms = parseInt(holdMs.value, 10);
  if (Number.isNaN(ms)) ms = DEFAULT_SETTINGS.holdMs;
  ms = Math.min(5000, Math.max(200, ms));

  const payload = {
    triggerCode: trigger.value,
    holdMs: ms,
    sheetPlatform: sheetPlatform.value,
  };

  chrome.storage.sync.set(payload, () => {
    status.textContent = "已保存";
    window.setTimeout(() => {
      status.textContent = "";
    }, 2000);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", load);
} else {
  load();
}

document.getElementById("trigger").addEventListener("change", save);
document.getElementById("holdMs").addEventListener("change", save);
document.getElementById("sheetPlatform").addEventListener("change", save);
