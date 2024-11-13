import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../utilities";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "text";
};

export const Button = forwardRef<ElementRef<"button">, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const bemClassNames = useMemo(
      () =>
        bemClassNamesCreator.create(["button", { [variant]: true }], className),
      [className, variant]
    );

    return (
      <button
        className={bemClassNames["button"]}
        ref={ref}
        type="button"
        {...props}
      />
    );
  }
);
