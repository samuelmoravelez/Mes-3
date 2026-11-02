import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import Star from '../components/Star'
import MemoryModal from '../components/MemoryModal'
import { TOTAL_MEMORIES, memories, memoryLinks } from '../data/memories'
import { textos } from '../data/letter'

/**
 * SECCIÓN 3 · Constelación de nuestros recuerdos
 * Universo interactivo con nuestras estrellas. Cada estrella abre un recuerdo.
 * Al descubrirlas todas, las estrellas se alinean y aparece un corazón
 * dibujado con líneas y estrellas reales (no es una imagen).
 */

/* Corazón paramétrico: se calcula, no se dibuja a mano */
function buildHeartPoints(samples = 96) {
  const points = []
  for (let index = 0; index <= samples; index += 1) {
    const t = (index / samples) * Math.PI * 2
    const x = 16 * Math.sin(t) ** 3
    const y =
      13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    points.push({
      x: 50 + x * 2.4,
      y: 50 - (y + 6) * 2.4,
    })
  }
  return points
}

const HEART_POINTS = buildHeartPoints()
const HEART_PATH = `${HEART_POINTS.map(
  (point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`
).join(' ')} Z`

export default function Constellation({ discovered, onDiscover, onModalChange, onNext }) {
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState(null)
  const [showHeart, setShowHeart] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const discoveredCount = discovered.length
  const complete = discoveredCount >= TOTAL_MEMORIES
  const selectedIndex = selected ? memories.findIndex((item) => item.id === selected.id) : -1

  /* Polvo de estrellas propio del mapa (da profundidad al hacer zoom) */
  const dustStars = useMemo(
    () =>
      Array.from({ length: 64 }, (_, index) => ({
        id: `dust-${index}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${(Math.random() * 1.6 + 0.5).toFixed(2)}px`,
        opacity: 0.25 + Math.random() * 0.5,
        delay: `${(Math.random() * 4).toFixed(2)}s`,
        duration: `${(2.4 + Math.random() * 3).toFixed(2)}s`,
      })),
    []
  )

  /* Cuando se descubren todas las estrellas: primero el corazón, luego la frase */
  useEffect(() => {
    if (!complete) {
      setShowHeart(false)
      setShowMessage(false)
      return undefined
    }

    const heartTimer = window.setTimeout(() => setShowHeart(true), 350)
    const messageTimer = window.setTimeout(() => setShowMessage(true), reduceMotion ? 600 : 3200)

    return () => {
      window.clearTimeout(heartTimer)
      window.clearTimeout(messageTimer)
    }
  }, [complete, reduceMotion])

  const handleSelect = (memory) => {
    setSelected(memory)
    onDiscover(memory.id)
    onModalChange(true)
  }

  const handleClose = () => {
    setSelected(null)
    onModalChange(false)
  }

  /* Avanzar / regresar entre los recuerdos desde la ventana */
  const handlePrev = () => {
    if (selectedIndex <= 0) return
    const prev = memories[selectedIndex - 1]
    setSelected(prev)
    onDiscover(prev.id)
  }

  const handleNext = () => {
    if (selectedIndex < 0 || selectedIndex >= memories.length - 1) return
    const next = memories[selectedIndex + 1]
    setSelected(next)
    onDiscover(next.id)
  }

  const zoom = selected
    ? {
        scale: reduceMotion ? 1 : 1.32,
        x: `${50 - selected.coords.x}%`,
        y: `${50 - selected.coords.y}%`,
      }
    : { scale: 1, x: '0%', y: '0%' }

  return (
    <div className="scene">
      <header className="max-w-2xl">
        <p className="eyebrow">El cielo que construimos</p>
        <h2 className="title-display mt-3">
          La constelación de{' '}
          <span className="text-romantic-gradient">nuestros recuerdos</span>
        </h2>
        <p className="mt-4 font-body text-sm leading-relaxed text-rosecloud/70">
          {textos.constellationIntro}
        </p>
      </header>

      {/* Progreso del descubrimiento */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="glass flex items-center gap-3 rounded-full px-4 py-2">
          <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          <span className="font-body text-[0.66rem] uppercase tracking-[0.2em] text-rosecloud/80">
            Has descubierto {discoveredCount} de {TOTAL_MEMORIES} recuerdos
          </span>
        </div>

        <ul className="flex items-center gap-1.5" aria-hidden="true">
          {memories.map((memory) => (
            <li key={memory.id}>
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  discovered.includes(memory.id)
                    ? 'w-5 bg-gold shadow-goldhalo'
                    : 'w-1.5 bg-rosecloud/25'
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Mapa estelar */}
      <div className="relative mt-8">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-4xl overflow-hidden rounded-[30px] border border-rosesky/15 bg-[radial-gradient(80%_60%_at_28%_18%,rgba(91,74,122,0.55),transparent_62%),radial-gradient(70%_60%_at_78%_74%,rgba(233,169,196,0.16),transparent_66%),linear-gradient(160deg,#141838_0%,#0B0E20_100%)] shadow-card sm:aspect-[3/2] lg:aspect-[16/10]">
          {/* Polvo de estrellas del mapa */}
          <div className="absolute inset-0">
            {dustStars.map((dust) => (
              <span
                key={dust.id}
                className="absolute animate-twinkle rounded-full bg-rosecloud"
                style={{
                  left: dust.left,
                  top: dust.top,
                  width: dust.size,
                  height: dust.size,
                  opacity: dust.opacity,
                  animationDelay: dust.delay,
                  animationDuration: dust.duration,
                }}
              />
            ))}
          </div>

          <motion.div
            className="absolute inset-0"
            animate={zoom}
            transition={{ duration: reduceMotion ? 0.2 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Líneas finas que unen las estrellas */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {memoryLinks.map(([from, to]) => {
                const origin = memories.find((memory) => memory.id === from)
                const target = memories.find((memory) => memory.id === to)
                if (!origin || !target) return null

                const lit = discovered.includes(from) && discovered.includes(to)

                return (
                  <motion.line
                    key={`${from}-${to}`}
                    x1={origin.coords.x}
                    y1={origin.coords.y}
                    x2={target.coords.x}
                    y2={target.coords.y}
                    stroke={lit ? 'rgba(217,183,126,0.55)' : 'rgba(248,232,233,0.14)'}
                    strokeWidth={lit ? 0.7 : 0.45}
                    strokeDasharray="2 2.6"
                    vectorEffect="non-scaling-stroke"
                    initial={false}
                    animate={{ opacity: lit ? 1 : 0.7 }}
                    transition={{ duration: 0.8 }}
                  />
                )
              })}
            </svg>

            {/* Las estrellas */}
            {memories.map((memory, index) => (
              <Star
                key={memory.id}
                memory={memory}
                index={index}
                discovered={discovered.includes(memory.id)}
                isActive={selected?.id === memory.id}
                dimmed={Boolean(selected) && selected.id !== memory.id}
                onSelect={handleSelect}
              />
            ))}
          </motion.div>

          {/* Corazón: líneas y estrellas reales trazadas con matemáticas */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Halo cálido detrás del corazón */}
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(233,169,196,0.22) 0%, rgba(217,183,126,0.12) 40%, transparent 70%)',
                  }}
                  animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.96, 1.04, 0.96] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <svg
                  className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="heartStarGlow">
                      <stop offset="0%" stopColor="#FFF6EA" stopOpacity="1" />
                      <stop offset="45%" stopColor="#E9A9C4" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#E9A9C4" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Trazo del corazón */}
                  <motion.path
                    d={HEART_PATH}
                    fill="rgba(233,169,196,0.045)"
                    stroke="#E9A9C4"
                    strokeWidth={0.9}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(233,169,196,0.9))' }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: reduceMotion ? 0.4 : 2.8, ease: 'easeInOut' },
                      opacity: { duration: 0.8 },
                    }}
                  />

                  {/* Estrellas que van encendiendo el contorno */}
                  {HEART_POINTS.filter((_, index) => index % 4 === 0).map((point, index) => (
                    <motion.circle
                      key={`heart-star-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r={1.5}
                      fill="url(#heartStarGlow)"
                      initial={{ opacity: 0, r: 0 }}
                      animate={{ opacity: 0.95, r: 1.5 }}
                      transition={{
                        delay: reduceMotion ? 0 : 0.9 + index * 0.12,
                        duration: 0.7,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Viñeta interior */}
          <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(110%_100%_at_50%_50%,transparent_45%,rgba(6,8,20,0.7)_100%)]" />

          {/* Aviso cuando ya está todo descubierto */}
          <AnimatePresence>
            {complete && (
              <motion.div
                className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-abyss/80 px-4 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
                  <Heart className="h-3 w-3" aria-hidden="true" />
                  Constelación completa
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mensaje final de la constelación */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 max-w-2xl text-center"
          >
            <div className="hairline mx-auto w-48" />
            <p className="handwriting mt-6 text-3xl leading-snug text-cream drop-shadow-[0_0_20px_rgba(233,169,196,0.35)] sm:text-4xl">
              {textos.constellationComplete}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        {!complete && (
          <p className="font-body text-[0.62rem] uppercase tracking-[0.22em] text-rosecloud/45">
            Te faltan {TOTAL_MEMORIES - discoveredCount}{' '}
            {TOTAL_MEMORIES - discoveredCount === 1 ? 'recuerdo' : 'recuerdos'} por descubrir
          </p>
        )}
        <button type="button" onClick={onNext} className="btn-romantic group">
          Continuar a la carta
          <ArrowRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>

      <MemoryModal
        memory={selected}
        index={selectedIndex >= 0 ? selectedIndex : 0}
        total={TOTAL_MEMORIES}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex >= 0 && selectedIndex < memories.length - 1}
      />
    </div>
  )
}
