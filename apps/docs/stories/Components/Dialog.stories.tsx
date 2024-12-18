import { Meta, StoryFn } from "@storybook/react";
import {
  Button,
  Dialog as DialogComponent,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
} from "@yamori-design/react-components";
import { ElementRef, useRef } from "react";
import "@yamori-design/styles/dist/components/button.css";
import "@yamori-design/styles/dist/components/dialog.css";

type DialogComponentProps = DialogProps &
  Pick<DialogHeaderProps, "withClose"> &
  Pick<DialogFooterProps, "withCancel" | "confirmLabel"> & {
    includeFooter: boolean;
    includeHeader: boolean;
  };

export default {
  component: DialogComponent,
  tags: ["!dev"],
  argTypes: {
    confirmLabel: {
      if: { arg: "includeFooter" },
    },
    withCancel: {
      if: { arg: "includeFooter" },
    },
    withClose: {
      if: { arg: "includeHeader" },
    },
    header: {
      control: "text",
      if: { arg: "includeHeader" },
    },
  },
  args: {
    confirmLabel: "Confirm",
    header: "Header" as unknown as DialogComponentProps["header"],
    children: "Content",
    withCancel: true,
    withClose: true,
    includeFooter: true,
    includeHeader: true,
  },
} satisfies Meta<DialogComponentProps>;

export const Dialog: StoryFn<DialogComponentProps> = ({
  confirmLabel,
  children,
  header,
  includeFooter,
  includeHeader,
  withCancel,
  withClose,
  ...args
}) => {
  const dialogRef = useRef<ElementRef<typeof DialogComponent>>(null);

  return (
    <>
      <Button onClick={() => dialogRef.current?.showModal()}>Show</Button>
      <DialogComponent
        {...args}
        ref={dialogRef}
        onOutsideClick={() => dialogRef.current?.close()}
        header={
          includeHeader ? (
            <DialogComponent.Header withClose={withClose}>
              {header}
            </DialogComponent.Header>
          ) : undefined
        }
        footer={
          includeFooter ? (
            <DialogComponent.Footer
              withCancel={withCancel}
              confirmLabel={confirmLabel}
              onConfirmClick={() => {
                alert("Confirm button clicked");
                return true;
              }}
            />
          ) : undefined
        }
      >
        {children}
      </DialogComponent>
    </>
  );
};
