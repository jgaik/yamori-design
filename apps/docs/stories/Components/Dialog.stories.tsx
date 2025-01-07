import { Meta, StoryFn } from "@storybook/react";
import {
  Button,
  Dialog as DialogComponent,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
} from "@yamori-design/react-components";
import { ComponentRef, useRef } from "react";

export type DialogComponentProps = Omit<DialogProps, "footer"> &
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
    header: {
      control: "text",
      if: { arg: "includeHeader" },
    },
    withClose: {
      if: { arg: "includeHeader" },
    },
  },
  args: {
    children: "Content",
    closeOnOutsideClick: true,
    confirmLabel: "Confirm",
    header: "Header" as unknown as DialogComponentProps["header"],
    includeFooter: true,
    includeHeader: true,
    withCancel: true,
    withClose: true,
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
  const dialogRef = useRef<ComponentRef<typeof DialogComponent>>(null);

  return (
    <>
      <Button onClick={() => dialogRef.current?.showModal()}>Show</Button>
      <DialogComponent
        {...args}
        ref={dialogRef}
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
