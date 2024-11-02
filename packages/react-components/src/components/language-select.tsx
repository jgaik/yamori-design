import { usePackageTranslation } from "../i18n";

type LanguageSelectProps = {
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
    <select
      value={i18n.resolvedLanguage}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        onChange?.(e.target.value);
      }}
    >
      {Object.entries(SUPPORTED_LANGUAGES)
        .filter(([lng]) => supportedLanguages.includes(lng))
        .map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
    </select>
  );
};
