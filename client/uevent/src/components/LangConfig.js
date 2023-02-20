import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  lng: "",
  resources: {
    ua: {
      translation: {
        login: "Login",
        register: "Register"
      }
    },
    en: {
      translation: {
        login: "Вхід",
        register: "Реєстрація"
      }
    }
  },
  keySeparator: false,
  interpolation: { escapeValue: false }
});

export default i18n;