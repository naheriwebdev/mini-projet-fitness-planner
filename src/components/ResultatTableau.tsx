import type { LigneTableau } from '../types'
import { formatRepos } from '../utils/tableau'
import { exporterCSV, exporterPDF } from '../utils/export'
import { OBJECTIFS } from '../utils/objectifs'
import styles from './ResultatTableau.module.css'

interface Props {
  lignes: LigneTableau[]
}

export default function ResultatTableau({ lignes }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.titre}>Programme</h2>
        <div className={styles.actions}>
          <button className={styles.btn} onClick={() => exporterCSV(lignes)}>Export CSV</button>
          <button className={styles.btn} onClick={() => exporterPDF(lignes)}>Export PDF</button>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Poids</th>
              <th>Protéines (g/jour)</th>
              <th>Repos</th>
              <th>Intensité</th>
              <th>Objectif</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((ligne, i) => {
              const obj = OBJECTIFS.find((o) => o.label === ligne.objectif)
              let proteines = ''
              if (obj) {
                const [minKg, maxKg] = obj.proteinesParKg
                const minG = Math.round(minKg * ligne.poids)
                const maxG = Math.round(maxKg * ligne.poids)
                proteines = `${minG} – ${maxG} g/jour`
              }
              return (
                <tr key={i} className={i % 2 === 0 ? styles.pair : ''}>
                  <td><strong>{ligne.poids} kg</strong></td>
                  <td>{proteines}</td>
                  <td>{formatRepos(ligne.repos)}</td>
                  <td><span className={styles.badge}>{ligne.intensite}%</span></td>
                  <td className={styles.objectifCell}>{ligne.objectif}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.meta}>{lignes.length} ligne{lignes.length > 1 ? 's' : ''} générées</p>
    </section>
  )
}