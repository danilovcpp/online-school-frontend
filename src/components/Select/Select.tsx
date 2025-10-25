import React from 'react';
import clsx from 'clsx';
import styles from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ label, className, children, ...props }) => {
  return (
    <div className={styles.selectContainer}>
      {label && (
        <label className={styles.label}>{label}</label>
      )}
      <select
        className={clsx(styles.select, className)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};