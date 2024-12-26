import { Meta, StoryObj } from "@storybook/react";
import {
  Details as DetailsComponent,
  DetailsProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/details.css";

export default {
  component: DetailsComponent,
  tags: ["!dev"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children: "Details",
    summary: "Summary",
  },
} satisfies Meta<DetailsProps>;

export const Details: StoryObj<DetailsProps> = {};
