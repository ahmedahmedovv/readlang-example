const PROVIDERS = {
  mistral: {
    url: 'https://api.mistral.ai/v1/chat/completions',
    model: 'mistral-small-latest',
    format: (key) => ({ 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' })
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    format: (key) => ({ 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' })
  },
  claude: {
    url: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-haiku-latest',
    format: (key) => ({ 'x-api-key': key, 'Content-Type': 'application/json', 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' })
  },
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}',
    model: 'gemini-2.0-flash-exp',
    format: () => ({ 'Content-Type': 'application/json' })
  },
  openrouter: {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'mistralai/mistral-small-24b-instruct-2501',
    format: (key) => ({ 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' })
  }
};

function addButton() {
  if (document.getElementById('moreExamplesBtn')) return;

  const container = document.getElementById('contextContainer');
  if (!container) {
    console.log('[Readlang Extension] contextContainer not found yet, waiting...');
    return;
  }

  const btn = document.createElement('button');
  btn.id = 'moreExamplesBtn';
  btn.textContent = 'More Examples';
  btn.onclick = getExamples;
  container.after(btn);
  
  console.log('[Readlang Extension] Button added successfully');
}

async function getExamples() {
  const word = document.getElementById('wordCardText')?.textContent?.trim();
  if (!word) return;

  const btn = document.getElementById('moreExamplesBtn');
  btn.textContent = 'Loading...';
  btn.disabled = true;
  document.getElementById('examplesBox')?.remove();

  try {
    // Debug: Log storage operation
    console.log('[Readlang Extension] Attempting to read from chrome.storage.sync');
    
    const storageData = await chrome.storage.sync.get(['provider', 'apiKey', 'model']);
    
    console.log('[Readlang Extension] Storage data received:', {
      hasProvider: !!storageData.provider,
      hasApiKey: !!storageData.apiKey,
      hasModel: !!storageData.model
    });

    const provider = storageData.provider || 'mistral';
    const apiKey = storageData.apiKey;
    const model = storageData.model;

    if (!apiKey) {
      console.warn('[Readlang Extension] No API key found in storage');
      alert('Please set your API key in the extension settings (click the extension icon)');
      btn.textContent = 'More Examples';
      btn.disabled = false;
      return;
    }

    console.log('[Readlang Extension] Using provider:', provider);

    const config = PROVIDERS[provider];
    const useModel = model || config.model;
    const prompt = `Give 3 simple example sentences using the word "${word}". Just the sentences, numbered 1-3.`;

    let url = config.url;
    let body;

    if (provider === 'claude') {
      body = JSON.stringify({
        model: useModel,
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
      });
    } else if (provider === 'gemini') {
      url = url.replace('{model}', useModel).replace('{key}', apiKey);
      body = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      });
    } else {
      body = JSON.stringify({
        model: useModel,
        messages: [{ role: 'user', content: prompt }]
      });
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: config.format(apiKey),
      body
    });

    const responseData = await res.json();

    let text;
    if (provider === 'claude') {
      text = responseData.content[0].text;
    } else if (provider === 'gemini') {
      text = responseData.candidates[0].content.parts[0].text;
    } else {
      text = responseData.choices[0].message.content;
    }

    const box = document.createElement('div');
    box.id = 'examplesBox';
    box.innerHTML = '<strong>More Examples:</strong><br>' + text.replace(/\n/g, '<br>');
    btn.after(box);
  } catch (e) {
    alert('Error: ' + e.message);
  }

  btn.textContent = 'More Examples';
  btn.disabled = false;
}

// Prevent multiple injections
if (window.readlangExtensionLoaded) {
  console.log('[Readlang Extension] Already loaded, skipping');
} else {
  window.readlangExtensionLoaded = true;
  
  // Debug: Verify extension loaded and check storage on page load
  console.log('[Readlang Extension] Content script loaded on:', window.location.href);

  // Check if storage has API key on page load (for debugging)
  chrome.storage.sync.get(['provider', 'apiKey', 'model']).then(data => {
    console.log('[Readlang Extension] Page load storage check:', {
      hasProvider: !!data.provider,
      hasApiKey: !!data.apiKey,
      hasModel: !!data.model,
      provider: data.provider,
      model: data.model
    });
  }).catch(err => {
    console.error('[Readlang Extension] Storage check failed:', err);
  });
}

// Enhanced observer for Readlang's dynamic content
const observer = new MutationObserver((mutations) => {
  // Check if contextContainer exists
  const container = document.getElementById('contextContainer');
  if (container) {
    addButton();
  }
  
  // Check if word card changed
  const wordCard = document.getElementById('wordCardText');
  if (wordCard && wordCard.textContent !== observer.lastWord) {
    observer.lastWord = wordCard.textContent;
    document.getElementById('examplesBox')?.remove();
    console.log('[Readlang Extension] Word changed to:', observer.lastWord);
  }
});

// Start observing
observer.observe(document.body, { 
  childList: true, 
  subtree: true,
  attributes: false,
  characterData: false
});

// Also try to add button immediately
addButton();

// Set up a retry mechanism for the first few seconds (handles slow loading)
let retryCount = 0;
const maxRetries = 10;
const retryInterval = setInterval(() => {
  const container = document.getElementById('contextContainer');
  if (container) {
    console.log('[Readlang Extension] Container found on retry', retryCount);
    addButton();
    clearInterval(retryInterval);
  } else if (retryCount >= maxRetries) {
    console.log('[Readlang Extension] Max retries reached, stopping');
    clearInterval(retryInterval);
  }
  retryCount++;
}, 500);
