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
} from "../utilities";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { FloatingSource } from "./shared";
import "@yamori-design/styles/dist/components/popover.css";

export type PopoverProps = OverwriteAndMerge<
  ComponentProps<"div">,
  {
    content: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<{ ref: Ref<any> }>;
    placement?: Placement;
    defaultOpen?: boolean;
    disabled?: boolean;
  }
>;

export const Popover: React.FC<PopoverProps> = ({
  children,
  className,
  content,
  defaultOpen,
  disabled,
  placement = "top",
  ref,
  style,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("popover", className, "arrow"),
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
    useClick(context, { enabled }),
    useRole(context, { enabled }),
    useDismiss(context),
  ]);

  const sourceRef = useMergeRefs([
    context.refs.setReference,
    children.props.ref,
  ]);
  const popoverRef = useMergeRefs([context.refs.setFloating, ref]);

  return [
    open && (
      <FloatingPortal key="popover-portal">
        <FloatingFocusManager context={context}>
          <div
            className={bemClassNames["popover"]}
            ref={popoverRef}
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
        </FloatingFocusManager>
      </FloatingPortal>
    ),
    <FloatingSource
      key="popover-source"
      ref={sourceRef}
      getSourceProps={getReferenceProps}
    >
      {children}
    </FloatingSource>,
  ];
};
