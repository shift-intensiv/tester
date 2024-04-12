import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { useOtpForm } from './hooks/useOtpForm';

import styles from './OtpForm.module.css';

const OTP_LENGTH = 6;

export const OtpForm = () => {
  const { form, state, functions } = useOtpForm();

  console.log('@', form.formState.errors.otp);
  return (
    <form onSubmit={functions.onSubmit}>
      <fieldset disabled={state.isLoading} className={styles.container}>
        <Typography tag='p' variant='paragraph16-regular'>
          Введите проверочный код для входа
          <br /> в личный кабинет
        </Typography>

        <Input
          value={state.phone}
          placeholder='Телефон'
          format='+7 (###) #### ###'
          component={PatternFormat}
          onValueChange={({ value }) => functions.onPhoneChange(value)}
        />

        <Input
          maxLength={OTP_LENGTH}
          placeholder='Проверочный код'
          {...form.register('otp')}
          {...(form.formState.errors.otp && { error: form.formState.errors.otp.message })}
        />

        <Button variant='contained' type='submit' loading={state.isLoading}>
          Войти
        </Button>
      </fieldset>
    </form>
  );
};
