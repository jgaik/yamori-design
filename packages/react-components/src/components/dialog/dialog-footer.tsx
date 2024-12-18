import React, { ComponentPropsWithoutRef, MouseEvent, useMemo } from "react";
import { bemClassNamesCreator } from "../../utilities";
import { useDialogContext } from "./dialog-context";
import { Button, ButtonProps } from "../button";
import { usePackageTranslation } from "../../i18n";

export type DialogFooterProps = ComponentPropsWithoutRef<"footer"> & {
  withCancel?: boolean;
  confirmButtonProps?: Omit<ButtonProps, "children" | "onClick" | "variant">;
  confirmLabel: ButtonProps["children"];
  onConfirmClick: (
    event: MouseEvent<HTMLButtonElement>
  ) => Promise<boolean> | boolean;
};

export const DialogFooter: React.FC<DialogFooterProps> = ({
  className,
  children,
  confirmLabel,
  confirmButtonProps,
  onConfirmClick,
  withCancel,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("dialog-footer", className),
    [className]
  );

  const { t } = usePackageTranslation();
  const { closeDialog } = useDialogContext();

  return (
    <footer className={bemClassNames["dialog-footer"]} {...props}>
      {children}
      <Button
        onClick={(event) => {
          Promise.resolve(onConfirmClick(event)).then((res) => {
            if (res) closeDialog();
          });
        }}
        {...confirmButtonProps}
      >
        {confirmLabel}
      </Button>
      {withCancel && (
        <Button onClick={closeDialog} variant="secondary">
          {t("cancel")}
        </Button>
      )}
    </footer>
  );
};
