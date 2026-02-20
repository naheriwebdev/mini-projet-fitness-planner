import type { FormErrors, FormValues } from '../types'

export function validerFormulaire(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const min = parseFloat(values.poidsMin)
  const max = parseFloat(values.poidsMax)
  const lignes = parseInt(values.nombreLignes, 10)

  if (values.objectifs.length === 0) {
    errors.objectifs = 'Sélectionnez au moins un objectif.'
  }

  if (values.poidsMin === '' || isNaN(min)) {
    errors.poidsMin = 'Entrez un poids minimum valide.'
  } else if (min <= 0) {
    errors.poidsMin = 'Le poids minimum doit être positif.'
  }

  if (values.poidsMax === '' || isNaN(max)) {
    errors.poidsMax = 'Entrez un poids maximum valide.'
  } else if (max <= 0) {
    errors.poidsMax = 'Le poids maximum doit être positif.'
  } else if (!isNaN(min) && max <= min) {
    errors.poidsMax = 'Le poids maximum doit être supérieur au minimum.'
  }

  if (values.nombreLignes === '' || isNaN(lignes)) {
    errors.nombreLignes = 'Entrez un nombre de lignes valide.'
  } else if (lignes < 1) {
    errors.nombreLignes = 'Minimum 1 ligne.'
  } else if (lignes > 50) {
    errors.nombreLignes = 'Maximum 50 lignes.'
  }

  return errors
}