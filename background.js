// Background script to handle SPA navigation
console.log('[Readlang Extension] Background script loaded');

// Listen for tab updates to detect navigation to flashcards
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('readlang.com/flashcards')) {
    console.log('[Readlang Extension] Detected navigation to flashcards:', tab.url);
    
    // Inject content script if not already injected
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }).then(() => {
      console.log('[Readlang Extension] Content script injected via background');
    }).catch(err => {
      console.log('[Readlang Extension] Content script injection failed or already exists:', err);
    });
  }
});

// Also listen for history state changes (SPA navigation)
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.url?.includes('readlang.com/flashcards')) {
    console.log('[Readlang Extension] SPA navigation detected:', details.url);
    
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['content.js']
    }).then(() => {
      console.log('[Readlang Extension] Content script injected via SPA navigation');
    }).catch(err => {
      console.log('[Readlang Extension] SPA injection failed:', err);
    });
  }
});
