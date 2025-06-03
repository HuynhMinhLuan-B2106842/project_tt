// components/admin/Sidebar.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-96 bg-[#993333] text-white h-screen p-4 fixed">
      <h2 className="text-xl font-bold mb-4 uppercase">Quản trị hệ thống</h2>

      <nav className="space-y-4">
        {/* Mỗi mục chính */}
        <div>
          <button onClick={() => toggleMenu('hoso')} className="w-full text-left font-semibold">
            🗂️ Hồ sơ khám bệnh
          </button>
          {openMenu === 'hoso' && (
            <ul className="ml-4 text-sm mt-2 space-y-1">
              <li><Link href="/admin/yeucau">Yêu cầu khám</Link></li>
              <li><Link href="/admin/lankham">Lần khám</Link></li>
              <li><Link href="/admin/thucthi">Thực thi bước</Link></li>
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu('quytrinh')} className="w-full text-left font-semibold">
            🔁 Mẫu và sơ đồ quy trình
          </button>
          {openMenu === 'quytrinh' && (
            <ul className="ml-4 text-sm mt-2 space-y-1">
              <li><Link href="/admin/mauquytrinh">Mẫu quy trình</Link></li>
              <li><Link href="/admin/diagram">Sơ đồ quy trình</Link></li>
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu('hethong')} className="w-full text-left font-semibold">
            ⚙️ Hệ thống
          </button>
          {openMenu === 'hethong' && (
            <ul className="ml-4 text-sm mt-2 space-y-1">
              <li><Link href="/admin/benhnhan">Quản lý bệnh nhân</Link></li>
              <li><Link href="/admin/taikhoan">Tài khoản người dùng</Link></li>
              <li><Link href="/admin/thongke">Thống kê & Báo cáo</Link></li>
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
