import { ComponentPropsWithoutRef, useMemo } from "react";
import {
  MULTI_SELECT_OPTION_ALL,
  useSelectContext,
} from "./multi-select-context";
import { useListItem } from "@floating-ui/react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../../utilities";
import { Checkbox } from "../checkbox";

export type MultiSelectOptionProps = OverwriteAndMerge<
  Omit<ComponentPropsWithoutRef<"button">, "tabIndex">,
  {
    value: string;
  }
>;

export const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
  className,
  value,
  onClick,
  children,
  disabled,
  ...props
}) => {
  const { activeIndex, selectedIndices, getItemProps, onSelect } =
    useSelectContext();

  const { ref, index } = useListItem();

  const isActive = activeIndex === index;
  const isSelected = useMemo(() => {
    if (value === MULTI_SELECT_OPTION_ALL) {
      if (selectedIndices === MULTI_SELECT_OPTION_ALL) return true;
      return selectedIndices.length > 0 ? "mixed" : false;
    }
    return selectedIndices === MULTI_SELECT_OPTION_ALL
      ? true
      : selectedIndices.includes(index);
  }, [index, selectedIndices, value]);

  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        [
          "multi-select-option",
          {
            selected: isSelected,
          },
        ],
        className
      ),
    [className, isSelected]
  );

  return (
    <li>
      <button
        className={bemClassNames["multi-select-option"]}
        ref={ref}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        {...getItemProps({
          ...props,
          onClick: (event) => {
            onClick?.(event as React.MouseEvent<HTMLButtonElement>);
            onSelect(value, !!isSelected);
          },
        })}
      >
        <Checkbox
          checked={isSelected}
          disabled={disabled}
          readOnly
          tabIndex={-1}
        />
        {children}
      </button>
    </li>
  );
};

MultiSelectOption.displayName = "MultiSelect.Option";
