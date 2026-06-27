import { motion } from 'framer-motion'

const tags = [
  'Adobe Illustrator', 'Vector Art', 'Vector Conversion', 'Manual Vector Tracing',
  'JPG to Vector', 'Logo Design', 'Web Design', 'Print Design', 'Brochure Design',
  'Image Editing', 'PDF Forms', 'PDF Editing', 'Google Forms', 'Adobe Captivate',
  'Interactive Courses', 'Training Videos', 'Social Media Ads', 'E-books',
  'Landing Pages', 'WordPress (Elementor)',
]

export default function AboutSection() {
  return (
    <section className="py-24 px-6 max-w-[800px] mx-auto text-center" id="about">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-charcoal mb-6"
      >
        I think, then I design
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="text-lg text-charcoal-light leading-relaxed mb-8"
      >
        I care about how things communicate — clarity, trust, and craft in every pixel. Whether it's a logo that needs to feel right, a PDF form that needs to work perfectly, or a website that needs to convert. I bring 10+ years of Upwork experience and a commitment to quality that shows in 178+ contracts, 100% Job Success, and repeat clients.
      </motion.p>

      {/* Skill tags */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center flex-wrap gap-3"
      >
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 + i * 0.005, duration: 0.1 }}
            whileHover={{ backgroundColor: '#1a1a1a', color: '#fff' }}
            className="px-5 py-2.5 border border-border-custom rounded-full text-sm text-charcoal-light cursor-pointer transition-colors duration-200"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}