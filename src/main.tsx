import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';
import { Provider } from './provider.tsx';

import './styles/reset.css';
import './styles/typography.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
);
