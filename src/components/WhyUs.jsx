import { motion } from 'framer-motion'
import { Lines, Eyebrow } from './Reveal'
import { WHY_US } from '../data'

const ease = [0.22, 0.61, 0.36, 1]

/* Bento treatment per card: spans, theme and the big figure */
const CARD_STYLE = [
  {
    span: 'lg:col-span-7',
    theme: 'bg-ink text-white',
    stat: '30+',
    statLabel: 'years',
    statClass: 'text-accent',
    descClass: 'text-white/60',
    indexClass: 'text-white/30',
  },
  {
    span: 'lg:col-span-5',
    theme: 'bg-card text-ink',
    stat: '12–49″',
    statLabel: 'rim sizes',
    statClass: 'text-ink',
    descClass: 'text-muted',
    indexClass: 'text-ink/30',
  },
  {
    span: 'lg:col-span-5',
    theme: 'bg-accent text-white',
    stat: '0',
    statLabel: 'middlemen',
    statClass: 'text-white',
    descClass: 'text-white/75',
    indexClass: 'text-white/40',
  },
  {
    span: 'lg:col-span-7',
    theme: 'border border-line bg-white text-ink',
    stat: 'PAN',
    statLabel: 'India',
    statClass: 'text-ink',
    descClass: 'text-muted',
    indexClass: 'text-ink/30',
  },
]

export default function WhyUs() {
  return (
    <section className="border-t border-line bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>Why choose us</Eyebrow>
        <Lines
          lines={['Reliable supply,', 'supplied.']}
          className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl"
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {WHY_US.map((item, i) => {
            const s = CARD_STYLE[i]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 44, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease }}
                whileHover={{ y: -6 }}
                className={`flex min-h-[280px] flex-col justify-between rounded-3xl p-8 sm:p-10 ${s.span} ${s.theme}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span
                      className={`font-display text-6xl font-semibold leading-none tracking-tight sm:text-7xl ${s.statClass}`}
                    >
                      {s.stat}
                    </span>
                    <span
                      className={`mt-2 block text-[12px] font-semibold uppercase tracking-[0.2em] ${s.indexClass}`}
                    >
                      {s.statLabel}
                    </span>
                  </div>
                  <span className={`font-display text-sm font-semibold ${s.indexClass}`}>
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-10">
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.6rem]">
                    {item.title}
                  </h3>
                  <p className={`mt-2.5 max-w-md text-[15px] leading-relaxed ${s.descClass}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
