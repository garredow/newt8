/* eslint-disable no-undef */
console.log('Newt7 Background Service');

async function initialize() {
  console.log('Initializing...');
  chrome.tabs.query({}, async rawTabs => {
    const storedTabsMap = (await getStoredTabs()).reduce((acc, tab) => {
      acc[tab.id] = tab;
      return acc;
    }, {});

    const tabs = rawTabs.map(tab => {
      return Object.assign(
        {
          id: tab.id,
          windowId: tab.windowId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          accessedAt: new Date().toISOString(),
        },
        storedTabsMap[tab.id]
      );
    });

    console.log(`Initialized with ${tabs.length} tabs`);
    setStoredTabs(tabs);
  });
}

initialize();

function getStoredTabs() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('tabs', result => {
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
  const tab = tabs.find(a => a.id === tabId);
  return tab;
}

async function saveTab(tab) {
  const tabs = await getStoredTabs();
  const index = tabs.findIndex(a => a.id === tab.id);

  if (index === -1) tabs.push(tab);
  else tabs[index] = tab;

  setStoredTabs(tabs);
}

async function deleteTab(tabId) {
  const tabs = await getStoredTabs();
  const newTabs = tabs.filter(a => a.id !== tabId);
  setStoredTabs(newTabs);
}

chrome.tabs.onCreated.addListener(tab => {
  console.log(`Tab Created: ${tab.id}`, tab);

  const newTab = {
    id: tab.id,
    windowId: tab.windowId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accessedAt: new Date().toISOString(),
  };

  saveTab(newTab);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log(`Tab Updated: ${tabId}`, changeInfo, tab);

  const storedTab = await getTab(tab.id);
  const updatedTab = Object.assign(
    { createdAt: new Date().toISOString(), accessedAt: new Date().toISOString() },
    storedTab,
    { updatedAt: new Date().toISOString() }
  );

  saveTab(updatedTab);
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  console.log(`Tab Removed: ${tabId}`, removeInfo);

  await deleteTab(tabId);
});

chrome.tabs.onActivated.addListener(async activeInfo => {
  console.log(`Tab Activated:`, activeInfo);

  const storedTab = await getTab(activeInfo.tabId);

  if (!storedTab) return;

  storedTab.accessedAt = new Date().toISOString();

  saveTab(storedTab);
});
