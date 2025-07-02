# 🔄 **Git Sync Setup - cPanel + GitHub**

## 🚀 **SOLUZIONE RAPIDA - Personal Access Token**

### **Step 1: Crea Personal Access Token**

1. **GitHub.com** → **Il tuo profilo** (icona in alto a destra)
2. **Settings** → **Developer settings** (in fondo)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**

**Configurazione:**
- **Note:** `cPanel Gas e Power Deploy`
- **Expiration:** `No expiration`
- **Scopes selezionati:**
  - ✅ `repo` (Full control of private repositories)
  - ✅ `workflow` (Update GitHub Action workflows)

5. **Generate token** → **COPIA E SALVA IL TOKEN!**

### **Step 2: Configura Git in cPanel**

1. **cPanel** → **Git Version Control**
2. **Clone a Repository**

**Inserisci questi dati:**
```
Repository URL: https://TUOUSERNAME:TUOTOKEN@github.com/TUOUSERNAME/gas-power-compara.git
Repository Path: /public_html/ 
Repository Name: gas-power-compara
Branch: main
```

**Sostituisci:**
- `TUOUSERNAME` = Il tuo username GitHub
- `TUOTOKEN` = Il Personal Access Token creato

### **Step 3: Deploy dopo Clone**

Dopo il clone, esegui build:

**Via SSH Terminal (se disponibile):**
```bash
cd /public_html/gas-power-compara
npm install
npm run build:deploy
```

**Oppure manualmente:**
1. Carica/clona repository
2. Build locale
3. Upload cartella `dist/` su cPanel

## 🔄 **Workflow Aggiornamenti**

### **Per ogni modifica:**

**1. Sviluppo locale:**
```bash
# Fai modifiche
git add .
git commit -m "✨ Aggiornamento"
git push origin main
```

**2. Deploy su server:**
```bash
# In cPanel SSH Terminal
cd /public_html/gas-power-compara
git pull origin main
npm run build:deploy
```

**Oppure:**
1. **cPanel Git** → **Pull**
2. **Terminal SSH** → `npm run build:deploy`

## 🛠️ **Script Automatici Inclusi**

- `deploy.sh` - Build e deploy locale
- `build-and-deploy.sh` - Auto-build post-pull
- `npm run build:deploy` - Build + deploy automatico

## 📞 **Supporto**

Se ricevi ancora errori Git:
1. Verifica token GitHub attivo
2. Controlla username GitHub corretto
3. Verifica repository esistente
4. Testa con repository pubblico prima

**Repository URL formato:**
```
https://USERNAME:TOKEN@github.com/USERNAME/REPOSITORY.git
```