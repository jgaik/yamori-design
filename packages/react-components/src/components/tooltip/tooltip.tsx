"use client";
import {
  ComponentProps,
  ComponentRef,
  ReactElement,
  ReactNode,
  Ref,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  bemClassNamesCreator,
  OverwriteAndMerge,
  YAMORI_THEME_SPACING_SMALL,
} from "../../utilities";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  Placement,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { TooltipSource } from "./tooltip-source";
import "@yamori-design/styles/dist/components/tooltip.css";

export type TooltipProps = OverwriteAndMerge<
  ComponentProps<"div">,
  {
    content: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<{ ref: Ref<any> }>;
    placement?: Placement;
    defaultOpen?: boolean;
    role?: "label" | "tooltip";
    disabled?: boolean;
  }
>;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  content,
  defaultOpen,
  disabled,
  placement = "top",
  role = "tooltip",
  ref,
  style,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("tooltip", className, "arrow"),
    [className]
  );
  const enabled = !disabled;

  const arrowRef = useRef<ComponentRef<typeof FloatingArrow>>(null);

  const [open, setOpen] = useState(defaultOpen);

  const { context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(YAMORI_THEME_SPACING_SMALL * 2),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: YAMORI_THEME_SPACING_SMALL,
      }),
      shift({ padding: YAMORI_THEME_SPACING_SMALL }),
      arrow({ element: arrowRef }),
    ],
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context, {
      move: false,
      enabled,
      handleClose: safePolygon(),
    }),
    useFocus(context, { enabled }),
    useRole(context, { role, enabled }),
    useDismiss(context),
  ]);

  const sourceRef = useMergeRefs([
    context.refs.setReference,
    children.props.ref,
  ]);
  const tooltipRef = useMergeRefs([context.refs.setFloating, ref]);

  return [
    open && (
      <FloatingPortal key="tooltip-portal">
        <div
          className={bemClassNames["tooltip"]}
          ref={tooltipRef}
          style={{
            ...context.floatingStyles,
            ...style,
          }}
          {...getFloatingProps(props)}
        >
          {content}
          <FloatingArrow
            className={bemClassNames["arrow"]}
            ref={arrowRef}
            context={context}
            strokeWidth={0.5}
            stroke="currentColor"
          />
        </div>
      </FloatingPortal>
    ),
    <TooltipSource
      key="tooltip-source"
      ref={sourceRef}
      getSourceProps={getReferenceProps}
    >
      {children}
    </TooltipSource>,
  ];
};
