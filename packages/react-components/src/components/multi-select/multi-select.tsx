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
import {
  MultiSelectOption,
  MultiSelectOptionProps,
} from "./multi-select-option";
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
import {
  MULTI_SELECT_OPTION_ALL,
  MultiSelectContextProvider,
  MultiSelectContextValue,
} from "./multi-select-context";
import { usePackageTranslation } from "../../i18n";
import { splitArray } from "@yamori-shared/react-utilities";
import { MultiSelectValue } from "./multi-select-value";
import "@yamori-design/styles/dist/components/multi-select.css";

export type MultiSelectProps = OverwriteAndMerge<
  Omit<ComponentPropsWithRef<"button">, "type">,
  {
    children: Array<ReactElement<MultiSelectOptionProps>>;
    onChange: (value: string[]) => void;
    placeholder?: string;
    value: string[];
    portalProps?: FloatingPortalProps;
  }
>;

export type { MultiSelectOptionProps };

export const MultiSelect = Object.assign(
  ({
    className,
    children,
    value,
    onChange,
    placeholder,
    portalProps,
    ref,
    ...props
  }: MultiSelectProps) => {
    const { t } = usePackageTranslation();
    const bemClassNames = useMemo(
      () =>
        bemClassNamesCreator.create(
          "multi-select",
          className,
          "dropdown",
          "placeholder",
          "value"
        ),
      [className]
    );

    const options = useMemo(
      () =>
        Children.map(children, (child) => ({
          value: child.props.value,
          disabled: child.props.disabled,
          children: child.props.children,
        })) ?? [],
      [children]
    );

    const [enabledValues, disabledValues] = useMemo(
      () =>
        splitArray(options, ({ disabled }) => !disabled).map((arr) =>
          arr.map(({ value }) => value)
        ),
      [options]
    );

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<ComponentRef<"button"> | null>>([]);

    const selectedIndices = useMemo(
      () =>
        value.length === options.length
          ? MULTI_SELECT_OPTION_ALL
          : value
              .map(
                (val) => options.findIndex((option) => option.value === val) + 1
              )
              .sort((a, b) => a - b),
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
          onNavigate: setActiveIndex,
          loop: true,
        }),
        useClick(context),
        useDismiss(context),
        useRole(context, { role: "select" }),
      ]);

    const buttonRef = useMergeRefs([ref, refs.setReference]);

    const selectContextValue = useMemo<MultiSelectContextValue>(
      () => ({
        activeIndex,
        selectedIndices,
        onSelect: (selValue, checked) => {
          if (selValue === MULTI_SELECT_OPTION_ALL) {
            onChange(
              checked
                ? value.filter((val) => disabledValues.includes(val))
                : [...value, ...enabledValues]
            );
          } else {
            onChange(
              checked
                ? value.filter((val) => val !== selValue)
                : [...value, selValue]
            );
          }
        },
        getItemProps,
      }),
      [
        activeIndex,
        disabledValues,
        enabledValues,
        getItemProps,
        onChange,
        selectedIndices,
        value,
      ]
    );

    return [
      <button
        className={bemClassNames["multi-select"]}
        key="multi-select-button"
        ref={buttonRef}
        type="button"
        {...getReferenceProps(props)}
      >
        {selectedIndices.length === 0 ? (
          <span className={bemClassNames["placeholder"]}>{placeholder}</span>
        ) : (
          <MultiSelectValue
            className={bemClassNames["value"]}
            options={options}
            selectedIndices={selectedIndices}
          />
        )}
        <ArrowDownIcon />
      </button>,
      <MultiSelectContextProvider
        key="multi-select-dropdown"
        value={selectContextValue}
      >
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
                  <MultiSelectOption value={MULTI_SELECT_OPTION_ALL}>
                    {t("all")}
                  </MultiSelectOption>
                  {children}
                </FloatingList>
              </ul>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </MultiSelectContextProvider>,
    ];
  },
  { Option: MultiSelectOption }
);
