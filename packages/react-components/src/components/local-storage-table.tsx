"use client";

import { useMemo, useReducer } from "react";
import { DeleteIcon } from "@yamori-design/icons";
import { useLabels } from "../labels";
import { bemClassNamesCreator } from "../utilities";
import { Button } from "./button";
import { Table, TableProps } from "./table";

export type LocalStorageTableProps = Omit<
  TableProps<LocalStorageTableRow>,
  "rowData" | "columns" | "getRowId"
> & {
  prefix: string;
};

type LocalStorageTableRow = {
  id: string;
  key: string;
  value: string;
  storageKey: string;
  item?: string | number;
};

type StoredValue =
  | { kind: "array"; items: unknown[] }
  | { kind: "object"; entries: [string, unknown][] }
  | { kind: "value"; text: string };

const parseValue = (raw: string): StoredValue => {
  try {
    const value: unknown = JSON.parse(raw);

    if (Array.isArray(value)) return { kind: "array", items: value };

    if (value !== null && typeof value === "object") {
      return { kind: "object", entries: Object.entries(value) };
    }
  } catch {
    return { kind: "value", text: raw };
  }

  return { kind: "value", text: raw };
};

const preview = (value: unknown) =>
  typeof value === "string" ? value : JSON.stringify(value);

const readValue = (storageKey: string) =>
  parseValue(window.localStorage.getItem(storageKey) ?? "");

const removeRow = ({ storageKey, item }: LocalStorageTableRow) => {
  if (item === undefined) {
    window.localStorage.removeItem(storageKey);
    return;
  }

  const value = readValue(storageKey);

  if (value.kind === "array") {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(value.items.filter((_, index) => index !== item))
    );
  } else if (value.kind === "object") {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(
        Object.fromEntries(value.entries.filter(([name]) => name !== item))
      )
    );
  }
};

export const LocalStorageTable: React.FC<LocalStorageTableProps> = ({
  prefix,
  ...props
}) => {
  const labels = useLabels();
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(
        "local-storage-table",
        props.className,
        "group",
        "item"
      ),
    [props.className]
  );
  const cellProps = ({ data }: { data: LocalStorageTableRow }) => ({
    className: bemClassNames[data.item === undefined ? "group" : "item"],
  });
  const [, refresh] = useReducer((count: number) => count + 1, 0);

  const rows = Object.keys(window.localStorage)
    .filter((storageKey) => storageKey.startsWith(prefix))
    .sort()
    .flatMap((storageKey): LocalStorageTableRow[] => {
      const value = readValue(storageKey);
      const items =
        value.kind === "array"
          ? value.items.map((item, index) => [index, item] as const)
          : value.kind === "object"
            ? value.entries
            : [];

      return [
        {
          id: storageKey,
          key: storageKey.slice(prefix.length),
          value: value.kind === "value" ? value.text : "",
          storageKey,
        },
        ...items.map(([item, itemValue]) => ({
          id: `${storageKey}/${item}`,
          key: String(item),
          value: preview(itemValue) ?? "",
          storageKey,
          item,
        })),
      ];
    });

  return (
    <Table
      {...props}
      className={bemClassNames["local-storage-table"]}
      rowData={rows}
      getRowId={({ id }) => id}
      columns={[
        { id: "key", header: labels.key, rowHeader: true, cellProps },
        { id: "value", header: labels.value, cellProps },
        {
          id: "actions",
          header: "",
          cellProps,
          cellRenderer: ({ data }) => (
            <Button
              aria-label={labels.delete}
              title={labels.delete}
              variant='icon'
              onClick={() => {
                removeRow(data);
                refresh();
              }}
            >
              <DeleteIcon />
            </Button>
          ),
        },
      ]}
    />
  );
};
