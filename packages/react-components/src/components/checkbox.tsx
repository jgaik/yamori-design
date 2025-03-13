"use client";

import React, {
  ComponentPropsWithRef,
  ComponentRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { MinusIcon, CheckIcon } from "@yamori-design/icons";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import "@yamori-design/styles/dist/components/checkbox.css";

export type CheckboxProps = OverwriteAndMerge<
  Omit<ComponentPropsWithRef<"input">, "type">,
  {
    checked: boolean | "mixed";
  }
>;

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  ref,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("checkbox", className),
    [className]
  );

  const inputRef = useRef<ComponentRef<"input"> | null>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const callbackRef = useCallback(
    (node: ComponentRef<"input"> | null) => {
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
};
