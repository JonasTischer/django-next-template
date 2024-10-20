import { User } from '@/hooks/useAuth';
import apiClient from './client';

export const authApi = {
  retrieveUser: () => apiClient.get<User>('/users/me/'),

  login: (email: string, password: string) =>
    apiClient.post('/jwt/create/', { email, password }),

  register: (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    re_password: string;
  }) => apiClient.post('/users/', userData),

  verify: () => apiClient.post('/jwt/verify/'),

  refreshToken: (refresh: string) =>
    apiClient.post('/jwt/refresh/', { refresh }),

  logout: () => apiClient.post('/logout/'),

  activation: (uid: string, token: string) =>
    apiClient.post('/users/activation/', { uid, token }),

  resetPassword: (email: string) =>
    apiClient.post('/users/reset_password/', { email }),

  resetPasswordConfirm: (data: {
    uid: string;
    token: string;
    new_password: string;
    re_new_password: string;
  }) => apiClient.post('/users/reset_password_confirm/', data),
};
