import React, {
  ComponentPropsWithRef,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import { bemClassNamesCreator, OverwriteAndMerge } from "../../utilities";

export type FormFieldProps = OverwriteAndMerge<
  ComponentPropsWithRef<"div">,
  {
    children: ReactElement<{ id: string }>;
    label: ReactNode;
  }
>;

export const FormField: React.FC<FormFieldProps> = ({
  className,
  children,
  label,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("form-field", className),
    [className]
  );

  return (
    <div className={bemClassNames["form-field"]} {...props}>
      <label htmlFor={children.props.id}>{label}</label>
      {children}
    </div>
  );
};
