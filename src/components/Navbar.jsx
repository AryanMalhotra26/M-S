import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESS, NAV_LINKS } from '../data'
import { PhoneIcon } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Floating glass capsule */}
        <div
          className={`flex items-center justify-between rounded-full border border-line px-4 py-2.5 backdrop-blur-xl transition-all duration-400 sm:px-5 ${
            scrolled
              ? 'bg-paper/90 shadow-[0_10px_34px_-14px_rgba(19,19,17,0.25)]'
              : 'bg-paper/70 shadow-[0_6px_24px_-16px_rgba(19,19,17,0.18)]'
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg"
          >
            Malhotra Sons India<span className="text-accent">.</span>
          </a>

          {/* Centered links */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[13.5px] font-medium text-ink/65 transition-colors duration-300 hover:text-ink"
              >
                <span className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 scale-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-100" />
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:+91${BUSINESS.phone}`}
              aria-label={`Call ${BUSINESS.phone}`}
              title={`+91 ${BUSINESS.phone}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/60 text-ink transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="#contact"
              className="btn btn-dark hidden !px-4.5 !py-2 !text-[12.5px] sm:inline-flex"
            >
              Get a quote
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-white/60 lg:hidden"
            >
              <span
                className={`h-px w-4 bg-ink transition-all duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`}
              />
              <span
                className={`h-px w-4 bg-ink transition-all duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu: floating card under the capsule */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute inset-x-0 top-[calc(100%+10px)] overflow-hidden rounded-3xl border border-line bg-paper/95 p-3 shadow-[0_24px_60px_-20px_rgba(19,19,17,0.3)] backdrop-blur-xl lg:hidden"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -14, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold text-ink transition-colors hover:bg-card"
                >
                  {link.label}
                  <span className="text-accent">→</span>
                </motion.a>
              ))}
              <a
                href={`tel:+91${BUSINESS.phone}`}
                className="mt-1 flex items-center gap-3 rounded-2xl bg-ink px-4 py-3.5 text-[15px] font-semibold text-white"
              >
                <PhoneIcon className="h-4 w-4 text-accent" />
                Call +91 {BUSINESS.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
