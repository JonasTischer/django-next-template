import axios from 'axios';
import { Mutex } from 'async-mutex';
import { getCookie, setCookie, removeCookie } from '@/utils/cookies';

const mutex = new Mutex();

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie('access_token');
  console.log('Interceptor: attempting to get access_token');
  console.log('Token value:', token);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log('Authorization header set');
  } else {
    console.log(
      'No access token found. User might need to authenticate.'
    );
    // Optionally, you could redirect to a login page or trigger a refresh here
  }

  console.log('Final config headers:', config.headers);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshToken = getCookie('refresh_token');
          const response = await apiClient.post('/jwt/refresh/', {
            refresh: refreshToken,
          });
          setCookie('access_token', response.data.access, {
            secure: process.env.NODE_ENV === 'production',
          });

          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${response.data.access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.log('error refreshing token', refreshError);
          removeCookie('access_token');
          removeCookie('refresh_token');
          // You might want to redirect to login or dispatch a logout action here
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
