import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Stethoscope,
  Users,
  Phone,
  MapPin,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../components/ui/button"
import ProcessDiagram from "../components/ProcessDiagram"
import BpmnModeler from "../components/BpmnModeler"

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-800">Phòng Khám Đa Khoa</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <Link href="/quy-trinh" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
              Quy trình khám
            </Link>
            <Link href="/dich-vu" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Dịch vụ
            </Link>
            <Link href="/bac-si" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Đội ngũ bác sĩ
            </Link>
            <Link href="/lien-he" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
              Liên hệ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden md:flex border-blue-600 text-blue-600 hover:bg-blue-50">
              Đăng nhập
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Đặt lịch khám</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Quy trình khám bệnh</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Quy trình khám bệnh tại phòng khám đa khoa của chúng tôi được thiết kế để đảm bảo hiệu quả, tiện lợi và chất
            lượng dịch vụ y tế tốt nhất cho bệnh nhân.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white shadow-sm border">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Tổng quan
              </TabsTrigger>
              <TabsTrigger value="diagram" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Sơ đồ quy trình
              </TabsTrigger>
              <TabsTrigger value="steps" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Các bước chi tiết
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Câu hỏi thường gặp
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-6">Tổng quan quy trình</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Quy trình khám bệnh tại phòng khám đa khoa của chúng tôi được thiết kế để tối ưu hóa trải nghiệm của
                    bệnh nhân, giảm thiểu thời gian chờ đợi và đảm bảo chất lượng dịch vụ y tế.
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Từ khi đặt lịch đến khi nhận kết quả và đơn thuốc, mỗi bước trong quy trình đều được theo dõi và
                    quản lý chặt chẽ bởi đội ngũ nhân viên chuyên nghiệp.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Đặt lịch trực tuyến hoặc qua điện thoại",
                      "Thời gian chờ đợi tối thiểu",
                      "Đội ngũ y bác sĩ chuyên nghiệp",
                      "Trang thiết bị hiện đại",
                      "Kết quả nhanh chóng và chính xác",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="text-green-500 h-6 w-6 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-full flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Quy trình khám bệnh"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="diagram" className="mt-8">
              <div className="space-y-8">
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="text-2xl">Sơ đồ quy trình khám bệnh</CardTitle>
                    <CardDescription className="text-blue-100">
                      Sơ đồ trực quan về các bước trong quy trình khám bệnh tại phòng khám đa khoa
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ProcessDiagram />
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <BpmnModeler />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="steps" className="mt-8">
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Đặt lịch khám",
                    icon: <Calendar className="h-12 w-12 text-blue-600" />,
                    color: "from-blue-500 to-blue-600",
                    description:
                      "Bệnh nhân có thể đặt lịch khám trực tuyến thông qua website, ứng dụng di động hoặc gọi điện thoại đến số hotline của phòng khám. Khi đặt lịch, bệnh nhân cần cung cấp thông tin cá nhân, lý do khám và thời gian mong muốn.",
                    details: [
                      "Đặt lịch trực tuyến qua website hoặc ứng dụng",
                      "Đặt lịch qua điện thoại: 0123 456 789",
                      "Nhận xác nhận lịch hẹn qua SMS hoặc email",
                    ],
                  },
                  {
                    step: 2,
                    title: "Tiếp đón và đăng ký",
                    icon: <Users className="h-12 w-12 text-green-600" />,
                    color: "from-green-500 to-green-600",
                    description:
                      "Khi đến phòng khám theo lịch hẹn, bệnh nhân sẽ được nhân viên lễ tân tiếp đón và hướng dẫn làm thủ tục đăng ký. Bệnh nhân cần xuất trình CMND/CCCD và thẻ BHYT (nếu có).",
                    details: [
                      "Xuất trình giấy tờ tùy thân và thẻ BHYT (nếu có)",
                      "Điền thông tin vào phiếu đăng ký khám bệnh",
                      "Nhận số thứ tự và hướng dẫn quy trình khám",
                    ],
                  },
                  {
                    step: 3,
                    title: "Khám bệnh",
                    icon: <Stethoscope className="h-12 w-12 text-purple-600" />,
                    color: "from-purple-500 to-purple-600",
                    description:
                      "Bệnh nhân sẽ được gọi vào phòng khám theo số thứ tự. Bác sĩ sẽ tiến hành khám, hỏi bệnh và tư vấn. Tùy theo tình trạng, bác sĩ có thể chỉ định các xét nghiệm cần thiết.",
                    details: [
                      "Bác sĩ thăm khám và hỏi bệnh",
                      "Tư vấn về tình trạng sức khỏe",
                      "Chỉ định xét nghiệm, chẩn đoán hình ảnh (nếu cần)",
                    ],
                  },
                  {
                    step: 4,
                    title: "Xét nghiệm và chẩn đoán hình ảnh",
                    icon: <FileText className="h-12 w-12 text-orange-600" />,
                    color: "from-orange-500 to-orange-600",
                    description:
                      "Nếu được chỉ định, bệnh nhân sẽ được hướng dẫn đến khu vực xét nghiệm hoặc chẩn đoán hình ảnh. Sau khi hoàn thành, bệnh nhân quay lại phòng khám để bác sĩ đánh giá kết quả.",
                    details: [
                      "Thực hiện các xét nghiệm theo chỉ định",
                      "Chụp X-quang, siêu âm, CT scan (nếu cần)",
                      "Chờ kết quả và quay lại phòng khám",
                    ],
                  },
                  {
                    step: 5,
                    title: "Kết luận và đơn thuốc",
                    icon: <FileText className="h-12 w-12 text-red-600" />,
                    color: "from-red-500 to-red-600",
                    description:
                      "Dựa trên kết quả khám và xét nghiệm, bác sĩ sẽ đưa ra chẩn đoán, kết luận và kê đơn thuốc. Bệnh nhân sẽ được tư vấn về cách điều trị và chăm sóc sức khỏe.",
                    details: [
                      "Bác sĩ đưa ra chẩn đoán và phương pháp điều trị",
                      "Kê đơn thuốc và hướng dẫn sử dụng",
                      "Tư vấn chế độ ăn uống và sinh hoạt",
                    ],
                  },
                  {
                    step: 6,
                    title: "Thanh toán và nhận thuốc",
                    icon: <Clock className="h-12 w-12 text-teal-600" />,
                    color: "from-teal-500 to-teal-600",
                    description:
                      "Bệnh nhân mang đơn thuốc và phiếu thanh toán đến quầy thu ngân để thanh toán chi phí khám và thuốc. Sau đó, bệnh nhân nhận thuốc tại quầy dược.",
                    details: [
                      "Thanh toán chi phí khám và thuốc tại quầy thu ngân",
                      "Nhận thuốc tại quầy dược",
                      "Nhận hướng dẫn tái khám (nếu có)",
                    ],
                  },
                ].map((item) => (
                  <Card key={item.step} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      <div className={`bg-gradient-to-br ${item.color} p-8 flex items-center justify-center lg:w-1/3`}>
                        <div className="text-center text-white">
                          <div className="mx-auto bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-lg mb-4">
                            {item.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Bước {item.step}</h3>
                          <p className="text-lg font-semibold">{item.title}</p>
                        </div>
                      </div>
                      <CardContent className="p-8 lg:w-2/3">
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">{item.description}</p>
                        <ul className="space-y-3">
                          {item.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <ArrowRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-8">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="text-2xl">Câu hỏi thường gặp về quy trình khám bệnh</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {[
                      {
                        question: "Tôi có cần đặt lịch trước khi đến khám không?",
                        answer:
                          "Chúng tôi khuyến khích bệnh nhân đặt lịch trước để giảm thời gian chờ đợi và được phục vụ tốt hơn. Tuy nhiên, phòng khám vẫn tiếp nhận bệnh nhân đến khám trực tiếp mà không cần đặt lịch trước.",
                      },
                      {
                        question: "Tôi cần mang theo những giấy tờ gì khi đến khám?",
                        answer:
                          "Bạn cần mang theo CMND/CCCD, thẻ BHYT (nếu có), và các kết quả xét nghiệm, chẩn đoán hình ảnh trước đây (nếu có) liên quan đến tình trạng bệnh.",
                      },
                      {
                        question: "Thời gian chờ đợi kết quả xét nghiệm là bao lâu?",
                        answer:
                          "Thời gian chờ đợi kết quả xét nghiệm phụ thuộc vào loại xét nghiệm. Các xét nghiệm cơ bản thường có kết quả trong vòng 30 phút đến 1 giờ. Một số xét nghiệm đặc biệt có thể mất 1-2 ngày.",
                      },
                      {
                        question: "Tôi có thể thanh toán bằng những hình thức nào?",
                        answer:
                          "Phòng khám chấp nhận thanh toán bằng tiền mặt, thẻ ngân hàng (ATM, Visa, Mastercard), và các ví điện tử phổ biến như MoMo, ZaloPay, VNPay.",
                      },
                      {
                        question: "Làm thế nào để tôi có thể xem lại kết quả khám sau này?",
                        answer:
                          "Bạn có thể xem lại kết quả khám bệnh thông qua ứng dụng di động hoặc website của phòng khám bằng tài khoản cá nhân. Ngoài ra, bạn cũng có thể liên hệ trực tiếp với phòng khám để nhận bản sao kết quả.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                        <h3 className="font-bold text-blue-800 mb-3 text-lg">{item.question}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-2xl shadow-xl text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Đặt lịch khám ngay</h2>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Để tiết kiệm thời gian và được phục vụ tốt nhất, hãy đặt lịch khám trước qua website hoặc gọi điện
                thoại.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  Đặt lịch trực tuyến
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Gọi 0123 456 789
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Phòng Khám Đa Khoa</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Chăm sóc sức khỏe chất lượng cao với đội ngũ y bác sĩ chuyên nghiệp và trang thiết bị hiện đại.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Liên hệ</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>123 Đường Khám Bệnh, Quận Y Tế</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span>info@phongkhamdakhoa.vn</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span>0123 456 789</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Giờ làm việc</h4>
              <div className="space-y-2 text-gray-400">
                <p>Thứ 2 - Thứ 6: 7:30 - 17:30</p>
                <p>Thứ 7: 7:30 - 12:00</p>
                <p>Chủ nhật: Nghỉ</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Phòng Khám Đa Khoa. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
