import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Separator as SeparatorComponent,
  SeparatorProps,
} from "@yamori-design/react-components";

export default {
  component: SeparatorComponent,
  tags: ["!dev"],
} satisfies Meta<SeparatorProps>;

export const Separator: StoryObj<SeparatorProps> = {};
