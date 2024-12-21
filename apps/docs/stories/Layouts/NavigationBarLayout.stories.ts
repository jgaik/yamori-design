import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationBarLayout as NavigationBarLayoutComponent,
  NavigationBarLayoutProps,
} from "@yamori-design/react-components";
import NavigationBarStories from "../Components/NavigationBar.stories";
import "@yamori-design/styles/dist/layouts/navigation-bar-layout.css";

export default {
  component: NavigationBarLayoutComponent,
  tags: ["!autodocs"],
  args: {
    ...NavigationBarStories.args,
    children: "Content",
  },
} satisfies Meta<NavigationBarLayoutProps>;

export const NavigationBarLayout: StoryObj<NavigationBarLayoutProps> = {};
