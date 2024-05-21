import axios from 'axios';

import { LOCAL_STORAGE_KEYS } from '../constants';

export const api = axios.create({
  baseURL: 'https://shift-backend.onrender.com/',
  validateStatus: () => true,
  headers: {
    tester: true
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});
