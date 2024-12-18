import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../utilities";
import { WithRequired } from "@yamori-shared/react-utilities";

export type RadioProps = WithRequired<
  Omit<ComponentPropsWithoutRef<"input">, "type">,
  "checked"
>;

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
