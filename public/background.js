/* eslint-disable no-undef */

// Bypass CORS issues
chrome.runtime.onMessage.addListener(function (url, sender, onSuccess) {
  fetch(url, {})
    .then((response) => response.text())
    .then((responseText) => onSuccess(responseText));

  return true;
});

async function initialize() {
  console.log('Initializing...');
  chrome.tabs.query({}, async (rawTabs) => {
    const storedTabsMap = (await getStoredTabs()).reduce((acc, tab) => {
      acc[tab.id] = tab;
      return acc;
    }, {});

    const tabs = rawTabs.map((tab) => {
      return Object.assign(
        {
          id: tab.id,
          windowId: tab.windowId,
          createdAt: new Date().toISOString(),
          accessedAt: new Date().toISOString(),
        },
        storedTabsMap[tab.id]
      );
    });

    console.log(
      `Initialized with ${tabs.length} tabs at ${new Date().toLocaleString()}`
    );
    setStoredTabs(tabs);
  });
}

initialize();

function getStoredTabs() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('tabs', (result) => {
      resolve(result.tabs || []);
    });
  });
}

function setStoredTabs(tabs) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ tabs }, resolve);
  });
}

async function getTab(tabId) {
  const tabs = await getStoredTabs();
  const tab = tabs.find((a) => a.id === tabId);
  return tab;
}

async function updateTab(tab) {
  const tabs = await getStoredTabs();
  const index = tabs.findIndex((a) => a.id === tab.id);

  if (index === -1) tabs.push(tab);
  else tabs[index] = tab;

  setStoredTabs(tabs);
}

async function upsertTab({ tabId, windowId }) {
  const storedTabs = await getStoredTabs();
  const index = storedTabs.findIndex((a) => a.id === tabId);

  const tab = Object.assign(
    {
      createdAt: new Date().toISOString(),
      accessedAt: new Date().toISOString(),
    },
    storedTabs[index],
    {
      accessedAt: new Date().toISOString(),
      windowId: windowId,
      id: tabId,
    }
  );

  console.log('Upserted tab: ', tab);

  if (index === -1) storedTabs.push(tab);
  else storedTabs[index] = tab;

  setStoredTabs(storedTabs);
}

async function deleteTab(tabId) {
  const tabs = await getStoredTabs();
  const newTabs = tabs.filter((a) => a.id !== tabId);
  setStoredTabs(newTabs);
}

async function cleanup() {
  chrome.tabs.query({}, async (tabs) => {
    const existingIds = tabs.map((tab) => tab.id);

    const storedTabs = await getStoredTabs();
    setStoredTabs(storedTabs.filter((a) => existingIds.includes(a.id)));
  });
}

chrome.tabs.onCreated.addListener((tab) => {
  console.log(`Tab Created: ${tab.id}`, tab);
  upsertTab({
    tabId: tab.id,
    windowId: tab.windowId,
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(`Tab Updated: ${tabId}`, changeInfo, tab);
  upsertTab({
    tabId: tab.id,
    windowId: tab.windowId,
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log(`Tab Removed: ${tabId}`, removeInfo);
  deleteTab(tabId);
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log(`Tab Activated:`, activeInfo);
  upsertTab({
    tabId: activeInfo.tabId,
    windowId: activeInfo.windowId,
  });
});

chrome.windows.onRemoved.addListener((windowId) => {
  console.log(`Window Removed: ${windowId}`);
  cleanup();
});
