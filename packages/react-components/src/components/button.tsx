import React, { ComponentPropsWithRef, useMemo } from "react";
import { bemClassNamesCreator } from "../utilities";
import "@yamori-design/styles/dist/components/button.css";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary" | "text";
};

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  ...props
}) => {
  const bemClassNames = useMemo(
    () =>
      bemClassNamesCreator.create(["button", { [variant]: true }], className),
    [className, variant]
  );

  return (
    <button className={bemClassNames["button"]} type="button" {...props} />
  );
};
