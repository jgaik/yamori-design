import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { MinusIcon, CheckIcon } from "@yamori-design/icons";
import { bemClassNamesCreator } from "../utilities";

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "checked" | "type"
> & {
  checked: boolean | "mixed";
};

export const Checkbox = forwardRef<ElementRef<"input">, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("checkbox", className),
      [className]
    );

    const inputRef = useRef<ElementRef<"input"> | null>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const callbackRef = useCallback(
      (node: ElementRef<"input"> | null) => {
        if (node) {
          node.indeterminate = checked === "mixed";
        }
        inputRef.current = node;
      },
      [checked]
    );

    return (
      <div className={bemClassNames["checkbox"]}>
        {checked === "mixed" && <MinusIcon />}
        {checked === true && <CheckIcon />}
        <input
          ref={callbackRef}
          type="checkbox"
          checked={checked === true}
          readOnly={!props.onChange}
          {...props}
        />
      </div>
    );
  }
);
