"use client";

import {
  ComponentPropsWithRef,
  ComponentRef,
  ReactElement,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { bemClassNamesCreator } from "../../utilities";
import { DialogContextProvider, DialogContextValue } from "./dialog-context";
import { DialogHeader, DialogHeaderProps } from "./dialog-header";
import { DialogFooter, DialogFooterProps } from "./dialog-footer";
import "@yamori-design/styles/dist/components/dialog.css";

type HtmlDialogProps = ComponentPropsWithRef<"dialog">;

export type DialogProps = HtmlDialogProps & {
  closeOnOutsideClick?: boolean;
  header?: ReactElement<DialogHeaderProps>;
  footer?: ReactElement<DialogFooterProps>;
};

export type { DialogHeaderProps, DialogFooterProps };

export const Dialog = Object.assign(
  ({
    className,
    children,
    footer,
    header,
    onClick,
    closeOnOutsideClick,
    ref,
    ...props
  }: DialogProps) => {
    const bemClassNames = useMemo(
      () => bemClassNamesCreator.create("dialog", className, "body", "content"),
      [className]
    );

    const sectionRef = useRef<ComponentRef<"section">>(null);
    const dialogRef = useRef<ComponentRef<"dialog">>(null);

    useImperativeHandle(ref, () => dialogRef.current!);

    const dialogContextValue = useMemo<DialogContextValue>(
      () => ({
        closeDialog: () => dialogRef.current?.close(),
      }),
      []
    );

    return (
      <dialog
        className={bemClassNames["dialog"]}
        onClick={(event) => {
          onClick?.(event);
          if (
            closeOnOutsideClick &&
            !sectionRef.current?.contains(event.target as Node)
          ) {
            dialogRef.current?.close();
          }
        }}
        ref={dialogRef}
        {...props}
      >
        <section className={bemClassNames["body"]} ref={sectionRef}>
          <DialogContextProvider value={dialogContextValue}>
            {header}
            <div className={bemClassNames["content"]}>{children}</div>
            {footer}
          </DialogContextProvider>
        </section>
      </dialog>
    );
  },
  { Header: DialogHeader, Footer: DialogFooter }
);
