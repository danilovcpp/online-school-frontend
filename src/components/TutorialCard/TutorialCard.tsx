import React, { ComponentPropsWithRef } from 'react';

import styles from './TutorialCard.module.scss';

interface TutorialCardProps extends ComponentPropsWithRef<'div'> {
  step: string | number;
  title: string;
  description: string;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ step, title, description, ...rest }) => {
  return (
    <div className={styles.root} {...rest}>
      <div className={styles.step}>{step}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
