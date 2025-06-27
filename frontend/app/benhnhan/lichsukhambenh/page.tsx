"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

interface LanKham {
  _id: string;
  ngay_kham: string;
  trang_thai: "dang_kham" | "hoan_thanh" | "huy";
  ghi_chu?: string;
  ma_BN: { _id: string; ho_ten: string };
}

interface QuyTrinh {
  _id: string;
  ten: string;
  buocHienTai: string;
}

interface YeuCau {
  _id: string;
  ngay_muon_kham: string;
  chuyen_khoa: string;
  trieu_chung: string;
  trang_thai_YC: "cho_duyet" | "da_duyet" | "tu_choi";
  ly_do?: string;
}

export default function LichSuKhamPage() {
  const [lanKhams, setLanKhams] = useState<LanKham[]>([]);
  const [yeuCaus, setYeuCaus] = useState<YeuCau[]>([]);
  const [loading, setLoading] = useState(true);
  const [quyTrinhMap, setQuyTrinhMap] = useState<Record<string, QuyTrinh | null>>({});
  const [activeTab, setActiveTab] = useState<"cho_duyet" | "da_duyet" | "tu_choi">("cho_duyet");
  const [activeTabLichSu, setActiveTabLichSu] = useState<"dang_kham" | "hoan_thanh" | "huy">("dang_kham");
  const [showAllYeuCau, setShowAllYeuCau] = useState(false);
  const [showAllLichSu, setShowAllLichSu] = useState(false);

  const fetchQuyTrinhForLanKhams = async (lanKhams: LanKham[]) => {
    const map: Record<string, QuyTrinh | null> = {};
    await Promise.all(
      lanKhams.map(async (lk) => {
        try {
          const res = await fetch(`http://localhost:9000/api/quytrinh/by-lankham/${lk._id}`);
          map[lk._id] = res.ok ? await res.json() : null;
        } catch {
          map[lk._id] = null;
        }
      })
    );
    setQuyTrinhMap(map);
  };

  const fetchYeuCau = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:9000/api/yeucau/benhnhan/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setYeuCaus(await res.json());
    } catch (err) {
      console.error("Lỗi khi gọi API yêu cầu khám:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:9000/api/lankham/benhnhan/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: LanKham[] = await res.json();
        setLanKhams(data);
        await fetchQuyTrinhForLanKhams(data);
        await fetchYeuCau();
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Reset nút hiển thị tất cả khi đổi tab
  useEffect(() => {
    setShowAllYeuCau(false);
  }, [activeTab]);

  useEffect(() => {
    setShowAllLichSu(false);
  }, [activeTabLichSu]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("vi-VN");

  const formatTrangThaiYC = (trangThai: YeuCau["trang_thai_YC"]) => {
    switch (trangThai) {
      case "cho_duyet": return "Chờ duyệt";
      case "da_duyet": return "Đã duyệt";
      case "tu_choi": return "Từ chối";
      default: return trangThai;
    }
  };

  const formatTrangThai = (trangThai: LanKham["trang_thai"]) => {
    switch (trangThai) {
      case "dang_kham": return "Đang khám";
      case "hoan_thanh": return "Hoàn thành";
      case "huy": return "Đã huỷ";
      default: return trangThai;
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[80vh] bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Danh sách yêu cầu khám bệnh
          </h1>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-6 space-x-4">
            {(["cho_duyet", "da_duyet", "tu_choi"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md border ${
                  activeTab === tab
                    ? tab === "cho_duyet"
                      ? "text-yellow-600 bg-yellow-100 font-bold"
                      : tab === "da_duyet"
                      ? "text-green-600 bg-green-100 font-bold"
                      : "text-red-600 bg-red-100 font-bold"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                {tab === "cho_duyet" && "Chờ duyệt"}
                {tab === "da_duyet" && "Đã duyệt"}
                {tab === "tu_choi" && "Đã huỷ"}
              </button>
            ))}
          </div>

          {/* Nội dung từng tab */}
          {yeuCaus.filter((yc) => yc.trang_thai_YC === activeTab).length === 0 ? (
            <p className="text-center">Không có yêu cầu nào.</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {yeuCaus
                  .filter((yc) => yc.trang_thai_YC === activeTab)
                  .slice(0, showAllYeuCau ? undefined : 3)
                  .map((yc) => (
                    <Card key={yc._id} className="shadow-md">
                      <CardHeader>
                        <CardTitle
                          className={`${
                            activeTab === "cho_duyet"
                              ? "text-yellow-700"
                              : activeTab === "da_duyet"
                              ? "text-green-800"
                              : "text-red-700"
                          }`}
                        >
                          {yc.chuyen_khoa}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p><strong>Triệu chứng:</strong> {yc.trieu_chung}</p>
                        <p><strong>Ngày muốn khám:</strong> {formatDate(yc.ngay_muon_kham)}</p>
                        <p>
                          <strong>Trạng thái:</strong>{" "}
                          <span
                            className={`px-2 py-1 rounded-md text-sm font-medium ${
                              activeTab === "cho_duyet"
                                ? "text-yellow-600 bg-yellow-100"
                                : activeTab === "da_duyet"
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                            }`}
                          >
                            {formatTrangThaiYC(yc.trang_thai_YC)}
                          </span>
                        </p>
                        {yc.ly_do && <p><strong>Lý do:</strong> {yc.ly_do}</p>}
                      </CardContent>
                    </Card>
                  ))}
              </div>
              {yeuCaus.filter((yc) => yc.trang_thai_YC === activeTab).length > 3 && (
                <div className="text-center mb-8">
                  <button
                    onClick={() => setShowAllYeuCau(!showAllYeuCau)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    {showAllYeuCau ? "Thu gọn" : "Hiển thị tất cả"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Lịch sử khám */}
          <h1 className="text-3xl font-bold text-center text-blue-900 mt-16 mb-8">
            Lịch sử khám bệnh của bạn
          </h1>

          <div className="flex justify-center mb-6 space-x-4">
            {(["dang_kham", "hoan_thanh", "huy"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTabLichSu(tab)}
                className={`px-4 py-2 rounded-md border ${
                  activeTabLichSu === tab
                    ? tab === "dang_kham"
                      ? "text-blue-600 bg-blue-100 font-bold"
                      : tab === "hoan_thanh"
                      ? "text-green-600 bg-green-100 font-bold"
                      : "text-red-600 bg-red-100 font-bold"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                {tab === "dang_kham" && "Đang khám"}
                {tab === "hoan_thanh" && "Hoàn thành"}
                {tab === "huy" && "Đã huỷ"}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center">Đang tải dữ liệu...</p>
          ) : lanKhams.filter((lk) => lk.trang_thai === activeTabLichSu).length === 0 ? (
            <p className="text-center">Không có lần khám nào.</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lanKhams
                  .filter((item) => item.trang_thai === activeTabLichSu)
                  .slice(0, showAllLichSu ? undefined : 3)
                  .map((item) => (
                    <Card key={item._id} className="shadow-md">
                      <CardHeader>
                        <CardTitle className="text-blue-800">Lần khám</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p><strong>Ngày khám:</strong> {formatDate(item.ngay_kham)}</p>
                        <p><strong>Ghi chú:</strong> {item.ghi_chu || "Không có"}</p>
                        <p>
                          <strong>Trạng thái:</strong>{" "}
                          <span
                            className={`px-2 py-1 rounded-md text-sm font-medium ${
                              item.trang_thai === "dang_kham"
                                ? "text-blue-600 bg-blue-100"
                                : item.trang_thai === "hoan_thanh"
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                            }`}
                          >
                            {formatTrangThai(item.trang_thai)}
                          </span>
                        </p>
                        <p>
                          <strong>Quy trình:</strong>{" "}
                          {quyTrinhMap[item._id] ? (
                            <Link
                              href={`/quytrinh/${quyTrinhMap[item._id]!._id}`}
                              className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                            >
                              Xem quy trình <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          ) : (
                            <span className="text-gray-400 italic">Chưa có</span>
                          )}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              {lanKhams.filter((lk) => lk.trang_thai === activeTabLichSu).length > 3 && (
                <div className="text-center my-8">
                  <button
                    onClick={() => setShowAllLichSu(!showAllLichSu)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    {showAllLichSu ? "Thu gọn" : "Hiển thị tất cả"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
