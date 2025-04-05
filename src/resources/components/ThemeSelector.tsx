import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';

type Theme = 'light' | 'dark' | 'system';

function ThemeSelector() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>('system');

  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const applyTheme = useCallback((selectedTheme: Theme) => {
    const themeToApply =
      selectedTheme === 'system' ? getSystemTheme() : selectedTheme;
    document.documentElement.setAttribute('data-bs-theme', themeToApply);
  }, []);

  useEffect(() => {
    const storedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(storedTheme);
    applyTheme(storedTheme);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (storedTheme === 'system') applyTheme('system');
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [applyTheme]);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme, applyTheme]);

  const handleSelect = (selectedKey: string | null) => {
    if (
      selectedKey === 'light' ||
      selectedKey === 'dark' ||
      selectedKey === 'system'
    ) {
      setTheme(selectedKey);
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return '🌞 ' + t('navbar.light-mode');
      case 'dark':
        return '🌙 ' + t('navbar.dark-mode');
      case 'system':
      default:
        return '🖥️ ' + t('navbar.system');
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="outline-secondary" size="sm">
        {getThemeLabel()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="light" active={theme === 'light'}>
          🌞 {t('navbar.light-mode')}
        </Dropdown.Item>
        <Dropdown.Item eventKey="dark" active={theme === 'dark'}>
          🌙 {t('navbar.dark-mode')}
        </Dropdown.Item>
        <Dropdown.Item eventKey="system" active={theme === 'system'}>
          🖥️ {t('navbar.system')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ThemeSelector;
