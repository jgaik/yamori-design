import type { Meta, StoryFn } from "@storybook/react-vite";
import { GeckoIcon } from "@yamori-design/icons";
import {
  Button as ButtonComponent,
  ButtonProps,
} from "@yamori-design/react-components";

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
        "icon",
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

export const Button: StoryFn<ButtonProps> = ({ children, ...args }) => (
  <ButtonComponent {...args}>
    {args.variant === "icon" ? <GeckoIcon /> : children}
  </ButtonComponent>
);
