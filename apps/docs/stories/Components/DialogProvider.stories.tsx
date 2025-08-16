import { Meta, StoryFn } from "@storybook/react-vite";
import {
  Button,
  DialogProvider as DialogProviderComponent,
  Dialog,
  useDialog,
} from "@yamori-design/react-components";
import DialogStories, { DialogComponentProps } from "./Dialog.stories";

export default {
  ...DialogStories,
  tags: ["!dev"],
  decorators: [
    (Story) => (
      <DialogProviderComponent>
        <Story />
      </DialogProviderComponent>
    ),
  ],
} satisfies Meta<DialogComponentProps>;

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
  const { showDialog, showConfirmationDialog, closeDialog } = useDialog();

  const dialogChildren = (
    <>
      {children}
      <Button onClick={closeDialog}>Close Dialog</Button>
    </>
  );

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button
        onClick={() =>
          showDialog(dialogChildren, {
            header: includeHeader ? (
              <Dialog.Header withClose={withClose}>{header}</Dialog.Header>
            ) : undefined,
            footer: includeFooter ? (
              <Dialog.Footer
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
        Show Dialog
      </Button>
      <Button
        onClick={() =>
          showConfirmationDialog(
            dialogChildren,
            {
              withCancel,
              confirmLabel: confirmLabel || "Confirm",
            },
            {
              header: includeHeader ? (
                <Dialog.Header withClose={withClose}>{header}</Dialog.Header>
              ) : undefined,
              ...args,
            }
          ).then((confirmed) => {
            alert(confirmed ? "Confirmed" : "Canceled");
          })
        }
      >
        Show Confirmation Dialog
      </Button>
    </div>
  );
};
