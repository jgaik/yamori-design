import { useArgs } from "storybook/preview-api";
import type { Meta, StoryFn } from "@storybook/react-vite";
import {
  Textarea as TextareaComponent,
  TextareaProps,
} from "@yamori-design/react-components";

export default {
  component: TextareaComponent,
  tags: ["!dev"],
  args: {
    disabled: false,
    resizable: false,
  },
} satisfies Meta<TextareaProps>;

export const Textarea: StoryFn<TextareaProps> = (args) => {
  const [{ value = "" }, updateArgs] = useArgs();

  return (
    <TextareaComponent
      {...args}
      value={value}
      onChange={(event) => updateArgs({ value: event.target.value })}
    />
  );
};
