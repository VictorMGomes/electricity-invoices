import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';

function ThemeSelector() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as
      | 'light'
      | 'dark'
      | null;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-bs-theme', initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey === 'light' || selectedKey === 'dark') {
      setTheme(selectedKey);
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="outline-secondary" size="sm">
        {theme === 'light'
          ? '🌞 ' + t('navbar.light-mode')
          : '🌙 ' + t('navbar.dark-mode')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="light" active={theme === 'light'}>
          🌞 {t('navbar.light-mode')}
        </Dropdown.Item>
        <Dropdown.Item eventKey="dark" active={theme === 'dark'}>
          🌙 {t('navbar.dark-mode')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ThemeSelector;
