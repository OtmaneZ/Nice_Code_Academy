Nice_Code_Academy/
├── backend/              # FastAPI (API principale + exécution code)
│   └── [structure actuelle]
│
└── frontend-nextjs/      # Next.js (UI + SEO + Routing)
    ├── pages/
    │   ├── index.tsx           # Page d'accueil
    │   ├── courses/
    │   │   ├── index.tsx       # Liste des cours
    │   │   └── [slug].tsx      # Détail cours (dynamic route)
    │   ├── exercise/
    │   │   └── [id].tsx        # Page exercice
    │   ├── sandbox.tsx
    │   ├── activities/
    │   │   ├── index.tsx
    │   │   └── [id].tsx
    │   └── api/               # API Routes (serverless)
    │       └── hello.ts
    │
    ├── components/
    │   ├── CodeEditor.tsx
    │   ├── CourseCard.tsx
    │   ├── Navbar.tsx
    │   └── Layout.tsx
    │
    ├── styles/
    │   └── globals.css        # Tailwind CSS
    │
    ├── lib/
    │   └── api.ts             # Client API pour backend
    │
    ├── public/
    │   └── images/
    │
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json