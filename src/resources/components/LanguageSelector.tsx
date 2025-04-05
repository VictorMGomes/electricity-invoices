import { useTranslation } from 'react-i18next';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import i18n from 'i18next';

function LanguageSelector() {
  const { t } = useTranslation();

  const LANGUAGES: Record<string, string> = {
    en: t('language.en'),
    pt: t('language.pt'),
  };

  const currentLanguage = i18n.language || 'en';

  const handleSelect = (lang: string | null) => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="light" size="sm" id="language-selector">
        🌐 {LANGUAGES[currentLanguage] ?? currentLanguage}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.entries(LANGUAGES).map(([code, label]) => (
          <Dropdown.Item
            key={code}
            eventKey={code}
            active={currentLanguage === code}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
