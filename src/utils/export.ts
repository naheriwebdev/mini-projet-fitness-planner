import type { LigneTableau } from '../types'
import { formatRepos } from './tableau'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { OBJECTIFS } from './objectifs'

export function exporterCSV(lignes: LigneTableau[]): void {
  const entetes = ['Poids (kg)', 'Protéines (g/jour)', 'Repos', 'Intensité (%)', 'Objectif']
  const lignesCSV = lignes.map((l) => {
    const obj = OBJECTIFS.find((o) => o.label === l.objectif)
    if (!obj) {
      return [l.poids, '', formatRepos(l.repos), l.intensite, l.objectif].join(';')
    }
    const [minKg, maxKg] = obj.proteinesParKg
    const minG = Math.round(minKg * l.poids)
    const maxG = Math.round(maxKg * l.poids)
    const proteines = `${minG} – ${maxG} g/jour`
    return [l.poids, proteines, formatRepos(l.repos), l.intensite, l.objectif].join(';')
  })
  const contenu = [entetes.join(';'), ...lignesCSV].join('\n')
  const blob = new Blob([contenu], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'programme-fitness.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export function exporterPDF(lignes: LigneTableau[]): void {
  try {
    if (!lignes || lignes.length === 0) {
      return
    }

    const doc = new jsPDF('p', 'pt', 'a4')

      const body = lignes.map((l) => {
        const obj = OBJECTIFS.find((o) => o.label === l.objectif)
        let proteines = ''
        if (obj) {
          const [minKg, maxKg] = obj.proteinesParKg
          const minG = Math.round(minKg * l.poids)
          const maxG = Math.round(maxKg * l.poids)
          proteines = `${minG} – ${maxG} g/jour`
        }
        return [
          `${l.poids} kg`,
          proteines,
          formatRepos(l.repos),
          `${l.intensite}%`,
          l.objectif,
        ]
      })

      autoTable(doc, {
        head: [['Poids', 'Protéines (g/jour)', 'Repos', 'Intensité', 'Objectif']],
        body,
        theme: 'striped',
        headStyles: { fillColor: [60, 60, 60], textColor: [255, 255, 255] },
        bodyStyles: { textColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      })
    
    doc.save('programme.pdf')
  } catch (err) {
    console.error('PDF export error:', err)
    alert(`Erreur PDF: ${err instanceof Error ? err.message : String(err)}`)
  }
}