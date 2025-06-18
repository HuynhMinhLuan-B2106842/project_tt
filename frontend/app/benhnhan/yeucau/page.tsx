"use client"

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/footer'

export default function YeuCauKham() {
  const [chuyenKhoa, setChuyenKhoa] = useState('');
  const [trieuChung, setTrieuChung] = useState('');
  const [ngayMuonKham, setNgayMuonKham] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token || !chuyenKhoa || !trieuChung || !ngayMuonKham) {
      setMessage('Vui lòng điền đầy đủ thông tin và đăng nhập');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:9000/api/yeucau', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gửi token
        },
        body: JSON.stringify({
          chuyen_khoa: chuyenKhoa,
          trieu_chung: trieuChung,
          ngay_muon_kham: ngayMuonKham,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsSuccess(false);
        setMessage(data.message || 'Gửi yêu cầu thất bại');
      } else {
        setIsSuccess(true);
        setMessage('Gửi yêu cầu thành công!');
        setChuyenKhoa('');
        setTrieuChung('');
        setNgayMuonKham('');
      }
    } catch (error) {
      setMessage('Lỗi kết nối tới server');
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Gửi yêu cầu khám</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa:</label>
            <input
              type="text"
              value={chuyenKhoa}
              onChange={(e) => setChuyenKhoa(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Triệu chứng:</label>
            <textarea
              value={trieuChung}
              onChange={(e) => setTrieuChung(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày muốn khám:</label>
            <input
              type="date"
              value={ngayMuonKham}
              onChange={(e) => setNgayMuonKham(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'
              }`}
          >
            {message}
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
