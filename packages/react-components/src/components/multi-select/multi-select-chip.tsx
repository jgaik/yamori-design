import { ComponentPropsWithoutRef, useMemo } from "react";
import { bemClassNamesCreator } from "../../utilities";

export type MultiSelectChipProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "tabIndex"
> & {
  disabled?: boolean;
};

export const MultiSelectChip: React.FC<MultiSelectChipProps> = ({
  className,
  disabled,
  ...props
}) => {
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        [
          "multi-select-chip",
          {
            disabled,
          },
        ],
        className
      ),
    [className, disabled]
  );

  return <div className={bemClassNames["multi-select-chip"]} {...props} />;
};

MultiSelectChip.displayName = "MultiSelect.Chip";
