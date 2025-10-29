import { ComponentPropsWithRef, type FC, type ReactNode } from 'react';
import clsx from 'clsx';

import { type Classes } from '@/types';

import styles from './card.module.scss';

interface CardProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
  className?: string;
  title?: string;
  classes?: Classes<'title'>
}

const Card: FC<CardProps> = ({ children, className, title, classes, ...rest }) => {
  return (
    <div className={clsx(styles.root, className)} {...rest}>
      <h2 className={clsx(styles.title, classes?.title)}>{title}</h2>
      {children}
    </div>
  );
};

export { Card };
