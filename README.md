# BlockLumen

**BlockLumen** est une application web composée d’un frontend React/TypeScript et d’un backend Node.js/TypeScript, avec une base de données MySQL conteneurisée par Docker. Ce README décrit la manière de cloner, configurer et lancer l’intégralité de l’environnement de développement.

---

## Table des matières

1. [Présentation du projet](#présentation-du-projet)  
2. [Prérequis](#prérequis)  
3. [Installation en local](#installation-en-local)  
   - [1. Cloner le repository](#1-cloner-le-repository)  
   - [2. Configuration des variables d’environnement](#2-configuration-des-variables-denvironnement)  
   - [3. Installation des dépendances Frontend](#3-installation-des-dépendances-frontend)  
   - [4. Installation des dépendances Backend](#4-installation-des-dépendances-backend)  
4. [Lancement en développement](#lancement-en-développement)  
   - [1. Démarrage des conteneurs Docker (Backend + MySQL)](#1-démarrage-des-conteneurs-docker-backend--mysql)  
   - [2. Démarrage du Frontend (Vite)](#2-démarrage-du-frontend-vite)  
5. [Structure du projet](#structure-du-projet)  
6. [Gestion de version avec GitHub](#gestion-de-version-avec-github)  
7. [Technologies utilisées](#technologies-utilisées)  

---

## Présentation du projet

BlockLumen propose une simulation sécurisée du trading (achats, ventes, gestion de portefeuille) enrichie de modules pédagogiques.
L’architecture se compose de :

- Un **frontend** React/TypeScript, développé avec Vite, Tailwind CSS, Redux Toolkit, React Router et Axios pour communiquer avec l’API.
- Un **backend** Node.js/TypeScript, reposant sur Express, TypeORM et MySQL, conteneurisé par Docker pour isoler la base de données et faciliter la portabilité.
- Une **base de données MySQL** initialisée automatiquement par Docker grâce à l’import d’un dump SQL (`BlockLumenBDD.sql`).

Ce README détaille l’installation locale de l’environnement de développement complet.

---

## Prérequis

Avant de commencer, s’assurer d’avoir installé :

- **Node.js** (v16+ recommandée) et **npm**  
- **Docker Desktop** (avec WSL 2 activé si vous êtes sous Windows)  
- **Git** (ligne de commande ou via GitHub Desktop / VS Code)  

---

## Installation en local

### 1. Cloner le repository

```bash
git clone https://github.com/<votre-orga>/BlockLumen.git
cd BlockLumen
```

### 2. Configuration des variables d’environnement

1. Se placer dans le dossier **server** :  
   ```bash
   cd server
   ```
2. Copier le fichier d’exemple :  
   ```bash
   cp .env.example .env
   ```
3. Modifier `.env` pour renseigner les valeurs appropriées :  
   ```
   PORT=5000
   DB_HOST=mysql
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=rootpassword
   DB_NAME=blocklumen
   JWT_SECRET=maCleSecreteJWT
   ```
   > **Note :** conserver `.env` hors du contrôle de version pour ne pas exposer de données sensibles.

### 3. Installation des dépendances Frontend

Ouvrir un nouveau terminal et se placer dans le dossier **client** :

```bash
cd ../client
npm install
```

Les dépendances principales sont :

- React / ReactDOM  
- Vite  
- Redux Toolkit + React-Redux  
- Axios  
- React Router DOM  
- Tailwind CSS + PostCSS + Autoprefixer  
- React Icons, React Loader Spinner  


### 4. Installation des dépendances Backend

Dans un autre terminal, se placer dans le dossier **server** :

```bash
cd ../server
npm install
```

Les dépendances principales sont :

- bcrypt
- dotenv
- express
- jsonwebtoken
- mysql12
- reflect-metadata
- typeorm 


## Lancement en développement

### 1. Démarrage des conteneurs Docker (Backend + MySQL)

Dans un terminal :

```bash
cd server
docker-compose up --build
```

- Le service **mysql** démarre, initialise la base `blocklumen` grâce au dump `BlockLumenBDD.sql`.  
- Le service **backend** se base sur l’étape “builder” du Dockerfile, installe les dépendances de développement (Nodemon, ts-node), compile (`npm run build`) puis lance `npm run dev` pour le hot-reload.  
- Le backend est accessible sur [http://localhost:5000](http://localhost:5000).  
- Tester la route de santé :  
  ```
  GET http://localhost:5000/health
  ```
  → _{ "message": "Le serveur est en bonne santé" }_  
- La base MySQL est accessible sur le port 3306, et la base `blocklumen` est déjà créée.

### 2. Démarrage du Frontend (Vite)

Dans un autre terminal :

```bash
cd ../client
npm run dev
```

- Vite démarre un serveur de développement sur [http://localhost:5173](http://localhost:5173).  
- L’application React/TypeScript s’affiche sans erreur.  
- Les requêtes Axios vers [http://localhost:5000](http://localhost:5000) (e.g. `/users`) fonctionnent aussitôt.

---

## Structure du projet

```
BlockLumen/
├── client/             # Frontend React/TypeScript (Vite, Tailwind, Redux…)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── contexts/
│   │   ├── redux/
│   │   ├── routers/
│   │   ├── screens/
│   │   ├── services/
│   │   ├── tools/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── server/             # Backend Node.js/TypeScript (Express, TypeORM, MySQL, Docker)
    ├── src/
    │   ├── controllers/
    │   ├── entities/
    │   ├── middlewares/
    │   ├── routes/
    │   ├── utils/
    │   └── index.ts
    ├── Dockerfile
    ├── docker-compose.yml
    ├── tsconfig.json
    ├── nodemon.json
    ├── .env.example
    └── package.json
```

---

## Gestion de version avec GitHub

1. **Installation de Git** dans VS Code (extension) et **GitHub Desktop**.  
2. Dans le projet, exécuter :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Créer un repository vierge sur GitHub, puis lier le dépôt local au dépôt distant :
   ```bash
   git remote add origin https://github.com/<votre-orga>/BlockLumen.git
   git branch -M main
   git push -u origin main
   ```
4. Effectuer des commits réguliers, usage de branches pour les nouvelles fonctionnalités, création de **pull requests** pour la revue de code.  

Cette gestion par Git et GitHub permet :  
- Une sauvegarde continue des évolutions du code.  
- Un travail collaboratif facilité par les branches et pull requests.  
- Le suivi précis de l’historique et la possibilité de revenir à une version antérieure si nécessaire.

---

## Technologies utilisées

- **Frontend**  
  - Vite  
  - React / TypeScript  
  - Tailwind CSS  
  - Redux Toolkit / React-Redux  
  - React Router DOM  
  - Axios  
  - React Loader Spinner  

- **Backend**  
  - Node.js / TypeScript  
  - Express  
  - TypeORM  
  - MySQL 8.0  
  - JSON Web Token (jsonwebtoken)  
  - bcrypt (hash des mots de passe)  
  - dotenv  

- **Conteneurisation**  
  - Dockerfile (multi-étages)  
  - Docker Compose  
  - Volume pour la persistance MySQL  
  - Hot-reload via Nodemon et montage de volumes  

---

## Accéder à l’application complète en dev

1. Cloner le repository et naviguer à la racine du projet :
   ```bash
   git clone https://github.com/<votre-orga>/BlockLumen.git
   cd BlockLumen
   ```
2. Ouvrir deux terminaux :

   **Terminal 1 : Backend + MySQL**  
   ```bash
   cd server
   docker-compose up --build
   ```
   → Démarre MySQL et l’API backend.  

   **Terminal 2 : Frontend**  
   ```bash
   cd client
   npm install     # si pas déjà fait
   npm run dev
   ```
   → Démarre Vite sur `http://localhost:5173`.

Les deux services démarrent en parallèle :  
- Backend (Node.js + TypeORM) accessible sur `http://localhost:5000`  
- Frontend (React/TypeScript) accessible sur `http://localhost:5173`

---

> **Bon développement !**
