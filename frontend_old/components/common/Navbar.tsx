'use client';

import { useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { MobileSidebar } from '@/app/(dashboard)/_components/mobile-sidebar';

export default function Navbar() {
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();


	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex gap-x-2 ml-auto">
        <Button size="sm" variant="ghost" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Exit
        </Button>
      </div>
    </div>
  );
}