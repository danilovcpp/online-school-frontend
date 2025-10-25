import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  return (
    <button className={clsx(styles.button, styles[variant], className)} {...props}>
      {children}
    </button>
  );
};
