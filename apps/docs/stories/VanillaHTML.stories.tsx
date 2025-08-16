import { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "@yamori-design/react-components";
import { ReactNode } from "react";
import "@yamori-design/styles/dist/vanilla.css";

const VanillaHTMLComponent: React.FC = () => {
  const rowData: { tag: string; preview: (className?: string) => ReactNode }[] =
    [
      {
        tag: "hr",
        preview: (className) => <hr className={className} />,
      },
      {
        tag: "button",
        preview: (className) => (
          <button className={className} onClick={() => alert("Button clicked")}>
            Button
          </button>
        ),
      },
      {
        tag: "a",
        preview: (className) => (
          <a className={className} href="#">
            Link
          </a>
        ),
      },
      {
        tag: 'input[type="checkbox"]',
        preview: (className) => <input className={className} type="checkbox" />,
      },
      {
        tag: 'input[type="radio"]',
        preview: (className) => <input className={className} type="radio" />,
      },
      {
        tag: "ul > li",
        preview: (className) => (
          <ul className={className}>
            <li>Item 1</li>
            <li>
              Item 2
              <ul className={className}>
                <li>SubItem 2.1</li>
                <li>SubIem 2.2</li>
              </ul>
            </li>
            <li>Item 3 </li>
          </ul>
        ),
      },
    ];

  return (
    <Table
      columns={[
        {
          id: "tag",
          header: "Tag",
          valueGetter: ({ data }) => data.tag,
        },
        {
          id: "preview",
          header: "Preview",
          cellRenderer: ({ data }) => data.preview(),
        },
        {
          id: "default",
          header: "Default",
          cellRenderer: ({ data }) => data.preview("default"),
        },
      ]}
      rowData={rowData}
      getRowId={(data) => data.tag}
    />
  );
};

VanillaHTMLComponent.displayName = "VanillaHTML";

export default {
  component: VanillaHTMLComponent,
  tags: ["!autodocs"],
  parameters: { actions: { disable: true }, controls: { disable: true } },
} satisfies Meta;

export const VanillaHTML: StoryObj = {};
