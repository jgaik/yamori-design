import { useMemo } from "react";
import { usePackageTranslation } from "../i18n";
import { Select } from "./select";

export type LanguageSelectProps = {
  supportedLanguages: string[];
  onChange?: (language: string) => void;
};

const SUPPORTED_LANGUAGES: Record<string, string> = {
  en: "English",
  ja: "日本語",
};

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  supportedLanguages,
  onChange,
}) => {
  const { i18n } = usePackageTranslation();

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
      value={i18n.resolvedLanguage ?? null}
      onChange={(value) => {
        i18n.changeLanguage(value!);
        onChange?.(value!);
      }}
    >
      {options.map(([value, label]) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};
