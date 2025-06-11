"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/app/header";
import Footer from "@/app/footer";

interface BenhNhan {
    ho_ten: string;
    ngay_sinh: string;
    gioi_tinh: string;
    dien_thoai: string;
    email: string;
    dia_chi: string;
    ngay_tao_ho_so: string;
}

export default function ChinhSuaHoSo() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [benhNhan, setBenhNhan] = useState<BenhNhan>({
        ho_ten: "",
        ngay_sinh: "",
        gioi_tinh: "",
        dien_thoai: "",
        email: "",
        dia_chi: "",
        ngay_tao_ho_so: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // Load dữ liệu bệnh nhân
    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:9000/api/benhnhan/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Không lấy được dữ liệu hồ sơ");
                return res.json();
            })
            .then((data) => {
                setBenhNhan(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    // Xử lý thay đổi input
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setBenhNhan((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Xử lý submit form
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!id) return;
        setSaving(true);
        fetch(`http://localhost:9000/api/benhnhan/${id}`, {
            method: "PUT", // hoặc PATCH tùy API
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(benhNhan),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Cập nhật thất bại");
                return res.json();
            })
            .then(() => {
                setSaving(false);
                router.push(`/benhnhan/xemhoso?id=${id}`); // Quay lại trang xem hồ sơ sau khi lưu
            })
            .catch((err) => {
                setError(err.message);
                setSaving(false);
            });
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 min-h-[70vh]">
                {loading && <p>Đang tải dữ liệu...</p>}
                {error && <p className="text-red-600">Lỗi: {error}</p>}
                {!loading && (
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">                      
                        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Chỉnh sửa hồ sơ bệnh nhân</h2>
                        <label className="block mb-4">
                            <span className="font-semibold">Họ tên:</span>
                            <input
                                type="text"
                                name="ho_ten"
                                value={benhNhan.ho_ten}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="font-semibold">Ngày sinh:</span>
                            <input
                                type="date"
                                name="ngay_sinh"
                                value={benhNhan.ngay_sinh.slice(0, 10)} // cắt ngày để phù hợp input date
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="font-semibold">Giới tính:</span>
                            <select
                                name="gioi_tinh"
                                value={benhNhan.gioi_tinh}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border rounded px-3 py-2"
                            >
                                <option value="">-- Chọn giới tính --</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </label>

                        <label className="block mb-4">
                            <span className="font-semibold">Điện thoại:</span>
                            <input
                                type="tel"
                                name="dien_thoai"
                                value={benhNhan.dien_thoai}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="font-semibold">Email:</span>
                            <input
                                type="email"
                                name="email"
                                value={benhNhan.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="font-semibold">Địa chỉ:</span>
                            <textarea
                                name="dia_chi"
                                value={benhNhan.dia_chi}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                        </label>

                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                            >
                                {saving ? "Đang lưu..." : "Lưu thông tin"}
                            </button>
                        </div>
                    </form>
                )}
            </main>
            <Footer />
        </>
    );
}
