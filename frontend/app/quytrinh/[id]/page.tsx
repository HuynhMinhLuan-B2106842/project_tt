"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
export default function XemQuyTrinhPage() {
    const params = useParams();
    const [quyTrinh, setQuyTrinh] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuyTrinh = async () => {
            try {
                const res = await fetch(`http://localhost:9000/api/quytrinh/${params.id}`);
                if (!res.ok) throw new Error("Không thể lấy dữ liệu quy trình");
                const data = await res.json();
                setQuyTrinh(data);
            } catch (err) {
                console.error("Lỗi khi lấy quy trình:", err);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) fetchQuyTrinh();
    }, [params.id]);

    const formatDateTime = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleString("vi-VN");
    };

    return (
        <>
            <Header />
            <main className="max-w-5xl mx-auto px-6 py-10 min-h-[80vh]">
                <h1 className="text-3xl font-bold text-center mb-10 text-blue-900">
                    Chi tiết quy trình khám bệnh
                </h1>

                {loading ? (
                    <p className="text-center">Đang tải dữ liệu...</p>
                ) : !quyTrinh ? (
                    <p className="text-center">Không tìm thấy quy trình</p>
                ) : (
                    <div className="space-y-10">
                        {/* Thông tin chung */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-blue-800">Thông tin chung</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    <div>
                                        <p className="font-semibold text-gray-700">Tên quy trình</p>
                                        <p className="text-lg">{quyTrinh.ten}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700">Ngày bắt đầu</p>
                                                <p className="text-lg"> {new Date(quyTrinh.lanKhamId?.ngay_kham).toLocaleDateString("vi-VN")}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700">Trạng thái</p>
                                        <p className="text-lg">
                                            {quyTrinh.trangThai === "hoan_thanh"
                                                ? "Hoàn thành"
                                                : quyTrinh.trangThai === "dang_xu_ly"
                                                    ? "Đang xử lý"
                                                    : "Chờ xử lý"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Các bước nằm ngang */}
                        <div className="overflow-x-auto">
                            <div className="flex items-center justify-between w-full relative">
                                {quyTrinh.cacBuoc.map((buoc: any, index: number) => {
                                    const isDone = buoc.trangThai === "hoan_thanh";
                                    const isCurrent = buoc.trangThai === "dang_xu_ly";
                                    const isFirst = index === 0;
                                    const isLast = index === quyTrinh.cacBuoc.length - 1;

                                    return (
                                        <div key={buoc._id} className="flex-1 flex flex-col items-center relative min-w-[120px]">
                                            {!isFirst && (
                                                <div className="absolute top-6 left-0 w-1/2 h-1 bg-gray-300 z-0" />
                                            )}
                                            {!isLast && (
                                                <div className="absolute top-6 right-0 w-1/2 h-1 bg-gray-300 z-0" />
                                            )}
                                            <div
                                                className={`z-10 flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg ${isDone
                                                    ? "bg-green-500"
                                                    : isCurrent
                                                        ? "bg-orange-500"
                                                        : "bg-gray-400"                                                    }`}
                                            >
                                                {index + 1}
                                            </div>
                                            <p className="mt-2 text-center text-sm font-medium w-28">
                                                {buoc.tenBuoc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Thông tin chi tiết từng bước */}
                        <div className="space-y-6">
                            {quyTrinh.cacBuoc.map((buoc: any, index: number) => (
                                <div key={buoc._id} className="border rounded-lg p-4 shadow-sm">
                                    <p className="font-medium mb-1">
                                        Bước {index + 1}: {buoc.tenBuoc}
                                    </p>
                                    <p className="text-sm mb-1">
                                        Trạng thái:{" "}
                                        {(() => {
                                            switch (buoc.trangThai) {
                                                case "cho_xu_ly":
                                                    return "Chờ xử lý";
                                                case "dang_xu_ly":
                                                    return "Đang xử lý";
                                                case "hoan_thanh":
                                                    return "Hoàn thành";
                                                case "bo_qua":
                                                    return "Bỏ qua";
                                                default:
                                                    return buoc.trangThai;
                                            }
                                        })()}
                                    </p>
                                    {buoc.nguoiThucHien && (
                                        <p className="text-sm mb-1">
                                            Người thực hiện: {buoc.nguoiThucHien}
                                        </p>
                                    )}
                                    {buoc.thoiGianHoanThanh && (
                                        <p className="text-sm mb-1">
                                            Hoàn thành: {formatDateTime(buoc.thoiGianHoanThanh)}
                                        </p>
                                    )}
                                    {buoc.ghiChu && (
                                        <p className="text-sm italic text-gray-600">
                                            Ghi chú: {buoc.ghiChu}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
