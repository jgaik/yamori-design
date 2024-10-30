import type { Meta, StoryObj } from "@storybook/react";
import { Link as LinkComponent } from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/link.css";

export default {
  component: LinkComponent,
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children: "Link",
    href: location.origin,
  },
} satisfies Meta<typeof LinkComponent>;

export const Link: StoryObj<typeof LinkComponent> = {};
