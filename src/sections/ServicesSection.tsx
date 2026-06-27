import { motion } from 'framer-motion'
import { useState } from 'react'

// Custom SVG tab icons — all #6b6b6b, 2px stroke
const AllServicesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const VectorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
  </svg>
)
const PrintIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="6" rx="1"/><rect x="4" y="10" width="16" height="8" rx="1"/><path d="M8 18v4"/><path d="M16 18v4"/><line x1="8" y1="14" x2="16" y2="14"/>
  </svg>
)
const WebIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

// Custom SVG folder icons — all #6b6b6b, 2px stroke
const VectorCreationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
  </svg>
)
const VectorEditingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)
const ManualTraceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" opacity="0.4"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4"/><path d="M6.5 10v4"/><path d="M17.5 14v-4"/><path d="M14 17.5h-4"/>
  </svg>
)
const PdfCreateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
)
const PdfEditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/>
  </svg>
)
const PdfFormsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="8" y="12" width="8" height="2" rx="0.5"/><rect x="8" y="16" width="5" height="2" rx="0.5"/>
  </svg>
)
const GoogleFormsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/><circle cx="15" cy="18" r="2"/><path d="M17 20l2 2"/>
  </svg>
)
const WebDesignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const BrandingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>
)
const SocialGraphicsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 17l4-4 3 3 5-5"/><circle cx="8.5" cy="8.5" r="1.5"/>
  </svg>
)
const PrintCollateralIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="17" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/>
  </svg>
)
const PhotoEditingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
)

const services = [
  { id: 'vector-creation', icon: VectorCreationIcon, name: 'Vector Creation', desc: 'Logo & Icon Design', category: 'vector', color: 'bg-folder-blue' },
  { id: 'vector-editing', icon: VectorEditingIcon, name: 'Vector Editing', desc: 'Color Changes & Cleanup', category: 'vector', color: 'bg-folder-beige' },
  { id: 'manual-trace', icon: ManualTraceIcon, name: 'Manual Tracing', desc: 'JPEG to Vector', category: 'vector', color: 'bg-folder-green' },
  { id: 'pdf-create', icon: PdfCreateIcon, name: 'PDF Creation', desc: 'Professional PDFs & Forms', category: 'print', color: 'bg-folder-pink' },
  { id: 'pdf-edit', icon: PdfEditIcon, name: 'PDF Editing', desc: 'Edit & Restructure PDFs', category: 'print', color: 'bg-folder-purple' },
  { id: 'pdf-forms', icon: PdfFormsIcon, name: 'PDF Forms', desc: 'Fillable & Interactive', category: 'print', color: 'bg-folder-blue' },
  { id: 'google-forms', icon: GoogleFormsIcon, name: 'Google Forms', desc: 'Custom Form Creation', category: 'web', color: 'bg-folder-beige' },
  { id: 'web-design', icon: WebDesignIcon, name: 'Website Design', desc: 'WordPress + Elementor', category: 'web', color: 'bg-folder-green' },
  { id: 'branding', icon: BrandingIcon, name: 'Brand Identity', desc: 'Complete Brand Packages', category: 'vector', color: 'bg-folder-purple' },
  { id: 'social-graphics', icon: SocialGraphicsIcon, name: 'Social Graphics', desc: 'Ads, Posts & Infographics', category: 'vector', color: 'bg-folder-pink' },
  { id: 'print-collat', icon: PrintCollateralIcon, name: 'Print Collateral', desc: 'Business Cards & Flyers', category: 'print', color: 'bg-folder-blue' },
  { id: 'photo-editing', icon: PhotoEditingIcon, name: 'Photo Editing', desc: 'Background Removal & Retouch', category: 'print', color: 'bg-folder-green' },
]

const tabs = [
  { id: 'all', label: 'All Services', icon: AllServicesIcon },
  { id: 'vector', label: 'Vector', icon: VectorIcon },
  { id: 'print', label: 'Print', icon: PrintIcon },
  { id: 'web', label: 'Web', icon: WebIcon },
]

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all' ? services : services.filter(s => s.category === activeTab)

  return (
    <section className="py-24 px-6" id="services">
      <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-charcoal mb-4">My Services</h2>
        <p className="text-charcoal-light text-lg">Organized like a designer's desktop — click tabs to explore</p>
      </div>

      {/* Window Chrome */}
      <div className="bg-white rounded-2xl border border-border-custom shadow-lg overflow-hidden">
        {/* Window header */}
        <div className="flex items-center px-5 py-3 bg-cream-dark border-b border-border-custom">
          <div className="flex gap-2 mr-3">
            <span className="w-2.5 h-2.5 rounded-full bg-border-custom" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-custom" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-custom" />
          </div>
          <span className="font-mono text-xs text-muted">~/nazia/services</span>
        </div>

        {/* Filter Tabs — #6b6b6b text for both active/inactive */}
        <div className="flex gap-2 px-5 py-3 bg-cream-dark border-b border-border-custom flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm'
                  : 'bg-transparent hover:shadow-sm'
              }`}
              style={{ color: '#6b6b6b' }}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content — folder icons #6b6b6b, text #6b6b6b */}
        <div className="p-8 min-h-[400px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -3, rotate: 1, transition: { duration: 0.2 } }}
                className="bg-cream-dark rounded-xl p-6 text-center cursor-pointer border border-border-custom hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${service.color}`}>
                  <service.icon />
                </div>
                <div className="font-semibold text-sm" style={{ color: '#6b6b6b' }}>{service.name}</div>
                <div className="text-xs text-muted mt-1 font-mono">{service.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
