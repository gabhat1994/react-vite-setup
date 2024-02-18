import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import resources from './translations';

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    resources,
    lng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
