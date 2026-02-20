import type { LigneTableau } from '../types'
import { formatRepos } from '../utils/tableau'
import { exporterCSV, exporterPDF } from '../utils/export'
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
          <button className={styles.btn} onClick={() => exporterCSV(lignes)}>Exporter CSV</button>
          <button className={styles.btn} onClick={exporterPDF}>Exporter PDF</button>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Poids</th>
              <th>Séries</th>
              <th>Répétitions</th>
              <th>Repos</th>
              <th>Intensité</th>
              <th>Objectif</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((ligne, i) => (
              <tr key={i} className={i % 2 === 0 ? styles.pair : ''}>
                <td><strong>{ligne.poids} kg</strong></td>
                <td>{ligne.series}</td>
                <td>{ligne.repetitions}</td>
                <td>{formatRepos(ligne.repos)}</td>
                <td><span className={styles.badge}>{ligne.intensite}%</span></td>
                <td className={styles.objectifCell}>{ligne.objectif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.meta}>{lignes.length} ligne{lignes.length > 1 ? 's' : ''} générées</p>
    </section>
  )
}