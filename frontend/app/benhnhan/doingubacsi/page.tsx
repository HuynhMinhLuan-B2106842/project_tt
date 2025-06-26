/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/footer";

interface BacSi {
  hoTen: string;
  ngaySinh: string;
  chucVu: string;
  chuyenKhoa: string;
  avatar: string; // URL ảnh đại diện
}

const bacSiList: BacSi[] = [
  {
    hoTen: "BS. Bùi Thanh Tú",
    ngaySinh: "1980-05-20",
    chucVu: "Trưởng khoa Nội",
    chuyenKhoa: "Nội tổng quát",
    avatar: "/bacsiTu.jpg",
  },
  {
    hoTen: "BS. Nguyễn Trần Diễm Quỳnh",
    ngaySinh: "1985-08-15",
    chucVu: "Bác sĩ điều trị",
    chuyenKhoa: "Sản phụ khoa",
    avatar: "/bacsiQuynh.jpg",
  },
  {
    hoTen: "BS. Trần Văn Sang",
    ngaySinh: "1975-12-02",
    chucVu: "Trưởng khoa Ngoại",
    chuyenKhoa: "Ngoại tổng quát",
    avatar: "/bacsiSang.jpg",
  },
  {
    hoTen: "BS. Nguyễn Thị Kim Ngân",
    ngaySinh: "1990-03-10",
    chucVu: "Bác sĩ chẩn đoán",
    chuyenKhoa: "Chẩn đoán hình ảnh",
    avatar: "/bacsiNgan.jpg",
  },
  {
    hoTen: "BS. Huỳnh Minh Luân",
    ngaySinh: "1992-04-11",
    chucVu: "Bác sĩ chẩn đoán",
    chuyenKhoa: "Chẩn đoán hình ảnh",
    avatar: "/bacsiLuan.jpg",
  },
];

export default function BacSiPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Đội ngũ bác sĩ
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bacSiList.map((bs, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center border"
            >
              <img
                src={bs.avatar}
                alt={`Ảnh của ${bs.hoTen}`}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border"
              />
              <h2 className="text-xl font-semibold text-blue-700">
                {bs.hoTen}
              </h2>
              <p className="text-gray-600 text-sm mb-1">
                Ngày sinh: {bs.ngaySinh}
              </p>
              <p className="text-gray-700 font-medium">{bs.chucVu}</p>
              <p className="text-blue-600">{bs.chuyenKhoa}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
