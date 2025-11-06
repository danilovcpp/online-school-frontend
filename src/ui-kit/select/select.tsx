import { type FC, type SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './select.module.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select: FC<SelectProps> = ({ label, className, children, ...props }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={clsx(styles.select, className)} {...props}>
        {children}
      </select>
    </div>
  );
};

export { Select };
