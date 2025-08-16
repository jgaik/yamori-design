import { Meta, StoryObj } from "@storybook/react-vite";
import * as IconComponents from "@yamori-design/icons";
import { Table } from "@yamori-design/react-components";

const IconsComponent: React.FC = () => (
  <Table
    rowData={Object.entries(IconComponents).map(
      ([displayName, IconComponent]) => ({ displayName, IconComponent })
    )}
    columns={[
      {
        id: "component",
        header: "Icon",
        cellRenderer: ({ data: { IconComponent } }) => <IconComponent />,
      },
      {
        id: "name",
        header: "Name",
        valueGetter: ({ data }) => data.displayName,
      },
    ]}
    getRowId={(data) => data.displayName}
  />
);

IconsComponent.displayName = "Icons";

export default {
  component: IconsComponent,
  tags: ["!autodocs"],
  parameters: { actions: { disable: true }, controls: { disable: true } },
} satisfies Meta;

export const Icons: StoryObj = {};
