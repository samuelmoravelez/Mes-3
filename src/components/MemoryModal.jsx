import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarDays, Heart, ImageOff, PenLine, X } from 'lucide-react'
import { formatDate } from '../hooks/useDayCounter'
import { asset } from '../utils/asset'

/**
 * Ventana elegante donde se revela un recuerdo.
 * Se monta con un portal sobre <body> para que ningún contenedor con
 * transformaciones (la constelación hace zoom) rompa el posicionamiento fijo.
 */
export default function MemoryModal({
  memory,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const reduceMotion = useReducedMotion()
  const closeRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const [imageFailed, setImageFailed] = useState(false)
  const open = Boolean(memory)

  useEffect(() => {
    setImageFailed(false)
  }, [memory?.id])

  /* Bloquea el scroll de fondo y devuelve el foco al cerrar */
  useEffect(() => {
    if (!open) return undefined

    lastFocusedRef.current = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 120)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus({ preventScroll: true })
      }
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-abyss/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Recuerdo ${index + 1} de ${total}: ${memory.title}`}
            className="glass relative z-10 max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-[28px] p-1.5 shadow-card scroll-romantic"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[24px] border border-rosesky/15">
              {/* Imagen opcional (o marco elegante si aún no hay foto) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-night via-abyss to-plum/60">
                {memory.image && !imageFailed ? (
                  <img
                    src={asset(memory.image)}
                    alt={`Recuerdo: ${memory.title}`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImageFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                    <ImageOff className="h-7 w-7 text-rosesky/45" aria-hidden="true" />
                    <p className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-rosecloud/50">
                      Fotografía por agregar
                    </p>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss via-abyss/35 to-transparent" />

                <button
                  type="button"
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Cerrar recuerdo"
                  className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-rosesky/25 bg-abyss/70 text-rosecloud transition-colors duration-300 hover:border-gold/70 hover:text-gold"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-body text-[0.58rem] uppercase tracking-[0.28em] text-gold/85">
                    Recuerdo {index + 1} de {total}
                  </p>
                  <h3 className="mt-1 font-display text-2xl leading-tight text-rosecloud sm:text-3xl">
                    {memory.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-5 px-5 py-6 sm:px-8 sm:py-7">
                {(memory.date || memory.placeholder) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {memory.date && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-rosesky/20 bg-white/[0.05] px-3 py-1 font-body text-[0.62rem] tracking-wide text-rosecloud/80">
                        <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                        {formatDate(memory.date)}
                      </span>
                    )}
                    {memory.placeholder && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-body text-[0.58rem] uppercase tracking-[0.18em] text-gold/90">
                        <PenLine className="h-3 w-3" aria-hidden="true" />
                        Contenido de ejemplo
                      </span>
                    )}
                  </div>
                )}

                <p className="font-body text-sm leading-relaxed text-rosecloud/80 sm:text-[0.95rem]">
                  {memory.description}
                </p>

                {memory.message && (
                  <>
                    <div className="hairline" />

                    <div className="relative rounded-2xl border border-gold/20 bg-gradient-to-br from-rosesky/10 via-transparent to-gold/[0.07] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-gold" aria-hidden="true" />
                        <span className="font-body text-[0.58rem] uppercase tracking-[0.24em] text-gold/90">
                          Mensaje para ti
                        </span>
                      </div>
                      <motion.p
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="handwriting text-xl leading-relaxed text-cream sm:text-2xl"
                      >
                        {memory.message}
                      </motion.p>
                    </div>
                  </>
                )}

                {memory.placeholder && (
                  <p className="font-body text-[0.62rem] leading-relaxed text-rosecloud/45">
                    Edita este recuerdo en <span className="text-gold/80">src/data/memories.js</span>
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={!hasPrev}
                      aria-label="Recuerdo anterior"
                      className="btn-ghost disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      Anterior
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={!hasNext}
                      aria-label="Recuerdo siguiente"
                      className="btn-ghost disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Siguiente
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <button type="button" onClick={onClose} className="btn-ghost">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
