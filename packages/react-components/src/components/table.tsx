"use client";

import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../utilities";
import { useLabels } from "../labels";
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
  align?: "left" | "center" | "right";
  cellRenderer?: TypeOrArrayOfType<
    (props: TableColumnCellRendererProps<RowData>) => ReactNode
  >;
  headerRenderer?: (props: TableColumnHeaderRendererProps) => ReactNode;
  span?: number;
  rowHeader?: boolean;
  cellProps?: (
    props: TableColumnCellRendererProps<RowData>
  ) => ComponentPropsWithoutRef<"td">;
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
  const labels = useLabels();
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("table", className, "empty-row"),
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
            ({ id, valueGetter, cellRenderer, align, rowHeader, cellProps }) => {
              const Cell = rowHeader ? "th" : "td";
              const values = [
                valueGetter?.({ data, index }) ?? data[id] ?? "",
              ].flat();
              const renderers = [cellRenderer].flat();
              return values.map((value, valueIndex) => (
                <Cell
                  key={`${id}_${valueIndex}`}
                  scope={rowHeader ? "row" : undefined}
                  data-align={align}
                  {...cellProps?.({ data, value, index })}
                >
                  {renderers[valueIndex]?.({ data, value, index }) ?? value}
                </Cell>
              ));
            }
          )}
        </tr>
      )),
    [columns, getRowId, rowData]
  );

  const totalSpan = useMemo(
    () => columns.reduce((acc, column) => acc + (column.span ?? 1), 0),
    [columns]
  );

  return (
    <table className={bemClassNames["table"]} {...props}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {rows}
        {rows.length === 0 && (
          <tr className={bemClassNames["empty-row"]}>
            <td colSpan={totalSpan}>{labels.noData}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
