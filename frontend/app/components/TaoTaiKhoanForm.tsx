'use client';
import { useState } from 'react';
import { dangKy } from '@/services/taikhoan.service';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTaiKhoanModal({ onClose, onSuccess }: Props) {
  const [ten_dang_nhap, setTenDangNhap] = useState('');
  const [mat_khau, setMatKhau] = useState('');
  const [repassword, setRepassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!ten_dang_nhap || !mat_khau || !repassword || !role) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (mat_khau !== repassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    try {
      await dangKy(ten_dang_nhap, mat_khau, repassword);
      onSuccess();
      onClose();
    } catch (err) {
      console.error('❌ Lỗi đăng ký:', err);
      setError('Tạo tài khoản thất bại');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-lg font-semibold mb-4 text-center">Tạo tài khoản mới</h2>

        <label className="block mb-2">
          Tên đăng nhập:
          <input
            type="text"
            value={ten_dang_nhap}
            onChange={(e) => setTenDangNhap(e.target.value)}
            className="w-full border rounded px-3 py-1 mt-1"
          />
        </label>

        <label className="block mb-2">
          Mật khẩu:
          <input
            type="password"
            value={mat_khau}
            onChange={(e) => setMatKhau(e.target.value)}
            className="w-full border rounded px-3 py-1 mt-1"
          />
        </label>

        <label className="block mb-2">
          Nhập lại mật khẩu:
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            className="w-full border rounded px-3 py-1 mt-1"
          />
        </label>

        <label className="block mb-4">
          Vai trò:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded px-3 py-1 mt-1"
          >
            <option value="">-- Chọn vai trò --</option>
            <option value="patient">Bệnh nhân</option>
            <option value="staff">Nhân viên</option>
            <option value="admin">Quản trị</option>
          </select>
        </label>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-4 py-1 rounded hover:bg-gray-100">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-900 hover:bg-red-700 text-white px-4 py-1 rounded"
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
}
