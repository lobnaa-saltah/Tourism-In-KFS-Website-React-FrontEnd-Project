import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const isRTL = i18n.dir() === 'rtl';
  const currentLang = i18n.language;

  const toggleLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return {
    t,
    i18n,
    isRTL,
    currentLang,
    toggleLanguage,
    dir: i18n.dir()
  };
};
