"use client"

import { useEffect, useRef } from "react"

export default function BpmnModeler() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const zoomLevelRef = useRef<number>(1)

  useEffect(() => {
    const renderDiagram = () => {
      if (!canvasRef.current) return

      const container = canvasRef.current
      container.innerHTML = ""

      // Create a simple SVG representation of a BPMN diagram
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "100%")
      svg.setAttribute("height", "400")
      svg.setAttribute("viewBox", "0 0 800 300")

      // Apply zoom
      svg.style.transform = `scale(${zoomLevelRef.current})`
      svg.style.transformOrigin = "center"

      // Start event
      createCircle(svg, 50, 150, 20, "#4ade80", "start")
      createText(svg, 50, 190, "Bắt đầu")

      // Flow arrows
      createArrow(svg, 70, 150, 130, 150)
      createArrow(svg, 230, 150, 290, 150)
      createArrow(svg, 390, 150, 450, 150)
      createArrow(svg, 550, 150, 610, 150)
      createArrow(svg, 710, 150, 770, 150)

      // Tasks
      createTask(svg, 130, 150, 100, 60, "#3b82f6", "Đăng ký")
      createTask(svg, 290, 150, 100, 60, "#3b82f6", "Khám bệnh")
      createTask(svg, 450, 150, 100, 60, "#3b82f6", "Xét nghiệm")
      createTask(svg, 610, 150, 100, 60, "#3b82f6", "Kê đơn")

      // End event
      createCircle(svg, 770, 150, 20, "#ef4444", "end")
      createText(svg, 770, 190, "Kết thúc")

      container.appendChild(svg)
    }

    // Helper functions to create SVG elements
    function createCircle(svg: SVGSVGElement, cx: number, cy: number, r: number, fill: string, id: string) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", cx.toString())
      circle.setAttribute("cy", cy.toString())
      circle.setAttribute("r", r.toString())
      circle.setAttribute("fill", fill)
      circle.setAttribute("stroke", "#1e293b")
      circle.setAttribute("stroke-width", "2")
      circle.setAttribute("id", id)
      svg.appendChild(circle)
    }

    function createTask(
      svg: SVGSVGElement,
      x: number,
      y: number,
      width: number,
      height: number,
      fill: string,
      text: string,
    ) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      rect.setAttribute("x", (x - width / 2).toString())
      rect.setAttribute("y", (y - height / 2).toString())
      rect.setAttribute("width", width.toString())
      rect.setAttribute("height", height.toString())
      rect.setAttribute("fill", fill)
      rect.setAttribute("stroke", "#1e293b")
      rect.setAttribute("stroke-width", "2")
      rect.setAttribute("rx", "10")
      svg.appendChild(rect)

      const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text")
      textElement.setAttribute("x", x.toString())
      textElement.setAttribute("y", y.toString())
      textElement.setAttribute("text-anchor", "middle")
      textElement.setAttribute("dominant-baseline", "middle")
      textElement.setAttribute("fill", "white")
      textElement.setAttribute("font-family", "Arial, sans-serif")
      textElement.setAttribute("font-size", "14")
      textElement.setAttribute("font-weight", "bold")
      textElement.textContent = text
      svg.appendChild(textElement)
    }

    function createArrow(svg: SVGSVGElement, x1: number, y1: number, x2: number, y2: number) {
      // Line
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute("x1", x1.toString())
      line.setAttribute("y1", y1.toString())
      line.setAttribute("x2", x2.toString())
      line.setAttribute("y2", y2.toString())
      line.setAttribute("stroke", "#64748b")
      line.setAttribute("stroke-width", "2")
      line.setAttribute("marker-end", "url(#arrowhead)")
      svg.appendChild(line)

      // Create arrowhead marker
      if (!svg.querySelector("#arrowhead")) {
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker")
        marker.setAttribute("id", "arrowhead")
        marker.setAttribute("markerWidth", "10")
        marker.setAttribute("markerHeight", "7")
        marker.setAttribute("refX", "9")
        marker.setAttribute("refY", "3.5")
        marker.setAttribute("orient", "auto")

        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        polygon.setAttribute("points", "0 0, 10 3.5, 0 7")
        polygon.setAttribute("fill", "#64748b")

        marker.appendChild(polygon)
        defs.appendChild(marker)
        svg.appendChild(defs)
      }
    }


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


    // Render the diagram
    renderDiagram()

    // Add zoom controls
    const zoomIn = () => {
      zoomLevelRef.current = Math.min(zoomLevelRef.current + 0.1, 2)
      renderDiagram()
    }

    const zoomOut = () => {
      zoomLevelRef.current = Math.max(zoomLevelRef.current - 0.1, 0.5)
      renderDiagram()
    }

    const zoomControls = document.createElement("div")
    zoomControls.className = "flex gap-2 mt-4 justify-center"

    const zoomOutButton = document.createElement("button")
    zoomOutButton.textContent = "Thu nhỏ"
    zoomOutButton.className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    zoomOutButton.onclick = zoomOut

    const zoomInButton = document.createElement("button")
    zoomInButton.textContent = "Phóng to"
    zoomInButton.className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    zoomInButton.onclick = zoomIn

    const resetButton = document.createElement("button")
    resetButton.textContent = "Reset"
    resetButton.className = "px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
    resetButton.onclick = () => {
      zoomLevelRef.current = 1
      renderDiagram()
    }

    zoomControls.appendChild(zoomOutButton)
    zoomControls.appendChild(resetButton)
    zoomControls.appendChild(zoomInButton)

    if (canvasRef.current) {
      canvasRef.current.appendChild(zoomControls)
    }

    // Cleanup function
    return () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-blue-800">Mô hình BPMN quy trình khám bệnh</h3>
      <p className="text-gray-600 mb-4">Sơ đồ mô tả quy trình khám bệnh từ đăng ký đến kê đơn thuốc</p>
      <div ref={canvasRef} className="min-h-[450px] bg-gray-50 rounded-md p-4"></div>
    </div>
  )
}
