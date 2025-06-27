'use client';
import { useState } from 'react';
import { Eye, EyeOff, Loader2, User, Lock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onSuccess: () => void;
  onClose: () => void; 
}

export default function LoginPage({ onSwitchToRegister, onSuccess }: LoginPageProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     const result = await login(username, password);
  //     if (result.success) {
  //       onSuccess();
  //     } else {
  //       setError(result.message || '');
  //     }
  //   } catch {
  //     setError('Đã xảy ra lỗi. Vui lòng thử lại.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const result = await login(username, password);
      if (result.success) {
        // ✅ Lấy token và giải mã
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode<{ id: string; vai_tro: string }>(token);
          const role = decoded.vai_tro;
  
          if (role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        } else {
          setError('Không tìm thấy token.');
        }
        onSuccess();
      } else {
        setError(result.message || '');
      }
    } catch (err) {
      console.error(err);
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md p-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Đăng nhập</h2>
      <p className="text-center text-gray-600 mb-6">Vui lòng nhập thông tin tài khoản</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <Label htmlFor="username">Tên đăng nhập</Label>
          <div className="relative">
            <Input
              id="username"
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="pl-10"
              autoComplete="username"
              required
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Mật khẩu</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="pl-10 pr-10"
              autoComplete="current-password"
              required
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng nhập...
            </>
          ) : (
            'Đăng nhập'
          )}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Quên mật khẩu?{' '}
          <Button
            variant="link"
            className="text-blue-600 p-0 h-auto"
            onClick={() => alert('Tính năng đang được phát triển')}
            disabled={isLoading}
          >
            Lấy lại ngay
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Button
            variant="link"
            className="text-blue-600 p-0 h-auto"
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            Đăng ký
          </Button>
        </div>
      </form>
    </div>
  );
}
