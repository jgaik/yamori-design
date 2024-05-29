import classNames from 'classnames';
import { createComponentClassName } from '../../utils';
import React, { ComponentPropsWithoutRef } from 'react';
import './checkbox.css';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
  const componentClassName = createComponentClassName('checkbox');

  return (
    <input
      className={classNames(componentClassName, className)}
      type='checkbox'
      {...props}
    />
  );
};
