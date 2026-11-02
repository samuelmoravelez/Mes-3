import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { SITE } from '../data/site'

/**
 * Navegación entre las cinco escenas.
 * - Barra inferior con puntos y flechas (funciona igual en móvil y escritorio).
 * - Barra superior con el monograma y el progreso del recorrido.
 * - Nunca desmonta la música ni pierde el estado de los recuerdos:
 *   el estado vive en App.jsx.
 */
export default function Navigation({
  scenes,
  current,
  onChange,
  onPrev,
  onNext,
  canPrev,
  canNext,
}) {
  const total = scenes.length
  const progress = ((current + 1) / total) * 100

  return (
    <>
      {/* Progreso del recorrido */}
      <div className="fixed inset-x-0 top-0 z-[65] h-[2px] bg-rosecloud/10">
        <motion.div
          className="h-full bg-gradient-to-r from-rosesky via-gold to-rosesky"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Monograma */}
      <div className="pointer-events-none fixed left-4 top-4 z-[60] flex items-center gap-2.5 sm:left-6 sm:top-5">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-rosesky/30 bg-abyss/60 backdrop-blur-sm">
          <Heart className="h-3.5 w-3.5 text-rosesky" aria-hidden="true" />
        </span>
        <span className="hidden font-body text-[0.58rem] uppercase leading-tight tracking-[0.2em] text-rosecloud/60 sm:block">
          {SITE.title}
        </span>
      </div>

      {/* Navegación inferior */}
      <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 sm:bottom-6">
        <div className="flex flex-col items-center">
          <motion.p
            key={scenes[current].id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 font-body text-[0.55rem] uppercase tracking-[0.26em] text-rosecloud/55 sm:text-[0.6rem]"
          >
            {scenes[current].label}
            <span className="ml-2 text-gold/70">
              {current + 1}/{total}
            </span>
          </motion.p>

          <nav
            aria-label="Navegación entre escenas"
            className="glass flex items-center gap-1 rounded-full px-2 py-1.5 shadow-card sm:gap-2 sm:px-3"
          >
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Escena anterior"
              className="grid h-8 w-8 place-items-center rounded-full text-rosecloud/70 transition-colors duration-300 hover:text-gold disabled:cursor-not-allowed disabled:opacity-25 sm:h-9 sm:w-9"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <ul className="flex items-center gap-1.5 px-1 sm:gap-2">
              {scenes.map((scene, index) => {
                const active = index === current
                return (
                  <li key={scene.id}>
                    <button
                      type="button"
                      onClick={() => onChange(index)}
                      aria-label={`Ir a ${scene.label}`}
                      aria-current={active ? 'true' : undefined}
                      title={scene.label}
                      className="group grid h-8 w-6 place-items-center"
                    >
                      <motion.span
                        className="block h-1.5 rounded-full transition-colors duration-300"
                        animate={{
                          width: active ? 22 : 6,
                          backgroundColor: active
                            ? '#D9B77E'
                            : 'rgba(248,232,233,0.28)',
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>

            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              aria-label="Escena siguiente"
              className="grid h-8 w-8 place-items-center rounded-full text-rosecloud/70 transition-colors duration-300 hover:text-gold disabled:cursor-not-allowed disabled:opacity-25 sm:h-9 sm:w-9"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
