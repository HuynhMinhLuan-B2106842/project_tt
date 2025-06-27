"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/footer";
import { getUserIdFromToken } from "@/utils/token";

interface BenhNhan {
    _id?: string;
    ho_ten: string | null;
    ngay_sinh: string | null;
    gioi_tinh: string | null;
    dien_thoai: string | null;
    email: string | null;
    dia_chi: string | null;
    ngay_tao_ho_so: string | null;
}

export default function XemHoSo() {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [benhNhan, setBenhNhan] = useState<BenhNhan | null>(null);

    useEffect(() => {
        const userId = getUserIdFromToken();
        if (userId) {
            setId(userId);
        } else {
            setError("Bạn chưa đăng nhập");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:9000/api/benhnhan/taikhoan/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Không lấy được dữ liệu hồ sơ");
                return res.json();
            })
            .then(data => {
                setBenhNhan(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleEdit = () => {
        if (benhNhan && benhNhan._id) {
            router.push(`/benhnhan/chinhsuahoso?id=${benhNhan._id}`);
        }
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "Chưa cập nhật";
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? "Không hợp lệ" : date.toLocaleDateString();
    };

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 min-h-[70vh]">
                {loading && <p>Đang tải dữ liệu...</p>}
                {error && <p className="text-red-600">Lỗi: {error}</p>}
                {!loading && !error && !benhNhan && <p>Không tìm thấy hồ sơ bệnh nhân</p>}
                {!loading && !error && benhNhan && (
                    <div className="bg-white shadow-md rounded-md p-6 max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                            Chi tiết hồ sơ bệnh nhân
                        </h2>
                        <p><strong>Họ tên:</strong> {benhNhan.ho_ten || "Chưa cập nhật"}</p>
                        <p><strong>Ngày sinh:</strong> {formatDate(benhNhan.ngay_sinh)}</p>
                        <p><strong>Giới tính:</strong> {benhNhan.gioi_tinh || "Chưa cập nhật"}</p>
                        <p><strong>Điện thoại:</strong> {benhNhan.dien_thoai || "Chưa cập nhật"}</p>
                        <p><strong>Email:</strong> {benhNhan.email || "Chưa cập nhật"}</p>
                        <p><strong>Địa chỉ:</strong> {benhNhan.dia_chi || "Chưa cập nhật"}</p>
                        <p><strong>Ngày tạo hồ sơ:</strong> {formatDate(benhNhan.ngay_tao_ho_so)}</p>

                        <div className="mt-6 text-center">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
