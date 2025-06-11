'use client';

import { useEffect, useState } from 'react';
import { getAllYeuCau, timKiemYeuCau, duyetYeuCau, tuChoiYeuCau } from '@/services/yeucau.service';

interface YeuCau {
    _id: string;
    ma_BN: {
        ho_ten: string;
        ngay_sinh: string;
        gioi_tinh: string;
        dien_thoai: string;
        email: string;
        dia_chi: string;
    };
    ngay_muon_kham: string;
    chuyen_khoa: string;
    trieu_chung: string;
    trang_thai_YC: 'cho_duyet' | 'da_duyet' | 'tu_choi';
}

export default function YeuCauPage() {
    const [dsYeuCau, setDsYeuCau] = useState<YeuCau[]>([]);
    const [loading, setLoading] = useState(true);
    const [timKiem, setTimKiem] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchYeuCau();
    }, []);

    const fetchYeuCau = async () => {
        try {
            setLoading(true);
            const data = await getAllYeuCau();
            setDsYeuCau(data);
        } catch (err) {
            setError('Không thể tải danh sách yêu cầu');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!timKiem.trim()) return fetchYeuCau();
        try {
            setLoading(true);
            const data = await timKiemYeuCau(timKiem.trim());
            setDsYeuCau(data);
        } catch (err) {
            setError('Không tìm thấy yêu cầu');
        } finally {
            setLoading(false);
        }
    };

    const handleDuyet = async (id: string) => {
        try {
            await duyetYeuCau(id);
            fetchYeuCau(); // Refresh danh sách
        } catch (err) {
            setError('Lỗi khi duyệt yêu cầu');
        }
    };

    const handleTuChoi = async (id: string) => {
        try {
            await tuChoiYeuCau(id);
            fetchYeuCau(); // Refresh danh sách
        } catch (err) {
            setError('Lỗi khi từ chối yêu cầu');
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách yêu cầu khám</h1>

            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên bệnh nhân"
                    value={timKiem}
                    onChange={(e) => setTimKiem(e.target.value)}
                    className="border px-3 py-2 rounded w-80"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Tìm kiếm
                </button>
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Họ tên</th>
                            <th className="border p-2">Chuyên khoa</th>
                            <th className="border p-2">Triệu chứng</th>
                            <th className="border p-2">Ngày muốn khám</th>
                            <th className="border p-2">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsYeuCau.map((yc) => (
                            <tr key={yc._id}>
                                <td className="border p-2">{yc.ma_BN?.ho_ten}</td>
                                <td className="border p-2">{yc.chuyen_khoa}</td>
                                <td className="border p-2">{yc.trieu_chung}</td>
                                <td className="border p-2">
                                    {new Date(yc.ngay_muon_kham).toLocaleDateString()}
                                </td>
                                <td className="border p-2">
                                    {yc.trang_thai_YC === 'cho_duyet' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDuyet(yc._id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                                            >
                                                Duyệt
                                            </button>
                                            <button
                                                onClick={() => handleTuChoi(yc._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                                            >
                                                Từ chối
                                            </button>
                                        </div>
                                    ) : yc.trang_thai_YC === 'da_duyet' ? (
                                        <span className="text-green-700 font-semibold">Đã duyệt</span>
                                    ) : (
                                        <span className="text-red-700 font-semibold">Từ chối</span>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
