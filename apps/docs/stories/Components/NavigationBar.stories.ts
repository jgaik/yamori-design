import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationBar as NavigationBarComponent,
  NavigationBarProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/navigation-bar.css";

export default {
  component: NavigationBarComponent,
  tags: ["!autdocs"],
  args: {
    links: [
      {
        href: "#1",
        label: "Link1",
      },
      {
        href: "#2",
        label: "Link2",
      },
      {
        href: "#3",
        label: "Link3",
      },
      {
        href: "#4",
        label: "Link4",
      },
      {
        href: "#5",
        label: "Link5",
      },
    ],
  },
} satisfies Meta<NavigationBarProps>;

export const NavigationBar: StoryObj<NavigationBarProps> = {};
