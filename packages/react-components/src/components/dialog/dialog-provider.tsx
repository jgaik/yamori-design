import {
  ComponentRef,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog, DialogFooterProps, DialogProps } from "./dialog";

type DialogProviderValue = {
  showDialog: (
    content: DialogProps["children"],
    props?: Omit<DialogProps, "children">
  ) => void;
  showConfirmationDialog: (
    content: DialogProps["children"],
    footer: Omit<DialogFooterProps, "onConfirmClick">,
    props?: Omit<DialogProps, "children" | "footer">
  ) => Promise<boolean>;
};

const DialogContext = createContext<DialogProviderValue | null>(null);

export const DialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [dialogContent, setDialogContent] =
    useState<DialogProps["children"]>(null);
  const [{ onClose, ...dialogProps }, setDialogProps] = useState<
    Omit<DialogProps, "children">
  >({});

  const dialogRef = useRef<ComponentRef<typeof Dialog>>(null);

  const dialogContextValue = useMemo<DialogProviderValue>(
    () => ({
      showDialog: (content, props = {}) => {
        setDialogContent(content);
        setDialogProps(props);

        dialogRef.current?.showModal();
      },

      showConfirmationDialog: (content, footer, props = {}) =>
        new Promise<boolean>((resolve) => {
          setDialogContent(content);
          setDialogProps({
            ...props,
            footer: (
              <Dialog.Footer
                {...footer}
                onConfirmClick={() => {
                  resolve(true);
                  return true;
                }}
              />
            ),
            onClose: (event) => {
              props.onClose?.(event);
              resolve(false);
            },
          });

          dialogRef.current?.showModal();
        }),
    }),
    []
  );

  return (
    <DialogContext.Provider value={dialogContextValue}>
      {children}
      <Dialog
        ref={dialogRef}
        onClose={(event) => {
          onClose?.(event);
          setDialogContent(null);
          setDialogProps({});
        }}
        {...dialogProps}
      >
        {dialogContent}
      </Dialog>
    </DialogContext.Provider>
  );
};

export function useDialog() {
  const dialogContext = useContext(DialogContext);

  if (!dialogContext) {
    throw new Error(
      "[@yamori-design/react-components][useDialog] The useDialog hook must be invoked within the DialogProvider component."
    );
  }

  return dialogContext;
}
