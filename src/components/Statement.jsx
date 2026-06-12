import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TEXT =
  'We keep India rolling. Since 1995, dealers, fleets and distributors have trusted us for one simple reason: the tyre they need is always on our racks, at a price that works.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

export default function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.5'],
  })
  const words = TEXT.split(' ')

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p
          ref={ref}
          className="headline text-3xl leading-[1.18] text-ink sm:text-4xl lg:text-[2.9rem]"
        >
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 4) / words.length)]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
