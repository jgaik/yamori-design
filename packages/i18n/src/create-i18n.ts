import i18next, { i18n as I18n, InitOptions, Resource } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { labelResources } from "./resources";

export type I18nPlugin = Parameters<I18n["use"]>[0];

export type CreateI18nOptions = Omit<InitOptions, "resources"> & {
  resources?: Resource;
  plugins?: I18nPlugin[];
};

const mergeResources = (...sources: Resource[]) =>
  sources.reduce<Resource>((merged, source) => {
    for (const [language, namespaces] of Object.entries(source)) {
      merged[language] ??= {};

      for (const [namespace, strings] of Object.entries(namespaces)) {
        merged[language][namespace] = {
          ...(merged[language][namespace] as Record<string, unknown>),
          ...(strings as Record<string, unknown>),
        };
      }
    }

    return merged;
  }, {});

export const createI18n = ({
  resources,
  plugins = [],
  ...options
}: CreateI18nOptions = {}): I18n => {
  const i18n = plugins.reduce(
    (instance, plugin) => instance.use(plugin),
    i18next.createInstance().use(LanguageDetector).use(initReactI18next),
  );

  void i18n.init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    partialBundledLanguages: true,
    ...options,
    resources: mergeResources(labelResources, resources ?? {}),
  });

  return i18n;
};
