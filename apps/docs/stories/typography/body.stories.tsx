import type { Meta, StoryObj } from "@storybook/react";
import "./body.scss";

const BODY_SIZES = ["small", "medium", "large"] as const;
const BODY_TYPES = ["default", "bold", "link"] as const;

const BodyComponent: React.FC<{
  text: string;
  size: (typeof BODY_SIZES)[number];
  type: (typeof BODY_TYPES)[number];
}> = ({ text, size, type }) =>
  text.split("\n").map((textChunk) => (
    <p className="body-story" data-size={size} data-type={type}>
      {textChunk}
    </p>
  ));

BodyComponent.displayName = "Body";

export default {
  component: BodyComponent,
  args: {
    size: "medium",
    type: "default",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  },
  argTypes: {
    size: {
      control: "select",
      options: BODY_SIZES,
    },
    type: {
      control: "select",
      options: BODY_TYPES,
    },
  },
} satisfies Meta<typeof BodyComponent>;

export const Body: StoryObj<typeof BodyComponent> = {};
