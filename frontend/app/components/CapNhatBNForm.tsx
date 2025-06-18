"use client";
import React, { useState, useRef } from "react";

interface EditBenhNhanModalProps {
  formData: {
    ho_ten: string;
    ngay_sinh: string;
    gioi_tinh: string;
    dien_thoai: string;
    email: string;
    dia_chi: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      ho_ten: string;
      ngay_sinh: string;
      gioi_tinh: string;
      dien_thoai: string;
      email: string;
      dia_chi: string;
    }>
  >;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditBenhNhanModal({
  formData,
  setFormData,
  onCancel,
  onSave,
}: EditBenhNhanModalProps) {
  const [errors, setErrors] = useState<{
    ho_ten?: string;
    dien_thoai?: string;
    email?: string;
  }>({});

  const hoTenRef = useRef<HTMLInputElement>(null);
  const dienThoaiRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.ho_ten.trim()) {
      newErrors.ho_ten = "Họ tên không được để trống.";
    }

   if (!/^(03|08|09)\d{8}$/.test(formData.dien_thoai)) {

      newErrors.dien_thoai = "Phải bắt đầu bằng 03 08 09 và có 10 chữ số.";
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Phải là địa chỉ Gmail hợp lệ.";
    }

    setErrors(newErrors);

    if (newErrors.ho_ten && hoTenRef.current) hoTenRef.current.focus();
    else if (newErrors.dien_thoai && dienThoaiRef.current)
      dienThoaiRef.current.focus();
    else if (newErrors.email && emailRef.current) emailRef.current.focus();

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] max-w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Cập nhật bệnh nhân
        </h2>

        {/* Họ tên */}
        <label className="block mb-2">
          Họ tên:
          <input
            ref={hoTenRef}
            type="text"
            value={formData.ho_ten}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ho_ten: e.target.value }))
            }
            className={`w-full border rounded px-3 py-1 mt-1 ${
              errors.ho_ten ? "border-red-500" : ""
            }`}
          />
          {errors.ho_ten && (
            <p className="text-red-600 text-sm mt-1">{errors.ho_ten}</p>
          )}
        </label>

        {/* Ngày sinh */}
        <label className="block mb-2">
          Ngày sinh:
          <input
            type="date"
            value={formData.ngay_sinh}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ngay_sinh: e.target.value }))
            }
            className="w-full border rounded px-3 py-1 mt-1"
          />
        </label>

        {/* Giới tính */}
        <label className="block mb-2">
          Giới tính:
          <select
            value={formData.gioi_tinh}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gioi_tinh: e.target.value }))
            }
            className="w-full border rounded px-3 py-1 mt-1"
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </label>

        {/* Điện thoại */}
        <label className="block mb-2">
          Điện thoại:
          <input
            ref={dienThoaiRef}
            type="text"
            value={formData.dien_thoai}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dien_thoai: e.target.value,
              }))
            }
            className={`w-full border rounded px-3 py-1 mt-1 ${
              errors.dien_thoai ? "border-red-500" : ""
            }`}
          />
          {errors.dien_thoai && (
            <p className="text-red-600 text-sm mt-1">{errors.dien_thoai}</p>
          )}
        </label>

        {/* Email */}
        <label className="block mb-2">
          Email:
          <input
            ref={emailRef}
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className={`w-full border rounded px-3 py-1 mt-1 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </label>

        {/* Địa chỉ */}
        <label className="block mb-4">
          Địa chỉ:
          <input
            type="text"
            value={formData.dia_chi}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dia_chi: e.target.value }))
            }
            className="w-full border rounded px-3 py-1 mt-1"
          />
        </label>

        {/* Nút hành động */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
