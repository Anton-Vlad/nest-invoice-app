import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Accept": "*/*",
        'Content-Type': 'application/json',
    },
});

let token: string | null = null;

export const setAuthToken = (newToken: string | null) => {
  token = newToken;
};

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;