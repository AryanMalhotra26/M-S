import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState, lazy, Suspense } from 'react'
import { BUSINESS, whatsappLink } from '../data'
import { WhatsAppIcon, ArrowIcon } from './Icons'

const TyreScene = lazy(() => import('./TyreScene'))

const ease = [0.22, 0.61, 0.36, 1]

/* Stage windows along the 320vh scroll. Keep in sync with POSE in TyreScene. */
const stageFor = (p) => (p < 0.27 ? 0 : p < 0.65 ? 1 : 2)

const stageClass = (active, hiddenShift) =>
  `transition-[opacity,transform,visibility] duration-500 ease-out will-change-[opacity,transform] ${
    active ? 'visible translate-y-0 opacity-100' : `invisible opacity-0 ${hiddenShift}`
  }`

export default function Hero() {
  const ref = useRef(null)
  const [stage, setStage] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const s = stageFor(v)
    setStage((prev) => (prev === s ? prev : s))
  })

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="top" ref={ref} className="relative h-[320svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* 3D wheel, scroll-driven */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <TyreScene progress={scrollYProgress} />
          </Suspense>
        </div>

        {/* Stage 1: left */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-start pt-[14svh] sm:items-center sm:pt-0 ${stageClass(stage === 0, '-translate-y-10')}`}
        >
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Wholesale tyre distributors · Delhi · Since {BUSINESS.est}
            </motion.p>
            <h1 className="headline mt-6 max-w-xl text-[15vw] text-ink sm:text-8xl lg:text-[6.5rem]">
              <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.25, ease }}
                >
                  Every tyre.
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="mt-5 max-w-[17rem] text-base leading-relaxed text-muted sm:max-w-sm sm:text-lg"
            >
              Passenger to OTR. Eight categories, every size, on our racks today.
            </motion.p>
          </div>
        </div>

        {/* Stage 2: right */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-start pt-[14svh] sm:items-center sm:pt-0 ${stageClass(stage === 1, 'translate-y-10')}`}
        >
          <div className="mx-auto flex w-full max-w-7xl justify-end px-5 sm:px-8">
            <div className="text-right">
              <h2 className="headline text-[15vw] text-ink sm:text-8xl lg:text-[6.5rem]">
                Every brand.
              </h2>
              <p className="ml-auto mt-5 max-w-[17rem] text-base leading-relaxed text-muted sm:max-w-sm sm:text-lg">
                MRF to Michelin. 17+ makers, sourced directly, priced at true
                wholesale.
              </p>
            </div>
          </div>
        </div>

        {/* Stage 3: centered finale with CTAs */}
        <div
          className={`absolute inset-0 flex flex-col items-center pt-[17svh] text-center sm:pt-[16svh] ${stageClass(stage === 2, 'translate-y-10')}`}
        >
          <h2 className="headline px-5 text-[12vw] text-ink sm:text-7xl lg:text-8xl">
            Delivered <span className="text-accent">across India.</span>
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 px-5">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-dark">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
            <a href="#contact" className="btn btn-outline group">
              Get a quote
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className={`pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 transition-opacity duration-500 ${
            stage === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-8 w-px bg-ink/40"
          />
        </div>

        {/* Scroll progress hairline */}
        <motion.div
          style={{ scaleX: barScale }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
        />
      </div>
    </section>
  )
}
