import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
  useMemo,
} from "react";
import { bemClassNamesCreator } from "../../utilities";
import { ArrowDownIcon } from "@yamori-design/icons";

export type DetailsProps = ComponentPropsWithoutRef<"details"> & {
  summary: NonNullable<ReactNode>;
};

export const Details = forwardRef<ElementRef<"details">, DetailsProps>(
  ({ children, className, summary, ...props }, ref) => {
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
      <details className={bemClassNames["details"]} ref={ref} {...props}>
        <summary className={bemClassNames["summary"]} {...props}>
          {<ArrowDownIcon className={bemClassNames["arrow"]} />}
          {summary}
        </summary>
        <div className={bemClassNames["content"]}>{children}</div>
      </details>
    );
  }
);
