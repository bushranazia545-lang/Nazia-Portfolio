import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Card } from "../data/types";

const ITEMS_PER_PAGE = 8;
const STAR_PATH = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

/* ── Star Rating ────────────────────────────────────── */

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`${cls} ${s <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

/* ── PortfolioCard ──────────────────────────────────── */

interface PortfolioCardProps {
  card: Card;
  onOpen: () => void;
}

function PortfolioCard({ card, onOpen }: PortfolioCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = card.allImages;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + imgs.length) % imgs.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % imgs.length);
  };

  const pick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-xl border border-border-custom overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => {
        onOpen();
      }}
    >
      {/* Window-style image area - fixed to window */}
      <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
        {/* Window chrome header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-2 px-3 py-2 bg-gray-50/95 border-b border-gray-200">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-[10px] text-muted font-mono flex-1 text-center truncate">
            {card.title.substring(0, 25)}{card.title.length > 25 ? "..." : ""}.jpg
          </span>
        </div>

        {imgs.length > 0 ? (
          <>
            {/* Main window image - fixed to window */}
            <div className="absolute inset-0 pt-9 pb-2 px-2">
              <div className="w-full h-full bg-white rounded-b-lg overflow-hidden relative">
                <img
                  src={`${import.meta.env.BASE_URL}${imgs[imgIdx]}`}
                  alt={card.title}
                  className="w-full h-full object-contain p-2"
                  draggable={false}
                />
                {imgs.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={14} className="text-charcoal" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={14} className="text-charcoal" />
                    </button>
                 
                    {/* Page counter */}
                    <div className="absolute bottom-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded z-10">
                      {imgIdx + 1}/{imgs.length}
                    </div>

                    {/* Thumbnail strip */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                      {imgs.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => pick(idx, e)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === imgIdx ? "bg-accent-gold w-3" : "bg-gray-300 w-1.5"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm pt-9">
            No Image
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-charcoal mb-1 line-clamp-2">
          {card.title}
        </h3>
        {card.company && (
          <p className="text-xs text-muted mb-2">{card.company}</p>
        )}
        <Stars rating={card.rating} />
      </div>
    </motion.div>
  );
}

/* ── Main Section ────────────────────────────────────── */

export default function PortfolioSection() {
  const [cards, setCards] = useState<Card[]>([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Card | null>(null);
  const [lbIdx, setLbIdx] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/cards.json`)
      .then((r) => r.json())
      .then((d: Card[]) => setCards(d))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selected) setLbIdx(0);
  }, [selected]);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const pageCards = cards.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const lbNext = () => {
    if (!selected) return;
    setLbIdx((i) => (i + 1) % selected.allImages.length);
  };
  const lbPrev = () => {
    if (!selected) return;
    setLbIdx((i) => (i - 1 + selected.allImages.length) % selected.allImages.length);
  };

  return (
    <section className="py-24 px-6 bg-cream-dark" id="work">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-charcoal mb-4">My Work</h2>
          <p className="text-charcoal-light text-lg">
            Projects delivered on Upwork
          </p>
        </div>

        {/* Pagination top bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted">
            Showing {page * ITEMS_PER_PAGE + 1}
            {"\u2013"}
            {Math.min((page + 1) * ITEMS_PER_PAGE, cards.length)} of {cards.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg border border-border-custom text-sm font-medium hover:bg-cream-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <span className="px-3 py-1.5 text-sm text-muted">
              {page + 1}/{totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 rounded-lg border border-border-custom text-sm font-medium hover:bg-cream-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pageCards.map((card) => (
            <PortfolioCard
              key={card.id}
              card={card}
              onOpen={() => setSelected(card)}
            />
          ))}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === page
                    ? "bg-accent-gold w-6"
                    : "bg-border-custom hover:bg-charcoal-light/30 w-2.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image side */}
              <div className="relative w-full md:w-3/5 h-80 md:h-auto bg-white flex-shrink-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lbIdx}
                    src={`${import.meta.env.BASE_URL}${selected.allImages[lbIdx]}`}
                    alt={selected.title}
                    className="max-w-full max-h-full object-contain p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </AnimatePresence>

                {selected.allImages.length > 1 && (
                  <>
                    <button
                      onClick={lbPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={lbNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selected.allImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setLbIdx(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === lbIdx
                              ? "bg-accent-gold w-4"
                              : "bg-gray-300 w-2"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Info side */}
              <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
                {/* Client photo and info */}
                {selected.clientPhoto && selected.clientName && (
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`${import.meta.env.BASE_URL}${selected.clientPhoto}`}
                      alt={selected.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent-gold"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{selected.clientName}</p>
                      {selected.company && (
                        <p className="text-xs text-muted">{selected.company}</p>
                      )}
                    </div>
                    <div className="ml-auto">
                      <Stars rating={selected.rating} size="md" />
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-charcoal mb-2">
                  {selected.title}
                </h3>

                {selected.feedback && (
                  <div className="bg-white rounded-lg p-4 border border-border-custom mb-4">
                    <p className="text-sm text-charcoal-light italic leading-relaxed">
                      &ldquo;{selected.feedback}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}