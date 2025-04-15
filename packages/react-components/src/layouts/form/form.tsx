import { ComponentPropsWithRef, useMemo } from "react";
import { bemClassNamesCreator } from "../../utilities";
import { FormField, FormFieldProps } from "./form-field";
import "@yamori-design/styles/dist/layouts/form.css";

export type { FormFieldProps };
export type FormProps = ComponentPropsWithRef<"form">;

export const Form = Object.assign(
  ({ className, ...props }: FormProps) => {
    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("form", className),
      [className]
    );

    return <form className={bemClassNames["form"]} {...props} />;
  },
  { Field: FormField }
);
