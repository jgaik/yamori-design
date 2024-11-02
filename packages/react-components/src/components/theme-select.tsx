import { useCallback, useLayoutEffect, useState } from "react";
import { usePackageTranslation } from "../i18n";

const THEME_OPTIONS = ["light", "dark", "default"] as const;

const LOCAL_STORAGE_KEY = "@yamori-design:theme";

export type ThemeOption = (typeof THEME_OPTIONS)[number];

export const ThemeSelect: React.FC = () => {
  const { t } = usePackageTranslation();

  const [value, setValue] = useState<ThemeOption>("default");

  const onThemeChange = useCallback((themeOption: ThemeOption) => {
    setValue(themeOption);

    if (themeOption === "default") {
      delete document.documentElement.dataset.yamoriTheme;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      setValue(themeOption);
      document.documentElement.dataset.yamoriTheme = themeOption;

      localStorage.setItem(LOCAL_STORAGE_KEY, themeOption);
    }
  }, []);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem(
      LOCAL_STORAGE_KEY
    ) as ThemeOption | null;

    if (savedTheme) {
      onThemeChange(savedTheme);
    }
  }, [onThemeChange]);

  return (
    <select
      value={value}
      onChange={(e) => {
        onThemeChange(e.target.value as ThemeOption);
      }}
    >
      {THEME_OPTIONS.map((themeOption) => (
        <option key={themeOption} value={themeOption}>
          {t(themeOption)}
        </option>
      ))}
    </select>
  );
};
