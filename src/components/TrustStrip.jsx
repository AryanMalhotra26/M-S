import { TRUST_ITEMS } from '../data'

export default function TrustStrip() {
  const row = [...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {row.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="px-7 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/75">
                  {item}
                </span>
                <span className="text-sm text-accent">✱</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
