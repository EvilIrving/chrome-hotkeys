# Chrome Web Store Submission — v1.1.0

## Store Listing
- Name: Chrome Shortcuts Cheatsheet
- Tagline: Hold a key to see every Chrome shortcut you keep forgetting.
- Short description: Hold a customizable trigger key to show a Chrome shortcuts cheatsheet overlay. Auto-detects Mac/Windows layouts. Release to dismiss.
- Category: Productivity
- Language: English (en)
- Tags: chrome shortcuts, keyboard shortcuts, productivity, cheat sheet, browser tools, shortcut overlay, keyboard navigation, chrome extension

Chrome Shortcuts Cheatsheet puts the shortcuts you need right into the page you're browsing.

Hold your chosen trigger key for a moment and the extension shows a shortcut panel in the top-right corner. Release the key and the panel disappears. The whole interaction is lightweight — it never interrupts your browsing flow. Ideal if you're learning shortcuts, switching between Mac and Windows, or just tired of searching "Chrome shortcut" every time.

Features:
- Hold to reveal, release to dismiss — no clicks needed
- Auto-detects Mac or Windows shortcut layout (or lock to one platform in options)
- Customizable trigger key: Right Alt, Left Alt, Right Shift, Left Shift, or Right Ctrl
- Adjustable hold duration (200–5000 ms)
- Settings stored locally via chrome.storage.sync — no accounts, no servers
- Available in English and Simplified Chinese

Who's it for:
- Anyone who wants to look up Chrome shortcuts without leaving the page
- People switching between Mac and Windows who mix up modifier keys
- Developers, designers, and power users who want faster keyboard navigation
- Anyone tired of Googling "Chrome keyboard shortcuts" over and over

## Developer Info
- Email: [REQUIRED — fill in your contact email]
- Support URL: https://github.com/cain/chrome-keys

## Questionnaire
- Single purpose: Show a Chrome shortcut cheatsheet in the current page when the user long-presses a chosen key, and let the user customize the trigger key, hold duration, and displayed platform layout.

Permission justification:
- `storage`: Store the user's preferences for trigger key, hold duration, and platform layout. No data is ever sent off-device.
- `http://*/*` & `https://*/*`: The extension listens for the trigger key and renders the shortcut panel directly inside the current web page. It does not read, collect, or transmit any page content.

Data collection:
- Collect user data? No
- Sell user data? No
- Transfer to third parties? No
- Use for creditworthiness/lending? No

All data collection categories should be marked as "No data collected." No remote network requests, no analytics, no ads, no accounts, no external services. Settings stored exclusively via `chrome.storage.sync`.

Additional compliance:
- Uses cryptography? No
- Requires offline access? No
- Contains minified/obfuscated code? No

## Privacy
- Privacy policy URL: publish `store/privacy.html` to a public HTTPS URL, then paste here
- The extension stores only three local preferences (trigger key, hold duration, platform layout) via `chrome.storage.sync`. No personal information, browsing history, or page content is ever collected, stored, or transmitted.

## Store Assets
- Icon: 128×128 px (use `assets/icons/icon128.png`)
- Small promo tile: 440×280 px [ ]
- Large promo tile: 920×680 px [ ]
- Marquee promo tile: 1400×560 px [ ]
- Screenshots: 1280×800 px, at least 1 required [ ]
