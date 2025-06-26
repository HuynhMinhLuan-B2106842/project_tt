"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/app/hooks/use-toast";
import Select from "react-select";
import { useSearchParams } from "next/navigation";

export default function NewWorkflow() {
  
  const [patientInfo, setPatientInfo] = useState({
    lanKhamId: "",
    tenBenhNhan: "",
  });
  const [danhSachSoDo, setDanhSachSoDo] = useState<unknown[]>([]);
  const [selectedDiagram, setSelectedDiagram] = useState<unknown>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const quyTrinhId = searchParams.get("quyTrinhId");
  const diagramId = searchParams.get("diagramId");

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
    try {
      // 1. Lấy chi tiết quy trình từ ID
      if (quyTrinhId) {
        const res = await fetch(`http://localhost:9000/api/quytrinh/${quyTrinhId}`);
        if (!res.ok) throw new Error("Lỗi khi lấy thông tin quy trình");
        const quyTrinhData = await res.json();

        // 2. Set thông tin bệnh nhân từ populate
        if (quyTrinhData?.lanKhamId && quyTrinhData.lanKhamId?.maBenhNhan) {
          setPatientInfo({
            lanKhamId: quyTrinhData.lanKhamId._id,
            tenBenhNhan: quyTrinhData.lanKhamId.maBenhNhan.ho_ten,
          });
        }
      }

      // 4. Lấy danh sách sơ đồ
      const response = await fetch(`http://localhost:9000/api/quytrinh/sodo/sodo`);
      if (!response.ok) throw new Error("Lỗi khi lấy danh sách sơ đồ");
      const data = await response.json();

      const formattedData = data.map((soDo: any) => ({
        value: soDo._id,
        label: soDo.name,
      }));
      setDanhSachSoDo(formattedData);

      // 5. Nếu quy trình đã có sơ đồ -> set default value
      if (diagramId) {
      const defaultDiagramId = diagramId;
      const defaultSelected = formattedData.find(
        (item: any) => item.value === defaultDiagramId
      );
      if (defaultSelected) {
        setSelectedDiagram(defaultSelected);
      }
    }
  } catch (err) {
    console.error("Lỗi khi lấy danh sách sơ đồ:", err);
    toast({
      title: "Lỗi",
      description: "Không thể tải danh sách sơ đồ",
      variant: "destructive",
    });
  }
};

  fetchData();
}, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedDiagram || !quyTrinhId) {
    toast({
      title: "Thiếu thông tin",
      description: "Không thể cập nhật vì thiếu sơ đồ hoặc ID quy trình",
      variant: "destructive",
    });
    return;
  }

  try {
    const response = await fetch(`http://localhost:9000/api/quytrinh/capnhat-sodo/${quyTrinhId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        diagramId: (selectedDiagram as { value: string }).value,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Cập nhật thất bại");
    }

    toast({
      title: "Cập nhật thành công",
      description: "Đã gán sơ đồ vào quy trình",
    });
    router.push("/admin/workflow");
  } catch (err: any) {
    toast({
      title: "Lỗi",
      description: err.message || "Không thể cập nhật sơ đồ",
      variant: "destructive",
    });
  }
};


  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/admin?section=workflow">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Tạo quy trình khám bệnh mới</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Thông tin bệnh nhân</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-bold text-gray-700 mb-1">
                      Mã lần khám
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={patientInfo.lanKhamId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-base font-bold text-gray-700 mb-1">
                    Tên bệnh nhân
                  </label>
                   <input
                    type="text"
                    readOnly
                    value={patientInfo.tenBenhNhan}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Tìm và chọn sơ đồ BPMN</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isMounted && (
              <Select
                value={selectedDiagram}
                onChange={setSelectedDiagram}
                options={danhSachSoDo}
                placeholder="Tìm và chọn sơ đồ BPMN"
                isClearable={true}
                isSearchable={true}
                className="w-full"
                classNamePrefix="react-select"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    padding: "2px",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                }}
              />
              )}
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button type="submit">Cập Nhật</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
