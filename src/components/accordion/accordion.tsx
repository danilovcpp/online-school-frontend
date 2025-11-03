'use client';

import { type FC, type ReactNode, useCallback, useId, useMemo } from 'react';
import clsx from 'clsx';

import { useUncontrolled } from '@/shared/hooks/use-uncontrolled';

import { AccordionContext, AccordionContextValue } from './accordion.context';

import styles from './accordion.module.scss';

export interface AccordionProps {
  children: ReactNode;
  disabled?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  className?: string;
  id?: string;
}

const Accordion: FC<AccordionProps> = ({ children, disabled = false, defaultExpanded, expanded, onChange, className, id }) => {
  const [isExpanded, setIsExpanded] = useUncontrolled({
    value: expanded,
    defaultValue: defaultExpanded,
    finalValue: false,
    onChange,
  });

  const generatedId = useId();
  const baseId = id ?? generatedId;

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }

    setIsExpanded(!isExpanded);
  }, [disabled, isExpanded, setIsExpanded]);

  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      expanded: isExpanded,
      disabled,
      toggle,
      headerId: `${baseId}-header`,
      contentId: `${baseId}-content`,
    }),
    [baseId, disabled, isExpanded, toggle],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={clsx(styles.root, className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export { Accordion };
