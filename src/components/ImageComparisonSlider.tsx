import { useState, useRef } from 'react'

interface ImageComparisonSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
}

export default function ImageComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    // ...
    const rect = (containerRef.current as HTMLDivElement).getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-charcoal mb-3">
        {beforeLabel} → {afterLabel} (Slide to compare)
      </p>
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-200 cursor-ew-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        style={{ aspectRatio: '16/10' }}
      >
        {/* After image (full, crisp) */}
        <img
          src={afterSrc}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={beforeSrc}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-accent-gold shadow-[0_0_0_3px_rgba(255,255,255,0.9)] pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        />

        {/* Labels */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono text-charcoal">{afterLabel}</div>
        <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono text-charcoal">{beforeLabel}</div>
      </div>
    </div>
  )
}