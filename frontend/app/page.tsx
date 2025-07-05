import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  FileText,
  Stethoscope,
  Users,
} from "lucide-react";
import ChatBox from "./components/ChatBox";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                Chăm sóc sức khỏe chất lượng cao cho mọi người
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Phòng khám đa khoa của chúng tôi cung cấp dịch vụ y tế toàn diện
                với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="/benhnhan/yeucau">Đặt lịch khám ngay</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/benhvien.png"
                alt="Phòng khám đa khoa"
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Quy trình khám bệnh
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quy trình khám bệnh tại phòng khám đa khoa của chúng tôi được
                thiết kế để đảm bảo hiệu quả và tiện lợi cho bệnh nhân.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Calendar className="h-10 w-10 text-blue-600" />,
                  title: "Đặt lịch khám",
                  description: "Đặt lịch trực tuyến hoặc qua điện thoại",
                },
                {
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  title: "Tiếp đón",
                  description: "Nhân viên tiếp đón và hướng dẫn thủ tục",
                },
                {
                  icon: <Stethoscope className="h-10 w-10 text-blue-600" />,
                  title: "Khám bệnh",
                  description: "Bác sĩ khám và tư vấn điều trị",
                },
                {
                  icon: <FileText className="h-10 w-10 text-blue-600" />,
                  title: "Kết luận",
                  description: "Nhận kết quả và đơn thuốc",
                },
              ].map((step, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto bg-blue-50 p-4 rounded-full mb-4">
                      {step.icon}
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild>
                <Link href="/quytrinh" className="flex items-center gap-2">
                  Xem chi tiết quy trình <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Dịch vụ y tế
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Chúng tôi cung cấp nhiều dịch vụ y tế chất lượng cao để đáp ứng
                nhu cầu chăm sóc sức khỏe của bạn.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Khám tổng quát",
                "Khám chuyên khoa",
                "Xét nghiệm",
                "Chẩn đoán hình ảnh",
                "Tiêm chủng",
                "Tư vấn dinh dưỡng",
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{service}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Dịch vụ chất lượng cao với đội ngũ y bác sĩ chuyên nghiệp
                      và trang thiết bị hiện đại.
                    </CardDescription>
                    <Button
                      variant="link"
                      className="p-0 mt-4 flex items-center gap-1"
                    >
                      Chi tiết <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Phòng Khám Đa Khoa
              </h3>
              <p className="text-blue-200">
                Chăm sóc sức khỏe chất lượng cao với đội ngũ y bác sĩ chuyên
                nghiệp.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-blue-200">
                <li>11 Phan Đình Phùng, phường Ninh Kiều,Tp. Cần Thơ</li>
                <li>Email: info@phongkhamdakhoa.vn</li>
                <li>Điện thoại: 0123 456 789</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Giờ làm việc</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Thứ 2 - Thứ 6: 7:30 - 17:30</li>
                <li>Thứ 7: 7:30 - 12:00</li>
                <li>Chủ nhật: Nghỉ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Theo dõi</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-blue-800 p-2 rounded-full hover:bg-blue-700"
                >
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>
              &copy; {new Date().getFullYear()} Phòng Khám Đa Khoa. Tất cả các
              quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Box */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBox />
      </div>
    </div>
  );
}
