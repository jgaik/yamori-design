"use client";

import { useInteractions } from "@floating-ui/react";
import { createContext, use } from "react";

export type SelectContextValue = {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  onSelect: (value: string | null) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext() {
  const selectContextValue = use(SelectContext);

  if (!selectContextValue) {
    throw new Error(
      "[@yamori-design/react-components][Select] The Option component must be a child of the Select component."
    );
  }

  return selectContextValue;
}

export const SelectContextProvider = SelectContext.Provider;
