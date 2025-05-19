import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';

import { setAuthToken } from './api/axios';
import { setToken } from './auth/authSlice';

const savedToken = localStorage.getItem('nest_app_user_token');
if (savedToken) {
  store.dispatch(setToken(savedToken));
  setAuthToken(savedToken);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
