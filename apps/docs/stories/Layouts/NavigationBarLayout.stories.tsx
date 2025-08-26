import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationBarLayout as NavigationBarLayoutComponent,
  NavigationBarLayoutProps,
} from "@yamori-design/react-components";
import NavigationBarStories from "../Components/NavigationBar.stories";

export default {
  component: NavigationBarLayoutComponent,
  tags: ["!autodocs"],
  args: {
    ...NavigationBarStories.args,
    children: <div style={{ height: 1000 }}>Content</div>,
    githubHref: "https://github.com/jgaik/yamori-design",
  },
} satisfies Meta<NavigationBarLayoutProps>;

export const NavigationBarLayout: StoryObj<NavigationBarLayoutProps> = {};
