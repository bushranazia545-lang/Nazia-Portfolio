import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Work', to: 'work' },
  { label: 'Contact', to: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 flex justify-between items-center bg-cream/92 backdrop-blur-[12px] border-b border-border-custom">
      <div className="flex items-center gap-3.5">
        <img
          src={`${import.meta.env.BASE_URL}Nazia Bushra PNG.png`}
          alt="NB"
          className="w-[38px] h-[38px] rounded-full object-cover border-2 border-accent-gold"
        />
        <a href="#" className="text-[1.1rem] font-semibold text-charcoal no-underline"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Nazia Bushra
        </a>
      </div>
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.to}
            href={`#${link.to}`}
            className="no-underline text-charcoal-light text-[0.9rem] font-medium transition-colors duration-200 relative hover:text-charcoal after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-gold after:transition-[width] after:duration-300 hover:after:w-full"
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.upwork.com/freelancers/naziab"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-5 py-2 bg-accent-gold text-white text-sm font-semibold rounded-full no-underline hover:bg-accent-gold/90 transition-colors shadow-sm hover:shadow-md"
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}