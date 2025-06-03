// app/admin/page.tsx
import AdminLayout from "@/app/components/layout/AdminLayout";

export default function AdminHome() {
  return (
    <AdminLayout className="text-black" >
      <h1 className="text-2xl font-bold">Chào mừng đến trang quản trị!</h1>
      <p>Đây là nội dung bên trong layout admin.</p>
    </AdminLayout>
  );
}
