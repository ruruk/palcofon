"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react"

interface ImageLightboxProps {
  images: string[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Reset zoom and position when changing images
  useEffect(() => {
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigatePrev()
          break
        case "ArrowRight":
          navigateNext()
          break
        case "Escape":
          onClose()
          break
        case "+":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length])

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const navigateNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const navigatePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
      e.preventDefault() // Prevent scrolling while dragging
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Double click to zoom in/out
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setZoomLevel(1)
      setPosition({ x: 0, y: 0 })
    } else {
      setZoomLevel(2.5)
      // Center zoom on click position
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * -2 * rect.width
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2 * rect.height
      setPosition({ x, y })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 bg-opacity-95 flex items-center justify-center backdrop-blur-sm">
      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
      >
        <div
          className="relative transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            transformOrigin: "center",
          }}
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Product image ${currentIndex + 1}`}
            width={1200}
            height={1200}
            className="max-h-[90vh] w-auto object-contain"
            priority
            unoptimized={true} // For better quality when zooming
          />
        </div>
      </div>

      {/* Navigation buttons - Enhanced with better styling */}
      <button
        onClick={navigatePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-primary/70 hover:bg-primary/90 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={navigateNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-primary/70 hover:bg-primary/90 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Controls - Enhanced with better styling */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-white/90 rounded-full px-6 py-3 backdrop-blur-sm shadow-lg">
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 1}
          className="text-gray-700 p-2 hover:bg-primary/20 rounded-full disabled:opacity-50 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <span className="text-gray-700 text-sm font-bold">{Math.round(zoomLevel * 100)}%</span>
        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 4}
          className="text-gray-700 p-2 hover:bg-primary/20 rounded-full disabled:opacity-50 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <button
          onClick={toggleFullscreen}
          className="text-gray-700 p-2 hover:bg-primary/20 rounded-full transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
        <button
          onClick={onClose}
          className="text-gray-700 p-2 hover:bg-red-500/30 rounded-full transition-colors"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image counter - Enhanced with better styling */}
      <div className="absolute top-4 right-4 bg-white/90 text-gray-700 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-md">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnail navigation - Enhanced with better styling */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[90vw] p-3 bg-white/80 rounded-2xl backdrop-blur-sm shadow-md">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
              index === currentIndex
                ? "border-primary scale-110 shadow-lg"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`View image ${index + 1}`}
            aria-current={index === currentIndex}
          >
            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

