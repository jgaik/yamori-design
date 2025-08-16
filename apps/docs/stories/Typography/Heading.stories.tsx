import type { Meta, StoryObj } from "@storybook/react-vite";
import { PropsWithChildren } from "react";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

const HeadingComponent: React.FC<
  PropsWithChildren<{ tag: (typeof HEADING_TAGS)[number] }>
> = ({ tag: Tag, children }) => <Tag>{children}</Tag>;

HeadingComponent.displayName = "Heading";

export default {
  component: HeadingComponent,
  tags: ["!autodocs"],
  args: {
    tag: "h1",
    children: "This is a heading",
  },
  argTypes: {
    children: {
      control: "text",
    },
    tag: {
      control: "select",
      options: HEADING_TAGS,
    },
  },
} satisfies Meta<typeof HeadingComponent>;

export const Heading: StoryObj<typeof HeadingComponent> = {};
