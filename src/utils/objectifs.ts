import type { Objectif } from '../types'

export const OBJECTIFS: Objectif[] = [
  {
    id: 'sedentaire',
    label: 'Sédentaire',
    description: 'Activité physique légère',
    repRange: [12, 15],
    seriesRange: [2, 3],
    proteinesParKg: [0.8, 1.0],
  },
  {
    id: 'endurance',
    label: 'Endurance',
    description: 'Résistance cardiovasculaire',
    repRange: [15, 20],
    seriesRange: [3, 4],
    proteinesParKg: [1.2, 1.6],
  },
  {
    id: 'conservation_masse',
    label: 'Conservation de la masse musculaire',
    description: 'Maintien de la musculature',
    repRange: [8, 12],
    seriesRange: [3, 4],
    proteinesParKg: [1.6, 1.8],
  },
  {
    id: 'prise_de_masse',
    label: 'Prise de masse musculaire',
    description: 'Hypertrophie musculaire',
    repRange: [8, 12],
    seriesRange: [4, 5],
    proteinesParKg: [1.8, 2.2],
  },
]