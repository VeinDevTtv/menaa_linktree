"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, Camera, X, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, RotateCw, Trophy, Sparkles
} from "lucide-react"
import { SoccerBall3D } from "@/components/soccer-ball-3d"
import { SoccerFieldBg } from "@/components/soccer-field-bg"
import { SoccerParticles } from "@/components/soccer-particles"

const TOTAL_IMAGES = 11

export default function FifaNightGalleryPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imageScale, setImageScale] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next')
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0, time: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openImageViewer = useCallback((index: number) => {
    setSelectedImage(index)
    setImageScale(1)
    setImagePosition({ x: 0, y: 0 })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeImageViewer = useCallback(() => {
    setSelectedImage(null)
    setImageScale(1)
    setImagePosition({ x: 0, y: 0 })
    document.body.style.overflow = 'unset'
  }, [])

  const handleNextImage = useCallback(() => {
    if (selectedImage === null) return
    setSlideDirection('next')
    if (selectedImage < TOTAL_IMAGES - 1) {
      setSelectedImage(selectedImage + 1)
      setImageScale(1)
      setImagePosition({ x: 0, y: 0 })
    }
  }, [selectedImage])

  const handlePrevImage = useCallback(() => {
    if (selectedImage === null) return
    setSlideDirection('prev')
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
      setImageScale(1)
      setImagePosition({ x: 0, y: 0 })
    }
  }, [selectedImage])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      
      if (e.key === 'Escape') {
        closeImageViewer()
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage()
      } else if (e.key === 'ArrowRight') {
        handleNextImage()
      } else if (e.key === '+' || e.key === '=') {
        setImageScale(prev => Math.min(prev + 0.2, 3))
      } else if (e.key === '-') {
        setImageScale(prev => Math.max(prev - 0.2, 0.5))
      } else if (e.key === '0') {
        setImageScale(1)
        setImagePosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, closeImageViewer, handlePrevImage, handleNextImage])

  const handleZoom = (delta: number) => {
    setImageScale(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (imageScale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imageScale > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    handleZoom(delta)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({ 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY,
        time: Date.now()
      })
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (imageScale === 1 && e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStart.x
      const deltaTime = Date.now() - touchStart.time
      
      if (Math.abs(deltaX) > 50 && deltaTime < 500) {
        if (deltaX > 0 && selectedImage !== null && selectedImage > 0) {
          handlePrevImage()
        } else if (deltaX < 0 && selectedImage !== null && selectedImage < TOTAL_IMAGES - 1) {
          handleNextImage()
        }
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-950 to-stone-950"
    >
      {/* Enhanced 3D Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SoccerFieldBg opacity={0.15} />
        <SoccerParticles density="high" speed="medium" />
        
        {/* Floating 3D Soccer Balls with Parallax */}
        <SoccerBall3D size="lg" position={{ x: 10, y: 15 }} />
        <SoccerBall3D size="md" position={{ x: 85, y: 25 }} />
        <SoccerBall3D size="sm" position={{ x: 20, y: 70 }} />
        <SoccerBall3D size="md" position={{ x: 75, y: 80 }} />
        <SoccerBall3D size="sm" position={{ x: 50, y: 50 }} />

        {/* Parallax gradient blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-lime-500/20 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "0s",
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-green-600/15 to-emerald-600/15 animate-gooey-morph blur-3xl"
          style={{ 
            animationDelay: "3s",
            transform: `translateY(${scrollY * -0.2}px)`
          }}
        />

        {/* 3D Geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 bg-gradient-to-br from-emerald-400/30 via-lime-400/20 to-yellow-400/20 transform rotate-45 opacity-40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 30}%`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px) rotate(45deg)`,
            }}
            animate={{
              rotateZ: [45, 405],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Back Button */}
        <Link 
          href="/events"
          className={`inline-flex items-center gap-2 mb-8 px-6 py-3 bg-emerald-950/40 hover:bg-emerald-950/60 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-400/40 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Events</span>
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 via-lime-500 to-yellow-400 mb-6 shadow-2xl shadow-emerald-500/50"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-lime-300 to-yellow-300 bg-clip-text text-transparent"
            style={{ transformStyle: "preserve-3d" }}
          >
            FIFA Night Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-emerald-100/80 max-w-3xl mx-auto"
          >
            Relive the electric moments, epic goals, and MENAA community spirit
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-sm"
          >
            <Camera className="w-4 h-4" />
            <span>{TOTAL_IMAGES} Photos</span>
          </motion.div>
        </motion.div>

        {/* Photo Gallery Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {Array.from({ length: TOTAL_IMAGES }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              onClick={() => openImageViewer(index)}
              className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-emerald-400/20 cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* 3D Card Effect */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={`/events/menaaevent2_${index + 1}.jpg`}
                  alt={`MENAA FIFA Night Photo ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/60 group-hover:shadow-2xl group-hover:shadow-emerald-500/40 transition-all duration-500" />

                {/* Image Number Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-emerald-500/80 backdrop-blur-md flex items-center justify-center text-white text-xs font-bold border border-emerald-400/50"
                >
                  {index + 1}
                </motion.div>

                {/* Hover Icon */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/80 backdrop-blur-md border border-emerald-400/50">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-medium">View</span>
                  </div>
                </motion.div>
              </div>

              {/* 3D Shadow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-lime-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Ripple Effect on Click */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ scale: 1, opacity: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-emerald-200/60">
            Want to share your shots? Tag{" "}
            <a
              href="https://instagram.com/deanzamenaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-emerald-200 underline-offset-4 hover:underline transition-colors"
            >
              @deanzamenaa
            </a>
          </p>
        </motion.div>
      </div>

      {/* Full-Screen Image Viewer with 3D Transitions */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget && imageScale === 1) {
                closeImageViewer()
              }
            }}
          >
            {/* Header Controls */}
            <div className="absolute top-4 left-4 right-4 flex flex-col gap-3 z-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-400/50 shadow-xl"
                  >
                    <Image
                      src="/MENAA_LOGO.jpg"
                      alt="MENAA Logo"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-sm">MENAA FIFA Night</h3>
                    <p className="text-white/60 text-xs">Photo {selectedImage + 1} of {TOTAL_IMAGES}</p>
                  </div>
                </div>
                
                <button
                  onClick={closeImageViewer}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_IMAGES }).map((_, index) => {
                  const currentIndex = selectedImage ?? 0
                  return (
                    <div
                      key={index}
                      className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 rounded-full"
                        initial={{ width: index < currentIndex ? '100%' : index === currentIndex ? '100%' : '0%' }}
                        animate={{ width: index < currentIndex ? '100%' : index === currentIndex ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Main Image Container with 3D Transitions */}
            <div 
              className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-32"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={selectedImage}
                  custom={slideDirection}
                  initial={{ 
                    opacity: 0,
                    x: slideDirection === 'next' ? '100%' : '-100%',
                    rotateY: slideDirection === 'next' ? 90 : -90,
                    scale: 0.8
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0,
                    x: slideDirection === 'next' ? '-100%' : '100%',
                    rotateY: slideDirection === 'next' ? -90 : 90,
                    scale: 0.8
                  }}
                  transition={{ 
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    opacity: { duration: 0.3 }
                  }}
                  className="relative max-w-6xl max-h-full w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "2000px",
                    cursor: imageScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                  }}
                >
                  {/* Click zones for navigation */}
                  {imageScale === 1 && (
                    <>
                      {selectedImage > 0 && (
                        <div
                          onClick={handlePrevImage}
                          className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize z-10"
                          aria-label="Previous image zone"
                        />
                      )}
                      {selectedImage < TOTAL_IMAGES - 1 && (
                        <div
                          onClick={handleNextImage}
                          className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize z-10"
                          aria-label="Next image zone"
                        />
                      )}
                    </>
                  )}

                  <div 
                    className="relative w-full h-full"
                    style={{
                      transform: `scale(${imageScale}) translate(${imagePosition.x / imageScale}px, ${imagePosition.y / imageScale}px)`,
                      transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                    }}
                  >
                    <Image
                      src={`/events/menaaevent2_${selectedImage + 1}.jpg`}
                      alt={`MENAA FIFA Night Photo ${selectedImage + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {selectedImage > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </motion.button>
            )}

            {selectedImage < TOTAL_IMAGES - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </motion.button>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                <button
                  onClick={() => handleZoom(-0.2)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 transition-all flex items-center justify-center text-white font-bold"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                  {Math.round(imageScale * 100)}%
                </span>
                <button
                  onClick={() => handleZoom(0.2)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 transition-all flex items-center justify-center text-white font-bold"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Reset Zoom Button */}
              {imageScale !== 1 && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => {
                    setImageScale(1)
                    setImagePosition({ x: 0, y: 0 })
                  }}
                  className="px-4 py-2 rounded-full bg-emerald-500/80 backdrop-blur-md hover:bg-emerald-500 transition-all text-white text-sm font-medium flex items-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  Reset
                </motion.button>
              )}

              {/* Image Counter */}
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                <span className="text-white text-sm font-medium">
                  {selectedImage + 1} / {TOTAL_IMAGES}
                </span>
              </div>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="absolute bottom-4 left-4 hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-xs space-y-1 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2"
              >
                <p>← → Arrow keys to navigate</p>
                <p>+ / − to zoom • 0 to reset</p>
                <p>ESC to close</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

