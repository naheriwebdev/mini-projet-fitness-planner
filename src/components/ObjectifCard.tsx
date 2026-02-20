import type { Objectif } from '../types'
import styles from './ObjectifCard.module.css'

interface Props {
  objectif: Objectif
  selectionne: boolean
  onClick: () => void
}

export default function ObjectifCard({ objectif, selectionne, onClick }: Props) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selectionne ? styles.actif : ''}`}
      onClick={onClick}
      aria-pressed={selectionne}
    >
      <span className={styles.label}>{objectif.label}</span>
      <span className={styles.desc}>{objectif.description}</span>
      {selectionne && <span className={styles.check} aria-hidden>✓</span>}
    </button>
  )
}