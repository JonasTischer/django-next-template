import { RequireAuth } from '@/components/utils';
import { Sidebar } from './_components/sidebar';
import Navbar from './_components/navbar';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RequireAuth>
      <div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <div className="md:pl-56 pt-[80px] h-full">{children}</div>
      </div>
    </RequireAuth>
  );
};

export default DashboardLayout;
