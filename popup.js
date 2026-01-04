// Load saved settings when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('[Readlang Extension Popup] Loading settings...');
    const data = await chrome.storage.sync.get(['provider', 'apiKey', 'model']);
    
    console.log('[Readlang Extension Popup] Loaded data:', {
      hasProvider: !!data.provider,
      hasApiKey: !!data.apiKey,
      hasModel: !!data.model
    });

    if (data.provider) {
      document.getElementById('provider').value = data.provider;
    }
    if (data.apiKey) {
      document.getElementById('apiKey').value = data.apiKey;
    }
    if (data.model) {
      document.getElementById('model').value = data.model;
    }
  } catch (error) {
    console.error('[Readlang Extension Popup] Error loading settings:', error);
    const status = document.getElementById('status');
    status.textContent = 'Error loading settings';
    status.className = 'status';
  }
});

// Save settings
document.getElementById('save').onclick = async () => {
  const settings = {
    provider: document.getElementById('provider').value,
    apiKey: document.getElementById('apiKey').value,
    model: document.getElementById('model').value
  };

  try {
    await chrome.storage.sync.set(settings);
    const status = document.getElementById('status');
    status.textContent = 'Settings saved!';
    status.className = 'status success';
    setTimeout(() => status.className = 'status', 2000);
  } catch (error) {
    console.error('Error saving settings:', error);
    const status = document.getElementById('status');
    status.textContent = 'Error saving settings';
    status.className = 'status';
  }
};
