import { ComponentPropsWithRef, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import { WithRequired } from "@yamori-shared/react-utilities";

export type RadioProps = WithRequired<
  Omit<ComponentPropsWithRef<"input">, "type">,
  "checked"
>;

export const Radio: React.FC<RadioProps> = ({ className, ...props }) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("radio", className),
    [className]
  );

  return (
    <div className={bemClassNames["radio"]}>
      <input type="radio" readOnly={!props.onChange} {...props} />
    </div>
  );
};
