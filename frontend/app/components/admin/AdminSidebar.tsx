'use client';
import Link from 'next/link';
import { useState } from 'react';
import './sidebar.css'; // global CSS

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]); 

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev =>
      prev.includes(menu)
        ? prev.filter(m => m !== menu) 
        : [...prev, menu]            
    );
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebarHeading">Quản trị hệ thống</h2>

      <nav className="nav">  
        <div>
          <button onClick={() => toggleMenu('hoso')} className="menuTitle">
            🗂️ Hồ sơ khám bệnh
          </button>
          {openMenus.includes('hoso') && (
            <ul className="subMenu">
              <li><Link href="/admin?section=benhnhan" className="subMenuItem">Danh sách bệnh nhân</Link></li>
              <li><Link href="/admin?section=yeucau" className="subMenuItem">Yêu cầu khám</Link></li>
              <li><Link href="/admin?section=workflow" className="subMenuItem">Lần khám</Link></li>
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu('quytrinh')} className="menuTitle">
            🔁 Mẫu và sơ đồ quy trình
          </button>
          {openMenus.includes('quytrinh') && (
            <ul className="subMenu">
              <li><Link href="/admin/bpmn" className="subMenuItem">Mẫu quy trình</Link></li>
              <li><Link href="/admin/quytrinh" className="subMenuItem">Sơ đồ quy trình</Link></li>
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu('hethong')} className="menuTitle">
            ⚙️ Hệ thống
          </button>
          {openMenus.includes('hethong') && (
            <ul className="subMenu">
              <li><Link href="/admin?section=taikhoan" className="subMenuItem">Tài khoản người dùng</Link></li>
              <li><Link href="/admin/thongke" className="subMenuItem">Thống kê & Báo cáo</Link></li>
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
