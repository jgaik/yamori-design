"use client";

import { useMemo } from "react";
import { SearchIcon, CloseIcon } from "@yamori-design/icons";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { useLabels } from "../labels";

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
  const labels = useLabels();
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("search-input", className),
    [className]
  );

  const inputSuffix = useMemo(() => {
    const suffixList = [suffix];

    if (value && !disabled) {
      suffixList.push(
        <Button
          aria-label={labels.clear}
          key="clear-button"
          variant="text"
          onClick={() => onChange("")}
          title={labels.clear}
        >
          <CloseIcon />
        </Button>
      );
    }

    return [...suffixList, <SearchIcon key="search-icon" />];
  }, [disabled, onChange, suffix, labels, value]);

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
