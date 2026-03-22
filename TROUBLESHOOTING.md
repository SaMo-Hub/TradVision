# 🆘 TROUBLESHOOTING - TRADE AI ASSISTANT

Guide pour résoudre les problèmes courants.

---

## 🔴 Problèmes Courants

### ❌ "Port 3000 already in use"

**Symptôme:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Option 1: Tuer le processus (Windows)**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

**Option 2: Utiliser un autre port**
```bash
npm run dev -- -p 3001
```

**Option 3: Redémarrer le PC**

---

### ❌ "Cannot find module '@/types'"

**Symptôme:**
```
Module not found: Cannot find module '@/types'
```

**Causes:**
- `tsconfig.json` alias mal configuré
- Fichier n'existe pas

**Solutions:**

1. **Vérifier `tsconfig.json`**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // ← Doit pointer vers src/
    }
  }
}
```

2. **Vérifier le fichier existe**
```bash
ls -la src/types/index.ts  # Doit exister
```

3. **Redémarrer le serveur**
```bash
# Ctrl+C pour arrêter
# npm run dev pour redémarrer
```

---

### ❌ "DEEPSEEK_API_KEY is not configured"

**Symptôme:**
```
Error: DEEPSEEK_API_KEY is not configured
```

**Causes:**
- Fichier `.env.local` manquant
- Clé API non définie
- Nom de variable incorrect

**Solutions:**

1. **Créer `.env.local`**
```bash
# À la racine du projet (même dossier que package.json)
echo "DEEPSEEK_API_KEY=sk_votre_clé" > .env.local
```

2. **Vérifier le contenu**
```bash
cat .env.local
# Output: DEEPSEEK_API_KEY=sk_...
```

3. **Redémarrer le serveur**
```bash
# Arrêter: Ctrl+C
# Redémarrer: npm run dev
```

4. **Vérifier la clé API**
- Allez sur https://platform.deepseek.com/
- Connectez-vous
- Vérifiez la clé dans "API Keys"
- Régénérer si nécessaire

---

### ❌ "Authentication failed" (API DeepSeek)

**Symptôme:**
```
Error: Authentication failed
Status: 401
```

**Causes:**
- Clé API invalide
- Compte suspendu
- Quota dépassé

**Solutions:**

1. **Vérifier la clé**
```bash
# Vérifier que la clé commence par sk_
cat .env.local | grep DEEPSEEK_API_KEY
```

2. **Régénérer la clé**
- https://platform.deepseek.com/
- API Keys
- Delete old key
- Create new key
- Update `.env.local`

3. **Vérifier le compte**
- Ouvrir https://platform.deepseek.com/
- Vérifier que vous êtes connecté
- Vérifier le quota

4. **Vérifier les limits**
- Free tier: 1M tokens/mois
- Vérifier la consommation
- Upgrader si nécessaire

---

### ❌ "No JSON found in response"

**Symptôme:**
```
Error: No JSON found in response
```

**Causes:**
- DeepSeek API retourne une erreur
- Format de réponse inattendu
- Timeout de requête

**Solutions:**

1. **Vérifier la console**
```bash
# Dans le terminal:
npm run dev

# Regarder les logs quand vous appelez l'API
```

2. **Tester l'API manuellement**
```bash
curl -X POST https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer sk_your_key" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"test"}]}'
```

3. **Augmenter le timeout**
```typescript
// Dans AnalyzeButton.tsx
axios.post('/api/analyze', request, {
  timeout: 60000,  // 60 secondes au lieu de 30
});
```

---

### ❌ "Les graphiques ne s'affichent pas"

**Symptôme:**
- Zone vide où devrait être le graphique
- Pas de bougies (candlesticks)

**Causes:**
- Canvas 2D pas supporté
- Erreur JavaScript dans ChartContainer
- Données vides

**Solutions:**

1. **Ouvrir la console (F12)**
   - Vérifier les erreurs rouges
   - Copier le message d'erreur
   - Chercher sur Google

2. **Vérifier le browser**
```javascript
// Dans la console (F12)
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx ? '✅ Canvas OK' : '❌ Canvas not supported');
```

3. **Vérifier les données**
```javascript
// Dans AnalyzeButton.tsx, ajouter:
console.log('Chart data:', generateMockChartData());
```

4. **Redémarrer le navigateur**
- Fermer complètement
- Réouvrir
- Clear cache: Ctrl+Shift+Delete

---

### ❌ "TypeScript errors" dans VS Code

**Symptôme:**
```
Cannot find module '@/components'
Property 'symbol' does not exist
```

**Solutions:**

1. **Redémarrer le serveur TypeScript**
   - VS Code: Ctrl+Shift+P
   - Taper: "TypeScript: Restart TS Server"

2. **Vérifier les imports**
```typescript
// ❌ Mauvais
import { AIPanel } from 'components/panels/AIPanel';

// ✅ Bon
import { AIPanel } from '@/components/panels/AIPanel';
```

3. **Rebuild le projet**
```bash
npm run build
# Doit pas avoir d'erreurs
```

---

### ❌ "npm install errors"

**Symptôme:**
```
npm error code E404
npm error 404 Not Found
```

**Solutions:**

1. **Vérifier la connection internet**
```bash
npm ping
```

2. **Clear npm cache**
```bash
npm cache clean --force
```

3. **Réinstaller**
```bash
rm -rf node_modules package-lock.json
npm install
```

4. **Utiliser un autre registry** (rare)
```bash
npm config set registry https://registry.npmjs.org/
```

---

### ❌ "Build fails"

**Symptôme:**
```
✓ Compiled successfully in 2.3s
✗ Failed TypeScript check
```

**Solutions:**

1. **Voir l'erreur complète**
```bash
npm run build  # Affiche tous les erreurs
```

2. **Fixer les erreurs une par une**
```bash
# Erreur type: Cannot find module
# Solution: Vérifier les imports et paths
```

3. **Vérifier tsconfig.json**
```bash
# Doit avoir la bonne config
cat tsconfig.json | grep -A2 paths
```

---

### ❌ "Performance lente"

**Symptôme:**
- Charger le page lente
- Analyser prend trop longtemps
- UI lag

**Solutions:**

1. **Analyser les performances**
   - F12 → Lighthouse
   - Voir les bottlenecks

2. **Pour les graphiques**
```typescript
// ChartContainer.tsx - optimiser le rendu
useEffect(() => {
  // Ne redessiner que si les données changent
}, [chartData]); // Dependency array important
```

3. **Pour l'API**
```typescript
// Ajouter caching
const cache = new Map();
if (cache.has(key)) return cache.get(key);
// ... fetch ...
cache.set(key, result);
```

---

## ✅ Checklist Diagnostic

Avant de demander de l'aide:

- [ ] Le serveur démarre (`npm run dev`)
- [ ] Pas d'erreurs dans la console (F12)
- [ ] `.env.local` contient la clé API
- [ ] Pas d'erreurs TypeScript (`npm run build`)
- [ ] Redémarrage du serveur testé
- [ ] Redémarrage du navigateur testé
- [ ] Cache navigateur vidé (Ctrl+Shift+Delete)

---

## 📞 Support

Si rien ne fonctionne:

1. **Chercher dans la documentation**
   - README.md
   - ARCHITECTURE.md
   - API_DOCUMENTATION.md

2. **Vérifier les logs**
```bash
# Terminal
npm run dev  # Regarder les erreurs

# Navigateur
F12 → Console  # Regarder les erreurs
```

3. **Créer une issue** (GitHub)
   - Décrire le problème
   - Inclure les logs
   - Inclure les étapes pour reproduire

---

## 🔧 Debug Mode

Pour plus d'info lors du développement:

```typescript
// Dans route.ts, augmenter les logs
console.log('Request:', request);
console.log('Response:', result);

// Dans ChartContainer.tsx
console.log('Chart data:', chartData);
console.log('Canvas context:', ctx);
```

---

**Troubleshooting Guide v1.0** | Good Luck! 🍀
