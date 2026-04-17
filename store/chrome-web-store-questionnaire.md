# Chrome Web Store 问卷回答

以下回答基于当前代码库 `2026-04-17` 的真实行为。

## 单一用途
Single purpose:
Show a Chrome shortcut cheat sheet in the current page when the user long-presses a chosen key, and let the user customize the trigger key, hold duration, and displayed platform layout.

中文说明：
在当前网页内长按指定按键时显示 Chrome 常用快捷键速查面板，并允许用户自定义触发键、长按时长与显示的系统布局。

## 权限 justification

### storage
Purpose:
Store the user's preferences for trigger key, hold duration, and platform layout.

User-facing explanation:
扩展需要保存你的触发键、长按时长和 Mac/Windows 布局设置。

## Host permissions / site access
Current access:
All websites (`http://*/*`, `https://*/*`)

Reason:
The extension shows the shortcut panel directly inside the currently open web page and listens for the chosen trigger key in that page context.

User-facing explanation:
扩展需要在你正在浏览的网页内监听触发键，并把速查面板显示在当前页面上。

## 用户数据回答

### Does the extension collect user data?
No.

### Does the extension sell user data?
No.

### Does the extension transfer data to third parties?
No.

### Does the extension use data for creditworthiness or lending purposes?
No.

## 隐私页 URL
先把 [privacy.html](/Users/cain/Documents/code/chrome-keys/store/privacy.html) 发布到一个可公开访问的 HTTPS 地址，再把该 URL 填到 Chrome Web Store。

## 更细的数据披露建议
如果商店表单要求按类型勾选，当前版本建议全部选 No data collected。

原因：

- 扩展没有远程请求
- 扩展没有分析 SDK
- 扩展没有广告 SDK
- 扩展没有账号系统
- 扩展只在 Chrome 自带存储里保存设置项
