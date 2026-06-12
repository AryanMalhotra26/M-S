import { useState } from 'react'
import { motion } from 'framer-motion'
import { BUSINESS, CATEGORIES, whatsappLink } from '../data'
import { PhoneIcon, WhatsAppIcon, PinIcon } from './Icons'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-[15px] text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-accent/70 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,83,16,0.15)]'

const ease = [0.22, 0.61, 0.36, 1]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    company: '',
    category: '',
    requirement: '',
  })

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = [
      `Hello ${BUSINESS.name}, I have a wholesale enquiry.`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.company && `Company: ${form.company}`,
      form.category && `Category: ${form.category}`,
      ``,
      `Requirement: ${form.requirement}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(whatsappLink(msg), '_blank')
  }

  return (
    <section id="contact" className="scroll-mt-24 py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="relative overflow-hidden rounded-[2.5rem] bg-ink p-7 text-white sm:p-10 lg:p-14"
        >
          {/* Soft accent glow in the corner */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-[110px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left: talk to us */}
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Contact
              </span>

              <h2 className="headline mt-5 text-4xl text-white sm:text-5xl lg:text-6xl">
                Let&rsquo;s talk <span className="text-accent">tyres.</span>
              </h2>

              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/55">
                One call gets you stock confirmation and a wholesale price. Or send
                the form and it lands straight in our WhatsApp.
              </p>

              <a
                href={`tel:+91${BUSINESS.phone}`}
                className="group mt-8 inline-flex w-fit items-center gap-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Call us directly
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                    +91 {BUSINESS.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
                  </span>
                </span>
              </a>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[#1faa53] !py-3 !text-[13px] text-white hover:bg-[#178a43]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[13px] text-white/65">
                  <PinIcon className="h-3.5 w-3.5 text-accent" />
                  {BUSINESS.address} · Est. {BUSINESS.est}
                </span>
              </div>

              <div className="mt-8 flex-1 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title="Malhotra Sons India on Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&output=embed`}
                  className="h-56 w-full lg:h-full lg:min-h-[220px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right: enquiry form */}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                Send an enquiry
              </h3>
              <p className="mt-1 text-[14px] text-white/50">
                Fill this in and it opens straight in WhatsApp. We reply fast.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name *"
                  className={inputClass}
                />
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="Phone number *"
                  className={inputClass}
                />
                <input
                  value={form.company}
                  onChange={set('company')}
                  placeholder="Company / firm"
                  className={inputClass}
                />
                <select
                  value={form.category}
                  onChange={set('category')}
                  className={`${inputClass} appearance-none ${form.category ? '' : 'text-white/35'}`}
                >
                  <option value="" disabled className="bg-ink text-white/60">
                    Tyre category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name} className="bg-ink text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  rows={5}
                  value={form.requirement}
                  onChange={set('requirement')}
                  placeholder="Your requirement: brand, size, quantity *"
                  className={`${inputClass} resize-none sm:col-span-2`}
                />
              </div>

              <button
                type="submit"
                className="btn mt-6 w-full justify-center bg-accent text-white hover:bg-white hover:text-ink"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Send via WhatsApp
              </button>
              <p className="mt-3 text-center text-[12px] text-white/35">
                No account needed. Opens in your WhatsApp with the message pre-filled.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
