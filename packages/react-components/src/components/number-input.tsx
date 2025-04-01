"use client";

import { useCallback, useMemo, useState } from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { usePackageTranslation } from "../i18n";
import { MinusIcon, PlusIcon } from "@yamori-design/icons";
import { isNil, useHoldClick } from "@yamori-shared/react-utilities";

const NUMBER_REG_EXP = /^-?[0-9]*\.?[0-9]*$/;

export type NumberInputProps = OverwriteAndMerge<
  Omit<InputProps, "type">,
  {
    value: number | null;
    onChange: (newValue: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
  }
>;

export const NumberInput: React.FC<NumberInputProps> = ({
  className,
  suffix,
  value,
  disabled,
  onBlur,
  onChange,
  onKeyDown,
  prefix,
  step = 1,
  max,
  min,
  ...props
}) => {
  const { t } = usePackageTranslation();
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("number-input", className),
    [className]
  );

  const [internalValue, setInternalValue] = useState<string | null>();

  const limitValue = useCallback(
    (val: number) => {
      let returnValue = val;

      if (!isNil(min)) returnValue = Math.max(min, returnValue);

      if (!isNil(max)) returnValue = Math.min(max, returnValue);

      return returnValue;
    },
    [max, min]
  );

  const stepValue = useCallback(
    (stepDirection: 1 | -1) => {
      onChange(limitValue((value ?? 0) + stepDirection * step));
    },
    [limitValue, onChange, step, value]
  );

  const events = useHoldClick();

  const inputSuffix = useMemo(() => {
    const suffixList = [suffix];

    if (!disabled) {
      suffixList.push(
        <Button
          key="up"
          aria-label={t("up")}
          variant="icon"
          tabIndex={-1}
          onClick={() => stepValue(1)}
          title={t("up")}
          {...events}
        >
          <PlusIcon />
        </Button>
      );
    }

    return suffixList;
  }, [disabled, events, stepValue, suffix, t]);

  const inputPrefix = useMemo(() => {
    const prefixList = [prefix];

    if (!disabled) {
      prefixList.push(
        <Button
          key="down"
          aria-label={t("down")}
          variant="icon"
          tabIndex={-1}
          onClick={() => stepValue(-1)}
          title={t("down")}
          {...events}
        >
          <MinusIcon />
        </Button>
      );
    }

    return prefixList;
  }, [disabled, events, prefix, stepValue, t]);

  return (
    <Input
      className={bemClassNames["number-input"]}
      prefix={inputPrefix}
      suffix={inputSuffix}
      value={internalValue ?? value?.toString() ?? ""}
      inputMode="numeric"
      onChange={(e) => {
        const newValue = e.currentTarget.value;

        if (!NUMBER_REG_EXP.test(newValue)) return;

        setInternalValue(newValue);

        if (!newValue) {
          onChange(null);
          return;
        }

        const numberValue = Number(newValue);

        onChange(limitValue(Number.isNaN(numberValue) ? 0 : numberValue));
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setInternalValue(null);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);

        switch (e.key) {
          case "ArrowUp": {
            e.preventDefault();
            stepValue(1);
            setInternalValue(null);
            break;
          }
          case "ArrowDown": {
            stepValue(-1);
            setInternalValue(null);
            break;
          }
          default:
            break;
        }
      }}
      disabled={disabled}
      role="spinbutton"
      {...props}
    />
  );
};
