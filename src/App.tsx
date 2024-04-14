import { AuthView } from './modules/auth/view';
import { ProfileView } from './modules/profile/view';
import { useStore } from './utils/store';

export const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <main className='container'>
      {!isLoggedIn && <AuthView />}
      {isLoggedIn && <ProfileView />}
    </main>
  );
};
