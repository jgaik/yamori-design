import type { Meta, StoryFn } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import {
  Switch as SwitchComponent,
  SwitchProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/switch.css";

export default {
  component: SwitchComponent,
  tags: ["!dev"],
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<SwitchProps>;

export const Switch: StoryFn<SwitchProps> = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <SwitchComponent
      {...args}
      checked={checked}
      onChange={(event) => updateArgs({ checked: event.target.checked })}
    />
  );
};
