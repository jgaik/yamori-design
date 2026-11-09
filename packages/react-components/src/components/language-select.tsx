"use client";

import { useMemo } from "react";
import { Select, SelectProps } from "./select";
import { OverwriteAndMerge } from "../utilities";

export type LanguageSelectProps = OverwriteAndMerge<
  Omit<SelectProps, "value" | "onChange" | "children">,
  {
    supportedLanguages: string[];
    value: string | null;
    onChange?: (language: string) => void;
  }
>;

const SUPPORTED_LANGUAGES: Record<string, string> = {
  en: "English",
  ja: "日本語",
};

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  supportedLanguages,
  value,
  onChange,
  ...props
}) => {
  const options = useMemo(
    () =>
      Object.entries(SUPPORTED_LANGUAGES).filter(([lng]) =>
        supportedLanguages.includes(lng)
      ),
    [supportedLanguages]
  );

  if (options.length === 0) {
    return null;
  }

  return (
    <Select
      value={value}
      onChange={(language) => onChange?.(language!)}
      {...props}
    >
      {options.map(([value, label]) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};
