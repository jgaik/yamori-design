import React, { ComponentPropsWithoutRef } from 'react';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export const Button: React.FC<ButtonProps> = (props) => {
  return <button {...props} />;
};
