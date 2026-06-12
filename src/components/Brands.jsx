import { motion } from 'framer-motion'
import Reveal, { Lines, Eyebrow } from './Reveal'
import { BRANDS } from '../data'

function MarqueeRow({ brands, reverse = false }) {
  const row = [...brands, ...brands]
  return (
    <div className="flex w-max animate-marquee-slow" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {row.map((brand, i) => (
            <span key={`${copy}-${i}`} className="flex items-center">
              <span className="whitespace-nowrap px-8 font-display text-3xl font-bold tracking-tight text-ink/30 transition-colors duration-300 hover:text-ink sm:px-10 sm:text-4xl">
                {brand}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Brands() {
  const half = Math.ceil(BRANDS.length / 2)

  return (
    <section id="brands" className="scroll-mt-24 border-t border-line py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>Brands we deal in</Eyebrow>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Lines lines={['In good company.']} className="text-4xl sm:text-5xl lg:text-6xl" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm text-base leading-relaxed text-muted"
          >
            Every major Indian and international tyre maker, sourced directly and
            stocked deep. If it&rsquo;s sold in India, we can get it.
          </motion.p>
        </div>
      </div>

      <Reveal delay={0.15} className="mt-8 space-y-6 overflow-hidden border-y border-line py-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeRow brands={BRANDS.slice(0, half)} />
        <MarqueeRow brands={BRANDS.slice(half)} reverse />
      </Reveal>
    </section>
  )
}
