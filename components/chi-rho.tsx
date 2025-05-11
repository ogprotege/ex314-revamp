"use client"

import { useEffect, useRef } from "react"

interface ChiRhoProps {
  className?: string
}

export function ChiRho({ className = "h-6 w-6" }: ChiRhoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = Math.min(canvas.clientWidth, canvas.clientHeight)
    canvas.width = size
    canvas.height = size

    // Draw Chi-Rho
    const drawChiRho = () => {
      ctx.clearRect(0, 0, size, size)

      // Set styles
      ctx.strokeStyle = "#1e3a8a" // Dark blue
      ctx.lineWidth = size / 20
      ctx.lineCap = "round"

      // Draw Chi (X)
      ctx.beginPath()
      ctx.moveTo(size * 0.2, size * 0.2)
      ctx.lineTo(size * 0.8, size * 0.8)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(size * 0.8, size * 0.2)
      ctx.lineTo(size * 0.2, size * 0.8)
      ctx.stroke()

      // Draw Rho (P)
      ctx.beginPath()
      ctx.moveTo(size * 0.5, size * 0.15)
      ctx.lineTo(size * 0.5, size * 0.85)
      ctx.stroke()

      // Draw the loop of the Rho
      ctx.beginPath()
      ctx.arc(size * 0.5, size * 0.3, size * 0.15, Math.PI * 1.5, Math.PI * 0.5, false)
      ctx.stroke()
    }

    drawChiRho()

    // Optional: Add animation
    let animationFrame: number
    let rotation = 0

    const animate = () => {
      rotation += 0.005
      if (rotation > Math.PI * 2) rotation = 0

      ctx.clearRect(0, 0, size, size)

      // Save the current state
      ctx.save()

      // Move to center, rotate, and move back
      ctx.translate(size / 2, size / 2)
      ctx.rotate(Math.sin(rotation) * 0.05)
      ctx.translate(-size / 2, -size / 2)

      // Draw Chi-Rho
      drawChiRho()

      // Restore the state
      ctx.restore()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
