import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Tooltip as TooltipComponent,
  TooltipProps,
} from "@yamori-design/react-components";

export default {
  component: TooltipComponent,
  tags: ["!dev"],
  argTypes: {
    content: {
      control: "text",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    content: "Tooltip",
    children: <Button>Tooltip Source</Button>,
    placement: "top",
    defaultOpen: true,
    disabled: false,
  },
} satisfies Meta<TooltipProps>;

export const Tooltip: StoryObj<TooltipProps> = {};
