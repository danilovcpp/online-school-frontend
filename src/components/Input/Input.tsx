import { type FC, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={clsx(styles.input, className)} {...props} />
    </div>
  );
};

export { Input }
