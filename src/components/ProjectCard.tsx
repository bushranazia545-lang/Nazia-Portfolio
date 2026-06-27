import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'
import { Project } from '../data/types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Tag color mapping
  const tagColors: Record<string, { bg: string; text: string }> = {
    'Vector': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'Print': { bg: 'bg-amber-100', text: 'text-amber-600' },
    'Web': { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    'PDF': { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    'Photo Editing': { bg: 'bg-rose-100', text: 'text-rose-600' },
  }

  const tagStyle = tagColors[project.tags] || { bg: 'bg-gray-100', text: 'text-gray-600' }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-border-custom cursor-pointer transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Placeholder image area - replace with actual project image */}
      <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        <span className="text-6xl opacity-20">🎨</span>
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono font-medium ${tagStyle.bg} ${tagStyle.text}`}>
          {project.tags}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-charcoal text-base mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-muted text-sm mb-3">{project.company}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < project.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-charcoal-light ml-1 font-mono">{project.rating}.0</span>
        </div>

        {/* Feedback preview */}
        {project.feedback && (
          <p className="text-xs text-charcoal-light italic line-clamp-2 border-l-2 border-accent-gold pl-3">
            "{project.feedback.substring(0, 100)}..."
          </p>
        )}
      </div>
    </motion.div>
  )
}
