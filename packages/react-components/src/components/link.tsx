"use client";

import { ComponentPropsWithRef, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/link.css";

export type LinkProps = ComponentPropsWithRef<"a">;

export const Link: React.FC<LinkProps> = ({ className, ...props }) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("link", className),
    [className]
  );

  return <a className={bemClassNames["link"]} {...props} />;
};
