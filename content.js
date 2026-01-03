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
  if (!container) return;

  const btn = document.createElement('button');
  btn.id = 'moreExamplesBtn';
  btn.textContent = 'More Examples';
  btn.onclick = getExamples;
  container.after(btn);
}

async function getExamples() {
  const word = document.getElementById('wordCardText')?.textContent?.trim();
  if (!word) return;

  const btn = document.getElementById('moreExamplesBtn');
  btn.textContent = 'Loading...';
  btn.disabled = true;
  document.getElementById('examplesBox')?.remove();

  try {
    const { provider = 'mistral', apiKey, model } = await chrome.storage.sync.get(['provider', 'apiKey', 'model']);

    if (!apiKey) {
      alert('Please set your API key in the extension settings (click the extension icon)');
      btn.textContent = 'More Examples';
      btn.disabled = false;
      return;
    }

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

    const data = await res.json();

    let text;
    if (provider === 'claude') {
      text = data.content[0].text;
    } else if (provider === 'gemini') {
      text = data.candidates[0].content.parts[0].text;
    } else {
      text = data.choices[0].message.content;
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

// Watch for card changes and remove old examples
const observer = new MutationObserver(() => {
  addButton();
  const wordCard = document.getElementById('wordCardText');
  if (wordCard && wordCard.textContent !== observer.lastWord) {
    observer.lastWord = wordCard.textContent;
    document.getElementById('examplesBox')?.remove();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
addButton();
