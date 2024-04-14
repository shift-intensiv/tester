import { PatternFormat } from 'react-number-format';

import { Button, Input, Typography } from '@/components';

import { useView } from './hooks/useView';

import styles from './view.module.css';

export const ProfileView = () => {
  const { form, state, functions } = useView();

  return (
    <form className={styles.container} onSubmit={functions.onSubmit}>
      <Typography tag='h1' variant='title'>
        Профиль
      </Typography>

      <fieldset disabled={state.isLoading} className={styles.fieldset}>
        <Input
          label='Фамилия'
          placeholder='Фамилия'
          {...form.register('lastname')}
          {...(form.formState.errors.lastname && { error: form.formState.errors.lastname.message })}
        />

        <Input
          disabled
          label='Номер телефона'
          value={state.phone}
          format='+# ### ### ## ##'
          component={PatternFormat}
        />

        <Input
          label='Имя'
          placeholder='Имя'
          {...form.register('firstname')}
          {...(form.formState.errors.firstname && {
            error: form.formState.errors.firstname.message
          })}
        />

        <Input
          label='Email'
          placeholder='Email'
          {...form.register('email')}
          {...(form.formState.errors.email && {
            error: form.formState.errors.email.message
          })}
        />

        <Input
          label='Отчество'
          placeholder='Отчество'
          {...form.register('middlename')}
          {...(form.formState.errors.middlename && {
            error: form.formState.errors.middlename.message
          })}
        />

        <Input
          label='Город'
          placeholder='Город'
          {...form.register('city')}
          {...(form.formState.errors.city && {
            error: form.formState.errors.city.message
          })}
        />
      </fieldset>

      <div className={styles.button_container}>
        <Button type='submit' loading={state.isLoading} disabled={!form.formState.isDirty}>
          Обновить данные
        </Button>
        <Button variant='outlined' onClick={functions.onLogout}>
          Выйти
        </Button>
      </div>
    </form>
  );
};
