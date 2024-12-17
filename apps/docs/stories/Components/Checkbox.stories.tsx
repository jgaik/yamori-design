import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import {
  Checkbox as CheckboxComponent,
  CheckboxProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/checkbox.css";

export default {
  component: CheckboxComponent,
  tags: ["!dev"],
  argTypes: {
    checked: {
      control: "radio",
      options: [true, false, "mixed"] satisfies CheckboxProps["checked"][],
    },
  },
  args: {
    disabled: false,
    checked: false,
  },
} satisfies Meta<CheckboxProps>;

export const Checkbox: StoryFn<CheckboxProps> = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <CheckboxComponent
      {...args}
      checked={checked}
      onChange={(event) => updateArgs({ checked: event.target.checked })}
    />
  );
};
