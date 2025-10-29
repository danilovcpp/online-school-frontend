import { createContext, useContext } from 'react';

export interface AccordionContextValue {
  expanded: boolean;
  disabled: boolean;
  toggle: () => void;
  headerId: string;
  contentId: string;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordionContext = (): AccordionContextValue => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('Accordion.Control and Accordion.Content must be used within Accordion');
  }
  return ctx;
};
