import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { authApi } from '@/tanstack/features/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error('Login failed');
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/');
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (userData: {
      email: string;
      first_name: string;
      last_name: string;
      password: string;
      re_password: string;
    }) => authApi.register(userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/dashboard');
      toast.success('Account created successfully');
    },
    onError: (error) => {
      toast.error('Sign up failed');
    },
  });
}
