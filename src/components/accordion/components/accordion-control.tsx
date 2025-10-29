'use client';

import { type ButtonHTMLAttributes, type FC, type MouseEventHandler, type ReactNode } from 'react';
import clsx from 'clsx';

import { UnstyledButton } from '../../unstyled-button';
import { useAccordionContext } from '../accordion.context';

import styles from '../accordion.module.scss';

export interface AccordionControlProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: ReactNode;
}

const AccordionControl: FC<AccordionControlProps> = ({ className, children, onClick, icon, ...rest }) => {
  const { expanded, disabled, toggle, headerId, contentId } = useAccordionContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    toggle();
    onClick?.(event);
  };

  return (
    <UnstyledButton
      type="button"
      {...rest}
      className={clsx(styles.header, className)}
      aria-expanded={expanded}
      aria-controls={contentId}
      id={headerId}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.chevron} data-rotate={expanded || undefined}>{icon || '▼'}</span>
    </UnstyledButton>
  );
};

export { AccordionControl };
