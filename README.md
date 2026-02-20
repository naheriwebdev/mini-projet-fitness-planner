# Fitness Planner

Application web permettant de générer un programme d'entraînement personnalisé selon des objectifs, une plage de poids et un nombre de lignes définis par l'utilisateur.

---

## Prérequis

- Node.js >= 18
- npm >= 9

---

## Installation

```bash
git clone <https://github.com/naheriwebdev/mini-projet-fitness-planner.git>
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvre ensuite [http://localhost:5173](http://localhost:5173) dans ton navigateur.



## Fonctionnalités

**Fonctionnalité 1 – Objectifs**<br />

Sélectionnez un ou plusieurs objectifs parmi : Perte de poids, Prise de masse, Endurance, Force, Flexibilité, Remise en forme.

**Fonctionnalité 2 – Plage de poids**<br />

Définissez un poids minimum et un poids maximum (en kg).

**Fonctionnalité 3 – Nombre de lignes**<br />

Choisissez le nombre de lignes à afficher dans le tableau (entre 1 et 50).

**Fonctionnalité 4 – Tableau de résultats**<br />

Le tableau généré affiche pour chaque ligne : le poids, le nombre de séries, les répétitions, le temps de repos, l'intensité en pourcentage, et l'objectif associé.

**Bonus 1 – Validation des champs**<br />

Tous les champs sont valides : poids positifs, poids max supérieur au poids min, nombre de lignes entre 1 et 50, au moins un objectif sélectionné.

**Bonus 2 – Responsive**<br />

L'interface s'adapte aux mobiles, tablettes et desktop.
![image](/images/CleanShot%202026-02-20%20at%2011.46.43@2x.jpg)

![image](/images/CleanShot%202026-02-20%20at%2011.47.07@2x.jpg)

**Bonus 3 – Export**<br />

Export en CSV (téléchargement direct) et en PDF (impression navigateur).

---

## Architecture

```
fitness-planner/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.module.css
    ├── index.css
    ├── types/
    │   └── index.ts           # types TypeScript partagés
    ├── utils/
    │   ├── objectifs.ts       # données statiques des objectifs
    │   ├── tableau.ts         # génération des lignes du tableau
    │   ├── validation.ts      # validation du formulaire
    │   └── export.ts          # export CSV et PDF
    ├── hooks/
    │   └── useFormulaire.ts   # etat et logique du formulaire
    └── components/
        ├── ObjectifCard.tsx
        ├── ObjectifCard.module.css
        ├── FieldInput.tsx
        ├── FieldInput.module.css
        ├── ResultatTableau.tsx
        └── ResultatTableau.module.css
```

---

## Stack technique

- React 18
- TypeScript 5
- Vite 5
- CSS Modules (pas de dependance UI externe)