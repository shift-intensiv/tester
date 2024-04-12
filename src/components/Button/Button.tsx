import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

type ButtonVariant = 'contained' | 'outlined';
interface ButtonProps extends React.ComponentProps<'button'> {
  loading?: boolean;
  variant: ButtonVariant;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, className, loading, ...props }, ref) => (
    <button className={clsx(styles.button, styles[variant], className)} {...props} ref={ref}>
      {loading ? <>loading</> : <>{children}</>}
    </button>
  )
);
