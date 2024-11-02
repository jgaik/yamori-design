import i18next, { InitOptions } from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";
import resources from "./resources.json";

const i18n = i18next.createInstance();

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  } satisfies InitOptions);

export function usePackageTranslation() {
  return useTranslation("translation", { i18n });
}
