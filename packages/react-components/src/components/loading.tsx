"use client";

import { ComponentPropsWithRef, useMemo } from "react";
import { useLabels } from "../labels";
import { SpinnerIcon } from "@yamori-design/icons";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/loading.css";

export type LoadingProps = Omit<ComponentPropsWithRef<"span">, "children">;

export const Loading: React.FC<LoadingProps> = ({ className, ...props }) => {
  const labels = useLabels();

  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("loading", className),
    [className]
  );

  return (
    <span className={bemClassNames["loading"]} role="progressbar" {...props}>
      <SpinnerIcon />
      {labels.loading}
    </span>
  );
};
