"use client";

import { useLocalStorage } from "@yamori-shared/react-utilities";
import { useLayoutEffect, useState } from "react";
import { YAMORI_THEME_LOCAL_STORAGE_KEY } from "../utilities";

export function useYamoriTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [localTheme] = useLocalStorage<"dark" | "light">(
    YAMORI_THEME_LOCAL_STORAGE_KEY
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

  const browserTheme = isDarkMode ? "dark" : "light";

  return localTheme ?? browserTheme;
}
