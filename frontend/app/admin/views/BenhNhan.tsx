"use client";
import { useEffect, useState } from "react";
import {
  getAllBenhNhan,
  capNhatBenhNhan,
  xoaBenhNhan,
} from "@/services/benhnhan.service";
import EditBenhNhanModal from "@/app/components/CapNhatBNForm";

interface BenhNhan {
  _id: string;
  ho_ten: string;
  ngay_sinh: string;
  gioi_tinh: string;
  dien_thoai: string;
  email: string;
  dia_chi: string;
  ngay_tao_ho_so: string;
  tai_khoan_id?: {
    _id: string;
    ten_dang_nhap: string;
  };
}

export default function YeuCau() {
  const [benhNhans, setBenhNhans] = useState<BenhNhan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingBenhNhan, setEditingBenhNhan] = useState<BenhNhan | null>(null);
  const [formData, setFormData] = useState({
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    dien_thoai: "",
    email: "",
    dia_chi: "",
  });

  const fetchAll = () => {
    getAllBenhNhan()
      .then(setBenhNhans)
      .catch((err) => {
        console.error("❌ Lỗi gọi API:", err);
        setErrorMessage("Không thể tải danh sách bệnh nhân.");
      });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân này?"))
      return;
    try {
      await xoaBenhNhan(id);
      fetchAll();
    } catch (error) {
      console.error("❌ Lỗi khi xóa bệnh nhân:", error);
      alert("Xóa thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = benhNhans.filter((bn) =>
    (bn.ho_ten || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📄 Danh sách bệnh nhân</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên bệnh nhân..."
          className="border px-3 py-2 rounded w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          {filtered.length > 0 && (
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Tài khoản</th>
                <th className="border px-4 py-2">Họ tên</th>
                <th className="border px-4 py-2">Ngày sinh</th>
                <th className="border px-4 py-2">Giới tính</th>
                <th className="border px-4 py-2">Điện thoại</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Địa chỉ</th>
                <th className="border px-4 py-2">Ngày tạo hồ sơ</th>
                <th className="border px-4 py-2">Hoạt động</th>
              </tr>
            </thead>
          )}
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-4 text-red-600 font-medium"
                >
                  {errorMessage || "Không có kết quả"}
                </td>
              </tr>
            ) : (
              filtered.map((bn) => (
                <tr key={bn._id}>
                  <td className="border px-4 py-2">
                    {bn.tai_khoan_id?.ten_dang_nhap || "---"}
                  </td>
                  <td className="border px-4 py-2">{bn.ho_ten}</td>
                  <td className="border px-4 py-2">
                    {new Date(bn.ngay_sinh).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{bn.gioi_tinh}</td>
                  <td className="border px-4 py-2">{bn.dien_thoai}</td>
                  <td className="border px-4 py-2">{bn.email}</td>
                  <td className="border px-4 py-2">{bn.dia_chi}</td>
                  <td className="border px-4 py-2">
                    {new Date(bn.ngay_tao_ho_so).toLocaleString()}
                  </td>
                  <td className="border px-2 py-2 align-middle">
                     <div className="flex flex-row justify-center items-center gap-0">
                    <button
                      onClick={() => {
                        setEditingBenhNhan(bn);
                        setFormData({
                          ho_ten: bn.ho_ten || "",
                          ngay_sinh: bn.ngay_sinh
                            ? bn.ngay_sinh.slice(0, 10)
                            : "",
                          gioi_tinh: bn.gioi_tinh || "",
                          dien_thoai: bn.dien_thoai || "",
                          email: bn.email || "",
                          dia_chi: bn.dia_chi || "",
                        });
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(bn._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-2"
                    >
                      Xóa
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingBenhNhan && (
        <EditBenhNhanModal
          formData={formData}
          setFormData={setFormData}
          onCancel={() => setEditingBenhNhan(null)}
          onSave={async () => {
            try {
              await capNhatBenhNhan(editingBenhNhan._id, formData);
              setEditingBenhNhan(null);
              fetchAll();
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}
    </div>
  );
}
