"use client";

import { ComponentPropsWithRef, ReactNode, useMemo } from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import "@yamori-design/styles/dist/components/input.css";

export type InputProps = OverwriteAndMerge<
  ComponentPropsWithRef<"input">,
  {
    type?: "text" | "password";
    prefix?: ReactNode;
    suffix?: ReactNode;
    value?: string;
  }
>;

export const Input: React.FC<InputProps> = ({
  className,
  prefix,
  suffix,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("input", className),
    [className]
  );

  return (
    <div className={bemClassNames["input"]}>
      {prefix}
      <input {...props} />
      {suffix}
    </div>
  );
};
