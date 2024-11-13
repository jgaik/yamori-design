import type { Meta, StoryObj } from "@storybook/react";
import {
  Button as ButtonComponent,
  ButtonProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/button.css";

export default {
  component: ButtonComponent,
  tags: ["!dev"],
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
      options: [
        "primary",
        "secondary",
        "text",
      ] satisfies ButtonProps["variant"][],
    },
  },
  args: {
    children: "Button",
    disabled: false,
    onClick: () => alert("Button clicked"),
    variant: "primary",
  },
} satisfies Meta<ButtonProps>;

export const Button: StoryObj<ButtonProps> = {};
