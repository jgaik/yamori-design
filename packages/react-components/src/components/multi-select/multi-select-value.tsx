import React, { ComponentRef, useLayoutEffect, useRef, useState } from "react";
import {
  MULTI_SELECT_OPTION_ALL,
  MultiSelectContextValue,
} from "./multi-select-context";
import { usePackageTranslation } from "../../i18n";
import { MultiSelectOptionProps } from "./multi-select-option";
import { MultiSelectChip } from "./multi-select-chip";

type MultiSelectValueProps = {
  selectedIndices: MultiSelectContextValue["selectedIndices"];
  options: Array<
    Pick<MultiSelectOptionProps, "children" | "disabled" | "value">
  >;
  className: string;
};

export const MultiSelectValue: React.FC<MultiSelectValueProps> = ({
  className,
  selectedIndices,
  options,
}) => {
  const { t } = usePackageTranslation();

  const containerRef = useRef<ComponentRef<"div">>(null);

  const [shownChips, setShownChips] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    if (container.scrollWidth > container.clientWidth) {
      setShownChips(shownChips - 1);
    }
  }, [shownChips]);

  useLayoutEffect(() => {
    setShownChips(
      selectedIndices !== MULTI_SELECT_OPTION_ALL ? selectedIndices.length : 0
    );
  }, [selectedIndices]);

  return (
    <div ref={containerRef} className={className}>
      {selectedIndices === MULTI_SELECT_OPTION_ALL && t("all")}
      {selectedIndices !== MULTI_SELECT_OPTION_ALL && [
        ...selectedIndices
          .slice(0, shownChips)
          .map((idx) => options[idx - 1])
          .map(({ value, ...option }) => (
            <MultiSelectChip key={value} {...option} />
          )),
        selectedIndices.length !== shownChips && "...",
      ]}
    </div>
  );
};

MultiSelectValue.displayName = "MultiSelect.Value";
