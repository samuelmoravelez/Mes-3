import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarDays,
  Coffee,
  Heart,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import { formatDate } from '../hooks/useDayCounter'
import { timelineEvents } from '../data/timeline'
import { asset } from '../utils/asset'

const ICONS = {
  book: BookOpen,
  cart: ShoppingCart,
  coffee: Coffee,
  sparkles: Sparkles,
  heart: Heart,
  calendar: Calendar,
}

/**
 * SECCIÓN 2 · Línea de tiempo
 * Recorre los acontecimientos en orden. En móvil la línea va a la izquierda;
 * en pantallas grandes las tarjetas se alternan a ambos lados.
 */
export default function Timeline({ onNext }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="scene">
      <header className="max-w-2xl">
        <p className="eyebrow">Nuestra historia</p>
        <h2 className="title-display mt-3">
          La línea de tiempo de <span className="text-romantic-gradient">nosotros</span>
        </h2>
        <p className="mt-4 font-body text-sm leading-relaxed text-rosecloud/70">
          Cada fecha es una pequeña parada. Desliza para recorrerlas en orden.
        </p>
      </header>

      <div className="relative mt-14 sm:mt-16">
        {/* Hilo vertical */}
        <div className="absolute bottom-0 left-4 top-2 w-px bg-gradient-to-b from-transparent via-rosesky/35 to-transparent md:left-1/2" />

        <ol className="space-y-10 md:space-y-14">
          {timelineEvents.map((event, index) => {
            const Icon = ICONS[event.icon] || Sparkles
            const isOdd = index % 2 === 1

            return (
              <li key={event.id} className="relative">
                <motion.div
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-14 md:pl-0"
                >
                  {/* Nodo */}
                  <span className="absolute left-4 top-4 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-gold/40 bg-abyss/90 text-gold shadow-goldhalo md:left-1/2">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <article
                    className={`glass w-full rounded-3xl p-5 shadow-card sm:p-6 md:w-[calc(50%-2.75rem)] ${
                      isOdd ? 'md:ml-auto' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-rosesky/20 bg-white/[0.05] px-3 py-1 font-body text-[0.6rem] tracking-wide text-rosecloud/80">
                        <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                        {formatDate(event.date)}
                      </span>
                      <span className="font-body text-[0.55rem] uppercase tracking-[0.24em] text-rosecloud/35">
                        Capítulo {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-xl leading-snug text-rosecloud sm:text-2xl">
                      {event.title}
                    </h3>

                    <p className="mt-3 font-body text-[0.85rem] leading-relaxed text-rosecloud/70">
                      {event.description}
                    </p>

                    {event.image && (
                      <div className="mt-5 overflow-hidden rounded-2xl border border-rosesky/15">
                        <img
                          src={asset(event.image)}
                          alt={event.title}
                          loading="lazy"
                          decoding="async"
                          className="h-44 w-full object-cover sm:h-52"
                        />
                      </div>
                    )}
                  </article>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="handwriting text-2xl text-rosesky/90 sm:text-3xl">
          ...y todo lo que viene después
        </p>
        <button type="button" onClick={onNext} className="btn-romantic group">
          Ver la constelación
          <ArrowRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}
