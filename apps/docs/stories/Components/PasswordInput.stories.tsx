import { useArgs } from "storybook/preview-api";
import type { Meta, StoryFn } from "@storybook/react-vite";
import {
  PasswordInput as PasswordInputComponent,
  PasswordInputProps,
} from "@yamori-design/react-components";

export default {
  component: PasswordInputComponent,
  tags: ["!dev"],
  args: {
    disabled: false,
    placeholder: "Placeholder",
  },
} satisfies Meta<PasswordInputProps>;

export const PasswordInput: StoryFn<PasswordInputProps> = (args) => {
  const [{ value = "" }, updateArgs] = useArgs();

  return (
    <PasswordInputComponent
      {...args}
      value={value}
      onChange={(event) => updateArgs({ value: event.target.value })}
    />
  );
};
