"use client";

import { useMemo } from "react";
import { SearchIcon, CloseIcon } from "@yamori-design/icons";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { usePackageTranslation } from "../i18n";

export type SearchInputProps = OverwriteAndMerge<
  Omit<InputProps, "type">,
  {
    value: string;
    onChange: (newValue: string) => void;
  }
>;

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  suffix,
  value,
  disabled,
  onChange,
  ...props
}) => {
  const { t } = usePackageTranslation();
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("search-input", className),
    [className]
  );

  const inputSuffix = useMemo(() => {
    const suffixList = [suffix];

    if (value && !disabled) {
      suffixList.push(
        <Button
          aria-label={t("clear")}
          key="clear-button"
          variant="text"
          onClick={() => onChange("")}
          title={t("clear")}
        >
          <CloseIcon />
        </Button>
      );
    }

    return [...suffixList, <SearchIcon key="search-icon" />];
  }, [disabled, onChange, suffix, t, value]);

  return (
    <Input
      className={bemClassNames["search-input"]}
      suffix={inputSuffix}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      role="searchbox"
      disabled={disabled}
      {...props}
    />
  );
};
