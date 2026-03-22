# 🚀 Guide de Déploiement - TRADE AI ASSISTANT

## Options de Déploiement

### 1️⃣ Vercel (⭐ Recommandé pour Next.js)

**Avantages:**
- ✅ Déploiement ultra-simple
- ✅ Build automatique
- ✅ Scaling automatique
- ✅ Gratuit pour démarrer

**Étapes:**

1. **Créer compte Vercel**
   - Allez sur https://vercel.com
   - S'inscrire avec GitHub

2. **Connecter le repo**
   - Importer le projet depuis GitHub
   - Sélectionner le branch

3. **Configurer les variables**
   - Environment variables → Add
   - Ajouter: `DEEPSEEK_API_KEY=sk_...`

4. **Déployer**
   - Click "Deploy"
   - Attendre la compilation (2-3 min)
   - ✅ App live sur `yourapp.vercel.app`

```bash
# Alternative: Via CLI
npm install -g vercel
vercel login
vercel deploy --prod
```

---

### 2️⃣ Docker (Self-hosted)

**Avantages:**
- ✅ Contrôle total
- ✅ Peut tourner n'importe où
- ✅ Reproductible

**Étapes:**

1. **Build l'image**
```bash
docker build -t trade-ai-assistant:1.0 .
```

2. **Démarrer le conteneur**
```bash
docker run -d \
  -p 3000:3000 \
  -e DEEPSEEK_API_KEY=sk_... \
  --name trade-ai \
  trade-ai-assistant:1.0
```

3. **Vérifier**
```bash
docker ps
docker logs trade-ai
# Ouvrir http://localhost:3000
```

**Avec Docker Compose:**
```bash
# Créer .env.production
echo "DEEPSEEK_API_KEY=sk_..." > .env.production

# Démarrer
docker-compose up -d

# Logs
docker-compose logs -f
```

---

### 3️⃣ Railway.app

**Avantages:**
- ✅ Simple pour Next.js
- ✅ Gratuit tier disponible
- ✅ CLI facile

**Étapes:**

1. **Installer Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login & Deploy**
```bash
railway login
railway link
railway up --detach
```

3. **Configurer env**
```bash
railway variables set DEEPSEEK_API_KEY=sk_...
```

---

### 4️⃣ Heroku (Classique)

**Étapes:**

1. **Installer Heroku CLI**
```bash
npm install -g heroku
```

2. **Login**
```bash
heroku login
```

3. **Créer app**
```bash
heroku create trade-ai-assistant
```

4. **Configurer env**
```bash
heroku config:set DEEPSEEK_API_KEY=sk_...
```

5. **Déployer**
```bash
git push heroku main
```

---

### 5️⃣ DigitalOcean App Platform

**Avantages:**
- ✅ Infrastructure fiable
- ✅ Prix prévisible
- ✅ Support professionnel

**Via Console:**
1. Aller sur https://cloud.digitalocean.com/apps
2. New App → Choose GitHub repo
3. Configure Build & Deploy
4. Set Environment Variables
5. Deploy

---

## Checklist Pré-Déploiement

- [ ] Variable `DEEPSEEK_API_KEY` configurée
- [ ] Build local réussi: `npm run build`
- [ ] Pas d'erreurs TypeScript
- [ ] Fichier `.env.local` **NON** commité
- [ ] README.md à jour
- [ ] Tests manuels passés

---

## Configuration Production

### Variables d'Environnement

```bash
# Obligatoire
DEEPSEEK_API_KEY=sk_votre_clé

# Optionnel
NODE_ENV=production
LOG_LEVEL=info
```

### Optimisations

1. **Enable compression**
```bash
# next.config.ts
compress: true
```

2. **Image optimization**
```bash
# next.config.ts
images: {
  minimumCacheTTL: 60,
  formats: ['image/webp', 'image/avif'],
}
```

3. **Database** (optionnel futur)
```bash
DATABASE_URL=postgresql://user:pass@host/db
```

---

## Monitoring Production

### Logs

**Vercel:**
```bash
vercel logs <app-name>
```

**Docker:**
```bash
docker logs -f trade-ai
```

### Performance

**Lighthouse:**
```bash
# Test localement
npm run build
npm start
# Ouvrir Chrome DevTools → Lighthouse
```

### Health Checks

```bash
# Vérifier que l'app répond
curl https://yourapp.com/
curl -X POST https://yourapp.com/api/analyze -d '{"symbol":"SPY"...}'
```

---

## Rollback

### Vercel
```bash
# Via dashboard: Click "Deployments" → Select previous → Click "Redeploy"
```

### Docker
```bash
docker stop trade-ai
docker rm trade-ai
docker run -d ... trade-ai-assistant:1.0  # Previous tag
```

---

## Costs Estimation

| Platform | Tier | Cost/Month |
|----------|------|-----------|
| Vercel | Free | $0 |
| Railway | Free | $0 (limited) |
| DigitalOcean | Basic | ~$5 |
| Heroku | Eco | ~$5 |
| Docker VPS | Basic | $5-10 |

**DeepSeek API**: Free tier généreux (1M tokens/mois)

---

## Quick Deploy Commands

```bash
# Build
npm run build

# Test production locally
npm run start

# Docker
docker build -t trade-ai . && docker run -p 3000:3000 trade-ai

# Vercel
vercel deploy --prod

# Railway
railway up --detach

# Heroku
git push heroku main
```

---

## Troubleshooting Déploiement

### Erreur: "Cannot find module @/types"
→ Vérifier `tsconfig.json` alias configuration

### Erreur: "DEEPSEEK_API_KEY is undefined"
→ Vérifier variables d'environnement dans la plateforme

### App crashes au démarrage
→ Vérifier les logs: `docker logs`, `vercel logs`

### Performance lente
→ Vérifier la quote DeepSeek API
→ Implémenter caching Redis

---

## Post-Déploiement

1. **Tester l'app**
   - Accéder à l'URL en production
   - Tester une analyse
   - Vérifier les logs

2. **Configurer DNS** (optionnel)
   - Point custom domain vers l'app

3. **Setup monitoring**
   - Sentry pour error tracking
   - Datadog pour metrics

4. **Backup & Recovery**
   - Configurer backups auto
   - Test de restore

---

## Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Docs](https://docs.docker.com/)
- [Railway Docs](https://docs.railway.app/)

---

**Deployment Guide v1.0** | Ready for Production 🚀
