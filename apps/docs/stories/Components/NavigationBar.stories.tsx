import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
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
    controls: <Button onClick={() => alert("Button1 clicked")}>Button1</Button>,
  },
} satisfies Meta<NavigationBarProps>;

export const NavigationBar: StoryObj<NavigationBarProps> = {};
