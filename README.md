# Readlang More Examples

A Chrome extension that adds AI-powered example sentences to [Readlang](https://readlang.com) flashcard practice.

![Screenshot](screenshots/demo.png)

## Features

- **One-click examples** - Click "More Examples" to get 3 additional sentences using your vocabulary word
- **Multiple AI providers** - Choose from OpenAI, Claude, Mistral, Gemini, or OpenRouter
- **Bring your own API key** - Full control over costs and privacy
- **Clean integration** - Button appears right under the context sentence
- **Auto-clears** - Examples automatically clear when you move to the next card

## Installation

### From Chrome Web Store
[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open `chrome://extensions/` in Chrome
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `extension` folder

## Setup

1. Click the extension icon in your toolbar
2. Select your AI provider
3. Enter your API key
4. Click "Save Settings"

## Getting API Keys

| Provider | Free Tier | Get Key |
|----------|-----------|---------|
| [Mistral AI](https://console.mistral.ai/) | ✅ Yes | console.mistral.ai |
| [Google Gemini](https://aistudio.google.com/apikey) | ✅ Yes | aistudio.google.com |
| [OpenRouter](https://openrouter.ai/keys) | Some models | openrouter.ai |
| [OpenAI](https://platform.openai.com/api-keys) | ❌ No | platform.openai.com |
| [Claude](https://console.anthropic.com/) | ❌ No | console.anthropic.com |

## Usage

1. Go to [readlang.com/flashcards](https://readlang.com/flashcards)
2. Start practicing your flashcards
3. Click the green "More Examples" button under any sentence
4. View additional example sentences using your vocabulary word

## Privacy

- Your API key is stored locally on your device
- No data is collected or sent to any server except your chosen AI provider
- No analytics, no tracking, no accounts required

See [Privacy Policy](privacy_policy.md) for details.

## Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/readlang-more-examples.git

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked" → select extension folder

# After making changes
# Refresh the extension in chrome://extensions/
```

## File Structure

```
extension/
├── manifest.json      # Extension configuration
├── content.js         # Main logic (injected into Readlang)
├── style.css          # Button and examples styling
├── popup.html         # Settings popup UI
├── popup.js           # Settings logic
├── privacy_policy.md  # Privacy policy
└── icons/             # Extension icons
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use and modify.

## Disclaimer

This extension is not affiliated with Readlang. It's an independent tool made by a language learner for language learners.
