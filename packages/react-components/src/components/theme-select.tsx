"use client";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { usePackageTranslation } from "../i18n";
import { Select, SelectProps } from "./select";
import { MoonIcon, SunIcon } from "@yamori-design/icons";
import { YAMORI_THEME_LOCAL_STORAGE_KEY } from "../utilities";
import { useLocalStorage } from "@yamori-shared/react-utilities";

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

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedTheme, setSavedTheme, removeSavedTheme] = useLocalStorage<
    "light" | "dark"
  >(YAMORI_THEME_LOCAL_STORAGE_KEY);

  const defaultIcon = useMemo(
    () => THEME_OPTIONS_MAP[isDarkMode ? "dark" : "light"],
    [isDarkMode]
  );

  const onThemeChange = useCallback(
    (themeOption: ThemeOption) => {
      if (themeOption === "default") {
        delete document.documentElement.dataset.yamoriTheme;
        removeSavedTheme();
      } else {
        document.documentElement.dataset.yamoriTheme = themeOption;

        setSavedTheme(themeOption);
      }
    },
    [setSavedTheme, removeSavedTheme]
  );

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
      value={savedTheme ?? "default"}
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
