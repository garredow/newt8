function getSettings() {
  return new Promise((resolve) =>
    chrome.storage.local.get('settings', (res) => resolve(res['settings']))
  );
}

async function loadThemes() {
  const settings = await getSettings();
  console.log('settings', settings);

  var template = document.querySelector('#theme-row');
  var list = document.querySelector('.theme-list');
  settings.themes.forEach((theme, i) => {
    if (!theme.id.startsWith('custom')) {
      return;
    }

    var clone = template.content.cloneNode(true);
    const root = clone.querySelector('.theme-row');
    root.id = `theme_${i}`;
    var span = clone.querySelector('span');
    span.textContent = theme.name;
    var button = clone.querySelector('button');
    button.addEventListener('click', () => deleteTheme(theme.id, `theme_${i}`));

    list.appendChild(clone);
  });
}

async function deleteTheme(themeId, elementId) {
  const settings = await getSettings();
  settings.themes = settings.themes.filter((a) => a.id !== themeId);
  settings.activeTheme = 'dark';

  chrome.storage.local.set({ settings }, () => {
    const element = document.querySelector(`#${elementId}`);
    element.remove();
  });
}

loadThemes();
