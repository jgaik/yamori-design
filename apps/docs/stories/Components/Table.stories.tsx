import type { Meta, StoryObj } from "@storybook/react";
import {
  Table as TableComponent,
  TableProps,
} from "@yamori-design/react-components";
import "@yamori-design/styles/dist/components/table.css";

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
        valueGetter: ({ data }) => data.name,
      },
      {
        id: "age",
        header: "Age",
        valueGetter: ({ data }) => data.age.toString(),
      },
    ],
    getRowId: (data) => data.id.toString(),
  },
} satisfies Meta<TableProps<RowData>>;

export const Table: StoryObj<TableProps<RowData>> = {};
