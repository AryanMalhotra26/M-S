import { BUSINESS, NAV_LINKS, whatsappLink } from '../data'
import { WhatsAppIcon, PhoneIcon } from './Icons'

function FooterMarquee() {
  const row = Array(4).fill(null)
  return (
    /* Straddles the footer's top edge: top half over the light page,
       bottom half over the dark footer */
    <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/2 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {row.map((_, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-8 font-display text-6xl font-bold uppercase leading-none tracking-tight text-accent sm:text-7xl lg:text-8xl"
              >
                Malhotra Sons India.
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <FooterMarquee />

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-8 lg:pb-16 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + company block */}
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              Malhotra Sons India<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-white/55">
              Every tyre. Every brand. Delivered across India, at wholesale, since{' '}
              {BUSINESS.est}.
            </p>
            <div className="mt-5 flex flex-col gap-1.5 text-[15px] text-white/70">
              <span>{BUSINESS.address}</span>
              <a
                href={`tel:+91${BUSINESS.phone}`}
                className="inline-flex w-fit items-center gap-2 font-semibold text-white transition-colors hover:text-accent"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                TEL. +91 {BUSINESS.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
              </a>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="btn mt-7 bg-white !py-3 text-ink hover:bg-accent hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Explore
            </p>
            <nav className="mt-5 flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group w-fit text-[15px] text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Contact
            </p>
            <div className="mt-5 flex flex-col gap-3.5 text-[15px] text-white/75">
              <a
                href={`tel:+91${BUSINESS.phone}`}
                className="w-fit font-semibold text-white transition-colors hover:text-accent"
              >
                +91 {BUSINESS.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-colors hover:text-white"
              >
                WhatsApp enquiries
              </a>
              <span>Est. {BUSINESS.est}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </span>
          <span>Delhi, India</span>
        </div>
      </div>
    </footer>
  )
}
