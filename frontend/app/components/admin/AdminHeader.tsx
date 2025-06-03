// components/admin/Header.tsx
import { Bell, Home, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white shadow h-16 px-6 flex items-center justify-between fixed top-0 left-96 z-10">
      <div className="flex items-center gap-4 text-gray-700">
        <Home className="w-5 h-5" />
        <span className="font-semibold">Hệ thống quản lý khám bệnh</span>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600" />
        <UserCircle className="w-6 h-6 text-gray-600" />
        <span className="font-medium">Trần Văn Sang</span>

        <select className="border text-sm px-2 py-1 rounded">
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
