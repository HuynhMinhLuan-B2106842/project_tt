'use client'
import { useEffect, useState } from 'react'
import { getAllBenhNhan, timkiembenhnhan } from '@/services/benhnhan.service'

interface BenhNhan {
  _id: string
  ho_ten: string
  ngay_sinh: string
  gioi_tinh: string
  dien_thoai: string
  email: string
  dia_chi: string
  ngay_tao_ho_so: string
}

export default function YeuCau() {
  const [benhNhans, setBenhNhans] = useState<BenhNhan[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchAll = () => {
    getAllBenhNhan()
      .then(setBenhNhans)
      .catch(err => {
        console.error('❌ Lỗi gọi API:', err)
        setErrorMessage('Không thể tải danh sách bệnh nhân.')
      })
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setErrorMessage('')
      fetchAll()
    } else {
      try {
        const data = await timkiembenhnhan(searchTerm)

        if (Array.isArray(data)) {
          setBenhNhans(data)
          setErrorMessage('')
        } else if (data.message) {
          setBenhNhans([])
          setErrorMessage(data.message)
        }
      } catch (error: unknown) {
        console.error('❌ Lỗi khi gọi API:', error)
        setBenhNhans([])
        setErrorMessage('Đã xảy ra lỗi trong quá trình tìm kiếm')
      }
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📄 Danh sách bệnh nhân</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nhập tên bệnh nhân..."
          className="border px-3 py-2 rounded w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Bảng hiển thị kết quả */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          {benhNhans.length > 0 && (
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Họ tên</th>
              <th className="border px-4 py-2">Ngày sinh</th>
              <th className="border px-4 py-2">Giới tính</th>
              <th className="border px-4 py-2">Điện thoại</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Địa chỉ</th>
              <th className="border px-4 py-2">Ngày tạo hồ sơ</th>
            </tr>
          </thead>
          )}
          <tbody>
            {benhNhans.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-red-600 font-medium">
                  {errorMessage || 'Không có kết quả'}
                </td>
              </tr>
            ) : (
              benhNhans.map((bn) => (
                <tr key={bn._id}>
                  <td className="border px-4 py-2">{bn.ho_ten}</td>
                  <td className="border px-4 py-2">{new Date(bn.ngay_sinh).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{bn.gioi_tinh}</td>
                  <td className="border px-4 py-2">{bn.dien_thoai}</td>
                  <td className="border px-4 py-2">{bn.email}</td>
                  <td className="border px-4 py-2">{bn.dia_chi}</td>
                  <td className="border px-4 py-2">{new Date(bn.ngay_tao_ho_so).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
