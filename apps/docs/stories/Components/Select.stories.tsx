import { Meta, StoryFn } from "@storybook/react-vite";
import {
  Select as SelectComponent,
  SelectProps,
} from "@yamori-design/react-components";
import { MoonIcon, SunIcon } from "@yamori-design/icons";
import { useState } from "react";

export default {
  component: SelectComponent,
  tags: ["!dev"],
  args: {
    placeholder: "Select",
    clearable: true,
    disabled: false,
    style: {
      minWidth: 160,
    },
  },
} satisfies Meta<SelectProps>;

export const Select: StoryFn<SelectProps> = (args) => {
  const [value, setValue] = useState<string | null>("default");

  return (
    <SelectComponent {...args} value={value} onChange={setValue}>
      <SelectComponent.Option value="default" disabled>
        Default
      </SelectComponent.Option>
      <SelectComponent.Option value="light">
        <SunIcon />
        Light
      </SelectComponent.Option>
      <SelectComponent.Option value="dark">
        <MoonIcon />
        Dark
      </SelectComponent.Option>
    </SelectComponent>
  );
};
