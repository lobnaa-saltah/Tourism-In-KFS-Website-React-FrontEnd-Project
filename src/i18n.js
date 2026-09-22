import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';

const resources = {
  ar: { translation: translationAR },
  en: { translation: translationEN },
  fr: { translation: translationFR },
  de: { translation: translationDE }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    
    // Support for multiple namespaces can be added here
    ns: ['translation'],
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      formatSeparator: ','
    },

    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'kfs_portal_lang',
    },

    react: {
      useSuspense: false // Set to true if using lazy loading for translations
    }
  });

// Update document attributes on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

export default i18n;
