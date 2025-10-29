import { type ElementType, type ReactNode } from 'react';
import clsx from 'clsx';

import { PolymorphicComponent } from '@/types';

import { UnstyledButton } from '../unstyled-button';

import styles from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';

export interface ButtonBaseProps {
  className?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
}

export type ButtonProps<C extends ElementType = 'button'> = PolymorphicComponent<C, ButtonBaseProps>;

const Button = <C extends ElementType = 'button'>({ variant = 'primary', children, className, fullWidth, ...props }: ButtonProps<C>) => {
  return (
    <UnstyledButton className={clsx(styles.button, styles[variant], className, { [styles.fullWidth]: fullWidth })} {...props}>
      {children}
    </UnstyledButton>
  );
};

export { Button };
