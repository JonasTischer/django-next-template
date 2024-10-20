import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, setUser, finishInitialLoad } from '@/redux/features/authSlice';
import { useRetrieveUserQuery, useVerifyMutation } from '@/redux/features/authApiSlice';

export default function useVerify() {
	const dispatch = useAppDispatch();

  const [verify] = useVerifyMutation();

  const { data: userData } = useRetrieveUserQuery();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
  }, []);

    useEffect(() => {
      if (userData) {
        dispatch(setUser(userData));
      }
    }, [userData, dispatch]);
}
