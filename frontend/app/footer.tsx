import { Stethoscope } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Stethoscope className="h-5 w-5" />
                            Phòng Khám Đa Khoa
                        </h3>
                        <p className="text-blue-200">Chăm sóc sức khỏe chất lượng cao với đội ngũ y bác sĩ chuyên nghiệp.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Liên hệ</h4>
                        <ul className="space-y-2 text-blue-200">
                            <li>123 Đường Khám Bệnh, Quận Y Tế</li>
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
                        <p className="text-blue-200">Facebook / Instagram</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
