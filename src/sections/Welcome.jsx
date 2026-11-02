import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import DayCounter from '../components/DayCounter'
import { formatDate } from '../hooks/useDayCounter'
import { SITE } from '../data/site'

/**
 * SECCIÓN 1 · Bienvenida
 * Pantalla cinematográfica de apertura con el contador en vivo.
 */
export default function Welcome({ onStart }) {
  const reduceMotion = useReducedMotion()
  const words = SITE.title.split(' ')

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.15 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="scene flex min-h-[100svh] flex-col items-center justify-center text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col items-center"
      >
        <motion.p variants={item} className="eyebrow flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-gold" aria-hidden="true" />
          {formatDate(SITE.startDate)} · {SITE.milestoneDays} días
          <Sparkles className="h-3 w-3 text-gold" aria-hidden="true" />
        </motion.p>

        <h1 className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-display text-[2.4rem] leading-[1.05] sm:text-6xl lg:text-7xl">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={item}
              className={
                index === 0
                  ? 'text-romantic-gradient animate-shimmer'
                  : 'text-rosecloud'
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div variants={item} className="mt-6 w-full max-w-md">
          <div className="hairline mx-auto w-40" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg font-body text-sm leading-relaxed text-rosecloud/75 sm:text-base"
        >
          {SITE.welcomePhrase}
        </motion.p>

        <motion.p
          variants={item}
          className="handwriting mt-4 text-4xl text-rosesky drop-shadow-[0_0_18px_rgba(233,169,196,0.35)] sm:text-5xl"
        >
          {SITE.herName}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex w-full justify-center">
          <DayCounter />
        </motion.div>

        <motion.div variants={item} className="mt-10">
          <button type="button" onClick={onStart} className="btn-romantic group">
            Comenzar nuestro viaje
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 inline-flex items-center gap-2 font-body text-[0.58rem] uppercase tracking-[0.24em] text-rosecloud/40"
        >
          <Heart className="h-3 w-3 text-rosesky/70" aria-hidden="true" />
          Hecho a mano para ti
        </motion.p>
      </motion.div>
    </div>
  )
}
