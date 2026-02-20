import { useState } from 'react'
import type { FormErrors, FormValues, ObjectifId } from '../types'
import { validerFormulaire } from '../utils/validation'

const valeurInitiale: FormValues = {
  objectifs: [],
  poidsMin: '',
  poidsMax: '',
  nombreLignes: '10',
}

export function useFormulaire() {
  const [values, setValues] = useState<FormValues>(valeurInitiale)
  const [errors, setErrors] = useState<FormErrors>({})
  const [soumis, setSoumis] = useState(false)

  function toggleObjectif(id: ObjectifId) {
    setValues((prev) => ({
      ...prev,
      objectifs: prev.objectifs.includes(id)
        ? prev.objectifs.filter((o) => o !== id)
        : [...prev.objectifs, id],
    }))
    if (soumis) setErrors((prev) => ({ ...prev, objectifs: undefined }))
  }

  function setChamp<K extends keyof Omit<FormValues, 'objectifs'>>(champ: K, valeur: string) {
    setValues((prev) => ({ ...prev, [champ]: valeur }))
    if (soumis) {
      const newValues = { ...values, [champ]: valeur }
      const newErrors = validerFormulaire(newValues)
      setErrors((prev) => ({ ...prev, [champ]: newErrors[champ] }))
    }
  }

  function valider(): boolean {
    setSoumis(true)
    const errs = validerFormulaire(values)
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  return { values, errors, toggleObjectif, setChamp, valider }
}