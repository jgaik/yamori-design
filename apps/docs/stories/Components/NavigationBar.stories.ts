import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationBar as NavigationBarComponent,
  NavigationBarProps,
} from "@yamori-design/react-components";

export default {
  component: NavigationBarComponent,
  tags: ["!autodocs"],
  args: {
    languageSelectProps: {
      supportedLanguages: ["en", "ja"],
    },
    homeHref: location.origin,
    githubHref: "https://github.com/jgaik/yamori-design",
    links: [
      {
        href: "#1",
        children: "Link1",
      },
      {
        href: "#2",
        children: "Link2",
      },
      {
        href: "#3",
        children: "Link3",
      },
      {
        href: "#4",
        children: "Link4",
      },
      {
        href: "#5",
        children: "Link5",
      },
    ],
  },
} satisfies Meta<NavigationBarProps>;

export const NavigationBar: StoryObj<NavigationBarProps> = {};
