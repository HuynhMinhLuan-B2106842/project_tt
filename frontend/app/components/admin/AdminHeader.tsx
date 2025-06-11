// components/admin/Header.tsx
import { Bell, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 text-black left-0 z-10 h-20 bg-white shadow px-6 flex items-center justify-between ml-96 w-[calc(100%-24rem)]">
  <div className="flex items-center gap-6 ">
    <Home className="w-8 h-8" />
    <span className="font-semibold text-bg">Hệ thống quản lý khám bệnh</span>
  </div>

  <div className="flex items-center gap-6">
    <Bell className="w-8 h-8 " />
        <select className=" text-bg px-10 py-5 rounded">
          <option value="vi">Trần Văn Sang</option>
          <option value="en">Đăng xuất</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
