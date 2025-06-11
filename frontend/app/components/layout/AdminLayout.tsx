import Sidebar from '../admin/AdminSidebar';
import Header from '../admin/AdminHeader';

type AdminLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const AdminLayout = ({ children, className }: AdminLayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-96 mt-6 w-full min-h-screen bg-gray-50">
        <Header />
        <main className={`pt-20 p-6 ${className}`}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
