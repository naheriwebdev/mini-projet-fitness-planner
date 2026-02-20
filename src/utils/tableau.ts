import type { LigneTableau, ObjectifId } from '../types'
import { OBJECTIFS } from './objectifs'

export function genererTableau(
  objectifIds: ObjectifId[],
  poidsMin: number,
  poidsMax: number,
  nombreLignes: number,
): LigneTableau[] {
  const objectifsChoisis = OBJECTIFS.filter((o) => objectifIds.includes(o.id))
  const pas = nombreLignes === 1 ? 0 : (poidsMax - poidsMin) / (nombreLignes - 1)
  const lignes: LigneTableau[] = []

  for (let i = 0; i < nombreLignes; i++) {
    const poids = poidsMin + i * pas
    const objectif = objectifsChoisis[i % objectifsChoisis.length]
    const [repMin, repMax] = objectif.repRange
    const [serMin, serMax] = objectif.seriesRange
    const ratio = nombreLignes === 1 ? 0.5 : i / (nombreLignes - 1)
    const repetitions = Math.round(repMin + ratio * (repMax - repMin))
    const series = Math.round(serMin + ratio * (serMax - serMin))

    lignes.push({
      poids: Math.round(poids * 10) / 10,
      series,
      repetitions,
      repos: objectif.reposSecondes,
      intensite: objectif.intensitePct,
      objectif: objectif.label,
    })
  }

  return lignes
}

export function formatRepos(secondes: number): string {
  if (secondes < 60) return `${secondes}s`
  const m = Math.floor(secondes / 60)
  const s = secondes % 60
  return s === 0 ? `${m}min` : `${m}min ${s}s`
}