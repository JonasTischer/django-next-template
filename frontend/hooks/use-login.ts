import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        toast.success('Logged in');
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        if (
          error.data &&
          typeof error.data === 'object' &&
          error.data.detail
        ) {
          // Directly display the error message from 'detail'
          toast.error(error.data.detail);
        } else {
          // Fallback error message if error.data is not present or not in the expected format
          toast.error('Failed to login');
        }
      });
	};

	return {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}
