import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { createBemClassNames } from "../functions";

export type LinkProps = ComponentPropsWithoutRef<"a">;

export const Link = forwardRef<ElementRef<"a">, LinkProps>(
  ({ className, ...props }, ref) => {
    const bemClassNames = useMemo(
      () => createBemClassNames("link", className),
      [className]
    );

    return <a className={bemClassNames["link"]} ref={ref} {...props} />;
  }
);
