import styles from './FieldInput.module.css'

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  min?: number
  max?: number
  unite?: string
}

export default function FieldInput({ label, value, onChange, error, placeholder, min, max, unite }: Props) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          className={`${styles.input} ${error ? styles.invalid : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
        />
        {unite && <span className={styles.unite}>{unite}</span>}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}