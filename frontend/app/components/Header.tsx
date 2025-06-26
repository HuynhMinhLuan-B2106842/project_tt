'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Stethoscope, User, Menu, X } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import AuthModal from '../components/AuthModal';
import { getUserIdFromToken } from '@/utils/token';
import { layThongTinTaiKhoan, TaiKhoan } from '@/services/taikhoan.service';

export default function Header() {
  const { token, logout } = useAuth();
  const isAuthenticated = !!token;
  const [user, setUser] = useState<TaiKhoan | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('register');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const id = getUserIdFromToken();
    if (token && id) {
      layThongTinTaiKhoan(id).then(setUser).catch(console.error);
    }
  }, [token]);

  const handleLoginClick = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'logout') {
      logout();
    } else if (e.target.value === 'admin') {
      window.location.href = '/admin';
    } else if (e.target.value === 'profile') {
      window.location.href = '/benhnhan/xemhoso';
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-800">
            Phòng Khám Đa Khoa
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Trang chủ
          </Link>
          <Link
            href="/benhnhan/lichsukhambenh"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Lịch sử lần khám
          </Link>
          <Link
            href="/benhnhan/dichvu"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Dịch vụ
          </Link>
          <Link
            href="/benhnhan/doingubacsi"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Đội ngũ bác sĩ
          </Link>
          <Link
            href="/benhnhan/lienhe"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Liên hệ
          </Link>
        </nav>

        {/* Auth section */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-6">
              <User className="w-5 h-5 text-blue-600" />
              <select
                onChange={handleDropdownChange}
                className="text-blue-900 bg-white border border-gray-300 px-3 py-1 rounded"
              >
                <option value="">{user.ten_dang_nhap}</option>
                <option value="profile">Hồ sơ</option>
                {user.vai_tro === "admin" && (
                  <option value="admin">Quản lý</option>
                )}
                <option value="logout">Đăng xuất</option>
              </select>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleLoginClick}
                className="hover:bg-blue-100 hover:text-blue-700 transition"
              >
                Đăng nhập
              </Button>

              <Button
                onClick={handleRegisterClick}
                className="hover:bg-blue-600 hover:text-white transition"
              >
                Đăng ký
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-16 px-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b text-blue-900"
            >
              Trang chủ
            </Link>
            <Link
              href="/quy-trinh"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b text-blue-900"
            >
              Quy trình khám
            </Link>
            <Link
              href="/dich-vu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b text-blue-900"
            >
              Dịch vụ
            </Link>
            <Link
              href="/bac-si"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b text-blue-900"
            >
              Đội ngũ bác sĩ
            </Link>
            <Link
              href="/lien-he"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b text-blue-900"
            >
              Liên hệ
            </Link>

            {/* Auth actions */}
            <div className="mt-4">
              {isAuthenticated && user ? (
                <>
                  <div className="text-blue-900 mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user.ten_TK}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full mb-2 hover:bg-blue-100 hover:text-blue-700 transition"
                    variant="outline"
                    onClick={() => {
                      handleLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Đăng nhập
                  </Button>

                  <Button
                    className="w-full hover:bg-blue-600 hover:text-white transition"
                    onClick={() => {
                      handleRegisterClick();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Đăng ký
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
        onSuccess={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
