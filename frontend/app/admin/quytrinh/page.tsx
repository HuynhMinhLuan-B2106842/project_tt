"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { toast } from "@/app/hooks/use-toast"

export default function BpmnViewer() {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [diagrams, setDiagrams] = useState([])
  const [currentDiagramId, setCurrentDiagramId] = useState(null)
  const [diagramName, setDiagramName] = useState("")

  // Default BPMN XML for empty state
  const defaultXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
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
    // Load danh sách diagrams từ server
    const fetchDiagrams = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/diagrams')
        if (!response.ok) throw new Error('Lỗi khi lấy danh sách diagram')
        const data = await response.json()
        setDiagrams(data)
      } catch (err) {
        console.error('Error fetching diagrams:', err)
        toast({
          title: 'Lỗi',
          description: 'Không thể tải danh sách sơ đồ',
          variant: 'destructive',
        })
      }
    }
    fetchDiagrams()

    // Load bpmn-js từ CDN
    const loadBpmnJS = async () => {
      if (typeof window !== "undefined" && !window.BpmnJS) {
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

        const script = document.createElement("script")
        script.src = "https://unpkg.com/bpmn-js@17.0.2/dist/bpmn-viewer.development.js"
        script.onload = initializeViewer
        document.head.appendChild(script)
      } else if (window.BpmnJS) {
        initializeViewer()
      }
    }

    const initializeViewer = () => {
      if (containerRef.current && window.BpmnJS) {
        viewerRef.current = new window.BpmnJS({
          container: containerRef.current,
        })

        viewerRef.current
          .importXML(defaultXML)
          .then(() => {
            setIsLoaded(true)
            zoomToFit()
          })
          .catch((err) => {
            console.error("Error importing XML:", err)
          })
      }
    }

    loadBpmnJS()

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
      }
    }
  }, [])

  const loadDiagramFromServer = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/api/diagrams/${id}`)
      if (!response.ok) throw new Error('Lỗi khi tải diagram')
      const data = await response.json()
      await viewerRef.current.importXML(data.xml)
      setCurrentDiagramId(id)
      setDiagramName(data.name)
      zoomToFit()
      toast({
        title: 'Đã tải thành công',
        description: 'Sơ đồ BPMN đã được tải từ server',
      })
    } catch (err) {
      console.error('Error loading diagram:', err)
      toast({
        title: 'Lỗi khi tải',
        description: 'Không thể tải sơ đồ BPMN',
        variant: 'destructive',
      })
    }
  }

  const zoomToFit = () => {
    if (!viewerRef.current) return
    const canvas = viewerRef.current.get("canvas")
    canvas.zoom("fit-viewport")
  }

  return (
    <div className="h-full flex bg-gray-50">
      {/* Danh sách sơ đồ */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Danh sách quy trình</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {diagrams.length > 0 ? (
            <ul className="space-y-2">
              {diagrams.map((diagram) => (
                <li
                  key={diagram._id}
                  className="p-2 hover:bg-gray-100 rounded flex justify-between items-center"
                >
                  <div
                    className="cursor-pointer flex-1"
                    onClick={() => loadDiagramFromServer(diagram._id)}
                  >
                    {diagram.name} <br />
                    <small className="text-gray-500">
                      Cập nhật: {new Date(diagram.updatedAt).toLocaleString()}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Chưa có sơ đồ nào</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Card className="rounded-none border-x-0 border-t-0 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">
                {diagramName || "Chọn một sơ đồ để xem"}
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={zoomToFit} disabled={!isLoaded}>
              Zoom vừa
            </Button>
          </div>
        </Card>

        {/* Canvas */}
        <div className="flex-1 relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div className="text-center">
                <p className="text-gray-600">Đang tải...</p>
              </div>
            </div>
          )}
          <div ref={containerRef} className="h-full w-full" style={{ minHeight: "500px" }} />
        </div>
      </div>
    </div>
  )
}