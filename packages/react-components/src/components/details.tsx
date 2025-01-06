import React, { ComponentPropsWithRef, ReactNode, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import { ArrowDownIcon } from "@yamori-design/icons";
import "@yamori-design/styles/dist/components/details.css";

export type DetailsProps = ComponentPropsWithRef<"details"> & {
  summary: NonNullable<ReactNode>;
};

export const Details: React.FC<DetailsProps> = ({
  children,
  className,
  summary,
  ...props
}) => {
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        "details",
        className,
        "summary",
        "arrow",
        "content"
      ),
    [className]
  );

  return (
    <details className={bemClassNames["details"]} {...props}>
      <summary className={bemClassNames["summary"]}>
        {<ArrowDownIcon className={bemClassNames["arrow"]} />}
        {summary}
      </summary>
      <div className={bemClassNames["content"]}>{children}</div>
    </details>
  );
};
