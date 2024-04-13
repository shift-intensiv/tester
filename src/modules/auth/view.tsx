import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { useView } from './hooks/useView';
import { LENGTH } from './constants';

import styles from './view.module.css';

export const AuthView = () => {
  const { form, state, functions } = useView();

  return (
    <form className={styles.container} onSubmit={functions.onSubmit}>
      <Typography tag='p' variant='paragraph16-regular'>
        Введите {state.stage === 'phone' ? 'номер телефона' : 'проверочный код'} для входа
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

      {state.stage === 'otp' && (
        <Input
          maxLength={LENGTH.OTP}
          placeholder='Проверочный код'
          {...form.register('otp')}
          {...('otp' in form.formState.errors &&
            form.formState.errors.otp && { error: form.formState.errors.otp.message })}
        />
      )}

      <Button variant='contained' type='submit' loading={state.isLoading}>
        Войти
      </Button>
    </form>
  );
};
