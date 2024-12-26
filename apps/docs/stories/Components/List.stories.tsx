import { Meta, StoryFn } from "@storybook/react";
import {
  List as ListComponent,
  ListProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/list.css";

export default {
  component: ListComponent,
  tags: ["!dev"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    ordered: false,
    children: "Item 1, Item 2, Item 3",
  },
} satisfies Meta<ListProps>;

export const List: StoryFn<ListProps> = ({ children, ...args }) => {
  const items = (children as string).split(",");

  return (
    <ListComponent {...args}>
      {items.map((item, index) => (
        <ListComponent.Item key={index}>
          {item.trim()}
          <ListComponent {...args}>
            {items.slice(index).map((item, index) => (
              <ListComponent.Item key={index}>{item.trim()}</ListComponent.Item>
            ))}
          </ListComponent>
        </ListComponent.Item>
      ))}
    </ListComponent>
  );
};