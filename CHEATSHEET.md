# 🚀 COMMANDES RAPIDES - TRADE AI ASSISTANT

## Navigation vers le projet

```bash
cd "c:\Users\mazmc\OneDrive\Documents\GitHub\Trading\trad"
```

---

## 🎯 Démarrage Rapide

### 1️⃣ Installation (une seule fois)
```bash
npm install
```

### 2️⃣ Configurer l'API
Créer le fichier `.env.local`:
```
DEEPSEEK_API_KEY=sk_votre_clé_ici
```

### 3️⃣ Démarrer le serveur
```bash
npm run dev
```

### 4️⃣ Ouvrir dans le navigateur
```
http://localhost:3000
```

---

## 📝 Commandes NPM

```bash
# Développement
npm run dev          # ▶️ Dev server avec hot-reload
npm run build        # 🔨 Compiler pour production
npm run start        # ▶️ Démarrer version production
npm run lint         # 🔍 Vérifier le code

# Utilities
npm list             # 📦 Lister les dépendances
npm outdated         # ⚠️  Vérifier les mises à jour
npm update           # 📦 Mettre à jour les packages
```

---

## 🐳 Docker

```bash
# Build
docker build -t trade-ai . 

# Run
docker run -d -p 3000:3000 trade-ai

# Compose
docker-compose up -d          # Démarrer
docker-compose logs -f        # Voir les logs
docker-compose down           # Arrêter
```

---

## 🌐 Endpoints

```bash
# Page
GET  http://localhost:3000/

# API Analyze
POST http://localhost:3000/api/analyze
```

---

## 📊 Testing

```bash
# Test build
npm run build

# Test production locally
npm run start

# Verify TypeScript
tsc --noEmit
```

---

## 🚢 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel login
vercel deploy --prod
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway up --detach
```

### Heroku
```bash
npm install -g heroku
heroku login
heroku create trade-ai-assistant
git push heroku main
```

---

## 🔍 Debugging

```bash
# Console logs (F12)
# Voir les erreurs en temps réel

# Network tab
# Voir les appels API

# TypeScript errors
npm run build  # Affiche les erreurs

# ESLint issues
npm run lint   # Affiche les problèmes de code
```

---

## 📚 Documentation Clés

| Doc | Usage |
|-----|-------|
| `README.md` | Guide général |
| `QUICKSTART.md` | Démarrage 5 min |
| `API_DOCUMENTATION.md` | Endpoints API |
| `DEPLOYMENT.md` | Comment déployer |
| `ARCHITECTURE.md` | Vue technique |

---

## 🎯 Workflow Typique

```
1. npm run dev              → Start dev server
2. http://localhost:3000    → Open app
3. Select asset & strategy
4. Click "Analyser"
5. See AI recommendation
6. Iterate & test
7. npm run build            → Test production
8. Commit changes
9. Deploy to Vercel/Railway
```

---

## ⚡ Quick Fixes

| Problem | Solution |
|---------|----------|
| Port 3000 used | `lsof -ti:3000 \| xargs kill -9` |
| Missing deps | `npm install` |
| TypeScript errors | Check `tsconfig.json` paths |
| API not working | Verify `.env.local` has key |
| Module not found | Check imports start with `@/` |

---

## 📋 Checklist Pré-Commit

- [ ] Tests complets
- [ ] Build réussi: `npm run build`
- [ ] Pas d'erreurs TypeScript
- [ ] Lint passe: `npm run lint`
- [ ] `.env.local` non commité

---

**Quick Reference** | Bookmark this! 📌
