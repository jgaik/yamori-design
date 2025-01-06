import { Meta, StoryFn } from "@storybook/react";
import {
  Button,
  DialogProvider as DialogProviderComponent,
  Dialog as DialogComponent,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  useDialog,
} from "@yamori-design/react-components";
import { ElementRef, useRef } from "react";

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
  const dialogRef = useRef<ElementRef<typeof DialogComponent>>(null);

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

export const DialogProvider: StoryFn<DialogComponentProps> = ({
  confirmLabel,
  children,
  header,
  includeFooter,
  includeHeader,
  withCancel,
  withClose,
  ...args
}) => {
  const { showDialog } = useDialog();

  return (
    <Button
      onClick={() =>
        showDialog(children, {
          header: includeHeader ? (
            <DialogComponent.Header withClose={withClose}>
              {header}
            </DialogComponent.Header>
          ) : undefined,
          footer: includeFooter ? (
            <DialogComponent.Footer
              withCancel={withCancel}
              confirmLabel={confirmLabel}
              onConfirmClick={() => {
                alert("Confirm button clicked");
                return true;
              }}
            />
          ) : undefined,
          ...args,
        })
      }
    >
      Show
    </Button>
  );
};

DialogProvider.decorators = [
  (Story) => (
    <DialogProviderComponent>
      <Story />
    </DialogProviderComponent>
  ),
];
