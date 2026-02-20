export type ObjectifId =
  | 'perte_de_poids'
  | 'prise_de_masse'
  | 'endurance'
  | 'force'
  | 'flexibilite'
  | 'remise_en_forme'

export interface Objectif {
  id: ObjectifId
  label: string
  description: string
  repRange: [number, number]
  seriesRange: [number, number]
  reposSecondes: number
  intensitePct: number
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