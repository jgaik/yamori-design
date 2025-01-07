import { Meta, StoryFn } from "@storybook/react";
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
  const { showDialog, showConfirmationDialog } = useDialog();

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button
        onClick={() =>
          showDialog(children, {
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
            children,
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
