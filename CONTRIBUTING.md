# 🤝 CONTRIBUTING - TRADE AI ASSISTANT

Merci de contribuer à TRADE AI ASSISTANT! Ce document explique comment participer au projet.

---

## 📋 Avant de Commencer

1. **Fork le repository**
   - GitHub → Fork button

2. **Cloner votre fork**
```bash
git clone https://github.com/YOUR_USERNAME/trading.git
cd trading/trad
```

3. **Installer les dépendances**
```bash
npm install
```

4. **Créer une branche**
```bash
git checkout -b feature/ma-feature
# ou
git checkout -b fix/mon-bug
```

---

## 🛠️ Workflow de Développement

### 1. Faire les modifications

```bash
# Dev server avec hot-reload
npm run dev

# Dans un autre terminal, vérifier le lint
npm run lint
```

### 2. Tester localement

- Ouvrir http://localhost:3000
- Tester la feature/fix complètement
- Vérifier la console (F12) pour les erreurs

### 3. Commit

```bash
# Commit atomique avec bon message
git add .
git commit -m "feat: ajouter nouvelle feature X"
# ou
git commit -m "fix: corriger bug Y"
```

**Format de commit:**
```
<type>: <description>

<body optional>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `perf`

### 4. Push & Pull Request

```bash
git push origin feature/ma-feature
```

- Aller sur GitHub
- Click "New Pull Request"
- Décrire les changements
- Soumettre

---

## ✅ Checklist Avant Pull Request

- [ ] Le code compile (`npm run build`)
- [ ] Pas d'erreurs TypeScript (`npm run lint`)
- [ ] Tests passés (si applicable)
- [ ] Commit messages clairs
- [ ] README.md mis à jour (si nécessaire)
- [ ] Screenshots/demos (si UI changes)

---

## 📝 Style de Code

### TypeScript
```typescript
// ✅ Bon
interface UserProfile {
  id: string;
  email: string;
  createdAt: Date;
}

const getUserProfile = async (id: string): Promise<UserProfile> => {
  // ...
};

// ❌ Mauvais
const getUserProfile = (id) => {
  // sans types, returns any
};
```

### React Components
```typescript
// ✅ Bon
'use client';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({ onClick, disabled, children }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// ❌ Mauvais
export default function Button(props) {
  // props typing missing, not exportable
}
```

### Naming Conventions
```
Components:     PascalCase (MyComponent.tsx)
Functions:      camelCase (myFunction)
Constants:      UPPER_SNAKE_CASE (MY_CONSTANT)
Files:          kebab-case (my-file.ts)
Interfaces:     PascalCase (MyInterface)
Types:          PascalCase (MyType)
```

---

## 🎯 Types de Contributions

### 1. Nouvelles Features

**Description**: Ajouter une nouvelle fonctionnalité

**Exemple:**
```
feat: ajouter historique des analyses
feat: implémenter sauvegarde en DB
feat: ajouter alertes email
```

**Checklist:**
- [ ] Feature testée
- [ ] Documentée dans README
- [ ] Types TypeScript complets
- [ ] Tests unitaires (si applicable)

### 2. Bug Fixes

**Description**: Corriger un bug existant

**Exemple:**
```
fix: corriger crash du ChartContainer
fix: corriger validation de la clé API
```

**Checklist:**
- [ ] Bug reproducible
- [ ] Fix testé
- [ ] Regression testing
- [ ] Issue linked

### 3. Documentation

**Description**: Améliorer la documentation

**Exemple:**
```
docs: améliorer le README
docs: ajouter exemples API
docs: clarifier architecture
```

**Checklist:**
- [ ] Markdown valide
- [ ] Liens valides
- [ ] Examples testés

### 4. Performance

**Description**: Optimiser la perf

**Exemple:**
```
perf: optimiser rendering ChartContainer
perf: ajouter caching ResultsPanel
```

**Checklist:**
- [ ] Metrics de perf mesurées
- [ ] No regression
- [ ] Documenté

### 5. Refactoring

**Description**: Améliorer la qualité du code

**Exemple:**
```
refactor: extraire composant AIPanel
refactor: simplifier store logic
```

**Checklist:**
- [ ] Tests passent
- [ ] No behavior change
- [ ] Code plus lisible

---

## 🧪 Testing

### Avant de soumettre

```bash
# Build
npm run build

# Lint
npm run lint

# Type check
tsc --noEmit

# Dev server
npm run dev
# → Tester manuellement
```

### Ajouter des tests

```typescript
// En future: tests/components/AIPanel.test.ts
import { render, screen } from '@testing-library/react';
import { AIPanel } from '@/components/panels/AIPanel';

describe('AIPanel', () => {
  it('renders recommendation', () => {
    const mockAnalysis = { recommendation: 'BUY', ... };
    render(<AIPanel analysis={mockAnalysis} />);
    expect(screen.getByText('BUY')).toBeInTheDocument();
  });
});
```

---

## 📚 Ressources

### Code
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Project
- [README.md](README.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🐛 Reporting Issues

### Template

```markdown
## Description
Describe the issue clearly

## Steps to Reproduce
1. Step 1
2. Step 2
3. ...

## Expected
What should happen

## Actual
What happens instead

## Environment
- OS: macOS/Windows/Linux
- Browser: Chrome/Firefox/etc
- Version: 1.0
```

### Exemple

```markdown
## Description
Le graphique 1H ne s'affiche pas

## Steps to Reproduce
1. Ouvrir l'app
2. Sélectionner SPY
3. Cliquer Analyser
4. Attendre 5s

## Expected
Le graphique 1H s'affiche

## Actual
Zone vide avec message d'erreur

## Environment
- OS: Windows 10
- Browser: Chrome 120
```

---

## 🎓 First Time Contributors

**Bienvenue!** Pour commencer:

1. **Look for "good-first-issue" label**
   - Issues marquées comme faciles

2. **Ask Questions**
   - Commentaire sur l'issue
   - Demander des précisions

3. **Start Small**
   - Docs improvement
   - Simple bug fix
   - Code cleanup

4. **Get Review**
   - Mainteneurs aideront
   - Itérer sur feedback

---

## 👥 Community

- **Questions**: Issues avec label "question"
- **Discussions**: Utiliser GitHub Discussions
- **Code Review**: Pair programming bienvenu

---

## 📄 License

En contribuant, vous acceptez que votre code soit sous licence MIT.

---

## 🎉 Thank You!

Merci pour votre contribution à TRADE AI ASSISTANT!

Votre effort aide le projet et la communauté.

---

**Contributing Guide v1.0** | Let's build something awesome! 🚀
