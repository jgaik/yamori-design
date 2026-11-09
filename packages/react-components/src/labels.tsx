"use client";

import { createContext, PropsWithChildren, useContext, useMemo } from "react";

export type Labels = {
  all: string;
  cancel: string;
  clear: string;
  close: string;
  dark: string;
  default: string;
  delete: string;
  down: string;
  hidePassword: string;
  home: string;
  key: string;
  light: string;
  loading: string;
  noData: string;
  showPassword: string;
  up: string;
  value: string;
};

export const DEFAULT_LABELS: Labels = {
  all: "All",
  cancel: "Cancel",
  clear: "Clear",
  close: "Close",
  dark: "Dark",
  default: "Default",
  delete: "Delete",
  down: "Down",
  hidePassword: "Hide Password",
  home: "Home",
  key: "Key",
  light: "Light",
  loading: "Loading",
  noData: "No data",
  showPassword: "Show Password",
  up: "Up",
  value: "Value",
};

const LabelsContext = createContext<Labels>(DEFAULT_LABELS);

export type LabelsProviderProps = PropsWithChildren<{
  labels: Partial<Labels>;
}>;

export const LabelsProvider: React.FC<LabelsProviderProps> = ({
  labels,
  children,
}) => {
  const parentLabels = useContext(LabelsContext);
  const value = useMemo(
    () => ({ ...parentLabels, ...labels }),
    [parentLabels, labels]
  );

  return <LabelsContext.Provider value={value}>{children}</LabelsContext.Provider>;
};

export const useLabels = () => useContext(LabelsContext);
