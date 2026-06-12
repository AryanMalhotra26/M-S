import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Reveal, { Lines, Eyebrow } from './Reveal'
import { BUSINESS } from '../data'

const ease = [0.22, 0.61, 0.36, 1]

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: [0.16, 1, 0.3, 1] })
      return controls.stop
    }
  }, [inView, count, to])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const STATS = [
  { value: <Counter to={30} suffix="+" />, label: 'Years in the trade', accent: true },
  { value: <Counter to={17} suffix="+" />, label: 'Brands in stock' },
  { value: <Counter to={8} />, label: 'Tyre categories' },
  { value: 'PAN', label: 'India delivery' },
]

const MILESTONES = [
  { tag: '1995', text: 'Founded in Delhi as a family tyre business' },
  { tag: 'Range', text: 'Every tyre category brought under one roof' },
  { tag: 'Scale', text: '17+ brands stocked, sourced directly' },
  { tag: 'Today', text: 'Dispatching to dealers across all of India' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky heading column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>About us</Eyebrow>
              <Lines
                lines={['Small firm.', 'Big inventory.']}
                className="mt-5 text-4xl sm:text-5xl lg:text-6xl"
              />
              <Reveal delay={0.2}>
                <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Family run since {BUSINESS.est}
                </span>
              </Reveal>
            </div>
          </div>

          {/* Copy + stats */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                {BUSINESS.name} has been one of Delhi&rsquo;s most trusted wholesale
                tyre houses since {BUSINESS.est}: every category of tyre, from every
                major brand, at true wholesale pricing.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                We supply dealers, fleet owners and distributors. Deep stock,
                straight answers, and dispatch you can set your watch by. That&rsquo;s
                been the deal for three decades.
              </p>
            </Reveal>

            {/* Stat band */}
            <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={0.08 * i}>
                  <div className="border-l-2 border-line pl-5 transition-colors duration-300 hover:border-accent">
                    <div
                      className={`font-display text-4xl font-semibold tracking-tight sm:text-5xl ${
                        stat.accent ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-[13px] font-medium text-muted">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="relative mt-12 lg:mt-14">
          {/* Connecting line, draws itself in */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease }}
            className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-line lg:block"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.15, ease }}
                className="relative"
              >
                <span
                  className={`relative z-10 block h-2.5 w-2.5 rounded-full border-2 border-accent ${
                    i === 0 ? 'bg-accent' : 'bg-paper'
                  }`}
                />
                <p className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
                  {m.tag}
                </p>
                <p className="mt-1 max-w-[15rem] text-[14px] leading-relaxed text-muted">
                  {m.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
