import React, { ComponentPropsWithoutRef, useMemo } from "react";
import { CloseIcon } from "@yamori-design/icons";
import { bemClassNamesCreator } from "../../utilities";
import { Button } from "../button";
import { useDialogContext } from "./dialog-context";
import { usePackageTranslation } from "../../i18n";

export type DialogHeaderProps = ComponentPropsWithoutRef<"header"> & {
  withClose?: boolean;
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  className,
  children,
  withClose,
  ...props
}) => {
  const bemClassNames = useMemo(
    () => bemClassNamesCreator.create("dialog-header", className, "content"),
    [className]
  );

  const { t } = usePackageTranslation();
  const { closeDialog } = useDialogContext();

  return (
    <header className={bemClassNames["dialog-header"]} {...props}>
      <div className={bemClassNames["content"]}>{children}</div>
      {withClose && (
        <Button
          aria-label={t("close")}
          title={t("close")}
          variant="text"
          onClick={closeDialog}
        >
          <CloseIcon />
        </Button>
      )}
    </header>
  );
};

DialogHeader.displayName = "Dialog.Header";
