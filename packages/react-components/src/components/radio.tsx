import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../utilities";

export type RadioProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "checked" | "type"
> & {
  checked: boolean;
};

export const Radio = forwardRef<ElementRef<"input">, RadioProps>(
  ({ className, ...props }, ref) => {
    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("radio", className),
      [className]
    );

    return (
      <div className={bemClassNames["radio"]}>
        <input ref={ref} type="radio" readOnly={!props.onChange} {...props} />
      </div>
    );
  }
);
