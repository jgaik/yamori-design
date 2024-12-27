import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
} from "react";
import { ListItem, ListItemProps } from "./list-item";
import {
  ListContextProvider,
  ListContextValue,
  useListContext,
} from "./list-context";
import { bemClassNamesCreator, OverwriteAndMerge } from "../../utilities";

export type { ListItemProps };

export type ListProps = OverwriteAndMerge<
  ComponentPropsWithoutRef<"ol"> & ComponentPropsWithoutRef<"ul">,
  { ordered?: boolean }
>;

export const List = Object.assign(
  forwardRef<ElementRef<"ol">, ListProps>(
    ({ children, className, ordered, ...props }, ref) => {
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
        <ListTag className={bemClassNames["list"]} ref={ref} {...props}>
          <ListContextProvider value={listContextValue}>
            {children}
          </ListContextProvider>
        </ListTag>
      );
    }
  ),
  { Item: ListItem }
);
