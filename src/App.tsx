import { useState } from 'react'
import type { LigneTableau } from './types'
import { OBJECTIFS } from './utils/objectifs'
import { genererTableau } from './utils/tableau'
import { useFormulaire } from './hooks/useFormulaire'
import ObjectifCard from './components/ObjectifCard'
import FieldInput from './components/FieldInput'
import ResultatTableau from './components/ResultatTableau'
import styles from './App.module.css'

export default function App() {
  const { values, errors, toggleObjectif, setChamp, valider } = useFormulaire()
  const [lignes, setLignes] = useState<LigneTableau[] | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valider()) return
    const resultat = genererTableau(
      values.objectifs,
      parseFloat(values.poidsMin),
      parseFloat(values.poidsMax),
      parseInt(values.nombreLignes, 10),
    )
    setLignes(resultat)
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.titre}>Fitness Planner</h1>
        <p className={styles.sous}>Générez votre programme d'entraînement</p>
      </header>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} noValidate>
          <section className={styles.section}>
            <h2 className={styles.sectionTitre}>
              <span className={styles.num}>01</span> Objectifs
            </h2>
            {errors.objectifs && <p className={styles.errorGlobal}>{errors.objectifs}</p>}
            <div className={styles.objectifsGrid}>
              {OBJECTIFS.map((obj) => (
                <ObjectifCard
                  key={obj.id}
                  objectif={obj}
                  selectionne={values.objectifs.includes(obj.id)}
                  onClick={() => toggleObjectif(obj.id)}
                />
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitre}>
              <span className={styles.num}>02</span> Paramètres
            </h2>
            <div className={styles.parametresGrid}>
              <FieldInput label="Poids minimum" value={values.poidsMin} onChange={(v) => setChamp('poidsMin', v)} error={errors.poidsMin} placeholder="ex: 40" min={1} unite="kg" />
              <FieldInput label="Poids maximum" value={values.poidsMax} onChange={(v) => setChamp('poidsMax', v)} error={errors.poidsMax} placeholder="ex: 100" min={1} unite="kg" />
              <FieldInput label="Nombre de lignes" value={values.nombreLignes} onChange={(v) => setChamp('nombreLignes', v)} error={errors.nombreLignes} placeholder="1 - 50" min={1} max={50} />
            </div>
          </section>
          <button type="submit" className={styles.submitBtn}>Générer le programme</button>
        </form>
        {lignes && <ResultatTableau lignes={lignes} />}
      </main>
    </div>
  )
}