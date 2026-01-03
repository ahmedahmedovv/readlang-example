# Chrome Web Store Publishing Guide

## Step 1: Create Icons (Required)

You need PNG icons in 3 sizes. Use the provided `icon.svg` to create:

### Option A: Online converter
1. Go to https://svgtopng.com or https://cloudconvert.com
2. Upload `extension/icons/icon.svg`
3. Create 3 sizes: 128x128, 48x48, 16x16
4. Save as `icon128.png`, `icon48.png`, `icon16.png` in `extension/icons/`

### Option B: Using Mac Preview
1. Open `icon.svg` in browser, take screenshot
2. Open in Preview → Tools → Adjust Size
3. Export as PNG at each size

### Option C: Using command line (if you have ImageMagick)
```bash
convert icon.svg -resize 128x128 icon128.png
convert icon.svg -resize 48x48 icon48.png
convert icon.svg -resize 16x16 icon16.png
```

## Step 2: Create Screenshots (Required)

You need 1-5 screenshots. Recommended size: 1280x800 or 640x400

### Screenshots to capture:
1. **Main screenshot**: Readlang flashcard page with "More Examples" button and generated examples visible
2. **Settings popup**: The extension popup showing settings options
3. **Before/After**: Show a card without examples, then with examples

### Tips:
- Use a clean browser window (no other extensions visible)
- Make sure the examples are clearly visible
- Consider using a screenshot tool that adds a browser frame

Save screenshots in `store_assets/screenshots/`

## Step 3: Create Promotional Images (Optional but Recommended)

- Small promo tile: 440x280 pixels
- Large promo tile: 920x680 pixels
- Marquee: 1400x560 pixels

## Step 4: Host Privacy Policy

Your privacy policy needs to be publicly accessible via URL. Options:

### Option A: GitHub (Recommended)
1. Create a GitHub repository for your extension
2. Add `privacy_policy.md` to the repo
3. Use the raw GitHub URL or enable GitHub Pages

### Option B: Google Docs
1. Copy privacy policy content to Google Doc
2. File → Share → Publish to web
3. Use the published URL

### Option C: Personal website
Upload the privacy policy to any web hosting

## Step 5: Create ZIP Package

Create a ZIP file of the extension folder (excluding store_assets):

```bash
cd "/Users/mymac/Desktop/my/108 read"
zip -r readlang-more-examples.zip extension -x "*.DS_Store"
```

The ZIP should contain:
```
extension/
├── manifest.json
├── content.js
├── style.css
├── popup.html
├── popup.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Step 6: Register as Chrome Developer

1. Go to https://chrome.google.com/webstore/devconsole
2. Sign in with Google account
3. Pay one-time $5 registration fee
4. Verify your email

## Step 7: Submit Extension

1. Go to Chrome Web Store Developer Dashboard
2. Click "New Item"
3. Upload your ZIP file
4. Fill in the listing:

### Store Listing Tab:
- **Language**: English
- **Title**: Readlang More Examples
- **Summary**: Copy from store_description.txt (short description)
- **Description**: Copy from store_description.txt (detailed description)
- **Category**: Productivity (or Education)
- **Language**: Select languages your extension supports

### Graphic Assets Tab:
- Upload icon (128x128) - same as icon128.png
- Upload screenshots (at least 1)
- Upload promotional images (optional)

### Privacy Tab:
- **Single purpose description**: "This extension adds AI-generated example sentences to Readlang flashcard practice to help users learn vocabulary in context."
- **Privacy policy URL**: Your hosted privacy policy URL
- **Permissions justification**:
  - `storage`: "Required to save user's API key and provider preferences locally"
  - `host_permissions`: "Required to make API calls to AI providers (OpenAI, Anthropic, Mistral, Google, OpenRouter) to generate example sentences"

### Distribution Tab:
- **Visibility**: Public
- **Distribution**: All regions (or select specific ones)

## Step 8: Submit for Review

1. Review all information
2. Click "Submit for Review"
3. Wait 1-3 business days for review

## Common Rejection Reasons & Fixes

| Reason | Fix |
|--------|-----|
| Missing privacy policy | Host privacy policy at public URL |
| Unclear permissions | Add detailed justification for each permission |
| Missing functionality | Ensure extension works on readlang.com/flashcards |
| Broken screenshots | Use actual screenshots, not mockups |
| Trademark issues | Don't claim affiliation with Readlang |

## After Approval

- Extension will be live on Chrome Web Store
- You'll receive a unique extension URL to share
- Monitor reviews and respond to user feedback
- Update version number in manifest.json for updates

## Updating the Extension

1. Increment version in manifest.json (e.g., "1.0.1")
2. Create new ZIP
3. Go to Developer Dashboard
4. Click your extension → Package → Upload new package
5. Submit for review

---

## Quick Checklist

- [ ] Icons created (16, 48, 128 PNG)
- [ ] At least 1 screenshot (1280x800)
- [ ] Privacy policy hosted online
- [ ] ZIP file created
- [ ] Developer account registered ($5 fee paid)
- [ ] Store listing filled out
- [ ] Permissions justified
- [ ] Submitted for review
