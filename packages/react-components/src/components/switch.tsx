import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../utilities";

export type SwitchProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "checked" | "type"
> & {
  checked: boolean;
};

export const Switch = forwardRef<ElementRef<"input">, SwitchProps>(
  ({ className, ...props }, ref) => {
    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("switch", className, "handle"),
      [className]
    );

    return (
      <div className={bemClassNames["switch"]}>
        <div className={bemClassNames["handle"]} />
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          readOnly={!props.onChange}
          {...props}
        />
      </div>
    );
  }
);
