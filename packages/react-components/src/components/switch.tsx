import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../utilities";
import { WithRequired } from "@yamori-shared/react-utilities";

export type SwitchProps = WithRequired<
  Omit<ComponentPropsWithoutRef<"input">, "type">,
  "checked"
>;

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
