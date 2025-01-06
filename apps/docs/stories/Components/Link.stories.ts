import type { Meta, StoryObj } from "@storybook/react";
import {
  Link as LinkComponent,
  LinkProps,
} from "@yamori-design/react-components";

export default {
  component: LinkComponent,
  tags: ["!dev"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children: "Link",
    href: location.origin,
  },
} satisfies Meta<LinkProps>;

export const Link: StoryObj<LinkProps> = {};
