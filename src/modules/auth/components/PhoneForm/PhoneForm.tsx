import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { usePhoneForm } from './hooks/usePhoneForm';

import styles from './PhoneForm.module.css';

export const PhoneForm = () => {
  const { form, state, functions } = usePhoneForm();

  return (
    <form className={styles.container} onSubmit={functions.onSubmit}>
      <Typography tag='p' variant='paragraph16-regular'>
        Введите номер телефона для входа
        <br /> в личный кабинет
      </Typography>

      <Controller
        name='phone'
        control={form.control}
        render={({ field: { onChange, ...restField }, fieldState }) => (
          <Input
            {...restField}
            disabled={state.isLoading}
            placeholder='Телефон'
            format='+7 (###) #### ###'
            component={PatternFormat}
            onValueChange={({ value }) => onChange(value)}
            {...(fieldState.error && { error: fieldState.error.message })}
          />
        )}
      />

      <Button variant='contained' type='submit' loading={state.isLoading}>
        Войти
      </Button>
    </form>
  );
};
