import axios, { AxiosError } from 'axios';
import { Mutex } from 'async-mutex';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

const mutex = new Mutex();

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Automatically sends cookies
});

// Response interceptor for handling token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 error - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          // Send refresh request, refresh token automatically included via cookies
          await apiClient.post(
            'http://localhost:8000/api/jwt/refresh/'
          );

          // Retry the original request
          return apiClient(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        return apiClient(originalRequest); // Retry once mutex is released
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
