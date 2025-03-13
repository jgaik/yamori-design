"use client";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { usePackageTranslation } from "../i18n";
import { Select, SelectProps } from "./select";
import { MoonIcon, SunIcon } from "@yamori-design/icons";
import { YAMORI_THEME_LOCAL_STORAGE_KEY } from "../utilities";

const THEME_OPTIONS_MAP = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  default: null,
};

export type ThemeOption = keyof typeof THEME_OPTIONS_MAP;

export type ThemeSelectProps = Omit<
  SelectProps,
  "value" | "onChange" | "children"
>;

export const ThemeSelect: React.FC<ThemeSelectProps> = (props) => {
  const { t } = usePackageTranslation();

  const [value, setValue] = useState<ThemeOption>("default");

  const [isDarkMode, setIsDarkMode] = useState(false);

  const defaultIcon = useMemo(
    () => THEME_OPTIONS_MAP[isDarkMode ? "dark" : "light"],
    [isDarkMode]
  );

  const onThemeChange = useCallback((themeOption: ThemeOption) => {
    setValue(themeOption);

    if (themeOption === "default") {
      delete document.documentElement.dataset.yamoriTheme;
      localStorage.removeItem(YAMORI_THEME_LOCAL_STORAGE_KEY);
    } else {
      setValue(themeOption);
      document.documentElement.dataset.yamoriTheme = themeOption;

      localStorage.setItem(YAMORI_THEME_LOCAL_STORAGE_KEY, themeOption);
    }
  }, []);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem(
      YAMORI_THEME_LOCAL_STORAGE_KEY
    ) as ThemeOption | null;

    if (savedTheme) {
      onThemeChange(savedTheme);
    }
  }, [onThemeChange]);

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };
    setIsDarkMode(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);

  return (
    <Select
      value={value}
      onChange={(value) => {
        onThemeChange(value as ThemeOption);
      }}
      {...props}
    >
      {Object.entries(THEME_OPTIONS_MAP).map(([themeOption, icon]) => (
        <Select.Option key={themeOption} value={themeOption}>
          {icon ?? defaultIcon}
          {t(themeOption)}
        </Select.Option>
      ))}
    </Select>
  );
};
