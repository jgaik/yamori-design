import { useInteractions } from "@floating-ui/react";
import { createContext, useContext } from "react";

export type SelectContextValue = {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  onSelect: (value: string | null) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext() {
  const selectContext = useContext(SelectContext);

  if (!selectContext) {
    throw new Error(
      "[@yamori-design/react-components][Select] The Option component must be a child of the Select component."
    );
  }

  return selectContext;
}

export const SelectContextProvider = SelectContext.Provider;
