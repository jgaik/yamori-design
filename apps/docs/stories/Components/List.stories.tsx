import { Meta, StoryFn } from "@storybook/react-vite";
import {
  List as ListComponent,
  ListProps,
} from "@yamori-design/react-components";

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
    bulleted: false,
    children: "Item 1, Item 2, Item 3",
  },
} satisfies Meta<ListProps>;

export const List: StoryFn<ListProps> = ({ children, ...args }) => {
  const items = (children as string).split(",");

  return (
    <ListComponent {...args}>
      {items.map((item, index) => (
        <ListComponent.Item key={index} label={item.trim()} labelTag="h6">
          <ListComponent {...args}>
            {items.slice(index).map((item, index) => (
              <ListComponent.Item key={index} label={item.trim()} />
            ))}
          </ListComponent>
        </ListComponent.Item>
      ))}
    </ListComponent>
  );
};
