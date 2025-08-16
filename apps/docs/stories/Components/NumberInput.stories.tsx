import { useArgs } from "storybook/preview-api";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { GeckoIcon } from "@yamori-design/icons";
import {
  NumberInput as NumberInputComponent,
  NumberInputProps,
} from "@yamori-design/react-components";

export default {
  component: NumberInputComponent,
  tags: ["!dev"],
  argTypes: {
    prefix: {
      control: "boolean",
    },
    suffix: {
      control: "boolean",
    },
  },
  args: {
    disabled: false,
    placeholder: "Placeholder",
    prefix: false,
    suffix: false,
    max: 100,
    min: 10,
    step: 1,
  },
} satisfies Meta<NumberInputProps>;

export const NumberInput: StoryFn<NumberInputProps> = ({
  prefix,
  suffix,
  ...args
}) => {
  const [{ value = null }, updateArgs] = useArgs();

  return (
    <NumberInputComponent
      {...args}
      prefix={prefix && <GeckoIcon />}
      suffix={suffix && <GeckoIcon />}
      value={value}
      onChange={(newValue) => updateArgs({ value: newValue })}
    />
  );
};
