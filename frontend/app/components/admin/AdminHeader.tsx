'use client';

import { useEffect, useState } from 'react';
import { Bell, Home } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { getUserIdFromToken } from '@/utils/token';
import { layThongTinTaiKhoan, TaiKhoan } from '@/services/taikhoan.service';
import { useRouter } from 'next/navigation'; // dùng để chuyển trang

const Header = () => {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<TaiKhoan | null>(null);
  const router = useRouter(); // Next.js router để điều hướng

  useEffect(() => {
    const id = getUserIdFromToken();
    if (token && id) {
      layThongTinTaiKhoan(id).then(setUser).catch(console.error);
    }
  }, [token]);

  const handleLogout = () => {
    logout(); // xóa token trong context (và có thể cả localStorage)
    router.push('/'); // chuyển về homepage
  };

  return (
    <header className="fixed top-0 text-black left-0 z-10 h-20 bg-white shadow px-6 flex items-center justify-between ml-96 w-[calc(100%-24rem)]">
      <div className="flex items-center gap-6 cursor-pointer" onClick={() => router.push('/')}>
        <Home className="w-8 h-8" />
        <span className="font-semibold text-bg">Hệ thống quản lý khám bệnh</span>
      </div>

      <div className="flex items-center gap-6">
        <Bell className="w-8 h-8" />
        {user && (
          <select
            className="text-bg px-10 py-5 rounded cursor-pointer"
            onChange={(e) => {
              if (e.target.value === 'logout') handleLogout();
            }}
          >
            <option value="">{user.ten_dang_nhap || user.ten_TK}</option>
            <option value="logout">Đăng xuất</option>
          </select>
        )}
      </div>
    </header>
  );
};

export default Header;
