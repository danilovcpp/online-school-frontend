import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, PropsWithChildren } from 'react';

type AnyObject = Record<string, unknown>;

type AsProp<C extends ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<C extends ElementType, Props = AnyObject> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

interface RefProp<C extends ElementType> {
  ref?: PolymorphicRef<C>;
}

export type PolymorphicComponent<C extends ElementType, Props = AnyObject> = PolymorphicComponentProp<C, Props> & RefProp<C>;
