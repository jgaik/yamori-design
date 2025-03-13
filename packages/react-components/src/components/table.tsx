"use client";

import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import "@yamori-design/styles/dist/components/table.css";

type TypeOrArrayOfType<T> = T | T[];

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
  valueGetter?: (
    props: TableColumnValueGetterProps<RowData>
  ) => TypeOrArrayOfType<string>;
  align?: "left" | "center";
  cellRenderer?: TypeOrArrayOfType<
    (props: TableColumnCellRendererProps<RowData>) => ReactNode
  >;
  headerRenderer?: (props: TableColumnHeaderRendererProps) => ReactNode;
  span?: number;
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

  const headers = columns.map(({ id, header, headerRenderer, span }) => (
    <th scope="col" key={id} colSpan={span}>
      {headerRenderer?.({ header }) ?? header}
    </th>
  ));
  const rows = rowData.map((data) => (
    <tr key={getRowId(data)}>
      {columns.flatMap(({ id, valueGetter, cellRenderer }) => {
        const values = [valueGetter?.({ data }) ?? ""].flat();
        const renderers = [cellRenderer].flat();
        return values.map((value, index) => (
          <td key={`${id}_${index}`}>
            {renderers[index]?.({ data, value }) ?? value}
          </td>
        ));
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
