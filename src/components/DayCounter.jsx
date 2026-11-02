import { motion } from 'framer-motion'
import { Check, Hourglass } from 'lucide-react'
import { formatDate, pad, plural, useDayCounter } from '../hooks/useDayCounter'

/**
 * Contador en vivo. Todo se calcula a partir de SITE.startDate:
 * los 90 días caen solos en la fecha correcta (30 de octubre de 2026 con
 * la configuración actual) y el tiempo transcurrido se actualiza cada segundo.
 */
export default function DayCounter({ variant = 'hero', className = '' }) {
  const counter = useDayCounter()

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${className}`}>
        <span className="font-display text-2xl text-gold">{counter.days}</span>
        <span className="font-body text-[0.7rem] uppercase tracking-[0.22em] text-rosecloud/70">
          {plural(counter.days, 'día juntos', 'días juntos')}
        </span>
        <span className="hidden h-3 w-px bg-rosesky/25 sm:block" />
        <span className="font-body text-[0.7rem] tracking-wide text-rosecloud/60">
          {counter.reached
            ? `${counter.milestoneDays} días cumplidos el ${formatDate(counter.targetDate)}`
            : `Faltan ${counter.remainingDays} ${plural(
                counter.remainingDays,
                'día',
                'días'
              )} para los ${counter.milestoneDays}`}
        </span>
      </div>
    )
  }

  const units = [
    { label: plural(counter.hours, 'hora', 'horas'), short: 'hh', value: counter.hours },
    { label: 'min', short: 'mm', value: counter.minutes },
    { label: 'seg', short: 'ss', value: counter.seconds },
  ]

  return (
    <div
      className={`glass relative w-full max-w-xl overflow-hidden rounded-[26px] px-6 py-6 shadow-card sm:px-9 sm:py-8 ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-rosesky/15 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="eyebrow">Tiempo juntos</p>
          <div className="mt-1 flex items-end justify-center gap-2 sm:justify-start">
            <motion.span
              key={counter.days}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-romantic-gradient font-display text-6xl leading-none tabular-nums sm:text-7xl"
            >
              {counter.days}
            </motion.span>
            <span className="pb-1 font-body text-[0.66rem] uppercase tracking-[0.24em] text-rosecloud/75">
              {plural(counter.days, 'día', 'días')}
              <br />
              juntos
            </span>
          </div>
        </div>

        <div className="flex items-end gap-3 sm:gap-4">
          {units.map((unit, index) => (
            <div key={unit.short} className="flex items-end gap-3 sm:gap-4">
              {index > 0 && (
                <span className="pb-3 font-display text-xl text-rosesky/50">:</span>
              )}
              <div className="text-center">
                <span className="block font-display text-2xl leading-none tabular-nums text-rosecloud sm:text-3xl">
                  {pad(unit.value)}
                </span>
                <span className="mt-1 block font-body text-[0.54rem] uppercase tracking-[0.2em] text-rosecloud/50">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-7">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-rosecloud/[0.12]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rosesky via-gold to-rosesky"
            initial={{ width: 0 }}
            animate={{ width: `${Math.round(counter.progress * 100)}%` }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:justify-between sm:text-left">
          <span className="inline-flex items-center gap-2 font-body text-[0.68rem] tracking-wide text-rosecloud/70">
            {counter.reached ? (
              <Check className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            ) : (
              <Hourglass className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            )}
            {counter.reached
              ? `${counter.milestoneDays} días cumplidos el ${formatDate(counter.targetDate)}`
              : `Faltan ${counter.remainingDays} ${plural(
                  counter.remainingDays,
                  'día',
                  'días'
                )} para los ${counter.milestoneDays}`}
          </span>
          <span className="font-body text-[0.62rem] uppercase tracking-[0.2em] text-rosecloud/45">
            {counter.totalHours.toLocaleString('es-ES')} horas juntos
          </span>
        </div>
      </div>
    </div>
  )
}
