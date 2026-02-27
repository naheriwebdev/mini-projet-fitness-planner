export type ObjectifId =
  | 'sedentaire'
  | 'endurance'
  | 'conservation_masse'
  | 'prise_de_masse'

export interface Objectif {
  id: ObjectifId
  label: string
  description: string
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
  objectif: string
}