import type { LigneTableau } from '../types'
import { formatRepos } from './tableau'

export function exporterCSV(lignes: LigneTableau[]): void {
  const entetes = ['Poids (kg)', 'Séries', 'Répétitions', 'Repos', 'Intensité (%)', 'Objectif']
  const lignesCSV = lignes.map((l) =>
    [l.poids, l.series, l.repetitions, formatRepos(l.repos), l.intensite, l.objectif].join(';'),
  )
  const contenu = [entetes.join(';'), ...lignesCSV].join('\n')
  const blob = new Blob([contenu], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'programme-fitness.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export function exporterPDF(): void {
  window.print()
}