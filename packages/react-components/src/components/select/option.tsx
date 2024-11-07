import { ComponentPropsWithoutRef, useMemo } from "react";
import { useSelectContext } from "./select-context";
import { useListItem } from "@floating-ui/react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../../utilities";

export type OptionProps = OverwriteAndMerge<
  Omit<ComponentPropsWithoutRef<"button">, "tabIndex">,
  {
    value: string;
  }
>;

export const Option: React.FC<OptionProps> = ({
  className,
  value,
  onClick,
  ...props
}) => {
  const { activeIndex, selectedIndex, getItemProps, onSelect } =
    useSelectContext();

  const { ref, index } = useListItem();

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        [
          "option",
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
        className={bemClassNames["option"]}
        ref={ref}
        tabIndex={isActive ? 0 : -1}
        {...getItemProps({
          ...props,
          onClick: (event) => {
            onClick?.(event as React.MouseEvent<HTMLButtonElement>);
            onSelect(isSelected ? null : value);
          },
        })}
      />
    </li>
  );
};

Option.displayName = "Select.Option";
