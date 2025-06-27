"use client";

import { useEffect, useState } from "react";
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
  dien_thoai: string;
}

interface LanKham {
  _id: string;
  maBenhNhan: BenhNhan;
  ngay_kham: string;
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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("tat_ca");
  const [sortOption, setSortOption] = useState("ngay_moi_nhat");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const removeVietnameseTones = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/quytrinh");
        const data = await res.json();
        setQuyTrinhs(data);
      } catch (err) {
        console.error(err);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách quy trình",
          variant: "destructive",
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, filterStatus, sortOption]);

  const processedQuyTrinhs = quyTrinhs
    .filter((q) => {
      const benhNhan = q.lanKhamId?.maBenhNhan;
      const hoTen = benhNhan?.ho_ten || "";
      console.log("BenhNhan", q.lanKhamId?.maBenhNhan);
      const dienThoai = benhNhan?.dien_thoai || "";

      const keyword = searchKeyword.trim().toLowerCase();
      const keywordNoDiacritics = removeVietnameseTones(keyword).replace(/\s+/g, "");
      const keywordDigitsOnly = keyword.replace(/\D/g, ""); // Chỉ lấy số

      const hoTenNoDiacritics = removeVietnameseTones(hoTen.toLowerCase()).replace(/\s+/g, "");
      const phoneDigitsOnly = dienThoai.replace(/\D/g, ""); // Chỉ lấy số

      const matchName = hoTenNoDiacritics.includes(keywordNoDiacritics);
      const matchPhone = keywordDigitsOnly !== "" && phoneDigitsOnly.includes(keywordDigitsOnly);
      console.log({
        keyword,
        keywordDigitsOnly,
        dienThoai,
        phoneDigitsOnly,
        matchPhone,
      });
      
      const isChuaGan =
        !q.diagramId ||
        (typeof q.diagramId === "object" && Object.keys(q.diagramId).length === 0);

      const matchStatus =
        filterStatus === "tat_ca"
          ? true
          : filterStatus === "chua_gan"
            ? isChuaGan
            : q.trangThai === filterStatus;

      return (matchName || matchPhone) && matchStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.ngayBatDau).getTime();
      const dateB = new Date(b.ngayBatDau).getTime();
      const nameA = a.lanKhamId?.maBenhNhan?.ho_ten || "";
      const nameB = b.lanKhamId?.maBenhNhan?.ho_ten || "";
      switch (sortOption) {
        case "ngay_moi_nhat":
          return dateB - dateA;
        case "ngay_cu_nhat":
          return dateA - dateB;
        case "ten_a_z":
          return nameA.localeCompare(nameB);
        case "ten_z_a":
          return nameB.localeCompare(nameA);
        default:
          return 0;
      }
    });

  const totalItems = processedQuyTrinhs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedQuyTrinhs = processedQuyTrinhs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý lần khám - quy trình khám bệnh</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm theo tên hoặc số điện thoại..."
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
        >
          <option value="tat_ca">Tất cả trạng thái</option>
          <option value="chua_gan">Chưa gán quy trình</option>
          <option value="cho_xu_ly">Chờ xử lý</option>
          <option value="dang_xu_ly">Đang xử lý</option>
          <option value="hoan_thanh">Hoàn thành</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-md px-4 py-2 w-full md:w-1/3"
        >
          <option value="ngay_moi_nhat">Ngày bắt đầu: Mới nhất</option>
          <option value="ngay_cu_nhat">Ngày bắt đầu: Cũ nhất</option>
          <option value="ten_a_z">Tên bệnh nhân: A → Z</option>
          <option value="ten_z_a">Tên bệnh nhân: Z → A</option>
        </select>
      </div>

      <div className="grid gap-6">
        {displayedQuyTrinhs.map((quyTrinh) => {
          const benhNhan = quyTrinh.lanKhamId?.maBenhNhan;
          return (
            <Card key={quyTrinh._id}>
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle>{quyTrinh.ten}</CardTitle>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      quyTrinh.trangThai
                    )}`}
                  >
                    {quyTrinh.trangThai === "dang_xu_ly"
                      ? "Đang xử lý"
                      : quyTrinh.trangThai === "cho_xu_ly"
                        ? "Chờ xử lý"
                        : "Hoàn thành"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6 grid md:grid-cols-4 gap-4 items-start">
                <div className="col-span-3 grid md:grid-cols-3 gap-4">
                  <div>
                    <User className="h-5 w-5 text-gray-500 mb-1" />
                    <p className="text-sm font-medium">Bệnh nhân</p>
                    <p className="text-sm text-gray-600">{benhNhan?.ho_ten}</p>
                    <p className="text-sm text-gray-600">({benhNhan?._id})</p>
                  </div>
                  <div>
                    <Clock className="h-5 w-5 text-gray-500 mb-1" />
                    <p className="text-sm font-medium">Ngày bắt đầu</p>
                    <p className="text-sm text-gray-600">
                      {new Date(quyTrinh.lanKhamId?.ngay_kham).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div>
                    <FileText className="h-5 w-5 text-gray-500 mb-1" />
                    <p className="text-sm font-medium">
                      {typeof quyTrinh.diagramId === "object" &&
                        "name" in quyTrinh.diagramId ? (
                        quyTrinh.diagramId.name
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Chưa gán quy trình
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {quyTrinh.cacBuoc.find(
                        (b) => b.maBuoc === quyTrinh.buocHienTai
                      )?.tenBuoc || "Hoàn thành"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center gap-2">
                  <Button
                    variant="outline"
                    className="w-40"
                    onClick={() => {
                      const diagramId =
                        typeof quyTrinh.diagramId === "object"
                          ? `&diagramId=${quyTrinh.diagramId._id}`
                          : "";
                      router.push(
                        `/admin/workflow/new?quyTrinhId=${quyTrinh._id}${diagramId}`
                      );
                    }}
                  >
                    Gán quy trình
                  </Button>
                  <Link href={`/admin/workflow/${quyTrinh._id}`}>
                    <Button variant="outline" className="w-40">
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          variant="outline"
        >
          Trang trước
        </Button>
        <span className="px-3 py-1 rounded text-gray-700">
          Trang {currentPage} / {totalPages || 1}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          variant="outline"
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
}
