import { type FC, type InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';

import { Classes } from '@/types';

import styles from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classes?: Classes<'container' | 'label'>;
}

const Input: FC<InputProps> = ({ label, className, id, classes, ...props }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={clsx(styles.container, classes?.container)}>
      {label && (
        <label className={clsx(styles.label, classes?.label)} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input className={clsx(styles.input, className)} id={inputId} {...props} />
    </div>
  );
};

export { Input };
