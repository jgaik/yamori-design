import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/button.css";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      control: "text",
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: "radio",
      options: ["primary", "secondary"] satisfies ButtonProps["variant"][],
    },
  },
  args: {
    children: "Button",
    disabled: false,
    onClick: () => alert("Button clicked"),
  },
} satisfies Meta<typeof Button>;

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: "primary",
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    variant: "secondary",
  },
};
