import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  clientName: string
  rating: number
  feedback: string
  category: string
  images: string[]
}

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  clientName,
  rating,
  feedback,
  category,
  images,
}: ProjectModalProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const hasMultiple = images.length > 1

  const goNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const goPrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  // Reset to first image when modal opens
  const handleOpen = () => {
    setCurrentImage(0)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="flex-1 min-w-0 mr-4">
                <h3 className="text-lg font-semibold text-charcoal truncate">{title}</h3>
                <p className="text-xs text-charcoal-light mt-0.5">{clientName} • {category}</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:bg-cream transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image gallery area */}
            <div className="relative flex-1 min-h-0 overflow-hidden bg-gray-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full flex items-center justify-center p-6"
                >
                  <img
                    src={encodeURI(images[currentImage])}
                    alt={`${title} - Image ${currentImage + 1}`}
                    className="max-w-full max-h-[55vh] object-contain rounded-lg"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.style.display = "none"
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows — only for multi-image contracts */}
              {hasMultiple && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-charcoal hover:bg-white hover:shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-charcoal hover:bg-white hover:shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-charcoal/70 text-white text-xs font-mono">
                    {currentImage + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip for multi-image */}
            {hasMultiple && (
              <div className="px-6 py-3 border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImage
                        ? "border-accent-gold shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={encodeURI(img)}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement
                        el.style.display = "none"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Feedback section */}
            {feedback && (
              <div className="px-6 py-4 border-t border-gray-100 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating ? "text-accent-gold fill-accent-gold" : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-charcoal-light">{rating}.0</span>
                </div>
                <p className="text-sm text-charcoal-light italic leading-relaxed border-l-2 border-accent-gold/40 pl-3">
                  &ldquo;{feedback}&rdquo;
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
