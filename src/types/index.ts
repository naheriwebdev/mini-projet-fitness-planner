export type ObjectifId =
  | 'sedentaire'
  | 'endurance'
  | 'conservation_masse'
  | 'prise_de_masse'

export interface Objectif {
  id: ObjectifId
  label: string
  description: string
  repRange: [number, number]
  seriesRange: [number, number]
  reposSecondes: number
  intensitePct: number
  proteinesParKg: [number, number]
}

export interface FormValues {
  objectifs: ObjectifId[]
  poidsMin: string
  poidsMax: string
  nombreLignes: string
}

export interface FormErrors {
  objectifs?: string
  poidsMin?: string
  poidsMax?: string
  nombreLignes?: string
}

export interface LigneTableau {
  poids: number
  series: number
  repetitions: number
  repos: number
  intensite: number
  objectif: string
}