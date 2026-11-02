import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Feather, Heart, Mail, SkipForward } from 'lucide-react'
import { letter } from '../data/letter'
import { SITE } from '../data/site'

/**
 * SECCIÓN 4 · Una carta para ti
 * Sobre cerrado → animación de apertura → carta que se escribe sola.
 * Todo el texto se edita en src/data/letter.js
 */

const LETTER_PARAGRAPHS = [letter.intro, ...letter.paragraphs]

export default function LoveLetter({ onNext }) {
  const reduceMotion = useReducedMotion()
  const [opened, setOpened] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [typedLength, setTypedLength] = useState(0)

  /* Texto completo (con saltos de línea entre párrafos) */
  const fullText = useMemo(
    () => LETTER_PARAGRAPHS.join('\n\n'),
    []
  )
  const finished = typedLength >= fullText.length

  /* Abrir el sobre: primero la solapa, después la carta */
  useEffect(() => {
    if (!opened) return undefined
    const timer = window.setTimeout(() => setShowLetter(true), reduceMotion ? 0 : 850)
    return () => window.clearTimeout(timer)
  }, [opened, reduceMotion])

  /* Efecto máquina de escribir */
  useEffect(() => {
    if (!showLetter) return undefined
    if (reduceMotion) {
      setTypedLength(fullText.length)
      return undefined
    }

    let index = 0
    const timer = window.setInterval(() => {
      index += 3
      setTypedLength(Math.min(index, fullText.length))
      if (index >= fullText.length) window.clearInterval(timer)
    }, 20)

    return () => window.clearInterval(timer)
  }, [showLetter, reduceMotion, fullText])

  const typed = fullText.slice(0, typedLength)

  return (
    <div className="scene relative flex min-h-[100svh] flex-col justify-center">
      {/* Calidez del ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(217,183,126,0.16) 0%, transparent 70%), radial-gradient(50% 40% at 80% 80%, rgba(233,169,196,0.12) 0%, transparent 70%)',
        }}
      />

      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Una carta para ti</p>
      </header>

      <div className="mt-12 flex flex-col items-center">
        {/* Sobre cerrado */}
        <AnimatePresence>
          {!showLetter && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18, scale: 0.94 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpened(true)}
                disabled={opened}
                aria-label="Abrir la carta"
                className="group relative block w-[min(84vw,22rem)] cursor-pointer outline-none"
              >
                <span className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gold/10 blur-3xl" />

                <motion.div
                  className="relative aspect-[3/2] w-full"
                  style={{ perspective: 1200 }}
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Cuerpo del sobre */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-[#F3E7D2] via-[#EADCC2] to-[#DCCBAE] shadow-card">
                    {/* Solapas laterales */}
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(0 0, 50% 42%, 0 100%)',
                        background: 'linear-gradient(120deg,#E3D3B6,#D6C3A2)',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(100% 0, 50% 42%, 100% 100%)',
                        background: 'linear-gradient(240deg,#E3D3B6,#D0BC9A)',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)',
                        background: 'linear-gradient(0deg,#EFE2CA,#E4D4B6)',
                      }}
                    />

                    {/* Solapa superior */}
                    <motion.div
                      className="absolute inset-x-0 top-0 origin-top"
                      style={{ transformStyle: 'preserve-3d', height: '50%' }}
                      animate={{ rotateX: opened ? -178 : 0 }}
                      transition={{ duration: reduceMotion ? 0.2 : 1.1, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div
                        className="h-full w-full border-b border-gold/30"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                          background: 'linear-gradient(180deg,#F2E6D0,#DFCFB0)',
                          backfaceVisibility: 'hidden',
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Sello de cera */}
                  <motion.span
                    className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/60 shadow-goldhalo"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 30%, #C98A9E 0%, #A9637C 55%, #7E4557 100%)',
                    }}
                    animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.7 : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="h-5 w-5 text-cream/90" aria-hidden="true" />
                  </motion.span>
                </motion.div>

                <span className="mt-7 inline-flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-[0.26em] text-rosecloud/60 transition-colors duration-500 group-hover:text-gold">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Abrir la carta
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* La carta */}
        <AnimatePresence>
          {showLetter && (
            <motion.article
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 54, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-warm relative w-full max-w-2xl overflow-hidden rounded-[26px] px-6 py-9 sm:px-12 sm:py-12"
            >
              {/* Detalles del papel */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                  background:
                    'radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.6) 0%, transparent 60%)',
                }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold/70 to-transparent"
              />

              <div className="relative">
                <p className="handwriting text-3xl leading-none text-[#7E4557] sm:text-4xl">
                  {letter.greeting}
                </p>

                <div className="relative mt-7">
                  {/* Reserva el espacio del texto final para que la carta no salte */}
                  <p
                    aria-hidden="true"
                    className="invisible whitespace-pre-line handwriting text-[1.15rem] leading-[1.9] sm:text-[1.4rem] sm:leading-[2]"
                  >
                    {fullText}
                  </p>

                  <p
                    className="absolute inset-0 whitespace-pre-line handwriting text-[1.15rem] leading-[1.9] text-[#3A2A33] sm:text-[1.4rem] sm:leading-[2]"
                    aria-live="polite"
                  >
                    {typed}
                    {!finished && (
                      <motion.span
                        className="ml-1 inline-block h-5 w-[2px] translate-y-[2px] bg-[#A9637C]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        aria-hidden="true"
                      />
                    )}
                  </p>
                </div>

                <AnimatePresence>
                  {finished && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-9"
                    >
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A97A]/70 to-transparent" />
                      <p className="mt-6 font-display text-lg italic text-[#5B4A3A]">
                        {letter.closing}
                      </p>
                      <p className="handwriting mt-1 text-3xl leading-none text-[#7E4557] sm:text-4xl">
                        {letter.signature}
                      </p>
                      <p className="mt-3 inline-flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-[0.22em] text-[#8A7358]">
                        <Feather className="h-3.5 w-3.5" aria-hidden="true" />
                        {SITE.herName}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {showLetter && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {!finished && (
              <button
                type="button"
                onClick={() => setTypedLength(fullText.length)}
                className="btn-ghost"
              >
                <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
                Leer toda la carta
              </button>
            )}

            {finished && (
              <motion.button
                type="button"
                onClick={onNext}
                className="btn-romantic group"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Ver el final
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
