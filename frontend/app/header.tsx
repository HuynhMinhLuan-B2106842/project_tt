    import Link from "next/link"
    import { Button } from "@/app/components/ui/button"
    import { Stethoscope } from "lucide-react"

    export default function Header() {
        return (
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-6 w-6 text-blue-600" />
                        <span className="text-xl font-bold text-blue-800">Phòng Khám Đa Khoa</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-blue-900 font-medium hover:text-blue-600">Trang chủ</Link>
                        <Link href="/quy-trinh" className="text-blue-900 font-medium hover:text-blue-600">Quy trình khám</Link>
                        <Link href="/dich-vu" className="text-blue-900 font-medium hover:text-blue-600">Dịch vụ</Link>
                        <Link href="/bac-si" className="text-blue-900 font-medium hover:text-blue-600">Đội ngũ bác sĩ</Link>
                        <Link href="/lien-he" className="text-blue-900 font-medium hover:text-blue-600">Liên hệ</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="hidden md:flex">Đăng nhập</Button>
                        <Button asChild>
                            <Link href="/benhnhan/yeucau">Đặt lịch khám</Link>
                        </Button>
                    </div>
                </div>
            </header>
        )
    }
