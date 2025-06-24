"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ArrowBigLeft, FileText, User, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/app/hooks/use-toast";

// Define TypeScript interfaces
interface Buoc {
  maBuoc: string;
  tenBuoc: string;
  trangThai: "cho_xu_ly" | "dang_xu_ly" | "hoan_thanh" | "bo_qua";
  nguoiThucHien?: string;
  ghiChu?: string;
  thoiGianHoanThanh?: string;
}

interface BenhNhan {
  _id: string;
  ho_ten: string;
}
interface LanKham {
  _id: string;
  maBenhNhan: BenhNhan;
}
interface Diagram {
  _id: string;
  name: string;
  xml?: string;
}

interface QuyTrinh {
  diagramId: Diagram | string;
  _id: string;
  ten: string;
  lanKhamId: LanKham;
  ngayBatDau: string;
  buocHienTai: string;
  trangThai: "cho_xu_ly" | "dang_xu_ly" | "hoan_thanh";
  cacBuoc: Buoc[];
}

export default function WorkflowManagement() {
  const [quyTrinhs, setQuyTrinhs] = useState<QuyTrinh[]>([]);
  const router = useRouter();

  useEffect(() => {
    const layDanhSachQuyTrinh = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/quytrinh");
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách quy trình");
        const data = await response.json();
        setQuyTrinhs(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách quy trình:", err);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách quy trình",
          variant: "destructive",
        });
      }
    };
    layDanhSachQuyTrinh();
  }, []);

  const getStatusBadgeClass = (trangThai: string) => {
    switch (trangThai) {
      case "dang_xu_ly":
        return "bg-blue-100 text-blue-800";
      case "hoan_thanh":
        return "bg-green-100 text-green-800";
      case "cho_xu_ly":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleBack = () => {
    router.push("/admin");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý quy trình khám bệnh</h1>
        <Button onClick={handleBack}>
          <ArrowBigLeft className="mr-2 h-8 w-8" />
          <h1 className="text font-bold">Quay lại</h1>
        </Button>
      </div>

      <div className="grid gap-6">
        {quyTrinhs.map((quyTrinh) => {
          const benhNhan = quyTrinh.lanKhamId?.maBenhNhan;

          return (
            <Card key={quyTrinh._id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{quyTrinh.ten}</CardTitle>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      quyTrinh.trangThai
                    )}`}
                  >
                    {quyTrinh.trangThai === "dang_xu_ly"
                      ? "Đang xử lý"
                      : "Hoàn thành"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4 items-start">
                  {/* Cột thông tin (chiếm 3/4) */}
                  <div className="col-span-3 grid md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-1000 mr-2" />
                      <div>
                        <p className="text-bg font-medium">Bệnh nhân</p>
                        <p className="text-sm text-gray-600">
                          {benhNhan?.ho_ten}
                        </p>
                        <p className="text-sm text-gray-600">
                          ({benhNhan?._id})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Ngày bắt đầu</p>
                        <p className="text-sm text-gray-600">
                          {new Date(quyTrinh.ngayBatDau).toLocaleDateString(
                            "vi-VN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">
                          {typeof quyTrinh.diagramId === "object" &&
                          "name" in quyTrinh.diagramId
                            ? quyTrinh.diagramId.name
                            : "Chưa gắn quy trình"}
                        </p>
                        {typeof quyTrinh.diagramId === "object" &&
                          "name" in quyTrinh.diagramId && (
                            <p className="text-sm text-gray-600">
                              {quyTrinh.buocHienTai === "completed"
                                ? "Hoàn thành"
                                : quyTrinh.cacBuoc.find(
                                    (b) => b.maBuoc === quyTrinh.buocHienTai
                                  )?.tenBuoc || "Hoàn thành"}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center gap-2  ">
                    <Button
                      onClick={() => {
                        if (quyTrinh._id) {
                          const diagramId =
                            typeof quyTrinh.diagramId === "object" &&
                            quyTrinh.diagramId?._id
                              ? `&diagramId=${quyTrinh.diagramId._id}`
                              : "";

                          router.push(
                            `/admin/workflow/new?quyTrinhId=${quyTrinh._id}${diagramId}`
                          );
                        } else {
                          toast({
                            title: "Thiếu thông tin",
                            description: "Không thể gán quy trình vì thiếu ID",
                            variant: "destructive",
                          });
                        }
                      }}
                      variant="outline"
                      className="w-40 hover:bg-gray-300 hover:text-gray-900"
                    >
                      Gán quy trình
                    </Button>

                    <Link href={`/admin/workflow/${quyTrinh._id}`}>
                      <Button
                        variant="outline"
                        className="w-40 hover:bg-gray-300 hover:text-gray-900"
                      >
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
