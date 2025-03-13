"use client";

import { ComponentPropsWithRef, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/separator.css";

export type SeparatorProps = ComponentPropsWithRef<"hr">;

export const Separator: React.FC<SeparatorProps> = ({
  className,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("separator", className),
    [className]
  );

  return <hr className={bemClassNames["separator"]} {...props} />;
};
