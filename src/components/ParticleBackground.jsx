import { useEffect, useMemo, useRef } from 'react'

/**
 * Fondo cinematográfico compartido por toda la experiencia:
 * nebulosas suaves + estrellas que titilan + partículas flotantes.
 *
 * - Las estrellas y las nebulosas son elementos gráficos reales (divs con
 *   degradados), nunca una imagen estática.
 * - Respeta "prefers-reduced-motion": si está activo, las partículas se
 *   dibujan una sola vez y dejan de moverse.
 * - El canvas se pausa cuando la pestaña no está visible para no gastar batería.
 */

const PALETTE = ['#FFFFFF', '#F8E8E9', '#E9A9C4', '#D9B77E']

/* Nebulosas por ambiente: cada sección puede cambiar el tono del cielo */
const NEBULAS = {
  night: [
    { color: '#3B2E5C', top: '-12%', left: '-8%', size: '52vw', opacity: 0.5 },
    { color: '#5B4A7A', top: '52%', left: '58%', size: '46vw', opacity: 0.38 },
    { color: '#1E2A55', top: '18%', left: '46%', size: '40vw', opacity: 0.42 },
  ],
  rose: [
    { color: '#5B3A55', top: '-10%', left: '4%', size: '54vw', opacity: 0.42 },
    { color: '#E9A9C4', top: '58%', left: '52%', size: '42vw', opacity: 0.2 },
    { color: '#3B2E5C', top: '22%', left: '-6%', size: '44vw', opacity: 0.44 },
  ],
  violet: [
    { color: '#4A2F6B', top: '-14%', left: '40%', size: '58vw', opacity: 0.48 },
    { color: '#2A2A62', top: '48%', left: '-10%', size: '50vw', opacity: 0.44 },
    { color: '#E9A9C4', top: '68%', left: '66%', size: '38vw', opacity: 0.16 },
  ],
  warm: [
    { color: '#5A4230', top: '-10%', left: '50%', size: '50vw', opacity: 0.34 },
    { color: '#3B2E5C', top: '46%', left: '-8%', size: '46vw', opacity: 0.4 },
    { color: '#D9B77E', top: '64%', left: '58%', size: '40vw', opacity: 0.14 },
  ],
}

export default function ParticleBackground({
  tint = 'night',
  className = '',
  particleDensity = 0.00009,
  showShootingStars = true,
}) {
  const canvasRef = useRef(null)

  /* Estrellas del cielo: se generan una sola vez por montaje */
  const stars = useMemo(() => {
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 640
    const count = isSmall ? 78 : 140
    return Array.from({ length: count }, (_, index) => {
      const size = Math.random() * 1.9 + 0.7
      return {
        id: `star-${index}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size.toFixed(2)}px`,
        height: `${size.toFixed(2)}px`,
        backgroundColor: PALETTE[index % PALETTE.length],
        animationDelay: `${(Math.random() * 4).toFixed(2)}s`,
        animationDuration: `${(2.6 + Math.random() * 3.4).toFixed(2)}s`,
        opacity: 0.35 + Math.random() * 0.55,
        boxShadow:
          size > 1.9 ? `0 0 ${(size * 4).toFixed(1)}px rgba(233,169,196,0.85)` : 'none',
      }
    })
  }, [])

  /* Partículas flotantes sobre canvas */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let rafId = 0
    let particles = []

    const createParticles = () => {
      const count = Math.round(
        Math.min(Math.max(width * height * particleDensity, 34), 130)
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -(Math.random() * 0.17 + 0.02),
        alpha: Math.random() * 0.45 + 0.18,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
      if (reduceMotion) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]

        if (!reduceMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.twinkle += particle.twinkleSpeed

          if (particle.y < -12) {
            particle.y = height + 12
            particle.x = Math.random() * width
          }
          if (particle.x < -12) particle.x = width + 12
          if (particle.x > width + 12) particle.x = -12
        }

        const alpha = particle.alpha * (0.55 + 0.45 * Math.sin(particle.twinkle))
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 8
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }

    const loop = () => {
      draw()
      rafId = window.requestAnimationFrame(loop)
    }

    const handleVisibility = () => {
      if (reduceMotion) return
      window.cancelAnimationFrame(rafId)
      if (document.visibilityState === 'visible') loop()
    }

    resize()
    if (!reduceMotion) loop()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [particleDensity])

  const nebulas = NEBULAS[tint] || NEBULAS.night

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
    >
      {/* Degradado base del cielo */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#1D2246_0%,#141834_45%,#0E1124_100%)]" />

      {/* Nebulosas */}
      {nebulas.map((nebula, index) => (
        <div
          key={`${tint}-${index}`}
          className="nebula-blob animate-drift transition-opacity duration-1000"
          style={{
            top: nebula.top,
            left: nebula.left,
            width: nebula.size,
            height: nebula.size,
            backgroundColor: nebula.color,
            opacity: nebula.opacity,
            animationDelay: `${index * 1.6}s`,
          }}
        />
      ))}

      {/* Estrellas que titilan */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute animate-twinkle rounded-full"
            style={star}
          />
        ))}
      </div>

      {/* Estrellas fugaces */}
      {showShootingStars && (
        <>
          <span className="absolute left-[8%] top-[12%] h-px w-24 animate-shootingStar rounded-full bg-gradient-to-r from-transparent via-rosecloud to-transparent" />
          <span
            className="absolute left-[42%] top-[6%] h-px w-20 animate-shootingStar rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{ animationDelay: '4.5s', animationDuration: '4.2s' }}
          />
        </>
      )}

      {/* Viñeta para dar profundidad cinematográfica */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_35%,rgba(6,8,20,0.72)_100%)]" />

      {/* Partículas flotantes */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
