import { ComponentPropsWithRef, useMemo } from "react";
import { ListItem, ListItemProps } from "./list-item";
import {
  ListContextProvider,
  ListContextValue,
  useListContext,
} from "./list-context";
import { bemClassNamesCreator, OverwriteAndMerge } from "../../utilities";

export type { ListItemProps };

export type ListProps = OverwriteAndMerge<
  ComponentPropsWithRef<"ol"> & ComponentPropsWithRef<"ul">,
  { ordered?: boolean }
>;

export const List = Object.assign(
  ({ children, className, ordered, ...props }: ListProps) => {
    const { level } = useListContext();

    const ListTag = ordered ? "ol" : "ul";

    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("list", className),
      [className]
    );

    const listContextValue = useMemo<ListContextValue>(
      () => ({
        level: level < 0 ? 0 : level + 1,
        ordered,
      }),
      [level, ordered]
    );

    return (
      <ListTag className={bemClassNames["list"]} {...props}>
        <ListContextProvider value={listContextValue}>
          {children}
        </ListContextProvider>
      </ListTag>
    );
  },
  { Item: ListItem }
);
