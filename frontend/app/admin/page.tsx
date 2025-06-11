'use client'

import { useSearchParams } from 'next/navigation'
import AdminLayout from '@/app/components/layout/AdminLayout'
import YeuCau from './views/YeuCau'
import LanKham from './views/LanKham'
// import ThucThi from './views/ThucThi'
import BenhNhan from './views/BenhNhan'

export default function AdminPage() {
  const section = useSearchParams().get('section')

  const renderContent = () => {
    switch (section) {
      case 'yeucau':
        return <YeuCau />
      case 'lankham':
        return <LanKham />
      // case 'thucthi':
      //   return <ThucThi />
      case 'benhnhan':
        return <BenhNhan />
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
