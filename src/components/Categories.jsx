import { motion } from 'framer-motion'
import { Lines, Eyebrow } from './Reveal'
import { CategoryIcon, ArrowIcon } from './Icons'
import { CATEGORIES, whatsappLink } from '../data'

const ease = [0.22, 0.61, 0.36, 1]

function CategoryRow({ cat, index }) {
  return (
    <motion.a
      href={whatsappLink(
        `Hello Malhotra Sons India, I'd like a wholesale quote for ${cat.name} tyres.`
      )}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
      className="group relative block overflow-hidden border-t border-line last:border-b"
    >
      {/* Dark curtain that sweeps up on hover */}
      <span
        aria-hidden
        className="absolute inset-0 translate-y-[101%] bg-ink transition-transform duration-400 ease-out group-hover:translate-y-0"
      />

      <div className="relative z-10 flex items-center gap-5 px-2 py-6 sm:gap-8 sm:px-4 sm:py-7">
        <span className="w-8 shrink-0 font-display text-sm font-semibold text-muted/60 transition-colors duration-300 group-hover:text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className="flex-1 font-display text-2xl font-semibold tracking-tight text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-white sm:text-3xl lg:text-4xl">
          {cat.name}
        </h3>

        <p className="hidden max-w-xs text-[14px] leading-snug text-muted transition-colors duration-300 group-hover:text-white/60 md:block">
          {cat.desc}
        </p>

        {/* Icon circle flips to an orange arrow on hover */}
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent sm:h-14 sm:w-14">
          <span className="absolute transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
            <CategoryIcon name={cat.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="absolute translate-y-8 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowIcon className="h-5 w-5 -rotate-45" />
          </span>
        </span>
      </div>
    </motion.a>
  )
}

export default function Categories() {
  return (
    <section id="products" className="scroll-mt-24 border-t border-line bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Product categories</Eyebrow>
            <Lines
              lines={['Whatever rolls,', 'we stock it.']}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm text-base leading-relaxed text-muted"
          >
            Eight categories, every size and speed rating. Tap one to enquire
            directly on WhatsApp.
          </motion.p>
        </div>

        <div className="mt-8">
          {CATEGORIES.map((cat, i) => (
            <CategoryRow key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
