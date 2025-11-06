'use client';

import { type FC, type HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useAccordionContext } from '../accordion.context';

import styles from '../accordion.module.scss';

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  innerClassName?: string;
}

const AccordionContent: FC<AccordionContentProps> = ({ className, innerClassName, children, ...rest }) => {
  const { expanded, headerId, contentId } = useAccordionContext();

  return (
    <div
      {...rest}
      id={contentId}
      role="region"
      aria-labelledby={headerId}
      className={clsx(styles.content, className)}
      data-expanded={expanded || undefined}
    >
      <div className={clsx(styles.contentWrapper, innerClassName)}>{children}</div>
    </div>
  );
};

export { AccordionContent };
