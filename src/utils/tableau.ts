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

    lignes.push({
      poids: Math.round(poids * 10) / 10,
      objectif: objectif.label
    })
  }

  return lignes
}
