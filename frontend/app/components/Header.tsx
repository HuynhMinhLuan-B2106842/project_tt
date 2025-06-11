"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Stethoscope, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../components/AuthContext";
import AuthModal from "../components/AuthModal";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "register"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-800">
              Phòng Khám Đa Khoa
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
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
            href="/quy-trinh"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Quy trình khám
          </Link>
          <Link
            href="/dich-vu"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Dịch vụ
          </Link>
          <Link
            href="/bac-si"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Đội ngũ bác sĩ
          </Link>
          <Link
            href="/lien-he"
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            Liên hệ
          </Link>
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-blue-900">
                <User className="h-4 w-4" />
                <span>{user?.name || "Người dùng"}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" onClick={handleLoginClick}>
                Đăng nhập
              </Button>
              <Button onClick={handleRegisterClick}>Đăng ký</Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white pt-16 px-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-blue-900 font-medium hover:text-blue-600 py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/quy-trinh"
                className="text-blue-900 font-medium hover:text-blue-600 py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Quy trình khám
              </Link>
              <Link
                href="/dich-vu"
                className="text-blue-900 font-medium hover:text-blue-600 py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dịch vụ
              </Link>
              <Link
                href="/bac-si"
                className="text-blue-900 font-medium hover:text-blue-600 py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đội ngũ bác sĩ
              </Link>
              <Link
                href="/lien-he"
                className="text-blue-900 font-medium hover:text-blue-600 py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>

              {/* Auth buttons in mobile menu */}
              <div className="mt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 text-blue-900 py-2">
                      <User className="h-4 w-4" />
                      <span>{user?.name || "Người dùng"}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLoginClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      onClick={() => {
                        handleRegisterClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Đăng ký
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </header>
  );
}
