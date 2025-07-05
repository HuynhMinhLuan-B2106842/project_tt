import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import ProcessDiagram from "../components/ProcessDiagram";
import Header from "../components/Header";
import Link from "next/link";

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Quy trình khám bệnh
          </h1>
          <p className="text-gray-600 mb-8">
            Quy trình khám bệnh tại phòng khám đa khoa của chúng tôi được thiết
            kế để đảm bảo hiệu quả và tiện lợi cho bệnh nhân. Dưới đây là các
            bước chi tiết trong quy trình khám bệnh.
          </p>

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 ">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="diagram">Sơ đồ quy trình</TabsTrigger>
              <TabsTrigger value="steps">Các bước chi tiết</TabsTrigger>
              <TabsTrigger value="faq">Câu hỏi thường gặp</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">
                    Tổng quan quy trình
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Quy trình khám bệnh tại phòng khám đa khoa của chúng tôi
                    được thiết kế để tối ưu hóa trải nghiệm của bệnh nhân, giảm
                    thiểu thời gian chờ đợi và đảm bảo chất lượng dịch vụ y tế.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Từ khi đặt lịch đến khi nhận kết quả và đơn thuốc, mỗi bước
                    trong quy trình đều được theo dõi và quản lý chặt chẽ bởi
                    đội ngũ nhân viên chuyên nghiệp.
                  </p>
                  <div className="flex flex-col gap-3 mt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <span>Đặt lịch trực tuyến hoặc qua điện thoại</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <span>Thời gian chờ đợi tối thiểu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <span>Đội ngũ y bác sĩ chuyên nghiệp</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <span>Trang thiết bị hiện đại</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <span>Kết quả nhanh chóng và chính xác</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-auto">
                  <img
                    src="https://i.pinimg.com/1200x/8f/58/ef/8f58ef2f691fdbcd11151fe40ae16048.jpg"
                    alt="Quy trình khám bệnh"
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="diagram" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sơ đồ quy trình khám bệnh</CardTitle>
                  <CardDescription>
                    Sơ đồ trực quan về các bước trong quy trình khám bệnh tại
                    phòng khám đa khoa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProcessDiagram />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="steps" className="mt-6">
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Đặt lịch khám",
                    icon: <Calendar className="h-10 w-10 text-blue-600" />,
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
                    icon: <Users className="h-10 w-10 text-blue-600" />,
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
                    icon: <Stethoscope className="h-10 w-10 text-blue-600" />,
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
                    icon: <FileText className="h-10 w-10 text-blue-600" />,
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
                    icon: <FileText className="h-10 w-10 text-blue-600" />,
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
                    icon: <Clock className="h-10 w-10 text-blue-600" />,
                    description:
                      "Bệnh nhân mang đơn thuốc và phiếu thanh toán đến quầy thu ngân để thanh toán chi phí khám và thuốc. Sau đó, bệnh nhân nhận thuốc tại quầy dược.",
                    details: [
                      "Thanh toán chi phí khám và thuốc tại quầy thu ngân",
                      "Nhận thuốc tại quầy dược",
                      "Nhận hướng dẫn tái khám (nếu có)",
                    ],
                  },
                ].map((item) => (
                  <Card key={item.step} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-blue-50 p-6 flex items-center justify-center md:w-1/4">
                        <div className="text-center">
                          <div className="mx-auto bg-white rounded-full p-4 shadow-sm mb-3">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-blue-800">
                            Bước {item.step}
                          </h3>
                          <p className="font-medium">{item.title}</p>
                        </div>
                      </div>
                      <CardContent className="p-6 md:w-3/4">
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <ul className="space-y-2">
                          {item.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Câu hỏi thường gặp về quy trình khám bệnh
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        question:
                          "Tôi có cần đặt lịch trước khi đến khám không?",
                        answer:
                          "Chúng tôi khuyến khích bệnh nhân đặt lịch trước để giảm thời gian chờ đợi và được phục vụ tốt hơn. Tuy nhiên, phòng khám vẫn tiếp nhận bệnh nhân đến khám trực tiếp mà không cần đặt lịch trước.",
                      },
                      {
                        question:
                          "Tôi cần mang theo những giấy tờ gì khi đến khám?",
                        answer:
                          "Bạn cần mang theo CMND/CCCD, thẻ BHYT (nếu có), và các kết quả xét nghiệm, chẩn đoán hình ảnh trước đây (nếu có) liên quan đến tình trạng bệnh.",
                      },
                      {
                        question:
                          "Thời gian chờ đợi kết quả xét nghiệm là bao lâu?",
                        answer:
                          "Thời gian chờ đợi kết quả xét nghiệm phụ thuộc vào loại xét nghiệm. Các xét nghiệm cơ bản thường có kết quả trong vòng 30 phút đến 1 giờ. Một số xét nghiệm đặc biệt có thể mất 1-2 ngày.",
                      },
                      {
                        question:
                          "Tôi có thể thanh toán bằng những hình thức nào?",
                        answer:
                          "Phòng khám chấp nhận thanh toán bằng tiền mặt, thẻ ngân hàng (ATM, Visa, Mastercard), và các ví điện tử phổ biến như MoMo, ZaloPay, VNPay.",
                      },
                      {
                        question:
                          "Làm thế nào để tôi có thể xem lại kết quả khám sau này?",
                        answer:
                          "Bạn có thể xem lại kết quả khám bệnh thông qua ứng dụng di động hoặc website của phòng khám bằng tài khoản cá nhân. Ngoài ra, bạn cũng có thể liên hệ trực tiếp với phòng khám để nhận bản sao kết quả.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                      >
                        <h3 className="font-bold text-blue-800 mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Đặt lịch khám ngay
            </h2>
            <p className="text-gray-600 mb-4">
              Để tiết kiệm thời gian và được phục vụ tốt nhất, hãy đặt lịch khám
              trước qua website hoặc gọi điện thoại.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              >
                <Link href="/benhnhan/yeucau">Đặt lịch trực tuyến</Link>
              </Button>
              <Button size="lg" variant="outline">
                Gọi 0123 456 789
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Phòng Khám Đa Khoa. Tất cả các
            quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
}
