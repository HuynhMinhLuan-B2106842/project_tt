"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Download, Upload, Save, FileText, Zap, RotateCcw, Settings, X } from "lucide-react"
import { toast } from "../hooks/use-toast"

// Import bpmn-js
declare global {
  interface Window {
    BpmnJS: any
  }
}

interface ElementProperties {
  id: string
  name: string
  documentation: string
  assignee: string
  dueDate: string
  priority: string
  formKey: string
  async: boolean
  exclusive: boolean
  [key: string]: any
}

export default function BpmnModeler() {
  const containerRef = useRef<HTMLDivElement>(null)
  const modelerRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedElement, setSelectedElement] = useState<any>(null)
  const [elementProperties, setElementProperties] = useState<ElementProperties>({
    id: "",
    name: "",
    documentation: "",
    assignee: "",
    dueDate: "",
    priority: "normal",
    formKey: "",
    async: false,
    exclusive: true,
  })
  const [showProperties, setShowProperties] = useState(false)

  // Default BPMN XML
  const defaultXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="5.0.0">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="79" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

  useEffect(() => {
    // Load bpmn-js from CDN
    const loadBpmnJS = async () => {
      if (typeof window !== "undefined" && !window.BpmnJS) {
        // Load CSS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/bpmn-js@17.0.2/dist/assets/diagram-js.css"
        document.head.appendChild(link)

        const link2 = document.createElement("link")
        link2.rel = "stylesheet"
        link2.href = "https://unpkg.com/bpmn-js@17.0.2/dist/assets/bpmn-js.css"
        document.head.appendChild(link2)

        const link3 = document.createElement("link")
        link3.rel = "stylesheet"
        link3.href = "https://unpkg.com/bpmn-js@17.0.2/dist/assets/bpmn-font/css/bpmn-embedded.css"
        document.head.appendChild(link3)

        // Load JS
        const script = document.createElement("script")
        script.src = "https://unpkg.com/bpmn-js@17.0.2/dist/bpmn-modeler.development.js"
        script.onload = () => {
          initializeModeler()
        }
        document.head.appendChild(script)
      } else if (window.BpmnJS) {
        initializeModeler()
      }
    }

    const initializeModeler = () => {
      if (containerRef.current && window.BpmnJS) {
        modelerRef.current = new window.BpmnJS({
          container: containerRef.current,
          keyboard: {
            bindTo: window,
          },
        })

        // Add selection listener
        const eventBus = modelerRef.current.get("eventBus")
        eventBus.on("selection.changed", (event: any) => {
          const { newSelection } = event
          if (newSelection && newSelection.length > 0) {
            const element = newSelection[0]
            setSelectedElement(element)
            loadElementProperties(element)
            setShowProperties(true)
          } else {
            setSelectedElement(null)
            setShowProperties(false)
          }
        })

        // Import default diagram
        modelerRef.current
          .importXML(defaultXML)
          .then(() => {
            setIsLoaded(true)
            toast({
              title: "BPMN Modeler đã sẵn sàng",
              description: "Bạn có thể bắt đầu tạo sơ đồ quy trình",
            })
          })
          .catch((err: any) => {
            console.error("Error importing XML:", err)
          })
      }
    }

    loadBpmnJS()

    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy()
      }
    }
  }, [])

  const loadElementProperties = (element: any) => {
    const businessObject = element.businessObject

    setElementProperties({
      id: businessObject.id || "",
      name: businessObject.name || "",
      documentation: businessObject.documentation?.[0]?.text || "",
      assignee: businessObject.assignee || "",
      dueDate: businessObject.dueDate || "",
      priority: businessObject.priority || "normal",
      formKey: businessObject.formKey || "",
      async: businessObject.async || false,
      exclusive: businessObject.exclusive !== false,
    })
  }

  const updateElementProperty = (property: string, value: any) => {
    if (!selectedElement || !modelerRef.current) return

    const modeling = modelerRef.current.get("modeling")
    const businessObject = selectedElement.businessObject

    const updates: any = {}
    updates[property] = value

    modeling.updateProperties(selectedElement, updates)

    setElementProperties((prev) => ({
      ...prev,
      [property]: value,
    }))
  }

  const saveXML = async () => {
  if (!modelerRef.current) return;

  try {
    const { xml } = await modelerRef.current.saveXML({ format: true });

    // 1. Gửi lên server
    const response = await fetch("/api/diagrams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Sơ đồ mới",
        description: "Lưu sơ đồ từ client",
        bpmnXml: xml
      }),
    });

    if (!response.ok) throw new Error("Lưu thất bại");

    toast({
      title: "🗂 Đã lưu lên server",
      description: "Sơ đồ BPMN đã được lưu vào cơ sở dữ liệu",
    });

    // 2. (Tuỳ chọn) vẫn cho phép tải xuống file
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.bpmn";
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error saving XML:", err);
    toast({
      title: "❌ Lỗi khi lưu",
      description: "Không thể lưu sơ đồ BPMN",
      variant: "destructive",
    });
  }
};


  const saveSVG = async () => {
    if (!modelerRef.current) return

    try {
      const { svg } = await modelerRef.current.saveSVG()
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "diagram.svg"
      a.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Đã xuất SVG thành công",
        description: "Sơ đồ đã được xuất dưới dạng SVG",
      })
    } catch (err) {
      console.error("Error saving SVG:", err)
      toast({
        title: "Lỗi khi xuất SVG",
        description: "Không thể xuất sơ đồ dưới dạng SVG",
        variant: "destructive",
      })
    }
  }

  const loadXML = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !modelerRef.current) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const xml = e.target?.result as string
      modelerRef.current
        .importXML(xml)
        .then(() => {
          toast({
            title: "Đã tải thành công",
            description: "Sơ đồ BPMN đã được tải lên",
          })
        })
        .catch((err: any) => {
          console.error("Error importing XML:", err)
          toast({
            title: "Lỗi khi tải",
            description: "Không thể tải sơ đồ BPMN",
            variant: "destructive",
          })
        })
    }
    reader.readAsText(file)
  }

  const createNewDiagram = () => {
    if (!modelerRef.current) return

    modelerRef.current
      .importXML(defaultXML)
      .then(() => {
        setShowProperties(false)
        setSelectedElement(null)
        toast({
          title: "Đã tạo sơ đồ mới",
          description: "Sơ đồ trống đã được tạo",
        })
      })
      .catch((err: any) => {
        console.error("Error creating new diagram:", err)
      })
  }

  const zoomToFit = () => {
    if (!modelerRef.current) return

    const canvas = modelerRef.current.get("canvas")
    canvas.zoom("fit-viewport")
  }

  const getElementTypeLabel = (element: any) => {
    if (!element) return ""

    const type = element.type
    switch (type) {
      case "bpmn:StartEvent":
        return "Sự kiện bắt đầu"
      case "bpmn:EndEvent":
        return "Sự kiện kết thúc"
      case "bpmn:Task":
        return "Nhiệm vụ"
      case "bpmn:UserTask":
        return "Nhiệm vụ người dùng"
      case "bpmn:ServiceTask":
        return "Nhiệm vụ dịch vụ"
      case "bpmn:ScriptTask":
        return "Nhiệm vụ script"
      case "bpmn:Gateway":
        return "Cổng"
      case "bpmn:ExclusiveGateway":
        return "Cổng độc quyền"
      case "bpmn:ParallelGateway":
        return "Cổng song song"
      case "bpmn:SequenceFlow":
        return "Luồng tuần tự"
      default:
        return type.replace("bpmn:", "")
    }
  }

  return (
    <div className="h-full flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Card className="rounded-none border-x-0 border-t-0 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">BPMN Modeler</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={createNewDiagram} disabled={!isLoaded}>
                <FileText className="h-4 w-4 mr-2" />
                Mới
              </Button>

              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={!isLoaded}>
                <Upload className="h-4 w-4 mr-2" />
                Tải lên
              </Button>

              <Button variant="outline" size="sm" onClick={saveXML} disabled={!isLoaded}>
                <Save className="h-4 w-4 mr-2" />
                Lưu BPMN
              </Button>

              <Button variant="outline" size="sm" onClick={saveSVG} disabled={!isLoaded}>
                <Download className="h-4 w-4 mr-2" />
                Xuất SVG
              </Button>

              {/* <Button variant="outline" size="sm" onClick={zoomToFit} disabled={!isLoaded}>
                <Zap className="h-4 w-4 mr-2" />
                Zoom vừa
              </Button> */}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProperties(!showProperties)}
                disabled={!isLoaded}
              >
                <Settings className="h-4 w-4 mr-2" />
                Thuộc tính
              </Button>
            </div>
          </div>
        </Card>

        {/* Canvas */}
        <div className="flex-1 relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div className="text-center">
                <RotateCcw className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                <p className="text-gray-600">Đang tải BPMN Modeler...</p>
              </div>
            </div>
          )}

          <div ref={containerRef} className="h-full w-full" style={{ minHeight: "500px" }} />
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept=".bpmn,.xml" onChange={loadXML} className="hidden" />
      </div>

      {/* Properties Panel */}
      {showProperties && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Thuộc tính</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowProperties(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedElement ? (
              <>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Loại phần tử</Label>
                  <p className="text-sm text-gray-600 mt-1">{getElementTypeLabel(selectedElement)}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="element-id">ID</Label>
                  <Input
                    id="element-id"
                    value={elementProperties.id}
                    onChange={(e) => updateElementProperty("id", e.target.value)}
                    placeholder="Nhập ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="element-name">Tên</Label>
                  <Input
                    id="element-name"
                    value={elementProperties.name}
                    onChange={(e) => updateElementProperty("name", e.target.value)}
                    placeholder="Nhập tên"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="element-documentation">Mô tả</Label>
                  <Textarea
                    id="element-documentation"
                    value={elementProperties.documentation}
                    onChange={(e) => updateElementProperty("documentation", e.target.value)}
                    placeholder="Nhập mô tả"
                    rows={3}
                  />
                </div>
                {(selectedElement.type === "bpmn:SequenceFlow") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="element-assignee">Biểu thức điều kiện</Label>
                      <Input
                        id="element-assignee"
                        value={elementProperties.assignee}
                        onChange={(e) => updateElementProperty("assignee", e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </>
                )}                
                {(selectedElement.type === "bpmn:UserTask" || selectedElement.type === "bpmn:Task") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="element-assignee">Người thực hiện</Label>
                      <Input
                        id="element-assignee"
                        value={elementProperties.assignee}
                        onChange={(e) => updateElementProperty("assignee", e.target.value)}
                        placeholder="Nhập người thực hiện"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="element-duedate">Hạn chót</Label>
                      <Input
                        id="element-duedate"
                        type="datetime-local"
                        value={elementProperties.dueDate}
                        onChange={(e) => updateElementProperty("dueDate", e.target.value)}
                      />
                    </div>

                    {/* <div className="space-y-2">
                      <Label htmlFor="element-priority">Độ ưu tiên</Label>
                      <Select
                        value={elementProperties.priority}
                        onValueChange={(value) => updateElementProperty("priority", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn độ ưu tiên" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Thấp</SelectItem>
                          <SelectItem value="normal">Bình thường</SelectItem>
                          <SelectItem value="high">Cao</SelectItem>
                          <SelectItem value="urgent">Khẩn cấp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="element-formkey">Form Key</Label>
                      <Input
                        id="element-formkey"
                        value={elementProperties.formKey}
                        onChange={(e) => updateElementProperty("formKey", e.target.value)}
                        placeholder="Nhập form key"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="element-async"
                        checked={elementProperties.async}
                        onCheckedChange={(checked) => updateElementProperty("async", checked)}
                      />
                      <Label htmlFor="element-async">Thực hiện bất đồng bộ</Label>
                    </div> */}
                  </>
                )}

                {selectedElement.type?.includes("Gateway") && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="element-exclusive"
                      checked={elementProperties.exclusive}
                      onCheckedChange={(checked) => updateElementProperty("exclusive", checked)}
                    />
                    <Label htmlFor="element-exclusive">Độc quyền</Label>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Settings className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Chọn một phần tử để xem thuộc tính</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
