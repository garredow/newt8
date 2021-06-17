export function getRecentlyClosed(): Promise<chrome.sessions.Session[]> {
  return new Promise((resolve) =>
    chrome.sessions.getRecentlyClosed({ maxResults: 15 }, (sessions) => {
      const tabs = sessions.filter((a) => !!a.tab);
      resolve(tabs);
    })
  );
}

export function getDevices(): Promise<chrome.sessions.Device[]> {
  return new Promise((resolve) =>
    chrome.sessions.getDevices({ maxResults: 15 }, resolve)
  );
}
