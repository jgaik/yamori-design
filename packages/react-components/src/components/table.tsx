"use client";

import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import "@yamori-design/styles/dist/components/table.css";

type TypeOrArrayOfType<T> = T | T[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseRecord = Record<string, any>;

export type TableColumnValueGetterProps<RowData extends BaseRecord> = {
  data: RowData;
  index: number;
};

export type TableColumnCellRendererProps<RowData extends BaseRecord> = {
  data: RowData;
  value: string;
  index: number;
};

export type TableColumnHeaderRendererProps = {
  header: string;
};

export type TableColumn<RowData extends BaseRecord> = {
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

export type TableProps<RowData extends BaseRecord> = OverwriteAndMerge<
  Omit<ComponentPropsWithoutRef<"table">, "children">,
  {
    rowData: RowData[];
    columns: TableColumn<RowData>[];
    getRowId: (rowData: RowData) => string;
  }
>;

export const Table = <RowData extends BaseRecord>({
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

  const headers = useMemo(
    () =>
      columns.map(({ id, header, headerRenderer, span }) => (
        <th scope="col" key={id} colSpan={span}>
          {headerRenderer?.({ header }) ?? header}
        </th>
      )),
    [columns]
  );

  const rows = useMemo(
    () =>
      rowData.map((data, index) => (
        <tr key={getRowId(data)}>
          {columns.flatMap(
            ({ id, valueGetter, cellRenderer, align = "left" }) => {
              const values = [
                valueGetter?.({ data, index }) ?? data[id] ?? "",
              ].flat();
              const renderers = [cellRenderer].flat();
              return values.map((value, valueIndex) => (
                <td key={`${id}_${valueIndex}`} data-align={align}>
                  {renderers[valueIndex]?.({ data, value, index }) ?? value}
                </td>
              ));
            }
          )}
        </tr>
      )),
    [columns, getRowId, rowData]
  );

  return (
    <table className={bemClassNames["table"]} {...props}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
