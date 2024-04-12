import React from 'react';
import clsx from 'clsx';

import styles from './Input.module.css';

type InputProps<
  Component extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any> = 'input'
> = {
  label?: string;
  error?: string;
  component?: Component;
} & React.ComponentProps<Component>;

export const Input = React.forwardRef(
  (
    { label, className, component, error, id: externalId, ...props }: InputProps<'input'>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const internalId = React.useId();
    const id = externalId ?? internalId;

    const Component = component || 'input';

    return (
      <div className={clsx(styles.container, { [styles.error]: !!error })}>
        {label && (
          <label htmlFor={id} className='paragraph14-regular'>
            {label}
          </label>
        )}
        <Component
          className={clsx(styles.input, 'paragraph16-regular', className)}
          {...props}
          id={id}
          ref={ref}
        />
        {error && <p className={clsx('paragraph14-regular')}>{error}</p>}
      </div>
    );
  }
) as <Component extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any> = 'input'>(
  props: InputProps<Component> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;
