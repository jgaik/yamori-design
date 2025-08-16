import { Meta, StoryFn } from "@storybook/react-vite";
import {
  MultiSelect as MultiSelectComponent,
  MultiSelectProps,
} from "@yamori-design/react-components";
import { useState } from "react";

export default {
  component: MultiSelectComponent,
  tags: ["!dev"],
  args: {
    placeholder: "MultiSelect",
    disabled: false,
    style: {
      minWidth: 160,
      maxWidth: 200,
    },
  },
} satisfies Meta<MultiSelectProps>;

export const MultiSelect: StoryFn<MultiSelectProps> = (args) => {
  const [value, setValue] = useState<string[]>(["banana"]);

  return (
    <MultiSelectComponent {...args} value={value} onChange={setValue}>
      <MultiSelectComponent.Option value="banana">
        Banana
      </MultiSelectComponent.Option>
      <MultiSelectComponent.Option value="apple">
        Apple
      </MultiSelectComponent.Option>
      <MultiSelectComponent.Option value="orange">
        Orange
      </MultiSelectComponent.Option>
      <MultiSelectComponent.Option value="kiwi">
        Kiwi
      </MultiSelectComponent.Option>
    </MultiSelectComponent>
  );
};
