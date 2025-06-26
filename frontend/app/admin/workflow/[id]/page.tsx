"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ArrowLeft, Check, Clock, FileText, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "@/app/hooks/use-toast";

const stepStatuses = [
  { value: "cho_xu_ly", label: "Chờ xử lý" },
  { value: "dang_xu_ly", label: "Đang xử lý" },
  { value: "hoan_thanh", label: "Hoàn thành" },
  { value: "bo_qua", label: "Bỏ qua" },
];

export default function WorkflowDetail() {
  const params = useParams();
  const router = useRouter();
  const [quyTrinh, setQuyTrinh] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const modelerRef = useRef<any>(null);
  const maBenhNhan = quyTrinh?.maBenhNhan;
  const tenBenhNhan = quyTrinh?.tenBenhNhan;
  const benhNhan = quyTrinh?.lanKhamId?.maBenhNhan;

  useEffect(() => {
    const layQuyTrinh = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/quytrinh/${params.id}`);
        if (!response.ok) throw new Error("Lỗi khi lấy chi tiết quy trình");
        const data = await response.json();
        setQuyTrinh(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết quy trình:", err);
        setLoading(false);
      }
    };
    layQuyTrinh();
  }, [params.id]);

  useEffect(() => {
    const loadBpmnJS = async () => {
      if (typeof window === "undefined" || !window.BpmnJS) {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.href = "https://unpkg.com/bpmn-js@17.0.2/dist/assets/diagram-js.css";
        document.head.appendChild(link1);

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.href = "https://unpkg.com/bpmn-js@17.0.2/dist/assets/bpmn-js.css";
        document.head.appendChild(link2);

        const link3 = document.createElement("link");
        link3.rel = "stylesheet";
        link3.href = "https://unpkg.com/bpmn-js@17.0.2/dist/assets/bpmn-font/css/bpmn-embedded.css";
        document.head.appendChild(link3);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/bpmn-js@17.0.2/dist/bpmn-navigated-viewer.development.js";
        script.onload = () => initializeViewer();
        document.head.appendChild(script);
      } else {
        initializeViewer();
      }
    };

    const initializeViewer = () => {
      if (!containerRef.current || !window.BpmnJS || !quyTrinh?.diagramId?.xml) return;

      if (modelerRef.current) {
        modelerRef.current.destroy();
        modelerRef.current = null;
      }

      modelerRef.current = new window.BpmnJS({
        container: containerRef.current,
        keyboard: { bindTo: window },
      });

      modelerRef.current
        .importXML(quyTrinh.diagramId.xml)
        .then(() => {
          setLoading(false);
          highlightCurrentStep();
        })
        .catch((err: any) => {
          console.error("Lỗi khi import XML:", err);
          setLoading(false);
        });
    };

    if (quyTrinh) loadBpmnJS();

    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy();
        modelerRef.current = null;
      }
    };
  }, [quyTrinh]);

  const highlightCurrentStep = () => {
    if (!modelerRef.current || !quyTrinh) return;

    const canvas = modelerRef.current.get("canvas");
    const elementRegistry = modelerRef.current.get("elementRegistry");

    quyTrinh.cacBuoc.forEach((buoc: any) => {
      const element = elementRegistry.get(buoc.maBuoc);
      if (element) {
        canvas.removeMarker(buoc.maBuoc, "highlight-current");
        canvas.removeMarker(buoc.maBuoc, "highlight-completed");
        canvas.removeMarker(buoc.maBuoc, "highlight-skipped");

        if (buoc.trangThai === "hoan_thanh") {
          canvas.addMarker(buoc.maBuoc, "highlight-completed");
        } else if (buoc.trangThai === "dang_xu_ly") {
          canvas.addMarker(buoc.maBuoc, "highlight-current");
        } else if (buoc.trangThai === "bo_qua") {
          canvas.addMarker(buoc.maBuoc, "highlight-skipped");
        }
      }
    });

    const style = document.createElement("style");
    style.innerHTML = `
      .highlight-current .djs-visual > :nth-child(1) {
        stroke: #3b82f6 !important;
        stroke-width: 3px !important;
        fill: #eff6ff !important;
      }
      .highlight-completed .djs-visual > :nth-child(1) {
        stroke: #10b981 !important;
        fill: #ecfdf5 !important;
      }
      .highlight-skipped .djs-visual > :nth-child(1) {
        stroke: #6b7280 !important;
        fill: #f9fafb !important;
        stroke-dasharray: 5, 5 !important;
      }
    `;
    document.head.appendChild(style);

    canvas.zoom("fit-viewport", "auto");
  };

  const capNhatTrangThaiBuoc = async (maBuoc: string, trangThaiMoi: string) => {
    const buoc = quyTrinh.cacBuoc.find((b: any) => b.maBuoc === maBuoc);
    if (!buoc) return;

    // Rule 1: Block updates if the current status is "cho_xu_ly"
    if (buoc.trangThai === "cho_xu_ly") {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái từ 'Chờ xử lý'.",
        variant: "destructive",
      });
      return;
    }

    // Rule 2: Allow updates to "hoan_thanh" or "bo_qua" only if the current status is "dang_xu_ly"
    if (buoc.trangThai === "d Scoot! You should not attempt to change the status of a step that is in 'Pending' state.") {
      toast({
        title: "Lỗi",
        description: "Chỉ có thể cập nhật trạng thái 'Đang xử lý' sang 'Hoàn thành' hoặc 'Bỏ qua'.",
        variant: "destructive",
      });
      return;
    }

    // Proceed with the update if validation passes
    const buocCapNhat = {
      maBuoc: buoc.maBuoc,
      tenBuoc: buoc.tenBuoc,
      trangThai: trangThaiMoi,
      thoiGianHoanThanh: trangThaiMoi === "hoan_thanh" && !buoc.thoiGianHoanThanh ? new Date().toISOString() : buoc.thoiGianHoanThanh,
      nguoiThucHien: buoc.nguoiThucHien,
      ghiChu: buoc.ghiChu,
    };

    let cacBuocCapNhat = [...quyTrinh.cacBuoc].map((b: any) =>
      b.maBuoc === maBuoc ? buocCapNhat : b
    );

    const viTriHienTai = cacBuocCapNhat.findIndex((b: any) => b.maBuoc === maBuoc);
    let newBuocHienTai = quyTrinh.buocHienTai;

    // Update next step to "dang_xu_ly" if current step is set to "hoan_thanh" or "bo_qua"
    if (["hoan_thanh", "bo_qua"].includes(trangThaiMoi) && viTriHienTai < cacBuocCapNhat.length - 1) {
      const buocKeTiep = { ...cacBuocCapNhat[viTriHienTai + 1], trangThai: "dang_xu_ly" };
      cacBuocCapNhat[viTriHienTai + 1] = buocKeTiep;
      newBuocHienTai = cacBuocCapNhat[viTriHienTai + 1].maBuoc;
      console.log("Bước hiện tại:", buoc.tenBuoc, "-> Bước kế tiếp:", buocKeTiep.tenBuoc, "maBuoc:", newBuocHienTai);
    }

    const capNhatQuyTrinh = {
      cacBuoc: cacBuocCapNhat,
      buocHienTai: newBuocHienTai,
      trangThai: cacBuocCapNhat.every((b: any) => b.trangThai === "hoan_thanh") ? "hoan_thanh" : "dang_xu_ly",
    };

    try {
      const response = await fetch(`http://localhost:9000/api/quytrinh/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(capNhatQuyTrinh),
      });
      if (!response.ok) throw new Error("Lỗi khi cập nhật trạng thái");
      const data = await response.json();
      console.log("Response từ API:", data.quyTrinh);
      setQuyTrinh(data.quyTrinh);
      highlightCurrentStep();
      toast({
        title: "Cập nhật trạng thái",
        description: `Đã cập nhật bước "${buoc.tenBuoc}" sang trạng thái "${stepStatuses.find((s) => s.value === trangThaiMoi)?.label}"${viTriHienTai < cacBuocCapNhat.length - 1 && ["hoan_thanh", "bo_qua"].includes(trangThaiMoi)
            ? ` - Bước kế tiếp "${cacBuocCapNhat[viTriHienTai + 1].tenBuoc}" đã được kích hoạt`
            : ""
          }`,
      });
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái buoc:", err);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái",
        variant: "destructive",
      });
    }
  };

  const capNhatNguoiThucHien = (maBuoc: string, nguoiThucHien: string) => {
    const cacBuocCapNhat = quyTrinh.cacBuoc.map((b: any) =>
      b.maBuoc === maBuoc ? { ...b, nguoiThucHien } : b
    );
    setQuyTrinh({ ...quyTrinh, cacBuoc: cacBuocCapNhat });
    // Gửi API PUT để lưu xuống backend nếu cần
  };

  const capNhatGhiChu = (maBuoc: string, ghiChu: string) => {
    const cacBuocCapNhat = quyTrinh.cacBuoc.map((b: any) =>
      b.maBuoc === maBuoc ? { ...b, ghiChu } : b
    );
    setQuyTrinh({ ...quyTrinh, cacBuoc: cacBuocCapNhat });
    // Gửi API PUT để lưu xuống backend nếu cần
  };

  const getStatusBadgeClass = (trangThai: string) => {
    switch (trangThai) {
      case "dang_xu_ly":
        return "bg-blue-100 text-blue-800";
      case "hoan_thanh":
        return "bg-green-100 text-green-800";
      case "cho_xu_ly":
        return "bg-yellow-100 text-yellow-800";
      case "bo_qua":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const xoaQuyTrinh = async () => {
    if (window.confirm("Bạn có chắc muốn xóa quy trình này? Hành động này không thể hoàn tác!")) {
      try {
        const response = await fetch(`http://localhost:9000/api/quytrinh/${params.id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Lỗi khi xóa quy trình");
        toast({
          title: "Thành công",
          description: "Quy trình đã được xóa thành công",
        });
        router.push("/admin/workflow");
      } catch (err) {
        console.error("Lỗi khi xóa quy trình:", err);
        toast({
          title: "Lỗi",
          description: "Không thể xóa quy trình",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) return <div>Đang tải...</div>;

  // Find the step with "dang_xu_ly" status to display as the current step
  const currentStep = quyTrinh.cacBuoc.find((b: any) => b.trangThai === "dang_xu_ly");

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/admin?section=workflow">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Chi tiết quy trình khám bệnh</h1>
      </div>

      {quyTrinh && (
        <>
          <Card className="mb-6">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle>{quyTrinh.ten}</CardTitle>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(quyTrinh.trangThai)}`}>
                  {quyTrinh.trangThai === "dang_xu_ly" ? "Đang xử lý" : "Hoàn thành"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Bệnh nhân</p>
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
                      {new Date(quyTrinh.ngayBatDau).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Bước hiện tại</p>
                    <p className="text-sm text-gray-600">
                      {currentStep ? currentStep.tenBuoc : "Hoàn thành"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">Sơ đồ quy trình</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div ref={containerRef} className="h-[500px] w-full border-t" style={{ minHeight: "500px" }} />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">Các bước quy trình</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {quyTrinh.cacBuoc.map((buoc: any) => (
                      <div key={buoc.maBuoc} className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{buoc.tenBuoc}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(buoc.trangThai)}`}
                          >
                            {stepStatuses.find((s) => s.value === buoc.trangThai)?.label}
                          </span>
                        </div>

                        <div className="space-y-3 mt-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Trạng thái</label>
                            <Select
                              value={buoc.trangThai}
                              onValueChange={(value) => capNhatTrangThaiBuoc(buoc.maBuoc, value)}
                            >
                              <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
                                <SelectValue placeholder="Chọn trạng thái" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                {stepStatuses.map((status) => (
                                  <SelectItem
                                    key={status.value}
                                    value={status.value}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  >
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Người thực hiện</label>
                            <input
                              type="text"
                              value={buoc.nguoiThucHien || ""}
                              onChange={(e) => capNhatNguoiThucHien(buoc.maBuoc, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              placeholder="Nhập tên người thực hiện"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Ghi chú</label>
                            <textarea
                              value={buoc.ghiChu || ""}
                              onChange={(e) => capNhatGhiChu(buoc.maBuoc, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              rows={2}
                              placeholder="Nhập ghi chú"
                            />
                          </div>

                          {buoc.thoiGianHoanThanh && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                              Hoàn thành lúc:{" "}
                              {new Date(buoc.thoiGianHoanThanh).toLocaleString("vi-VN", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="destructive" onClick={xoaQuyTrinh}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa quy trình
            </Button>
          </div>
        </>
      )}
    </div>
  );
}