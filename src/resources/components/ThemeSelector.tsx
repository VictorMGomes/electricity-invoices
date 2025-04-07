import React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa6';

function ThemeSelector() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

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
        return (
          <>
            <FaSun className="me-2" />
            {t('navbar.light-mode')}
          </>
        );
      case 'dark':
        return (
          <>
            <FaMoon className="me-2" />
            {t('navbar.dark-mode')}
          </>
        );
      case 'system':
      default:
        return (
          <>
            <FaDesktop className="me-2" />
            {t('navbar.system')}
          </>
        );
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="outline-secondary"
        size="sm"
        className="min-width-dropdown text-start"
      >
        {getThemeLabel()}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100 text-center">
        <Dropdown.Item
          eventKey="light"
          active={theme === 'light'}
          className="d-flex justify-content-center align-items-center"
        >
          <FaSun className="me-2" />
          {t('navbar.light-mode')}
        </Dropdown.Item>

        <Dropdown.Item
          eventKey="dark"
          active={theme === 'dark'}
          className="d-flex justify-content-center align-items-center"
        >
          <FaMoon className="me-2" />
          {t('navbar.dark-mode')}
        </Dropdown.Item>

        <Dropdown.Item
          eventKey="system"
          active={theme === 'system'}
          className="d-flex justify-content-center align-items-center"
        >
          <FaDesktop className="me-2" />
          {t('navbar.system')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ThemeSelector;
