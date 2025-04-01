"use client";

import {
  Children,
  ComponentPropsWithRef,
  ComponentRef,
  ReactElement,
  useMemo,
  useRef,
  useState,
} from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../../utilities";
import { SelectOption, SelectOptionProps } from "./select-option";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  FloatingPortalProps,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { ArrowDownIcon } from "@yamori-design/icons";
import { SelectContextProvider, SelectContextValue } from "./select-context";
import "@yamori-design/styles/dist/components/select.css";

export type SelectProps = OverwriteAndMerge<
  Omit<ComponentPropsWithRef<"button">, "type">,
  {
    children: Array<ReactElement<SelectOptionProps>>;
    clearable?: boolean;
    onChange: (value: string | null) => void;
    placeholder?: string;
    value: string | null;
    portalProps?: FloatingPortalProps;
  }
>;

export type { SelectOptionProps };

export const Select = Object.assign(
  ({
    className,
    children,
    clearable,
    value,
    onChange,
    placeholder,
    portalProps,
    ref,
    ...props
  }: SelectProps) => {
    const bemClassNames = useMemo(
      () =>
        bemClassNamesCreator.create(
          "select",
          className,
          "dropdown",
          "placeholder"
        ),
      [className]
    );

    const options = useMemo(
      () =>
        Children.map(children, (child) => ({
          value: child.props.value,
          children: child.props.children,
        })),
      [children]
    );

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<ComponentRef<"button"> | null>>([]);

    const selectedIndex = useMemo(
      () => options.findIndex((option) => option.value === value),
      [options, value]
    );

    const { context, refs, floatingStyles } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: "bottom-start",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
        flip({ padding: 5 }),
        size({
          padding: 5,
          apply({ rects, elements }) {
            elements.floating.style.minWidth = `${rects.reference.width}px`;
          },
        }),
      ],
    });

    const { getFloatingProps, getItemProps, getReferenceProps } =
      useInteractions([
        useListNavigation(context, {
          listRef: elementsRef,
          activeIndex,
          selectedIndex: selectedIndex === -1 ? null : selectedIndex,
          onNavigate: setActiveIndex,
          loop: true,
        }),
        useClick(context),
        useDismiss(context),
        useRole(context, { role: "select" }),
      ]);

    const buttonRef = useMergeRefs([ref, refs.setReference]);

    const selectContextValue = useMemo<SelectContextValue>(
      () => ({
        activeIndex,
        selectedIndex,
        onSelect: (value) => {
          setIsOpen(false);
          if (clearable || value !== null) {
            onChange(value);
          }
        },
        getItemProps,
      }),
      [activeIndex, clearable, getItemProps, onChange, selectedIndex]
    );

    return [
      <button
        className={bemClassNames["select"]}
        key="select-button"
        ref={buttonRef}
        type="button"
        {...getReferenceProps(props)}
      >
        {options[selectedIndex]?.children ?? (
          <span className={bemClassNames["placeholder"]}>{placeholder}</span>
        )}
        <ArrowDownIcon />
      </button>,
      <SelectContextProvider key="select-dropdown" value={selectContextValue}>
        {isOpen && (
          <FloatingPortal {...portalProps}>
            <FloatingFocusManager context={context} modal={false}>
              <ul
                className={bemClassNames["dropdown"]}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <FloatingList elementsRef={elementsRef}>
                  {children}
                </FloatingList>
              </ul>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </SelectContextProvider>,
    ];
  },
  { Option: SelectOption }
);
