import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import MusicPlayer from './components/MusicPlayer'
import Welcome from './sections/Welcome'
import Timeline from './sections/Timeline'
import Constellation from './sections/Constellation'
import LoveLetter from './sections/LoveLetter'
import Finale from './sections/Finale'
import { MusicProvider, useMusic } from './hooks/useMusic'

/**
 * ============================================================
 *  90 días, infinitos recuerdos
 * ============================================================
 *  App.jsx solo coordina: la escena visible, los recuerdos descubiertos
 *  y la transición cinematográfica entre escenas.
 *
 *  El reproductor musical vive en <MusicProvider>, por encima de las
 *  escenas, así la canción nunca se reinicia al navegar.
 */

const SCENES = [
  { id: 'welcome', label: 'Bienvenida', tint: 'night' },
  { id: 'timeline', label: 'Nuestra historia', tint: 'violet' },
  { id: 'constellation', label: 'La constelación', tint: 'violet' },
  { id: 'letter', label: 'La carta', tint: 'warm' },
  { id: 'finale', label: 'El final', tint: 'rose' },
]

function Experience() {
  const { play } = useMusic()
  const reduceMotion = useReducedMotion()
  const [scene, setScene] = useState(0)
  const [discovered, setDiscovered] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const goTo = useCallback((index) => {
    setScene(Math.min(Math.max(index, 0), SCENES.length - 1))
  }, [])

  const goNext = useCallback(() => setScene((value) => Math.min(value + 1, SCENES.length - 1)), [])
  const goPrev = useCallback(() => setScene((value) => Math.max(value - 1, 0)), [])

  /* Navegación con el teclado (se desactiva mientras hay una ventana abierta) */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (modalOpen) return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen, goNext, goPrev])

  /* La música arranca con el primer clic del usuario */
  const handleStart = useCallback(() => {
    play()
    goTo(1)
  }, [play, goTo])

  const handleDiscover = useCallback((id) => {
    setDiscovered((current) => (current.includes(id) ? current : [...current, id]))
  }, [])

  const currentScene = SCENES[scene]

  const renderScene = () => {
    switch (currentScene.id) {
      case 'welcome':
        return <Welcome onStart={handleStart} />
      case 'timeline':
        return <Timeline onNext={goNext} />
      case 'constellation':
        return (
          <Constellation
            discovered={discovered}
            onDiscover={handleDiscover}
            onModalChange={setModalOpen}
            onNext={goNext}
          />
        )
      case 'letter':
        return <LoveLetter onNext={goNext} />
      case 'finale':
        return <Finale onRestart={() => goTo(0)} />
      default:
        return null
    }
  }

  const transition = {
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 26,
      scale: reduceMotion ? 1 : 0.995,
      filter: reduceMotion ? 'none' : 'blur(10px)',
    },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -18,
      filter: reduceMotion ? 'none' : 'blur(8px)',
      transition: { duration: reduceMotion ? 0.15 : 0.45, ease: [0.4, 0, 0.6, 1] },
    },
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-abyss">
      <ParticleBackground tint={currentScene.tint} />

      <Navigation
        scenes={SCENES}
        current={scene}
        onChange={goTo}
        onPrev={goPrev}
        onNext={goNext}
        canPrev={scene > 0}
        canNext={scene < SCENES.length - 1}
      />

      <MusicPlayer />

      <main className="relative h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentScene.id}
            className="scroll-romantic h-full w-full overflow-y-auto overflow-x-hidden"
            initial={transition.initial}
            animate={transition.animate}
            exit={transition.exit}
            transition={{ duration: reduceMotion ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <MusicProvider>
      <Experience />
    </MusicProvider>
  )
}
