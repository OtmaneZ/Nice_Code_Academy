# Nice Code Academy - Frontend Next.js

Application frontend moderne pour Nice Code Academy, construite avec Next.js, TypeScript et Tailwind CSS.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

**Important** : Assurez-vous que le backend FastAPI est démarré sur `http://localhost:8000` avant d'utiliser le frontend.

### Build de production

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── courses/           # Pages cours
│   ├── exercises/         # Pages exercices
│   ├── activities/        # Pages activités
│   ├── sandbox/           # Sandbox de code
│   └── layout.tsx         # Layout principal
├── components/            # Composants réutilisables
│   ├── Layout.tsx        # Layout avec navbar
│   ├── Navbar.tsx        # Barre de navigation
│   ├── CourseCard.tsx    # Carte de cours
│   └── CodeEditor.tsx    # Éditeur de code
└── lib/                   # Utilitaires
    └── api.ts            # Client API Backend
```

## 🔌 API Backend

Le frontend communique avec le backend FastAPI via le client API défini dans `src/lib/api.ts`.

Configuration de l'URL du backend dans `.env.local` :

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🎨 Composants principaux

### CodeEditor
Éditeur de code Python intégré avec :
- Coloration syntaxique basique
- Support de la touche Tab pour l'indentation
- Bouton d'exécution intégré
- Interface similaire à un terminal

### CourseCard
Carte d'affichage pour les cours avec :
- Titre et description
- Badge de niveau (débutant, intermédiaire, avancé)
- Navigation vers le détail du cours

### Navbar
Barre de navigation responsive avec liens vers :
- Accueil
- Cours
- Exercices
- Activités
- Sandbox

## 🚢 Déploiement sur Vercel

1. Poussez le code sur GitHub
2. Connectez votre repository à Vercel
3. Configurez la variable d'environnement `NEXT_PUBLIC_API_URL` avec l'URL de production du backend
4. Déployez !

## 📝 Technologies utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **React Markdown** - Rendu du contenu Markdown

## 🔧 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build de production
- `npm start` - Démarre le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 📖 Documentation

Pour plus d'informations sur Next.js :
- [Documentation Next.js](https://nextjs.org/docs)
- [Apprendre Next.js](https://nextjs.org/learn)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
