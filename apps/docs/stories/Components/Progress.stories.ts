import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Progress as ProgressComponent,
  ProgressProps,
} from "@yamori-design/react-components";

type ProgressComponentProps = ProgressProps & {
  indeterminateState: boolean;
};

export default {
  component: ProgressComponent,
  tags: ["!dev"],
  args: {
    indeterminateState: false,
    value: 50,
    max: 100,
  },
  argTypes: {
    value: {
      control: {
        type: "number",
        min: 0,
      },
      if: { arg: "indeterminateState", truthy: false },
    },
    max: {
      control: {
        type: "number",
        min: 1,
      },
      if: { arg: "indeterminateState", truthy: false },
    },
  },
} satisfies Meta<ProgressComponentProps>;

export const Progress: StoryObj<ProgressComponentProps> = {};
