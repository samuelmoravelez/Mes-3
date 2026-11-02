import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  createElement,
} from 'react'
import { asset } from '../utils/asset'

/**
 * ============================================================
 *  REPRODUCTOR MUSICAL  ·  useMusic
 * ============================================================
 *  El audio se crea una sola vez (una única instancia compartida por
 *  toda la aplicación), por eso la canción NO se reinicia cuando el
 *  usuario cambia de sección.
 *
 *  ⚠️ La reproducción empieza únicamente después de un clic del usuario
 *  (los navegadores bloquean el autoplay con sonido).
 */

export const TRACK = {
  /* Nombre que se muestra en el reproductor */
  title: 'Nuestra canción',
  artist: 'Edita el título en src/hooks/useMusic.js',
  /* Portada opcional: si el archivo no existe se oculta sola */
  cover: 'images/nosotros/imagen1.jpg',
  /* Archivo de audio (debe existir en public/music/) */
  src: 'music/nuestro-cancion.mp3',
}

const DEFAULT_VOLUME = 0.7

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | ready | error
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME)
  const [coverFailed, setCoverFailed] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.src = asset(TRACK.src)
    audio.loop = true
    audio.preload = 'metadata'
    audio.volume = DEFAULT_VOLUME
    audioRef.current = audio

    const handleMeta = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      setStatus('ready')
    }
    const handleTime = () => setCurrentTime(audio.currentTime)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      setStatus('error')
      setIsPlaying(false)
      setDuration(0)
    }

    audio.addEventListener('loadedmetadata', handleMeta)
    audio.addEventListener('durationchange', handleMeta)
    audio.addEventListener('timeupdate', handleTime)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    /* Si el navegador ya cacheó los metadatos, los leemos de inmediato */
    if (audio.readyState >= 1) handleMeta()

    return () => {
      audio.removeEventListener('loadedmetadata', handleMeta)
      audio.removeEventListener('durationchange', handleMeta)
      audio.removeEventListener('timeupdate', handleTime)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      await audio.play()
      setStatus((prev) => (prev === 'error' ? prev : 'ready'))
      return true
    } catch {
      /* Bloqueo del navegador o archivo inexistente: no rompemos la web */
      setIsPlaying(false)
      return false
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) play()
    else audio.pause()
  }, [play])

  const seek = useCallback((time) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(time)) return
    const max = Number.isFinite(audio.duration) ? audio.duration : 0
    audio.currentTime = Math.min(Math.max(0, time), max || 0)
    setCurrentTime(audio.currentTime)
  }, [])

  const setVolume = useCallback((value) => {
    const audio = audioRef.current
    const next = Math.min(1, Math.max(0, value))
    setVolumeState(next)
    if (audio) {
      audio.volume = next
      audio.muted = next === 0
    }
  }, [])

  const value = useMemo(
    () => ({
      track: TRACK,
      status,
      isPlaying,
      currentTime,
      duration,
      volume,
      progress: duration > 0 ? currentTime / duration : 0,
      hasError: status === 'error',
      coverFailed,
      setCoverFailed,
      play,
      pause,
      toggle,
      seek,
      setVolume,
    }),
    [
      status,
      isPlaying,
      currentTime,
      duration,
      volume,
      coverFailed,
      play,
      pause,
      toggle,
      seek,
      setVolume,
    ]
  )

  return createElement(MusicContext.Provider, { value }, children)
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic debe utilizarse dentro de <MusicProvider>')
  }
  return context
}

export default useMusic
