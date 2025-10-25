import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label}>{label}</label>
      )}
      <input
        className={clsx(styles.input, className)}
        {...props}
      />
    </div>
  );
};