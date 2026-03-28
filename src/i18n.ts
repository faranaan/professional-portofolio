import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationID from "./locales/id/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
    en: {
        translation: translationEN,
    },
    id: {
        translation: translationID,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;