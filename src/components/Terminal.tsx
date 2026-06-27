import { useEffect, useState } from 'react'

const lines = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: 'Senior Graphic Designer with 10+ years experience on Upwork' },
  { type: 'command', text: 'cat skills/categories' },
  { type: 'output', text: 'Design & Vector: Adobe_Illustrator, Vector_Art, Vector_Conversion,', heading: 'Design & Vector:' },
  { type: 'output', text: '  Manual_Vector_Tracing, JPG_to_Vector, Logo_Design, Web_Design,' },
  { type: 'output', text: '  Print_Design, Brochure_Design, Image_Editing' },
  { type: 'output', text: 'Document & E-Learning: PDF_Forms, PDF_Editing, Google_Forms,', heading: 'Document & E-Learning:' },
  { type: 'output', text: '  Adobe_Captivate, Course_Module_Layout, Dynamic_PowerPoint' },
  { type: 'output', text: 'Marketing & Branding: Social_Media_Ads, Posters, Flyers,', heading: 'Marketing & Branding:' },
  { type: 'output', text: '  E-books, Landing_Pages, Catalogs, Business_Cards, Stationery' },
  { type: 'output', text: 'Web: WordPress (Elementor)' },
  { type: 'command', text: 'cat tools/.suite' },
  { type: 'output', text: 'Adobe Creative Suite: Illustrator*(Primary), Photoshop,', heading: 'Adobe Creative Suite:' },
  { type: 'output', text: '  InDesign, Premiere_Pro, Audition, Muse, Acrobat, Captivate' },
  { type: 'output', text: 'CMS: WordPress (Elementor)', heading: 'CMS:' },
  { type: 'output', text: 'Office: Word, Excel, PowerPoint', heading: 'Office:' },
]

/* Heading labels that should be gold (#d4a853) */
const goldHeadings = new Set([
  'Design & Vector:',
  'Document & E-Learning:',
  'Marketing & Branding:',
  'Adobe Creative Suite:',
  'CMS:',
  'Office:',
])

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < lines.length) {
      const delay = lines[visibleLines].type === 'command' ? 200 : 80
      const timer = setTimeout(() => setVisibleLines(v => v + 1), delay)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  /**
   * Render an output line. If it contains a gold heading (e.g. "Design & Vector: ..."),
   * split it so the heading portion renders in gold and the rest stays default.
   */
  function renderOutput(text: string) {
    for (const label of goldHeadings) {
      if (text.startsWith(label)) {
        const rest = text.slice(label.length)
        return (
          <>
            <span style={{ color: '#d4a853' }}>{label}</span>
            <span className="text-charcoal-light">{rest}</span>
          </>
        )
      }
    }
    return <span className="text-charcoal-light">{text}</span>
  }

  return (
    <div className="max-w-[700px] mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-border-custom">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-cream border-b border-border-custom">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="ml-3 font-mono text-xs text-muted">nazia — zsh</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-[0.85rem] leading-relaxed min-h-[400px] relative">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="mb-2 flex gap-2">
            {line.type === 'command' && (
              <>
                <span className="text-gray-500 font-bold shrink-0">~ $</span>
                <span className="text-charcoal font-semibold">{line.text}</span>
              </>
            )}
            {line.type === 'output' && (
              <span className="ml-5">{renderOutput(line.text)}</span>
            )}
          </div>
        ))}

        {/* Blinking cursor */}
        {visibleLines >= lines.length && (
          <div className="flex gap-2 opacity-50">
            <span className="text-gray-500 font-bold">~ $</span>
            <span className="animate-pulse">▊</span>
          </div>
        )}

        {/* ASCII Pet GIF - bottom right */}
        <img
          src={`${import.meta.env.BASE_URL}ascii-1003.gif`}
          alt="Thinking pet"
          className="absolute bottom-4 right-4 w-[150px] h-auto pointer-events-none"
        />
      </div>
    </div>
  )
}