import { Typography } from '@/components';

import { PhoneForm } from './components/PhoneForm/PhoneForm';
import { OtpForm } from './components/OtpForm/OtpForm';
import { useAuthViewStore } from './store';

import styles from './view.module.css';

export const AuthView = () => {
  const authViewStore = useAuthViewStore();

  return (
    <div className={styles.container}>
      <Typography tag='h1' variant='title'>
        Вход
      </Typography>

      {authViewStore.status === 'phone' && <PhoneForm />}
      {authViewStore.status === 'otp' && <OtpForm />}
    </div>
  );
};
