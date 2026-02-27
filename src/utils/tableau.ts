import type { LigneTableau, ObjectifId } from '../types'
import { OBJECTIFS } from './objectifs'

export function genererTableau(
  objectifIds: ObjectifId[],
  poidsMin: number,
  poidsMax: number,
  nombreLignes: number,
): LigneTableau[] {
  const objectifsChoisis = OBJECTIFS.filter((o) => objectifIds.includes(o.id))
  // écart de poids à ajouter à chaque ligne pour progression linéaire
  const pas = nombreLignes === 1 ? 0 : (poidsMax - poidsMin) / (nombreLignes - 1)
  const lignes: LigneTableau[] = []

  for (let i = 0; i < nombreLignes; i++) {
    const poids = poidsMin + i * pas
    // cycle entre les objectifs sélectionnés avec modulo pour alterner si plus d'un objectif est choisi
    const objectif = objectifsChoisis[i % objectifsChoisis.length]
    const [repMin, repMax] = objectif.repRange
    const [serMin, serMax] = objectif.seriesRange
    // ratio de 0 à 1 pour interpoler les reps et séries entre min et max
    const ratio = nombreLignes === 1 ? 0.5 : i / (nombreLignes - 1)
    const repetitions = Math.round(repMin + ratio * (repMax - repMin))
    const series = Math.round(serMin + ratio * (serMax - serMin))

    lignes.push({
      poids: Math.round(poids * 10) / 10,
      series,
      repetitions,
      objectif: objectif.label
    })
  }

  return lignes
}
