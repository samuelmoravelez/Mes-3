import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Disc3, Music, Pause, Play, Volume1, Volume2, VolumeX, X } from 'lucide-react'
import { useMusic } from '../hooks/useMusic'
import { asset } from '../utils/asset'

/**
 * Reproductor discreto e integrado con la identidad visual.
 * - En pantallas grandes aparece como tarjeta fija abajo a la derecha.
 * - En móvil es un botón redondo que se despliega.
 * - La música se mantiene al cambiar de sección: solo existe una instancia
 *   de audio en toda la aplicación (ver src/hooks/useMusic.js).
 */

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const list = window.matchMedia(query)
    const handler = (event) => setMatches(event.matches)
    setMatches(list.matches)
    list.addEventListener('change', handler)
    return () => list.removeEventListener('change', handler)
  }, [query])

  return matches
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const minutes = Math.floor(total / 60)
  const rest = total % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export default function MusicPlayer() {
  const {
    track,
    isPlaying,
    currentTime,
    duration,
    volume,
    progress,
    hasError,
    coverFailed,
    setCoverFailed,
    toggle,
    seek,
    setVolume,
  } = useMusic()

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [open, setOpen] = useState(false)
  const showPanel = isDesktop || open

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2
  const progressPercent = `${Math.round(progress * 100)}%`

  const panel = (
    <motion.div
      key="panel"
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass w-[min(80vw,19rem)] rounded-2xl p-3.5 shadow-card lg:w-[19rem]"
    >
      <div className="flex items-center gap-3">
        {/* Portada (opcional) */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-rosesky/25 bg-gradient-to-br from-plum to-abyss">
          {track.cover && !coverFailed ? (
            <img
              src={asset(track.cover)}
              alt=""
              onError={() => setCoverFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center">
              <Disc3
                className="h-5 w-5 animate-spin text-rosesky/70"
                style={{ animationDuration: '9s', animationPlayState: isPlaying ? 'running' : 'paused' }}
                aria-hidden="true"
              />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[0.98rem] leading-tight text-rosecloud">
            {track.title}
          </p>
          <p className="truncate font-body text-[0.6rem] uppercase tracking-[0.16em] text-rosecloud/50">
            {track.artist}
          </p>
        </div>

        <button
          type="button"
          onClick={toggle}
          disabled={hasError}
          aria-label={isPlaying ? 'Pausar la música' : 'Reproducir la música'}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/15 text-gold transition-colors duration-300 hover:bg-gold/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" aria-hidden="true" />
          )}
        </button>

        {!isDesktop && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar el reproductor"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-rosecloud/60 transition-colors hover:text-rosecloud"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="mt-3">
        <input
          type="range"
          className="range-romantic"
          min={0}
          max={duration || 0}
          step={0.5}
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => seek(Number(event.target.value))}
          aria-label="Progreso de la canción"
          style={{ '--range-progress': progressPercent }}
        />
        <div className="mt-1 flex justify-between font-body text-[0.56rem] tracking-wider text-rosecloud/45">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setVolume(volume === 0 ? 0.6 : 0)}
          aria-label={volume === 0 ? 'Activar el sonido' : 'Silenciar'}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-rosecloud/70 transition-colors hover:text-gold"
        >
          <VolumeIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        <input
          type="range"
          className="range-romantic"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volumen"
          style={{ '--range-progress': `${Math.round(volume * 100)}%` }}
        />
      </div>
    </motion.div>
  )

  return (
    <div className="fixed right-4 top-4 z-[60] flex flex-col items-end gap-3 lg:bottom-6 lg:right-6 lg:top-auto">
      <AnimatePresence initial={false}>{showPanel ? panel : null}</AnimatePresence>

      {!isDesktop && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Cerrar el reproductor' : 'Abrir el reproductor'}
          aria-expanded={open}
          className="glass relative grid h-12 w-12 place-items-center rounded-full text-rosecloud shadow-card transition-colors duration-300 hover:text-gold"
        >
          {isPlaying && (
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/50"
              animate={{ scale: [1, 1.22, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          )}
          <Music className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
