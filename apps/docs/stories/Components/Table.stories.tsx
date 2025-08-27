import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table as TableComponent,
  TableProps,
} from "@yamori-design/react-components";

type RowData = {
  id: number;
  name: string;
  age: number;
};

export default {
  component: TableComponent<RowData>,
  tags: ["!dev"],
  args: {
    rowData: [
      {
        id: 1,
        name: "Alice",
        age: 25,
      },
      {
        id: 2,
        name: "Bob",
        age: 30,
      },
    ],
    columns: [
      {
        id: "name",
        header: "Name",
      },
      {
        id: "age",
        header: "Age",
        align: "center",
      },
    ],
    getRowId: (data) => data.id.toString(),
  },
} satisfies Meta<TableProps<RowData>>;

export const Table: StoryObj<TableProps<RowData>> = {};
