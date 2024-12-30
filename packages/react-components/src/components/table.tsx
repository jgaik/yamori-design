import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";

export type TableColumnValueGetterProps<RowData extends object> = {
  data: RowData;
};

export type TableColumnCellRendererProps<RowData extends object> = {
  data: RowData;
  value: string;
};

export type TableColumnHeaderRendererProps = {
  header: string;
};

export type TableColumn<RowData extends object> = {
  id: string;
  header: string;
  valueGetter: (props: TableColumnValueGetterProps<RowData>) => string;
  align?: "left" | "center";
  cellRenderer?: (props: TableColumnCellRendererProps<RowData>) => ReactNode;
  headerRenderer?: (props: TableColumnHeaderRendererProps) => ReactNode;
};

export type TableProps<RowData extends object> = OverwriteAndMerge<
  Omit<ComponentPropsWithoutRef<"table">, "children">,
  {
    rowData: RowData[];
    columns: TableColumn<RowData>[];
    getRowId: (rowData: RowData) => string;
  }
>;

export const Table = <RowData extends object>({
  className,
  columns,
  rowData,
  getRowId,
  ...props
}: TableProps<RowData>) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("table", className),
    [className]
  );

  const headers = columns.map(({ id, header, headerRenderer }) => (
    <th scope="col" key={id}>
      {headerRenderer?.({ header }) ?? header}
    </th>
  ));
  const rows = rowData.map((data) => (
    <tr key={getRowId(data)}>
      {columns.map(({ id, valueGetter, cellRenderer }) => {
        const value = valueGetter({ data });
        return <td key={id}>{cellRenderer?.({ data, value }) ?? value}</td>;
      })}
    </tr>
  ));

  return (
    <table className={bemClassNames["table"]} {...props}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
