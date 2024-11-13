import type { Meta, StoryObj } from "@storybook/react";
import {
  Separator as SeparatorComponent,
  SeparatorProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/separator.css";

export default {
  component: SeparatorComponent,
  tags: ["!dev"],
} satisfies Meta<SeparatorProps>;

export const Separator: StoryObj<SeparatorProps> = {};
