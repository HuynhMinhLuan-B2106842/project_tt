'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/footer';

interface LanKham {
  _id: string;
  ngay_kham: string;
  trang_thai: 'dang_kham' | 'hoan_thanh' | 'huy';
  ghi_chu?: string;
  ma_BN: {
    _id: string;
    ho_ten: string;
  };
}

export default function LichSuKhamPage() {
  const [lanKhams, setLanKhams] = useState<LanKham[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:9000/api/lankham/benhnhan/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });

        if (!res.ok) throw new Error('Không thể lấy dữ liệu');

        const data: LanKham[] = await res.json();
        setLanKhams(data);
        console.log("✅ Dữ liệu lấy về:", data); 
      } catch (err) {
        console.error('Lỗi khi gọi API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  const formatTrangThai = (trangThai: LanKham['trang_thai']) => {
    switch (trangThai) {
      case 'dang_kham':
        return 'Đang khám';
      case 'hoan_thanh':
        return 'Hoàn thành';
      case 'huy':
        return 'Đã huỷ';
      default:
        return trangThai;
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN');
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6 min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4 text-center">Lịch sử khám bệnh</h1>

        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : lanKhams.length === 0 ? (
          <p className="text-center">Không có lần khám nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 shadow-md rounded-md overflow-hidden">
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
                  <tr key={item._id} className="text-center hover:bg-gray-50">
                    <td className="border p-2">{idx + 1}</td>
                    <td className="border p-2">{formatDate(item.ngay_kham)}</td>
                    <td className="border p-2">{formatTrangThai(item.trang_thai)}</td>
                    <td className="border p-2">{item.ghi_chu || 'Không có'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
