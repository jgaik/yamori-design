import classNames from "classnames";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const Button = forwardRef<
  ElementRef<"button">,
  ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button className={classNames(className)} ref={ref} {...props} />
));
