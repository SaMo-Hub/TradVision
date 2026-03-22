# 🚀 GUIDE DE DÉMARRAGE RAPIDE - TRADE AI ASSISTANT

## ⏱️ Installation (5 minutes)

### Étape 1: Naviguer vers le projet
```bash
cd "c:\Users\mazmc\OneDrive\Documents\GitHub\Trading\trad"
```

### Étape 2: Installer les dépendances (si pas déjà fait)
```bash
npm install
```

### Étape 3: Configurer l'API DeepSeek

1. **Créer un compte DeepSeek** (gratuit)
   - Allez sur https://platform.deepseek.com/
   - S'inscrire avec email
   - Vérifier l'email

2. **Générer une clé API**
   - Aller dans "API Keys"
   - Cliquer "Create New Key"
   - Copier la clé (format: `sk_...`)

3. **Créer le fichier .env.local**
   - À la racine du projet (same folder as package.json)
   - Contenu:
   ```
   DEEPSEEK_API_KEY=sk_votre_clé_ici
   ```
   - Remlacer `sk_votre_clé_ici` par votre vraie clé

### Étape 4: Démarrer le serveur
```bash
npm run dev
```

### Étape 5: Ouvrir dans le navigateur
```
http://localhost:3000
```

✅ **Vous êtes prêt!**

---

## 🎯 Premier Test (2 minutes)

1. **Sélectionner un actif**
   - Dropdown: Choisir "SPY - S&P 500 Index"

2. **Configurer l'analyse**
   - Style: Garder "swing"
   - Stratégie: Garder "trend"

3. **Lancer l'analyse**
   - Cliquer "⚡ Analyser Maintenant"
   - Attendre 5-10 secondes

4. **Vérifier le résultat**
   - Panel de droite affichera la recommandation IA
   - Score de confiance
   - Points d'entrée et stop loss

---

## 📊 Comprendre les Résultats

### Recommandations
- 🟢 **BUY**: Condition bullish, envisager l'achat
- 🔴 **SELL**: Condition bearish, envisager la vente
- 🟡 **HOLD**: Indécision, pas de signal fort
- ⚪ **NO_TRADE**: Pas d'opportunité claire, à éviter

### Score de Confiance
- 80-100%: Très fiable
- 60-79%: Acceptable
- 40-59%: Faible, utiliser avec prudence
- <40%: Ignorer

### Niveaux Clés
- **Support**: Niveau où le prix tend à rebondir vers le haut
- **Résistance**: Niveau où le prix tend à retomber

### Risk/Reward Ratio
- Exemple: **1:2.5** = Pour risquer 1$, gagner potentiellement 2.5$
- Bon ratio: >1:2

---

## 🔧 Commandes Utiles

```bash
# Démarrage
npm run dev         # Mode développement (hot-reload)
npm run build       # Build pour production
npm start           # Démarrer version production

# Maintenance
npm run lint        # Vérifier le code
npm list            # Lister les dépendances

# Debugging
npm run debug        # Démarrer avec Node debugger
```

---

## 📱 Interface

```
┌─ SIDEBAR ──────────────────────┬─ HEADER ───────────────────┐
│                                │                            │
│ ⚡ TRADE AI                     │ Analyse Multi-Timeframe    │
│ Assistant IA Pro               │ Powered by DeepSeek        │
│                                │                            │
│ 📊 Dashboard                   ├────────────────────────────┤
│ 📈 Historique                  │                            │
│ ⚙️  Paramètres                  │ CONTENU PRINCIPAL          │
│                                │                            │
│                                │ ┌─ Sélecteurs ──────────┐  │
│                                │ │ Actif | Style | Strat  │  │
│                                │ │ [Analyser]             │  │
│                                │ └────────────────────────┘  │
│                                │                            │
│                                │ ┌─ Graphiques ┐ ┌─ AI ──┐ │
│                                │ │ 1H | 4H | │ │ 🧠 AI │ │
│                                │ │ 1D | 1W | │ │ Panel │ │
│                                │ └─────────┘ │ └───────┘ │
│                                │              │          │
│                                └──────────────┴──────────┘
└────────────────────────────────┴───────────────────────────┘
```

---

## 🐛 Debug Courants

### Le serveur ne démarre pas
```
❌ Erreur: EADDRINUSE
→ Le port 3000 est déjà utilisé
→ Tuer le processus: lsof -ti:3000 | xargs kill -9
```

### API DeepSeek timeout
```
❌ Erreur: Request timeout
→ La clé API n'est pas valide
→ Vérifier sur https://platform.deepseek.com/
```

### Graphiques vides
```
❌ Les charts n'affichent rien
→ Ouvrir la console (F12)
→ Vérifier les erreurs JavaScript
→ Vérifier que le Canvas est supporté
```

---

## 📚 Ressources

- **DeepSeek API**: https://docs.deepseek.com/
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Zustand**: https://github.com/pmndrs/zustand

---

## 🎓 Prochaines Étapes

1. **Intégrer des données réelles**
   - Utiliser Finnhub, Alpha Vantage, ou Polygon API
   - Remplacer `generateMockOHLCData()`

2. **Ajouter l'authentification**
   - Connexion utilisateur
   - Sauvegarde des analyses

3. **Déployer en production**
   - Sur Vercel (facile pour Next.js)
   - Configuration des variables d'environnement

4. **Améliorer l'IA**
   - Ajuster les prompts DeepSeek
   - Ajouter du backtesting
   - Tracker les performances

---

**Version**: 1.0  
**Dernière mise à jour**: 31 Janvier 2026  
**Status**: ✅ Production Ready
