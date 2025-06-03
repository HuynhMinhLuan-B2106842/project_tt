'use client';

import { useEffect, useState } from 'react';

// Cập nhật interface LanKham để ma_BN là object
interface LanKham {
  _id: string;
  ngay_kham: string;
  trang_thai: 'dang_kham' | 'hoan_thanh' | 'huy';
  ghi_chu?: string;
  ma_BN: {
    _id: string;
    ho_ten: string;
    // Bạn có thể thêm các trường khác nếu cần
  };
}

export default function LichSuKhamPage() {
  const [lanKhams, setLanKhams] = useState<LanKham[]>([]);
  const [loading, setLoading] = useState(true);
  const idBenhNhan = '683eb457c21f8a36a0ee8ccb';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:9000/api/lankham');
        const data: LanKham[] = await res.json();

        // Lọc những lần khám có ma_BN._id === idBenhNhan
        const filtered = data.filter(item => item.ma_BN._id === idBenhNhan);
        setLanKhams(filtered);
      } catch (err) {
        console.error('Lỗi khi gọi API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lịch sử khám bệnh</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : lanKhams.length === 0 ? (
        <p>Không có lần khám nào.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">STT</th>
              <th className="border p-2">Ngày khám</th>
              <th className="border p-2">Trạng thái</th>
              <th className="border p-2">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {lanKhams.map((item, idx) => (
              <tr key={item._id} className="text-center">
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">
                  {new Date(item.ngay_kham).toLocaleDateString()}
                </td>
                <td className="border p-2">{item.trang_thai}</td>
                <td className="border p-2">{item.ghi_chu || 'Không có'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
