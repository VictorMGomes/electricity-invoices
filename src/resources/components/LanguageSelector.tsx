import { useTranslation } from 'react-i18next';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import i18n from 'i18next';
import { FaGlobe } from 'react-icons/fa6';

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
    <Dropdown onSelect={handleSelect} className="me-2">
      <Dropdown.Toggle
        variant="outline-secondary"
        size="sm"
        id="language-selector"
        className="min-width-dropdown text-start"
      >
        <FaGlobe className="me-2" />
        {LANGUAGES[currentLanguage] ?? currentLanguage}
      </Dropdown.Toggle>

      <Dropdown.Menu className="text-center w-100">
        {Object.entries(LANGUAGES).map(([code, label]) => (
          <Dropdown.Item
            key={code}
            eventKey={code}
            active={currentLanguage === code}
            className="d-flex justify-content-center"
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
