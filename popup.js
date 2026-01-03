// Load saved settings
chrome.storage.sync.get(['provider', 'apiKey', 'model'], (data) => {
  if (data.provider) document.getElementById('provider').value = data.provider;
  if (data.apiKey) document.getElementById('apiKey').value = data.apiKey;
  if (data.model) document.getElementById('model').value = data.model;
});

// Save settings
document.getElementById('save').onclick = () => {
  const settings = {
    provider: document.getElementById('provider').value,
    apiKey: document.getElementById('apiKey').value,
    model: document.getElementById('model').value
  };

  chrome.storage.sync.set(settings, () => {
    const status = document.getElementById('status');
    status.textContent = 'Settings saved!';
    status.className = 'status success';
    setTimeout(() => status.className = 'status', 2000);
  });
};
