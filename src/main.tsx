import ReactDOM from 'react-dom/client';

import { getUsersSession } from './utils/api/index';
import { LOCAL_STORAGE_KEYS } from './utils/constants';
import { useStore } from './utils/store';
import { App } from './App';
import { Provider } from './provider';

import './styles/reset.css';
import './styles/typography.css';
import './styles/global.css';

const init = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  if (token) {
    const getUsersSessionResponse = await getUsersSession();
    console.log('@', getUsersSessionResponse);
    useStore.setState({ isLoggedIn: true, user: getUsersSessionResponse.data.user });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider>
      <App />
    </Provider>
  );
};

init();
