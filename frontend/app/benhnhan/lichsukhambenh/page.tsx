'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/footer';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';

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

interface QuyTrinh {
  _id: string;
  ten: string;
  buocHienTai: string;
}

export default function LichSuKhamPage() {
  const [lanKhams, setLanKhams] = useState<LanKham[]>([]);
  const [loading, setLoading] = useState(true);
  const [quyTrinhMap, setQuyTrinhMap] = useState<Record<string, QuyTrinh | null>>({});

  const fetchQuyTrinhForLanKhams = async (
    lanKhams: LanKham[],
    setQuyTrinhMap: React.Dispatch<React.SetStateAction<Record<string, QuyTrinh | null>>>
  ) => {
    const map: Record<string, QuyTrinh | null> = {};

    await Promise.all(
      lanKhams.map(async (lk) => {
        try {
          const res = await fetch(`http://localhost:9000/api/quytrinh/by-lankham/${lk._id}`);
          if (res.ok) {
            const quyTrinh: QuyTrinh = await res.json();
            map[lk._id] = quyTrinh;
          } else {
            map[lk._id] = null;
          }
        } catch (err) {
          console.error(`❌ Lỗi khi lấy quy trình cho lần khám ${lk._id}:`, err);
          map[lk._id] = null;
        }
      })
    );

    setQuyTrinhMap(map);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:9000/api/lankham/benhnhan/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Không thể lấy dữ liệu lần khám');
        const data: LanKham[] = await res.json();
        setLanKhams(data);

        await fetchQuyTrinhForLanKhams(data, setQuyTrinhMap);
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
      <main className="min-h-[80vh] bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Lịch sử khám bệnh của bạn
          </h1>

          {loading ? (
            <p className="text-center">Đang tải dữ liệu...</p>
          ) : lanKhams.length === 0 ? (
            <p className="text-center">Không có lần khám nào.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {lanKhams.map((item, idx) => (
                <Card key={item._id} className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      Lần khám {idx + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                      <strong>Ngày khám:</strong> {formatDate(item.ngay_kham)}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {formatTrangThai(item.trang_thai)}
                    </p>
                    <p>
                      <strong>Ghi chú:</strong> {item.ghi_chu || 'Không có'}
                    </p>
                    <p>
                      <strong>Quy trình:</strong>{' '}
                      {quyTrinhMap[item._id] ? (
                        <Link
                          href={`/quytrinh/${quyTrinhMap[item._id]!._id}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                        >
                          Xem quy trình
                          <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                      ) : (
                        <span className="text-gray-400 italic">Chưa có</span>
                      )}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}