import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { authApi } from '@/tanstack/features/auth';
import { useRouter } from 'next/navigation';
import { setCookie, removeCookie, getCookie } from '@/utils/cookies';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.retrieveUser().then((res) => res.data),
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authApi.login(credentials.email, credentials.password),
    onSuccess: (data) => {
      console.log(
        'setting cookies',
        data.data.access,
        data.data.refresh
      );
      setCookie('access_token', data.data.access, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });
      setCookie('refresh_token', data.data.refresh, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Handle login error (e.g., show error message)
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      removeCookie('access_token');
      removeCookie('refresh_token');
      queryClient.clear();
      router.push('/login');
    },
  });
}

export function useIsAuthenticated() {
  return useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: () => !!getCookie('access_token'),
    staleTime: Infinity,
  });
}
