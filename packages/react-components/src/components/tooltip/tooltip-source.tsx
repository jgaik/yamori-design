/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseInteractionsReturn } from "@floating-ui/react";
import { cloneElement, isValidElement, ReactElement, Ref } from "react";

type TooltipSourceProps = {
  children: ReactElement<{ ref: Ref<any> }>;
  ref: Ref<any>;
  getSourceProps: UseInteractionsReturn["getReferenceProps"];
};

export const TooltipSource: React.FC<TooltipSourceProps> = ({
  children,
  getSourceProps,
  ref,
}) => {
  if (!isValidElement(children)) {
    throw new Error(
      "[@yamori-design/react-components][Tooltip] The child must be a valid React element."
    );
  }

  return cloneElement(children, getSourceProps({ ...children.props, ref }));
};
