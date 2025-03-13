"use client";

import { createContext, use } from "react";

export type DialogContextValue = {
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext() {
  const dialogContext = use(DialogContext);

  if (!dialogContext) {
    throw new Error(
      "[@yamori-design/react-components][Dialog] The component must be a child of the Dialog component."
    );
  }

  return dialogContext;
}

export const DialogContextProvider = DialogContext.Provider;
