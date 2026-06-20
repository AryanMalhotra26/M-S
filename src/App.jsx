import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Statement from './components/Statement'
import About from './components/About'
import Categories from './components/Categories'
import Brands from './components/Brands'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <TrustStrip />
          <Statement />
          <About />
          <Categories />
          <Brands />
          <WhyUs />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  )
}
