"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { dangKy } from "@/services/taikhoan.service";
import { useAuth } from "../components/AuthContext";
import { AxiosError } from "axios";

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
  onClose: () => void;
}

export default function RegisterPage({ onSwitchToLogin, onSuccess, onClose }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setIsLoading(false);
      return;
    }

    try {
      await dangKy(formData.email, formData.password, formData.confirmPassword);

      const result = await login(formData.email, formData.password);
      if (result.success) {
        setSuccess("Đăng ký và đăng nhập thành công!");
        onSuccess?.();
        onClose?.();
      } else {
        setError("Đăng ký thành công nhưng đăng nhập thất bại");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Đăng ký</h2>
      <p className="text-center text-gray-600 mb-6">Tạo tài khoản để tiếp tục</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 bg-green-50 border border-green-200 p-2 rounded">
            {success}
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="password">Mật khẩu</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              disabled={isLoading}
              minLength={6}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Nhập lại mật khẩu"
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang đăng ký...
            </>
          ) : (
            "Đăng ký"
          )}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Button
            type="button"
            variant="link"
            className="text-blue-600 p-0 h-auto"
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  );
}
