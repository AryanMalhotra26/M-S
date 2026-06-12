import { motion } from 'framer-motion'
import { whatsappLink } from '../data'
import { WhatsAppIcon } from './Icons'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-[#1faa53] text-white shadow-[0_10px_30px_-6px_rgba(31,170,83,0.5)]"
      style={{ height: 56, width: 56 }}
    >
      <WhatsAppIcon className="h-6.5 w-6.5" />
    </motion.a>
  )
}
