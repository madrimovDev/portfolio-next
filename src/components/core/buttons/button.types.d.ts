import { ComponentProps, ElementType, HTMLAttributes } from "react";

export type DefaultButtonProps<E extends ElementType = ElementType> = {
  as?: E  
  children: ReactNode,
  className?: HTMLAttributes<HTMLElement>['className'],
  colorScheme?: 'red' | 'blue' | 'green' | 'ghost',
  variant?: 'button'
}

export type ButtonType<E extends ElementType> = DefaultButtonProps<E> & Omit<ComponentProps<E>, keyof DefaultButtonProps>;
