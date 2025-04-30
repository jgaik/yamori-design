import type { Meta, StoryFn } from "@storybook/react";
import {
  Button,
  Link,
  Popover as PopoverComponent,
  PopoverProps,
} from "@yamori-design/react-components";

export default {
  component: PopoverComponent,
  tags: ["!dev"],
  argTypes: {
    content: {
      control: "text",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    content: "Popover",
    children: <Button>Popover Source</Button>,
    placement: "top",
    defaultOpen: true,
    disabled: false,
  },
} satisfies Meta<PopoverProps>;

export const Popover: StoryFn<PopoverProps> = ({ content, ...args }) => (
  <PopoverComponent
    content={
      <p>
        {content} with a <Link href="#">link</Link>
      </p>
    }
    {...args}
  />
);
