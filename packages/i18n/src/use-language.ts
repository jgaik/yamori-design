"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const setLanguage = useCallback(
    (language: string) => {
      void i18n.changeLanguage(language);
    },
    [i18n],
  );

  return { language: i18n.resolvedLanguage ?? null, setLanguage };
};
