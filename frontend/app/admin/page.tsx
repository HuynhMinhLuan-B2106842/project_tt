'use client'

import { useSearchParams } from 'next/navigation'
import AdminLayout from '@/app/components/layout/AdminLayout'
import YeuCau from './views/YeuCau'
import LanKham from './views/LanKham'
import TaiKhoan from './views/TaiKhoan'
import BenhNhan from './views/BenhNhan'
import WorkFlow from './workflow/page'
export default function AdminPage() {
  const section = useSearchParams().get('section')

  const renderContent = () => {
    switch (section) {
      case 'yeucau':
        return <YeuCau />
      case 'lankham':
        return <LanKham />
      case 'taikhoan':
        return <TaiKhoan />
      case 'benhnhan':
        return <BenhNhan />
      case 'workflow':
        return <WorkFlow />
      default:
        return <p>Chọn một mục ở menu bên trái để bắt đầu.</p>
    }
  }

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  )
}
