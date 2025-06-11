'use client';

import { useEffect, useState } from 'react';
import { taoLanKham, layDanhSachLanKham } from '@/services/lankham.service';
import api from '@/services/api';
import Select from 'react-select';
interface YeuCau {
    _id: string;
    ma_BN: {
        _id: string;
        ho_ten: string;
        dien_thoai?: string;
    };
    ngay_muon_kham: string;
    trang_thai_YC: string;
}

interface LanKham {
    _id: string;
    yeu_cau_id: {
        ma_BN: { ho_ten: string };
        ngay_muon_kham: string;
    };
    ngay_kham: string;
    ghi_chu?: string;
}

export default function LanKhamPage() {
    const [dsLanKham, setDsLanKham] = useState<LanKham[]>([]);
    const [dsYeuCau, setDsYeuCau] = useState<YeuCau[]>([]);
    const [taoMoi, setTaoMoi] = useState(false);

    const [yeuCauDuocChon, setYeuCauDuocChon] = useState('');
    const [ngayKham, setNgayKham] = useState('');
    const [ghiChu, setGhiChu] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const ycRes = await api.get('/yeucau');
            const daDuyet = ycRes.data.filter((yc: YeuCau) => yc.trang_thai_YC === 'da_duyet');
            setDsYeuCau(daDuyet);

            const lkRes = await layDanhSachLanKham();
            setDsLanKham(lkRes);
        };

        fetchData();
    }, []);

    const handleTaoLanKham = async () => {
        if (!yeuCauDuocChon || !ngayKham) {
            alert('Vui lòng nhập đủ thông tin');
            return;
        }

        try {
            await taoLanKham({ yeu_cau_id: yeuCauDuocChon, ngay_kham: ngayKham, ghi_chu: ghiChu });
            alert('Tạo lần khám thành công');
            setTaoMoi(false);
            setYeuCauDuocChon('');
            setNgayKham('');
            setGhiChu('');

            const lkRes = await layDanhSachLanKham();
            setDsLanKham(lkRes);
        } catch (err) {
            alert('Tạo lần khám thất bại');
        }
    };

    const filteredYeuCau = dsYeuCau.filter((yc) =>
        yc.ma_BN.ho_ten.toLowerCase().includes(search.toLowerCase()) ||
        yc.ma_BN?.dien_thoai?.includes(search)
    );
    const options = dsYeuCau.map((yc) => ({
        value: yc._id,
        label: `${yc.ma_BN?.ho_ten} - ${yc.ma_BN?.dien_thoai || 'Không có SĐT'} - ${new Date(yc.ngay_muon_kham).toLocaleDateString()}`,
    }));

    return (
        <div className="p-6 max-w-full">
            <h1 className="text-2xl font-bold mb-4">Danh Sách Lần Khám</h1>

            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setTaoMoi(!taoMoi)}
            >
                {taoMoi ? 'Đóng tạo mới' : 'Tạo Lần Khám Mới'}
            </button>

            {taoMoi && (
                <div className="mb-6 border rounded p-4 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-3">Tạo Lần Khám Mới</h2>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Yêu cầu đã duyệt</label>
                        <Select
                            options={options}
                            value={options.find((opt) => opt.value === yeuCauDuocChon) || null}
                            onChange={(selectedOption) => setYeuCauDuocChon(selectedOption?.value || '')}
                            placeholder="Tìm tên/SĐT bệnh nhân..."
                            isClearable
                            className="text-black"
                        />
                    </div>


                    <label className="block mb-1 font-medium">Ngày khám</label>
                    <input
                        type="date"
                        value={ngayKham}
                        onChange={(e) => setNgayKham(e.target.value)}
                        className="w-full mb-3 border rounded px-3 py-2"
                    />

                    <label className="block mb-1 font-medium">Ghi chú</label>
                    <textarea
                        value={ghiChu}
                        onChange={(e) => setGhiChu(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />

                    <button
                        onClick={handleTaoLanKham}
                        className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Xác nhận tạo
                    </button>
                </div>
            )}

            <table className="w-full border border-collapse mt-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2">Họ tên</th>
                        <th className="border px-3 py-2">Ngày yêu cầu</th>
                        <th className="border px-3 py-2">Ngày khám</th>
                        <th className="border px-3 py-2">Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {dsLanKham.map((lk) => (
                        <tr key={lk._id}>
                            <td className="border px-3 py-2">
                                {lk.yeu_cau_id?.ma_BN?.ho_ten || 'Không có dữ liệu'}
                            </td>
                            <td className="border px-3 py-2">
                                {lk.yeu_cau_id?.ngay_muon_kham ? new Date(lk.yeu_cau_id.ngay_muon_kham).toLocaleDateString() : '---'}
                            </td>
                            <td className="border px-3 py-2">
                                {lk.ngay_kham ? new Date(lk.ngay_kham).toLocaleDateString() : '---'}
                            </td>
                            <td className="border px-3 py-2">{lk.ghi_chu || '-'}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}
