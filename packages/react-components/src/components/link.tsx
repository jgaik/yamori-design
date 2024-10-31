import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../utilities";

export type LinkProps = ComponentPropsWithoutRef<"a">;

export const Link = forwardRef<ElementRef<"a">, LinkProps>(
  ({ className, ...props }, ref) => {
    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("link", className),
      [className]
    );

    return <a className={bemClassNames["link"]} ref={ref} {...props} />;
  }
);
