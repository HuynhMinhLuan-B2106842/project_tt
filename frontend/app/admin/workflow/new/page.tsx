"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/app/hooks/use-toast";
import Select from "react-select"; // Import react-select

export default function NewWorkflow() {
  const [patientInfo, setPatientInfo] = useState({ maBenhNhan: "", tenBenhNhan: "" });
  const [danhSachSoDo, setDanhSachSoDo] = useState<unknown[]>([]);
  const [selectedDiagram, setSelectedDiagram] = useState<unknown>(null); // Thay vì diagramId
  const router = useRouter();

  useEffect(() => {
    const layDanhSachSoDo = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/quytrinh/sodo/sodo");
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách sơ đồ");
        const data = await response.json();
        // Chuyển đổi dữ liệu thành định dạng phù hợp với react-select
        const formattedData = data.map((soDo: any) => ({
          value: soDo._id,
          label: soDo.name,
        }));
        setDanhSachSoDo(formattedData);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sơ đồ:", err);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách sơ đồ",
          variant: "destructive",
        });
      }
    };
    layDanhSachSoDo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientInfo.maBenhNhan || !patientInfo.tenBenhNhan || !selectedDiagram) {
      toast({
        title: "Thông tin không đầy đủ",
        description: "Vui lòng chọn sơ đồ và nhập thông tin bệnh nhân",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/quytrinh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ten: "Khám tổng quát", // Có thể lấy từ name của Diagram nếu cần
          maBenhNhan: patientInfo.maBenhNhan,
          tenBenhNhan: patientInfo.tenBenhNhan,
          diagramId: selectedDiagram.value, // Sử dụng value từ react-select
        }),
      });
      if (!response.ok) throw new Error("Lỗi khi tạo quy trình");
      const data = await response.json();
      toast({
        title: "Đã tạo quy trình mới",
        description: "Quy trình khám bệnh đã được tạo thành công",
      });
      router.push("/admin/workflow");
    } catch (err) {
      console.error("Lỗi khi tạo quy trình:", err);
      toast({
        title: "Lỗi",
        description: "Không thể tạo quy trình mới",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/admin/workflow">
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
              <CardTitle>Tìm và chọn sơ đồ BPMN</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Thông tin bệnh nhân</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã bệnh nhân</label>
                  <input
                    type="text"
                    value={patientInfo.maBenhNhan}
                    onChange={(e) => setPatientInfo({ ...patientInfo, maBenhNhan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập mã bệnh nhân"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên bệnh nhân</label>
                  <input
                    type="text"
                    value={patientInfo.tenBenhNhan}
                    onChange={(e) => setPatientInfo({ ...patientInfo, tenBenhNhan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập tên bệnh nhân"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Tạo quy trình</Button>
          </div>
        </div>
      </form>
    </div>
  );
}