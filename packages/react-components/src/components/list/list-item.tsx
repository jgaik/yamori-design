import {
  ComponentPropsWithoutRef,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  JSX,
  ComponentRef,
} from "react";
import {
  ListItemContextProvider,
  ListItemContextValue,
  useListContext,
  useListItemContext,
} from "./list-context";
import { bemClassNamesCreator } from "../../utilities";
import { assertNonNullable } from "@yamori-shared/react-utilities";

export type ListItemProps = ComponentPropsWithoutRef<"li"> & {
  label: NonNullable<ReactNode>;
  labelTag?: keyof JSX.IntrinsicElements;
};

export const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  label,
  labelTag: LabelTag = "div",
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("list-item", className, "label"),
    [className]
  );

  const { ordered } = useListContext(true);
  const parentItemContextValue = useListItemContext();

  const [order, setOrder] = useState(0);

  const liRef = useRef<ComponentRef<"li">>(null);

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
        <LabelTag className={bemClassNames["label"]}>
          <span>{ordered ? `${levelMarker}${order}.` : "•"}</span>
          {label}
        </LabelTag>
        {children}
      </ListItemContextProvider>
    </li>
  );
};

ListItem.displayName = "List.Item";
