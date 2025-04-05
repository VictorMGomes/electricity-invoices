import i18n from 'i18next';
import type { BackendModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const dynamicImportBackend: BackendModule = {
  type: 'backend',
  init: () => {},
  read: async (
    language: string,
    namespace: string,
    callback: (err: Error | null, data: unknown) => void,
  ) => {
    try {
      const resources = await import(`../locales/${language}.json`);
      callback(null, resources.default);
    } catch (error) {
      console.error(`Could not load language file: ${language}.json`, error);
      callback(error as Error, false);
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(dynamicImportBackend)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
