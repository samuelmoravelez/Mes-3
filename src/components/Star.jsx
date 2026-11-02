import { motion, useReducedMotion } from 'framer-motion'

/**
 * Una de las estrellas de la constelación.
 * - `discovered`  → ya se abrió su ventana (brilla en dorado)
 * - `isActive`    → es la estrella seleccionada (anillo de luz)
 * - `dimmed`      → hay otra estrella seleccionada
 */
export default function Star({ memory, index, discovered, isActive, dimmed, onSelect }) {
  const reduceMotion = useReducedMotion()
  const { x, y } = memory.coords
  const scale = memory.size || 1
  const glowSize = 58 * scale
  const particleSize = 15 * scale

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(memory)}
        aria-label={`Recuerdo ${index + 1}: ${memory.title}`}
        className="group relative grid h-12 w-12 cursor-pointer place-items-center rounded-full"
        animate={{
          opacity: dimmed ? 0.3 : 1,
          scale: dimmed ? 0.86 : 1,
          filter: dimmed ? 'saturate(0.4)' : 'saturate(1)',
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { scale: dimmed ? 0.86 : 1.14 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Halo de la estrella */}
        <span
          className="pointer-events-none absolute rounded-full animate-breathe"
          style={{
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            background: discovered
              ? 'radial-gradient(circle, rgba(217,183,126,0.55) 0%, rgba(233,169,196,0.22) 45%, transparent 72%)'
              : 'radial-gradient(circle, rgba(248,232,233,0.32) 0%, rgba(233,169,196,0.12) 48%, transparent 74%)',
            animationDelay: `${(index % 5) * 0.5}s`,
          }}
        />

        {/* Anillo de luz de la estrella activa */}
        {isActive && (
          <motion.span
            className="pointer-events-none absolute rounded-full border border-gold/70"
            style={{ width: '54px', height: '54px' }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.9, 0.25, 0.9], scale: [0.94, 1.12, 0.94] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Destello */}
        <svg
          viewBox="0 0 24 24"
          className="relative drop-shadow-[0_0_6px_rgba(233,169,196,0.7)]"
          style={{ width: `${particleSize}px`, height: `${particleSize}px` }}
        >
          <defs>
            <linearGradient id={`star-grad-${memory.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={discovered ? '#FBF2E2' : '#F8E8E9'} />
              <stop offset="55%" stopColor={discovered ? '#D9B77E' : '#E9A9C4'} />
              <stop offset="100%" stopColor={discovered ? '#E9A9C4' : '#9BA6D4'} />
            </linearGradient>
          </defs>
          <path
            d="M12 0.6 L14.3 9.7 L23.4 12 L14.3 14.3 L12 23.4 L9.7 14.3 L0.6 12 L9.7 9.7 Z"
            fill={`url(#star-grad-${memory.id})`}
            opacity={discovered ? 1 : 0.82}
          />
        </svg>

        {/* Número del recuerdo */}
        <span
          className={`pointer-events-none absolute -bottom-3 text-[0.52rem] font-body tracking-[0.2em] transition-colors duration-500 ${
            discovered ? 'text-gold' : 'text-rosecloud/45'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Título al pasar el cursor (solo pantallas grandes) */}
        <span className="pointer-events-none absolute left-1/2 top-full mt-6 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-rosesky/20 bg-abyss/85 px-3 py-1 font-body text-[0.62rem] tracking-wide text-rosecloud/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 lg:block">
          {memory.title}
        </span>
      </motion.button>
    </div>
  )
}
