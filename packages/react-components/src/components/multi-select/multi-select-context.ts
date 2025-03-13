"use client";

import { useInteractions } from "@floating-ui/react";
import { createContext, use } from "react";

export type MultiSelectContextValue = {
  activeIndex: number | null;
  selectedIndices: number[] | typeof MULTI_SELECT_OPTION_ALL;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  onSelect: (value: string, checked: boolean) => void;
};

const MultiSelectContext = createContext<MultiSelectContextValue | null>(null);

export function useSelectContext() {
  const multiSelectContextValue = use(MultiSelectContext);

  if (!multiSelectContextValue) {
    throw new Error(
      "[@yamori-design/react-components][MultiSelect] The Option component must be a child of the Select component."
    );
  }

  return multiSelectContextValue;
}

export const MultiSelectContextProvider = MultiSelectContext.Provider;

export const MULTI_SELECT_OPTION_ALL = "YAMORI_DESIGN_MULTI_SELECT_ALL";
