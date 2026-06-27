import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const base = import.meta.env.BASE_URL;

// Row 1: Feedback from clients (scrolls right to left)
const row1 = [
  {
    quote: "One of the best Upworkers ever. Excellent quality of work, asks pertinent questions to be sure she understands the project completely. Will definitely hire again! 10+++++",
    client: "Kerry Watson King",
    company: "Pithy Productions, Inc.",
    photo: "Portraits/Kerry Watson King.jpg",
    rating: 5,
  },
  {
    quote: "Nazia was amazing!!! Her communication is excellent. There were no language barriers at all. I'll be coming back for more work.",
    client: "Domonique M",
    company: "",
    photo: "Portraits/Domonique M.jpg",
    rating: 5,
  },
  {
    quote: "Excellent Freelancer. I have used her several times. Would highly recommend. A++",
    client: "David Wood",
    company: "Mahalo Brands",
    photo: "Portraits/David Wood.jpg",
    rating: 5,
  },
  {
    quote: "Nazia's skills are good, she communicates well, and she turned my jobs around quickly. I will definitely hire her again.",
    client: "Patrick Hill",
    company: "Triplepoint Environmental",
    photo: "Portraits/patrick-hill.webp",
    rating: 5,
  },
  {
    quote: "She was the first to reply to my job and the best in getting it done fast too... Friendly personality (on the screen), good English skills and ensuring the quality was 5 Stars... Working with her now on other projects.",
    client: "John Kraus",
    company: "LNFI",
    photo: "Portraits/John Kraus.jpeg",
    rating: 5,
  },
  {
    quote: "Nazia exceeded my expectations on our poster design work. She delivered just what we needed on time and with great quality. Would definitely hire again!",
    client: "Kay Lee",
    company: "",
    photo: "Portraits/Kay Lee.jpg",
    rating: 5,
  },
  {
    quote: "Fantastic designer to work with, Nazia was very patient with me, and so responsive. I am very happy with her work, and will seek her out again.",
    client: "Simona Dedek",
    company: "",
    photo: "Portraits/Simona Dedek.jpg",
    rating: 5,
  },
  {
    quote: "Top notch!",
    client: "Marla Davidson-Currie",
    company: "Marla Currie",
    photo: "Portraits/Marla-Currie.jpg",
    rating: 5,
  },
]

// Row 2: More top feedbacks (scrolls left to right)
const row2 = [
  {
    quote: "Completely satisfied with her work. Nazia cooperated fully during our urgent job. She is constantly available and open to the changes!",
    client: "Majid Sadegh",
    company: "OIAC",
    photo: "Portraits/Majid Sadegh.png",
    rating: 5,
  },
  {
    quote: "Nazia did the detailed work 100% correctly and in very fast time. She reached out immediately when there was a question and was so professional.",
    client: "Rachel Lewett",
    company: "",
    photo: "Portraits/Rachel Lewett.webp",
    rating: 5,
  },
  {
    quote: "We were very happy with the quality and timeliness of work. Communication and organisational skills were excellent. It was a pleasure to work with Nazia.",
    client: "Siobhan Tyrrell",
    company: "",
    photo: "Portraits/Siobhan Tyrrell.jpg",
    rating: 5,
  },
  {
    quote: "Nazia underestimated the original time it took but worked over the weekend to make sure the file was delivered on time. Awesome, highly recommended.",
    client: "Andreas Schroeter",
    company: "",
    photo: "Portraits/Andreas Schroeter.jpg",
    rating: 5,
  },
  {
    quote: "Nazia is an excellent, agile and dedicated professional. She worked overnight to deliver the job in time. I have worked with her many times in the past.",
    client: "Radhika Nathwani",
    company: "",
    photo: "Portraits/Radhika Nathwani.jpg",
    rating: 5,
  },
  {
    quote: "Nazia worked diligently to satisfy all my requirements. She produced work of an excellent standard in a timely manner and I would not hesitate to recommend her.",
    client: "Sadaf Raza",
    company: "",
    photo: "Portraits/Sadaf Raza.avif",
    rating: 5,
  },
  {
    quote: "Excellent work produced, in a timely manner. Nazia was able to take some of our original concepts and deliver exactly what we were looking for.",
    client: "John James",
    company: "",
    photo: "Portraits/John James.png",
    rating: 5,
  },
  {
    quote: "Nazia was very proactive, attentive to detail, and punctual. Her design skills are top-notch and she delivered beyond expectations.",
    client: "Russell A",
    company: "",
    photo: "Portraits/Russell A.jpg",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, j) => (
        <Star
          key={j}
          size={14}
          className={j < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: any }) {
  return (
    <div className="flex-shrink-0 w-[350px] min-h-[200px] bg-white rounded-xl p-5 border border-border-custom shadow-sm flex flex-col">
      <StarRating rating={t.rating} />
      <p className="text-base text-charcoal-light italic mb-3 line-clamp-3 flex-grow">
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3 mt-auto">
        {t.photo && (
          <img
            src={`${base}${t.photo}`}
            alt={t.client}
            className="w-10 h-10 rounded-full object-cover border border-border-custom"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <div>
          <p className="text-sm font-semibold text-charcoal">{t.client}</p>
          {t.company && <p className="text-sm text-muted">{t.company}</p>}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const marquee1 = [...row1, ...row1]
  const marquee2 = [...row2, ...row2]

  return (
    <div className="space-y-8">
      {/* Row 1: scrolls right to left */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 80,
              ease: 'linear',
            },
          }}
        >
          {marquee1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: scrolls left to right */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 80,
              ease: 'linear',
            },
          }}
        >
          {marquee2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}