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
  // only print the table instead of the whole page
  const table = document.querySelector('table')
  if (!table) {
    window.print()
    return
  }

  const html = `
    <html>
      <head>
        <title>Programme</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid black; }
          th, td { padding: 4px; text-align: left; }
          body { font-family: sans-serif; margin: 1cm; }
        </style>
      </head>
      <body>
        ${table.outerHTML}
      </body>
    </html>
  `

  const newWin = window.open('', '_blank')
  if (newWin) {
    newWin.document.write(html)
    newWin.document.close()
    newWin.focus()
    newWin.print()
    newWin.close()
  } else {
    window.print()
  }
}