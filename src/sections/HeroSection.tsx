import { motion } from 'framer-motion'

export default function HeroSection() {
  const stats = [
    { number: '150+', label: 'Contracts Done' },
    { number: '$50K+', label: 'Earned on Upwork' },
    { number: '100%', label: 'Job Success' },
  ]

  return (
    <section className="min-h-screen flex items-center px-6 lg:px-12 pt-24 pb-16 overflow-hidden relative" id="about">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Text side */}
        <div>
          {/* Photo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative inline-block mb-7"
          >
            <div className="w-32 h-32 rounded-full border-4 border-accent-gold shadow-xl overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}Nazia Bushra PNG.png`}
                alt="Nazia Bushra"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-3 left-0 whitespace-nowrap px-5 py-1.5 border border-border-custom rounded-full text-xs text-charcoal-light font-mono bg-cream shadow-sm">
              Nazia — Graphic Designer
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-[1.1]"
          >
            I design with<br />
            <span className="bg-gradient-to-r from-accent-gold to-[#c9a96e] bg-clip-text text-transparent">
              precision &amp; purpose
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg text-charcoal-light mb-8 leading-relaxed max-w-lg"
          >
            Expert in Adobe Illustrator, typography, and brand identity. Turning client visions into polished, professional visuals — from logos to print and everything in between.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-8 lg:gap-12"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-charcoal">{stat.number}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating cards side */}
        <div className="relative h-[450px] hidden md:block">
          {/* Main card - Vector Design */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[280px] bg-white rounded-xl p-6 shadow-lg border border-border-custom cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Featured</div>
            <div className="text-lg font-semibold text-charcoal">Vector Design</div>
            <div className="text-sm text-charcoal-light mb-4">Logo, tracing &amp; illustration</div>
            <div className="w-full h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-3xl">&#10024;</div>
          </motion.div>

          {/* Side card - PDF Forms */}
          <motion.div
            animate={{ y: [0, -10], x: [0, 8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-28 left-0 w-[170px] bg-white rounded-xl p-4 shadow-md border border-border-custom cursor-pointer hover:shadow-lg"
          >
            <div className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Quick</div>
            <div className="text-base font-semibold text-charcoal">PDF Forms</div>
            <div className="text-xs text-charcoal-light">Fillable, professional</div>
          </motion.div>

          {/* Bottom card - WordPress */}
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 right-12 w-[230px] bg-white rounded-xl p-5 shadow-md border border-border-custom cursor-pointer hover:shadow-lg"
          >
            <div className="font-mono text-xs text-muted uppercase tracking-widest mb-1">WordPress</div>
            <div className="text-base font-semibold text-charcoal">Elementor Expert</div>
            <div className="text-xs text-charcoal-light">Custom sites &amp; landing pages</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
