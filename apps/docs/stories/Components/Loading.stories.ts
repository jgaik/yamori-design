import type { Meta, StoryObj } from "@storybook/react";
import {
  Loading as LoadingComponent,
  LoadingProps,
} from "@yamori-design/react-components";

export default {
  component: LoadingComponent,
  tags: ["!dev"],
} satisfies Meta<LoadingProps>;

export const Loading: StoryObj<LoadingProps> = {};
