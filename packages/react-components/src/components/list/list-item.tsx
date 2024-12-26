import {
  ComponentPropsWithoutRef,
  ElementRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ListItemContextProvider,
  ListItemContextValue,
  useListContext,
  useListItemContext,
} from "./list-context";
import { bemClassNamesCreator } from "../../utilities";
import { assertNonNullable } from "@yamori-shared/react-utilities";

export type ListItemProps = ComponentPropsWithoutRef<"li">;

export const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("list-item", className, "marker"),
    [className]
  );

  const { ordered } = useListContext(true);
  const parentItemContextValue = useListItemContext();

  const [order, setOrder] = useState(0);

  const liRef = useRef<ElementRef<"li">>(null);

  const levelMarker = parentItemContextValue
    ? `${parentItemContextValue.order}.`
    : "";

  const listItemContextValue = useMemo<ListItemContextValue>(
    () => ({ order }),
    [order]
  );

  useLayoutEffect(() => {
    if (!ordered || !liRef.current) return;

    assertNonNullable(liRef.current.parentNode, "list item parent node");

    setOrder(
      Array.from(liRef.current.parentNode.childNodes).indexOf(liRef.current) + 1
    );
  }, [ordered]);

  return (
    <li ref={liRef} className={bemClassNames["list-item"]} {...props}>
      <ListItemContextProvider value={listItemContextValue}>
        <span className={bemClassNames["marker"]}>
          {ordered ? `${levelMarker}${order}.` : "•"}
        </span>
        {children}
      </ListItemContextProvider>
    </li>
  );
};

ListItem.displayName = "List.Item";
