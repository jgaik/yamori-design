import type { Meta, StoryFn } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import {
  Radio as RadioComponent,
  RadioProps,
} from "@yamori-design/react-components";

export default {
  component: RadioComponent,
  tags: ["!dev"],
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<RadioProps>;

export const Radio: StoryFn<RadioProps> = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <RadioComponent
      {...args}
      checked={checked}
      onClick={() => updateArgs({ checked: !checked })}
    />
  );
};
