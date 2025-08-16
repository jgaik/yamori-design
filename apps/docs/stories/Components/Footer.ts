import type { Meta, StoryObj } from "@storybook/react";
import {
  Footer as FooterComponent,
  FooterProps,
} from "@yamori-design/react-components";

export default {
  component: FooterComponent,
  tags: ["!dev"],
  args: {
    githubHref: "https://github.com/jgaik/yamori-design",
  },
} satisfies Meta<FooterProps>;

export const Footer: StoryObj<FooterProps> = {};
