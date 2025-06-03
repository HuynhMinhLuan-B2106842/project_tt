"use client"

import { useEffect, useRef } from "react"

export default function ProcessDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 400

    // Define process steps
    const steps = [
      { x: 100, y: 80, radius: 40, color: "#3b82f6", text: "Đặt lịch", icon: "📅" },
      { x: 250, y: 80, radius: 40, color: "#3b82f6", text: "Tiếp đón", icon: "👥" },
      { x: 400, y: 80, radius: 40, color: "#3b82f6", text: "Khám bệnh", icon: "🩺" },
      { x: 550, y: 80, radius: 40, color: "#3b82f6", text: "Xét nghiệm", icon: "🔬" },
      { x: 400, y: 200, radius: 40, color: "#3b82f6", text: "Kết luận", icon: "📝" },
      { x: 250, y: 200, radius: 40, color: "#3b82f6", text: "Thanh toán", icon: "💰" },
      { x: 100, y: 200, radius: 40, color: "#3b82f6", text: "Nhận thuốc", icon: "💊" },
    ]

    // Draw connections
    ctx.strokeStyle = "#93c5fd"
    ctx.lineWidth = 3

    // Horizontal connections (top row)
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(steps[i].x + steps[i].radius, steps[i].y)
      ctx.lineTo(steps[i + 1].x - steps[i + 1].radius, steps[i + 1].y)
      ctx.stroke()
    }

    // Vertical connection from Xét nghiệm to Kết luận
    ctx.beginPath()
    ctx.moveTo(steps[3].x, steps[3].y + steps[3].radius)
    ctx.lineTo(steps[4].x, steps[4].y - steps[4].radius)
    ctx.stroke()

    // Horizontal connections (bottom row)
    for (let i = 6; i > 4; i--) {
      ctx.beginPath()
      ctx.moveTo(steps[i].x + steps[i].radius, steps[i].y)
      ctx.lineTo(steps[i - 1].x - steps[i - 1].radius, steps[i - 1].y)
      ctx.stroke()
    }

    // Draw arrows on connections
    function drawArrow(fromX: number, fromY: number, toX: number, toY: number) {
      const headLength = 10
      const dx = toX - fromX
      const dy = toY - fromY
      const angle = Math.atan2(dy, dx)

      ctx.beginPath()
      ctx.moveTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(toX, toY)
      ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
      ctx.fillStyle = "#93c5fd"
      ctx.fill()
    }

    // Draw arrows for horizontal connections (top row)
    for (let i = 0; i < 3; i++) {
      const midX = (steps[i].x + steps[i].radius + steps[i + 1].x - steps[i + 1].radius) / 2
      drawArrow(steps[i].x, steps[i].y, midX, steps[i].y)
    }

    // Draw arrow for vertical connection
    const midY = (steps[3].y + steps[3].radius + steps[4].y - steps[4].radius) / 2
    drawArrow(steps[3].x, steps[3].y, steps[3].x, midY)

    // Draw arrows for horizontal connections (bottom row)
    for (let i = 6; i > 4; i--) {
      const midX = (steps[i].x + steps[i].radius + steps[i - 1].x - steps[i - 1].radius) / 2
      drawArrow(steps[i].x, steps[i].y, midX, steps[i].y)
    }

    // Draw circles for each step
    steps.forEach((step) => {
      // Draw circle
      ctx.beginPath()
      ctx.arc(step.x, step.y, step.radius, 0, 2 * Math.PI)
      ctx.fillStyle = step.color
      ctx.fill()

      // Draw icon
      ctx.font = "20px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(step.icon, step.x, step.y - 5)

      // Draw text
      ctx.font = "12px Arial"
      ctx.fillStyle = "white"
      ctx.fillText(step.text, step.x, step.y + 15)
    })

    // Draw step numbers
    steps.forEach((step, index) => {
      ctx.beginPath()
      ctx.arc(step.x - step.radius + 15, step.y - step.radius + 15, 10, 0, 2 * Math.PI)
      ctx.fillStyle = "white"
      ctx.fill()

      ctx.font = "10px Arial"
      ctx.fillStyle = step.color
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText((index + 1).toString(), step.x - step.radius + 15, step.y - step.radius + 15)
    })

    // Draw legend
    ctx.font = "14px Arial"
    ctx.fillStyle = "#1e3a8a"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("Quy trình khám bệnh tại Phòng Khám Đa Khoa", 100, 280)

    // Draw additional notes
    ctx.font = "12px Arial"
    ctx.fillStyle = "#64748b"
    ctx.fillText("* Thời gian trung bình cho toàn bộ quy trình: 1-2 giờ", 100, 310)
    ctx.fillText("* Bệnh nhân có thể được chuyển đến bác sĩ chuyên khoa nếu cần", 100, 330)
    ctx.fillText("* Kết quả xét nghiệm có thể xem trực tuyến sau 24 giờ", 100, 350)
  }, [])

  return (
    <div className="w-full overflow-auto">
      <canvas ref={canvasRef} className="min-w-[700px] h-[400px]" />
    </div>
  )
}
