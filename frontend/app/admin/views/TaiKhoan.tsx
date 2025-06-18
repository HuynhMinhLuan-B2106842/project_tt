"use client";

import { useEffect, useState } from "react";
import {
  layDanhSachTaiKhoan,
  capNhatTaiKhoan,
  xoaTaiKhoan,
  TaiKhoan,
} from "@/services/taikhoan.service";
import CreateTaiKhoanModal from "../../components/TaoTaiKhoanForm";

export default function TaiKhoanPage() {
  const [taiKhoans, setTaiKhoans] = useState<TaiKhoan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingTaiKhoan, setEditingTaiKhoan] = useState<TaiKhoan | null>(null);
  const [formData, setFormData] = useState({
    ten_dang_nhap: "",
    vai_tro: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchAll = async () => {
    try {
      const data = await layDanhSachTaiKhoan();
      setTaiKhoans(data);
    } catch (err) {
      console.error("❌ Lỗi tải tài khoản:", err);
      setErrorMessage("Không thể tải danh sách tài khoản");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) return;
    try {
      await xoaTaiKhoan(id);
      fetchAll();
    } catch (err) {
      console.error("❌ Lỗi xóa tài khoản:", err);
      alert("Xóa thất bại");
    }
  };

  const handleEditClick = (tk: TaiKhoan) => {
    setEditingTaiKhoan(tk);
    setFormData({
      ten_dang_nhap: tk.ten_dang_nhap || "",
      vai_tro: tk.vai_tro || "",
    });
  };

  const handleUpdate = async () => {
    if (!editingTaiKhoan?._id) return;

    if (!formData.ten_dang_nhap || !formData.vai_tro) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      await capNhatTaiKhoan(editingTaiKhoan._id, formData);
      setEditingTaiKhoan(null);
      fetchAll();
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("Cập nhật thất bại");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = taiKhoans.filter((tk) =>
    tk.ten_dang_nhap.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👤 Danh sách tài khoản</h1>

      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Tìm theo tên đăng nhập..."
          className="border px-3 py-2 rounded w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded ml-4"
        >
          ➕ Tạo Tài Khoản
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          {filtered.length > 0 && (
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Tên đăng nhập</th>
                <th className="border px-4 py-2">Vai trò</th>
                <th className="border px-4 py-2">Hoạt động</th>
              </tr>
            </thead>
          )}
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-4 text-red-600 font-medium"
                >
                  {errorMessage || "Không tìm thấy tài khoản"}
                </td>
              </tr>
            ) : (
              filtered.map((tk) => (
                <tr key={tk._id}>
                  <td className="border px-4 py-2">{tk.ten_dang_nhap}</td>
                  <td className="border px-4 py-2">{tk.vai_tro}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditClick(tk)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(tk._id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa */}
      {editingTaiKhoan && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-full">
            <h2 className="text-lg font-semibold mb-4">Cập nhật tài khoản</h2>

            <label className="block mb-2">
              Tên đăng nhập:
              <input
                type="text"
                value={formData.ten_dang_nhap}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ten_dang_nhap: e.target.value,
                  }))
                }
                className="w-full border rounded px-3 py-1 mt-1"
              />
            </label>

            <label className="block mb-4">
              Vai trò:
              <select
                value={formData.vai_tro}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, vai_tro: e.target.value }))
                }
                className="w-full border rounded px-3 py-1 mt-1"
              >
                <option value="">-- Chọn vai trò --</option>
                <option value="patient">Bệnh Nhân</option>
                <option value="staff">Nhân viên y tế/Bác sĩ</option>
              </select>
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTaiKhoan(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreateModalOpen && (
        <CreateTaiKhoanModal
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={fetchAll}
        />
      )}
    </div>
  );
}
