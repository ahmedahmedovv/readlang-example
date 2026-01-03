# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chrome extension (Manifest V3) that adds AI-generated example sentences to Readlang flashcard practice. Users bring their own API keys from supported providers.

## Architecture

**Content Script (`content.js`)**: Injects into `readlang.com/flashcards*`. Uses MutationObserver to detect card changes and adds "More Examples" button after `#contextContainer`. Reads word from `#wordCardText` and calls AI APIs directly.

**Popup (`popup.html` + `popup.js`)**: Settings UI for selecting AI provider, entering API key, and optional model override. Uses `chrome.storage.sync` for persistence.

**Provider Configuration**: `PROVIDERS` object in `content.js` defines URL, default model, and header format for each provider. Claude and Gemini have different request/response formats handled inline.

## Supported AI Providers

- Mistral (`/v1/chat/completions`)
- OpenAI (`/v1/chat/completions`)
- Claude (`/v1/messages` - requires `anthropic-dangerous-direct-browser-access` header)
- Gemini (key in URL, different body format)
- OpenRouter (`/v1/chat/completions`)

## Development

### Load Extension Locally
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" → select `extension/` folder

### After Code Changes
Refresh the extension in `chrome://extensions/` and reload the Readlang page.

### Create Distribution ZIP
```bash
zip -r readlang-more-examples.zip extension -x "*.DS_Store" -x "*.git*"
```

## Key DOM Selectors (Readlang)

- `#contextContainer` - sentence context, button inserted after this
- `#wordCardText` - current vocabulary word
- `#examplesBox` - generated examples container (created by extension)

## Publishing

See `../store_assets/PUBLISHING_GUIDE.md` for Chrome Web Store submission steps. Required assets: icons (16/48/128px PNG), screenshots, hosted privacy policy.
