import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { createBemClassNames } from "../functions";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export const Button = forwardRef<ElementRef<"button">, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const bemClassNames = useMemo(
      () => createBemClassNames(["button", { [variant]: true }], className),
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
