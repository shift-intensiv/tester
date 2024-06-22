import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { Countdown } from './components/Countdown/Countdown';
import { useView } from './hooks/useView';

import styles from './view.module.css';

export const AuthView = () => {
  const { form, state, functions } = useView();

  return (
    <form className={styles.container} onSubmit={functions.onSubmit}>
      <fieldset className={styles.fieldset} disabled={state.isLoading}>
        <Typography tag='h1' variant='title'>
          Вход
        </Typography>

        <Typography tag='p' variant='paragraph16_regular'>
          Введите {state.stage === 'phone' ? 'номер телефона' : 'проверочный код'} для входа
          <br /> в личный кабинет
        </Typography>

        <Controller
          name='phone'
          control={form.control}
          render={({ field: { onChange, value, ...restField }, fieldState }) => (
            <Input
              {...restField}
              placeholder='Телефон'
              format='+7 ### ### ## ##'
              component={PatternFormat}
              value={value.substring(1)}
              onChange={(event) => onChange(event.target.value.replace('+', '').replace(/ /g, ''))}
              {...(fieldState.error && { error: fieldState.error.message })}
              {...(value === '72282881488' && { error: 'нет это не пасхалка' })}
            />
          )}
        />

        {state.stage === 'otp' && (
          <Controller
            name='otp'
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                component={PatternFormat}
                placeholder='Проверочный код'
                format='#######'
                {...(fieldState.error && { error: fieldState.error.message })}
              />
            )}
          />
        )}

        <div className={styles.button_container}>
          <Button type='submit' loading={state.isLoading}>
            {state.stage === 'otp' ? 'Войти' : 'Продолжить'}
          </Button>

          {state.stage === 'otp' && state.submittedPhones[state.phone] && (
            <Countdown
              endTime={state.submittedPhones[state.phone]}
              onRetry={functions.onRetry}
              loading={state.isLoading}
            />
          )}
        </div>
      </fieldset>
    </form>
  );
};
