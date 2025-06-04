# ---- Étape 1 : build (TypeScript) ----
FROM node:18-alpine AS builder
WORKDIR /app

# Copier package*.json pour profiter du cache Docker
COPY package.json package-lock.json ./

# Installer TOUTES les dépendances (prod + dev)
RUN npm install --legacy-peer-deps

# Copier tout le code source
COPY . .

# Compiler le TypeScript → génère /app/dist
RUN npm run build

# ---- Étape 2 : production (allégée) ----
FROM node:18-alpine AS production
WORKDIR /app

# Copier package*.json pour installer seulement les dépendances de prod
COPY package.json package-lock.json ./
RUN npm install --production --legacy-peer-deps

# Copier le dossier compiled (/app/dist) depuis l’étape builder
COPY --from=builder /app/dist ./dist

# Copier un modèle de .env (le vrai sera monté via Docker Compose)
COPY .env.example .env

# Exposer le port d’écoute (5000)
EXPOSE 5000

# Par défaut, NODE_ENV=production
ENV NODE_ENV=production

# Commande de démarrage en production
CMD ["node", "dist/index.js"]
