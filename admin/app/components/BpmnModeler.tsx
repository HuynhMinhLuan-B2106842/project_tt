"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Download, Upload, Save, FileText, Zap, RotateCcw } from "lucide-react"
import { toast } from "@/app/hooks/use-toast"

// Import bpmn-js
declare global {
  interface Window {
    BpmnJS: any
  }
}

export default function BpmnModeler() {
  const containerRef = useRef<HTMLDivElement>(null)
  const modelerRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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

  const saveXML = async () => {
    if (!modelerRef.current) return

    try {
      const { xml } = await modelerRef.current.saveXML({ format: true })
      const blob = new Blob([xml], { type: "application/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "diagram.bpmn"
      a.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Đã lưu thành công",
        description: "Sơ đồ BPMN đã được tải xuống",
      })
    } catch (err) {
      console.error("Error saving XML:", err)
      toast({
        title: "Lỗi khi lưu",
        description: "Không thể lưu sơ đồ BPMN",
        variant: "destructive",
      })
    }
  }

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

  return (
    <div className="h-full flex flex-col bg-gray-50">
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

            <Button variant="outline" size="sm" onClick={zoomToFit} disabled={!isLoaded}>
              <Zap className="h-4 w-4 mr-2" />
              Zoom vừa
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content */}
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
  )
}
