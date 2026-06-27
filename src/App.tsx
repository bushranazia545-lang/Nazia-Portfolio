import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import Terminal from './components/Terminal'
import ServicesSection from './sections/ServicesSection'
import PortfolioSection from './sections/PortfolioSection'
import TestimonialsMarquee from './components/TestimonialsMarquee'
import Footer from './sections/Footer'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <HeroSection />
      <AboutSection />

      {/* Terminal / Skills Section */}
      <section className="py-24 px-6" id="toolkit">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-charcoal mb-4">My Toolkit</h2>
          <p className="text-charcoal-light text-lg">A peek inside my design terminal</p>
        </div>
        <Terminal />
      </section>

      <ServicesSection />
      <PortfolioSection />

      {/* Testimonials */}
      <section className="py-24 px-6" id="reviews">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Client Love</h2>
            <p className="text-charcoal-light text-lg">What my Upwork clients say about working with me</p>
          </div>
        </div>
        <TestimonialsMarquee />
      </section>

      <Footer />
    </div>
  )
}