"use client";

import { createContext, use } from "react";

export type ListContextValue = {
  level: number;
  ordered?: boolean;
  bulleted?: boolean;
};

export type ListItemContextValue = {
  order: number;
};

const ListContext = createContext<ListContextValue>({ level: -1 });

const ListItemContext = createContext<ListItemContextValue | null>(null);

export function useListContext(isItem = false) {
  const listContextValue = use(ListContext);

  if (isItem && listContextValue.level < 0) {
    throw new Error(
      "[@yamori-design/react-components][List] The Item component must be a child of the List component."
    );
  }

  return listContextValue;
}

export function useListItemContext() {
  return use(ListItemContext);
}

export const ListContextProvider = ListContext.Provider;

export const ListItemContextProvider = ListItemContext.Provider;
