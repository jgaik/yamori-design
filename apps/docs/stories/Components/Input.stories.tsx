import { useArgs } from "storybook/preview-api";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { GeckoIcon } from "@yamori-design/icons";
import {
  Input as InputComponent,
  InputProps,
} from "@yamori-design/react-components";

export default {
  component: InputComponent,
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
  },
} satisfies Meta<InputProps>;

export const Input: StoryFn<InputProps> = ({ prefix, suffix, ...args }) => {
  const [{ value = "" }, updateArgs] = useArgs();

  return (
    <InputComponent
      {...args}
      prefix={prefix && <GeckoIcon />}
      suffix={suffix && <GeckoIcon />}
      value={value}
      onChange={(event) => updateArgs({ value: event.target.value })}
    />
  );
};
