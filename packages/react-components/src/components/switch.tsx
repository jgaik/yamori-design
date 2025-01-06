import { ComponentPropsWithRef, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import { WithRequired } from "@yamori-shared/react-utilities";
import "@yamori-design/styles/dist/components/switch.css";

export type SwitchProps = WithRequired<
  Omit<ComponentPropsWithRef<"input">, "type">,
  "checked"
>;

export const Switch: React.FC<SwitchProps> = ({ className, ...props }) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("switch", className, "handle"),
    [className]
  );

  return (
    <div className={bemClassNames["switch"]}>
      <div className={bemClassNames["handle"]} />
      <input
        type="checkbox"
        role="switch"
        readOnly={!props.onChange}
        {...props}
      />
    </div>
  );
};
