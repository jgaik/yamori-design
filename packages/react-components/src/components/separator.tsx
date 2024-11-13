import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../utilities";

export type SeparatorProps = ComponentPropsWithoutRef<"hr">;

export const Separator = forwardRef<ElementRef<"hr">, SeparatorProps>(
  ({ className, ...props }, ref) => {
    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("separator", className),
      [className]
    );

    return <hr className={bemClassNames["separator"]} ref={ref} {...props} />;
  }
);
