import type { Meta, StoryFn } from "@storybook/react";
import {
  Card as CardComponent,
  CardProps,
} from "@yamori-design/react-components";

type CardComponentProps = CardProps & {
  clickable?: boolean;
  showImage?: boolean;
};

export default {
  component: CardComponent,
  tags: ["!dev"],
  argTypes: {
    children: {
      control: "text",
    },
    header: {
      control: "text",
    },
  },
  args: {
    children: "Description",
    header: "Header",
    clickable: false,
    showImage: false,
  },
} satisfies Meta<CardComponentProps>;

export const Card: StoryFn<CardComponentProps> = ({
  clickable,
  showImage,
  ...args
}) => (
  <CardComponent
    onClick={clickable ? () => alert("Card clicked!") : undefined}
    image={showImage ? <img style={{ width: '100%' }} src="https://picsum.photos/200" /> : undefined}
    {...args}
  />
);
