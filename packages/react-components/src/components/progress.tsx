"use client";

import { ComponentPropsWithRef, CSSProperties, useMemo } from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import "@yamori-design/styles/dist/components/progress.css";
import { isNil } from "@yamori-shared/react-utilities";

export type ProgressProps = OverwriteAndMerge<
  Omit<ComponentPropsWithRef<"progress">, "children">,
  {
    value: number;
    max?: number;
  }
>;

export const Progress: React.FC<ProgressProps> = ({
  className,
  value,
  max,
  ...props
}) => {
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        "progress",
        className,
        "bar",
        "labels",
        "label-light",
        "label-dark"
      ),
    [className]
  );

  const indeterminate = isNil(value);

  const safeMax = isNil(max) || max <= 0 ? 1 : max;
  const percentage = indeterminate
    ? 0
    : Math.max(0, Math.round(Math.min(100, (value / safeMax) * 100)));

  return (
    <div
      className={bemClassNames["progress"]}
      style={
        !indeterminate
          ? ({ "--percentage": `${percentage}%` } as CSSProperties)
          : undefined
      }
    >
      <progress
        value={indeterminate ? undefined : value}
        max={max}
        {...props}
      />
      <div className={bemClassNames["bar"]} />
      <div className={bemClassNames["labels"]}>
        {!indeterminate && (
          <>
            <span className={bemClassNames["label-light"]}>{percentage}%</span>
            <span className={bemClassNames["label-dark"]}>{percentage}%</span>
          </>
        )}
      </div>
    </div>
  );
};
