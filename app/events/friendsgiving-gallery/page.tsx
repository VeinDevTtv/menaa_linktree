"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Leaf,
  Sparkles,
} from "lucide-react"

const TOTAL_IMAGES = 5
const IMAGE_PATHS = [
  "/events/IMG_2982.jpg",
  "/events/IMG_2984.jpg",
  "/events/IMG_2985.jpg",
  "/events/IMG_2990.jpg",
  "/events/IMG_3017.jpg",
]

export default function FriendsgivingGalleryPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imageScale, setImageScale] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next")
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
    document.body.style.overflow = "hidden"
  }, [])

  const closeImageViewer = useCallback(() => {
    setSelectedImage(null)
    setImageScale(1)
    setImagePosition({ x: 0, y: 0 })
    document.body.style.overflow = "unset"
  }, [])

  const handleNextImage = useCallback(() => {
    if (selectedImage === null) return
    setSlideDirection("next")
    if (selectedImage < TOTAL_IMAGES - 1) {
      setSelectedImage(selectedImage + 1)
      setImageScale(1)
      setImagePosition({ x: 0, y: 0 })
    }
  }, [selectedImage])

  const handlePrevImage = useCallback(() => {
    if (selectedImage === null) return
    setSlideDirection("prev")
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
      setImageScale(1)
      setImagePosition({ x: 0, y: 0 })
    }
  }, [selectedImage])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === "Escape") {
        closeImageViewer()
      } else if (e.key === "ArrowLeft") {
        handlePrevImage()
      } else if (e.key === "ArrowRight") {
        handleNextImage()
      } else if (e.key === "+" || e.key === "=") {
        setImageScale(prev => Math.min(prev + 0.2, 3))
      } else if (e.key === "-") {
        setImageScale(prev => Math.max(prev - 0.2, 0.5))
      } else if (e.key === "0") {
        setImageScale(1)
        setImagePosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, closeImageViewer, handlePrevImage, handleNextImage])

  const handleZoom = (delta: number) => {
    setImageScale(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (imageScale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imageScale > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
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
        time: Date.now(),
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
        } else if (
          deltaX < 0 &&
          selectedImage !== null &&
          selectedImage < TOTAL_IMAGES - 1
        ) {
          handleNextImage()
        }
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-950 via-orange-950 to-stone-950"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(10)].map(i => (
          <motion.div
            key={i}
            className="absolute text-amber-200/10"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: ["0%", "5%", "0%"],
              x: ["0%", "-5%", "0%"],
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf size={Math.random() * 100 + 50} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-12 md:py-20">
        <Link
          href="/events"
          className={`mb-8 inline-flex items-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-950/40 px-6 py-3 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400/40 hover:bg-amber-950/60 hover:shadow-xl hover:shadow-amber-500/20 ${
            mounted ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Events</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-400 shadow-2xl shadow-amber-500/50"
          >
            <Leaf className="h-12 w-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            Friendsgiving Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto max-w-3xl text-xl text-amber-100/80 md:text-2xl"
          >
            A feast of friendship, food, and unforgettable moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/20 px-6 py-2 text-sm text-amber-200"
          >
            <Camera className="h-4 w-4" />
            <span>{TOTAL_IMAGES} Photos</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {IMAGE_PATHS.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                zIndex: 10,
                transition: { duration: 0.3 },
              }}
              onClick={() => openImageViewer(index)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 border-amber-400/20"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={path}
                  alt={`Friendsgiving Photo ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-[200%]" />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-amber-400/60 group-hover:shadow-2xl group-hover:shadow-amber-500/40" />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/80 text-xs font-bold text-white backdrop-blur-md"
                >
                  {index + 1}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <div className="flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-500/80 px-4 py-2 backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-white" />
                    <span className="text-xs font-medium text-white">View</span>
                  </div>
                </motion.div>
              </div>
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ scale: 1, opacity: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-amber-200/60">
            Want to share your shots? Tag{" "}
            <a
              href="https://instagram.com/deanzamenaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 transition-colors hover:text-amber-200 hover:underline"
            >
              @deanzamenaa
            </a>
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
            onClick={e => {
              if (e.target === e.currentTarget && imageScale === 1) {
                closeImageViewer()
              }
            }}
          >
            <div className="absolute left-4 right-4 top-4 z-50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="h-12 w-12 overflow-hidden rounded-full shadow-xl ring-2 ring-amber-400/50"
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
                    <h3 className="text-sm font-bold text-white">
                      MENAA Friendsgiving
                    </h3>
                    <p className="text-xs text-white/60">
                      Photo {selectedImage + 1} of {TOTAL_IMAGES}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeImageViewer}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/20"
                  aria-label="Close viewer"
                >
                  <X className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_IMAGES }).map((_, index) => {
                  const currentIndex = selectedImage ?? 0
                  return (
                    <div
                      key={index}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm"
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400"
                        initial={{
                          width:
                            index < currentIndex
                              ? "100%"
                              : index === currentIndex
                              ? "100%"
                              : "0%",
                        }}
                        animate={{
                          width:
                            index < currentIndex
                              ? "100%"
                              : index === currentIndex
                              ? "100%"
                              : "0%",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center p-4 pb-32 pt-20"
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
                    x: slideDirection === "next" ? "100%" : "-100%",
                    rotateY: slideDirection === "next" ? 90 : -90,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: slideDirection === "next" ? "-100%" : "100%",
                    rotateY: slideDirection === "next" ? -90 : 90,
                    scale: 0.8,
                  }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    opacity: { duration: 0.3 },
                  }}
                  className="relative h-full w-full max-w-6xl"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "2000px",
                    cursor:
                      imageScale > 1
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                  }}
                >
                  {imageScale === 1 && (
                    <>
                      {selectedImage > 0 && (
                        <div
                          onClick={handlePrevImage}
                          className="absolute left-0 top-0 z-10 h-full w-1/3 cursor-w-resize"
                          aria-label="Previous image zone"
                        />
                      )}
                      {selectedImage < TOTAL_IMAGES - 1 && (
                        <div
                          onClick={handleNextImage}
                          className="absolute right-0 top-0 z-10 h-full w-1/3 cursor-e-resize"
                          aria-label="Next image zone"
                        />
                      )}
                    </>
                  )}
                  <div
                    className="relative h-full w-full"
                    style={{
                      transform: `scale(${imageScale}) translate(${
                        imagePosition.x / imageScale
                      }px, ${imagePosition.y / imageScale}px)`,
                      transition: isDragging
                        ? "none"
                        : "transform 0.3s ease-out",
                    }}
                  >
                    <Image
                      src={IMAGE_PATHS[selectedImage]}
                      alt={`Friendsgiving Photo ${selectedImage + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {selectedImage > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handlePrevImage}
                className="group absolute left-4 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
              </motion.button>
            )}
            {selectedImage < TOTAL_IMAGES - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleNextImage}
                className="group absolute right-4 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
              </motion.button>
            )}

            <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                <button
                  onClick={() => handleZoom(-0.2)}
                  className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-white transition-all hover:bg-white/20"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm font-medium text-white">
                  {Math.round(imageScale * 100)}%
                </span>
                <button
                  onClick={() => handleZoom(0.2)}
                  className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-white transition-all hover:bg-white/20"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
              {imageScale !== 1 && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => {
                    setImageScale(1)
                    setImagePosition({ x: 0, y: 0 })
                  }}
                  className="flex items-center gap-2 rounded-full bg-amber-500/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-amber-500"
                >
                  <RotateCw className="h-4 w-4" />
                  Reset
                </motion.button>
              )}
              <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="text-sm font-medium text-white">
                  {selectedImage + 1} / {TOTAL_IMAGES}
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-1 rounded-lg bg-black/30 px-3 py-2 text-xs text-white/40 backdrop-blur-sm"
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
