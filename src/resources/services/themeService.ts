type Theme = 'light' | 'dark' | 'system';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getStoredTheme(): Theme {
  return (localStorage.getItem('theme') as Theme) || 'system';
}

export function applyTheme(theme: Theme) {
  const themeToApply = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-bs-theme', themeToApply);
}

export function initTheme() {
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
}

export function observeSystemThemeChange(callback?: () => void): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const storedTheme = getStoredTheme();

  const handler = () => {
    if (storedTheme === 'system') {
      applyTheme('system');
      callback?.();
    }
  };

  media.addEventListener('change', handler);

  return () => media.removeEventListener('change', handler);
}
