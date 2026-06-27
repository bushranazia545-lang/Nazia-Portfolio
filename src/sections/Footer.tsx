import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="pt-[60px] px-6 lg:px-12 pb-[60px] border-t border-border-custom text-center" id="contact">
      <div className="flex justify-center gap-5 mb-8">
        <a
          href="https://www.upwork.com/freelancers/naziab"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-charcoal-light font-mono text-[0.85rem] hover:text-accent-gold transition-colors duration-200"
        >
          {'{Upwork}'}
        </a>
      </div>

      <motion.a
        href="https://www.upwork.com/freelancers/naziab"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block px-8 py-3.5 bg-charcoal text-white no-underline rounded-full font-semibold text-base hover:bg-accent-gold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 font-mono my-5 mb-10"
      >
        Hire me on Upwork
      </motion.a>

      <p className="text-[0.8rem] text-muted font-mono">
        Nazia Bushra &middot; Graphic Designer &middot; Sargodha, Pakistan
      </p>
    </footer>
  );
}