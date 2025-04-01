"use client";

import { ComponentPropsWithRef, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/textarea.css";

export type TextareaProps = ComponentPropsWithRef<"textarea"> & {
  resizable?: boolean;
};

export const Textarea: React.FC<TextareaProps> = ({
  className,
  resizable,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create(["textarea", { resizable }], className),
    [className, resizable]
  );

  return <textarea className={bemClassNames["textarea"]} {...props} />;
};
