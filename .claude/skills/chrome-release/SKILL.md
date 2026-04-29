---
name: chrome-release
description: Generate Chrome Web Store submission package (store listing, questionnaire, privacy disclosure) in English. Use when the user mentions publishing to Chrome Web Store, preparing a release, writing store listing, or updating the extension version. Also use when the user says "chrome-release", "release info", "store listing", or "上架".
---

# Chrome Web Store Release Info Generator

You are generating a complete **Chrome Web Store submission package**: store listing, questionnaire, and privacy disclosure. All output is in **English only**.

**You must NOT generate:** promotional images, screenshots, changelogs, or Chinese translations.

## Step 1: Gather information

Run these in parallel where possible:

### Project state
- Read `manifest.json` — capture `version`, `name` (or `__MSG_*__` key), `description`, `permissions`, `host_permissions`, `default_locale`
- Read `_locales/<default_locale>/messages.json` — capture `extName.message`, `extDesc.message`
- Read existing `store/` documents for tone and past answers on permissions/data collection

### Permission check
- Confirm the privacy claim matches actual code — grep for `fetch(`, `XMLHttpRequest`, analytics, external URLs
- Note every permission in `manifest.json` (both `permissions` and `host_permissions`) — each one needs a justification in the questionnaire

## Step 2: Generate the release document

Write to `store/release-v<version>.md` (e.g., `store/release-v1.1.0.md`).

### Output format

Keep it flat and minimal. Use `- key: value` lines, avoid tables and deep headings.

```markdown
# Chrome Web Store Submission — v<version>

## Store Listing
- Name: <English name from _locales/en/messages.json extName, or manifest name>
- Tagline: <One sentence, under 80 chars>
- Short description: <1-2 sentences, under 132 chars>
- Category: Productivity
- Language: English (en)
- Tags: <5-10 comma-separated keywords>

<Detailed description as plain text paragraphs, no "Detailed Description" heading needed.>

## Developer Info
- Email: [REQUIRED — fill in your contact email]
- Support URL: <optional website or GitHub repo>

## Questionnaire
- Single purpose: <one sentence>

Permission justification:
- `<permission>`: <why it's needed>
- `<host_permissions>`: <why these host patterns are needed>

Data collection:
- Collect user data? No
- Sell user data? No
- Transfer to third parties? No
- Use for creditworthiness/lending? No

Additional compliance:
- Uses cryptography? No
- Requires offline access? No
- Contains minified/obfuscated code? No

## Privacy
- Privacy policy URL: publish `store/privacy.html` to a public HTTPS URL, then paste here
- Summary: <one sentence about what is (or isn't) collected>

## Store Assets
<Do NOT generate images. Only list what's needed.>
- Icon: 128×128 px (use `assets/icons/icon128.png`)
- Small promo tile: 440×280 px [ ]
- Large promo tile: 920×680 px [ ]
- Marquee promo tile: 1400×560 px [ ]
- Screenshots: 1280×800 px, at least 1 required [ ]
```

## Step 3: Key rules

### Content guidelines
- **Short description** must fit Chrome Web Store's 132-character limit.
- **Tagline** should be punchy and under 80 characters.
- **Detailed description** should be substantive — Chrome's review team reads it, and users use it to decide whether to install.
- **Tags** should include the extension name, core function keywords, and audience keywords.
- Never include placeholder text like "[TODO]" or "[fill in later]" — if information is missing, note it explicitly.
- All output is **English only**. No Chinese translations anywhere.

### Sensitive checks
- Questionnaire is **mandatory** for every release — always include it.
- If `host_permissions` includes `*://*/*` or broad patterns, explain the justification clearly.
- Confirm the privacy claim ("No data collected") matches the actual code behavior — check for any `fetch()`, `XMLHttpRequest`, analytics, or external URLs in the codebase.

### What NOT to include
- No promotional images, screenshots, or image placeholder sections
- No changelog or version history
- No Chinese or other language translations
- No HTML (except what Chrome Web Store allows in descriptions, which is minimal)
- No markdown links to local files (use public URLs or plain text)
