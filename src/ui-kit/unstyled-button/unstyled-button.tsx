import { type ComponentPropsWithRef, type ElementType, type FC } from 'react';
import cx from 'clsx';

import type { PolymorphicComponent } from '@/types';

import styles from './unstyled-button.module.scss';

export type UnstyledButtonProps<C extends ElementType = 'button'> = PolymorphicComponent<C, ComponentPropsWithRef<'button'>>;

const UnstyledButton: FC<UnstyledButtonProps> = ({ className, as: Component = 'button', ...props }) => {
  return <Component className={cx(styles.root, className)} type={Component === 'button' ? 'button' : undefined} {...props} />;
};

UnstyledButton.displayName = 'UnstyledButton';

export { UnstyledButton };
