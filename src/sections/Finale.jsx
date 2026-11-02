import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, ImageOff, RotateCcw, Sparkles } from 'lucide-react'
import DayCounter from '../components/DayCounter'
import { textos } from '../data/letter'
import { SITE } from '../data/site'
import { asset } from '../utils/asset'

/**
 * SECCIÓN 5 · Final
 * Cierre cinematográfico: nuestra fotografía, corazón animado, la frase final
 * y el contador siempre actualizado.
 */

const OUR_PHOTO = 'images/nosotros/imagen1.jpg'

export default function Finale({ onRestart }) {
  const reduceMotion = useReducedMotion()
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <div className="scene flex min-h-[100svh] flex-col justify-center">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">El final de este capítulo</p>
        <h2 className="title-display mt-3">
          Lo que viene <span className="text-romantic-gradient">después</span>
        </h2>
      </header>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        {/* Nuestra fotografía real */}
        <motion.figure
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <span className="pointer-events-none absolute -inset-5 -z-10 rounded-[36px] bg-rosesky/10 blur-3xl" />
          <div className="glass overflow-hidden rounded-[28px] p-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-night via-abyss to-plum/70">
              {photoFailed ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                  <ImageOff className="h-7 w-7 text-rosesky/45" aria-hidden="true" />
                  <p className="px-6 font-body text-[0.62rem] uppercase tracking-[0.22em] text-rosecloud/50">
                    Fotografía por agregar en
                  </p>
                  <p className="font-body text-[0.6rem] tracking-wide text-gold/80">
                    public/images/nosotros/imagen1.jpg
                  </p>
                </div>
              ) : (
                <img
                  src={asset(OUR_PHOTO)}
                  alt="Nosotros"
                  loading="lazy"
                  decoding="async"
                  onError={() => setPhotoFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
            </div>
          </div>
          <figcaption className="mt-4 text-center font-body text-[0.58rem] uppercase tracking-[0.24em] text-rosecloud/45">
            {SITE.herName} · {SITE.title}
          </figcaption>
        </motion.figure>

        {/* Corazón + frases */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Corazón construido con elementos gráficos reales */}
          <div className="relative grid h-28 w-28 place-items-center">
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(233,169,196,0.35) 0%, rgba(217,183,126,0.14) 45%, transparent 72%)',
              }}
              animate={{ opacity: [0.55, 0.95, 0.55], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <svg
              viewBox="0 0 24 24"
              className="relative h-16 w-16 animate-heartbeat drop-shadow-[0_0_16px_rgba(233,169,196,0.75)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="finaleHeart" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F8E8E9" />
                  <stop offset="45%" stopColor="#E9A9C4" />
                  <stop offset="100%" stopColor="#D9B77E" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#finaleHeart)"
              />
            </svg>
          </div>

          <p className="mt-8 font-display text-2xl leading-relaxed text-rosecloud sm:text-3xl lg:text-[2.1rem]">
            {textos.finalePhrase}
          </p>

          <p className="handwriting mt-6 text-4xl text-rosesky drop-shadow-[0_0_22px_rgba(233,169,196,0.4)] sm:text-5xl">
            {textos.finaleEnd}
          </p>

          <div className="mt-9 w-full">
            <DayCounter variant="compact" />
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button type="button" onClick={onRestart} className="btn-ghost">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Volver al principio
            </button>
            <span className="inline-flex items-center gap-2 font-body text-[0.58rem] uppercase tracking-[0.22em] text-rosecloud/40">
              <Sparkles className="h-3 w-3 text-gold/70" aria-hidden="true" />
              Gracias por estos días
            </span>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-3 text-center">
        <div className="hairline w-64" />
        <p className="inline-flex items-center gap-2 font-body text-[0.58rem] uppercase tracking-[0.26em] text-rosecloud/45">
          <Heart className="h-3 w-3 text-rosesky/70" aria-hidden="true" />
          Hecho con tiempo, a mano, pensando en ti
        </p>
      </div>
    </div>
  )
}
