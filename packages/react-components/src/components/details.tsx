import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { bemClassNamesCreator } from "../utilities";
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

    const summaryRef = useRef<ElementRef<"summary">>(null);

    const contentCallbackRef = useCallback((node: HTMLElement | null) => {
      if (node && summaryRef.current) {
        node.style.top = `${summaryRef.current.offsetHeight}px`;
      }
    }, []);

    return (
      <details className={bemClassNames["details"]} ref={ref} {...props}>
        <summary ref={summaryRef} className={bemClassNames["summary"]}>
          {<ArrowDownIcon className={bemClassNames["arrow"]} />}
          {summary}
        </summary>
        <div ref={contentCallbackRef} className={bemClassNames["content"]}>
          {children}
        </div>
      </details>
    );
  }
);
