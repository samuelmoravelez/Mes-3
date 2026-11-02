import { useEffect, useMemo, useState } from 'react'
import { SITE } from '../data/site'

const MS_SECOND = 1000
const MS_MINUTE = 60 * MS_SECOND
const MS_HOUR = 60 * MS_MINUTE
const MS_DAY = 24 * MS_HOUR

/**
 * Cuenta los días transcurridos desde SITE.startDate y el tiempo exacto
 * que ha pasado, actualizándose cada segundo.
 *
 * Nada está escrito a mano: el hito de 90 días se calcula y se compara
 * con la fecha real, por lo que el resultado siempre es correcto
 * (con la configuración actual: 90 días = 30 de octubre de 2026).
 */
export function useDayCounter(tickMs = 1000) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), tickMs)
    return () => window.clearInterval(id)
  }, [tickMs])

  return useMemo(() => {
    const startDate = new Date(SITE.startDate)
    const startTime = startDate.getTime()
    const targetTime = startTime + SITE.milestoneDays * MS_DAY

    const elapsed = Math.max(0, now - startTime)
    const days = Math.floor(elapsed / MS_DAY)
    const hours = Math.floor((elapsed % MS_DAY) / MS_HOUR)
    const minutes = Math.floor((elapsed % MS_HOUR) / MS_MINUTE)
    const seconds = Math.floor((elapsed % MS_MINUTE) / MS_SECOND)

    const reached = now >= targetTime
    const remainingMs = Math.max(0, targetTime - now)
    const remainingDays = Math.ceil(remainingMs / MS_DAY)
    const totalHours = Math.floor(elapsed / MS_HOUR)

    return {
      /* Días completos desde el inicio (90 el 30 de octubre de 2026) */
      days,
      hours,
      minutes,
      seconds,
      totalHours,
      /* Hito de los 90 días */
      milestoneDays: SITE.milestoneDays,
      reached,
      remainingDays,
      progress: Math.min(1, days / SITE.milestoneDays),
      startDate,
      targetDate: new Date(targetTime),
      now: new Date(now),
    }
  }, [now])
}

export function pad(value) {
  return String(value).padStart(2, '0')
}

export function plural(count, singular, pluralForm) {
  return count === 1 ? singular : pluralForm
}

/**
 * Formatea una fecha en español. Acepta 'AAAA-MM-DD' (sin desfase de zona)
 * o un objeto Date. Si no hay fecha devuelve `fallback`.
 */
export function formatDate(value, fallback = 'Fecha por completar') {
  if (!value) return fallback

  /*
   * Etiquetas de texto (ej. "Primeras semanas juntos", "Momentos previos al
   * inicio"): se muestran tal cual, sin convertirlas en una fecha inventada.
   */
  if (typeof value === 'string' && !/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value
  }

  let date
  if (typeof value === 'string') {
    const plain = /^\d{4}-\d{2}-\d{2}$/.test(value)
    date = new Date(plain ? `${value}T00:00:00` : value)
  } else {
    date = value
  }

  if (Number.isNaN(date?.getTime?.())) return fallback

  const text = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default useDayCounter
