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

  return (
    <Select
      value={i18n.resolvedLanguage ?? null}
      onChange={(value) => {
        i18n.changeLanguage(value!);
        onChange?.(value!);
      }}
    >
      {Object.entries(SUPPORTED_LANGUAGES)
        .filter(([lng]) => supportedLanguages.includes(lng))
        .map(([value, label]) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
    </Select>
  );
};
