"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/footer";

const dichVuList = [
  {
    tieuDe: "Khám tổng quát",
    moTa: "Đánh giá toàn diện sức khỏe, phát hiện sớm các vấn đề tiềm ẩn.",
    icon: "🩺",
  },
  {
    tieuDe: "Xét nghiệm máu",
    moTa: "Kiểm tra các chỉ số huyết học để phát hiện bệnh lý tiềm ẩn.",
    icon: "🧪",
  },
  {
    tieuDe: "Chẩn đoán hình ảnh",
    moTa: "Dịch vụ siêu âm, X-quang, CT scan với thiết bị hiện đại.",
    icon: "🖼️",
  },
  {
    tieuDe: "Khám chuyên khoa",
    moTa: "Tư vấn và điều trị từ các bác sĩ chuyên khoa có kinh nghiệm.",
    icon: "👨‍⚕️",
  },
  {
    tieuDe: "Tiêm ngừa",
    moTa: "Cung cấp các loại vắc-xin an toàn cho mọi độ tuổi.",
    icon: "💉",
  },
  {
    tieuDe: "Khám sức khỏe định kỳ",
    moTa: "Theo dõi tình trạng sức khỏe hàng năm theo tiêu chuẩn y tế.",
    icon: "📋",
  },
];

export default function DichVuPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Dịch vụ tại Phòng Khám
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dichVuList.map((dv, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100"
            >
              <div className="text-4xl mb-4 text-blue-500">{dv.icon}</div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {dv.tieuDe}
              </h2>
              <p className="text-gray-600">{dv.moTa}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
