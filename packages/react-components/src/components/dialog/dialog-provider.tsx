import {
  createContext,
  ElementRef,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog, DialogProps } from "./dialog";

type DialogProviderValue = {
  showDialog: (
    content: DialogProps["children"],
    props?: Omit<DialogProps, "children">
  ) => void;
};

const DialogContext = createContext<DialogProviderValue | null>(null);

export const DialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [dialogContent, setDialogContent] =
    useState<DialogProps["children"]>(null);
  const [{ onClose, ...dialogProps }, setDialogProps] = useState<
    Omit<DialogProps, "children">
  >({});

  const dialogRef = useRef<ElementRef<typeof Dialog>>(null);

  const dialogContextValue = useMemo<DialogProviderValue>(
    () => ({
      showDialog: (content, props = {}) => {
        setDialogContent(content);
        setDialogProps(props);

        dialogRef.current?.showModal();
      },
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
