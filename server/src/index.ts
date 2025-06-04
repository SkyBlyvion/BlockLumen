/*
 * src/index.ts
 * Point d’entrée principal du backend BlockLumen (Node.js + TypeScript + MySQL + TypeORM + Express).
 * 
 * - Charge les variables d’environnement depuis .env
 * - Initialise la connexion à la base de données via TypeORM
 * - Configure Express : parsing JSON, middlewares, routes
 * - Démarre le serveur HTTP sur le port spécifié
 */

import "reflect-metadata";                   // Nécessaire pour TypeORM
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
//import userRoutes from "./routes/user.routes";    // (sera ajouté plus tard)
//import { User } from "./entities/User";           // (sera ajouté plus tard)

dotenv.config(); // Charger les variables d’environnement depuis le fichier .env

// --- Configuration TypeORM ---
// Comme l’entité User n’est pas encore créée, on passe un tableau vide.
// L’objectif est simplement de pouvoir tester la route /health sans erreur.
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,                    // ex. 'mysql' (nom du service Docker)
  port: Number(process.env.DB_PORT) || 3306,    // ex. 3306
  username: process.env.DB_USER,                // ex. 'root'
  password: process.env.DB_PASSWORD,            // ex. 'rootpassword'
  database: process.env.DB_NAME,                // ex. 'blocklumen'
  synchronize: false,
  logging: false,
  entities: [User],               // Aucun entity pour le moment
  migrations: [],
  subscribers: [],
});

async function main() {
  try {
    // Établir la connexion à la base de données
    await AppDataSource.initialize();
    console.log("Data Source initialized");

    // Créer l’application Express
    const app = express();

    // Middleware pour parser le body en JSON
    app.use(express.json());

    // Route de santé (« health check »)
    // Utile pour vérifier rapidement que le serveur tourne.
    app.get("/health", (_req: Request, res: Response) => {
      res.status(200).json({ message: "Le serveur est en bonne santé" });
    });

    // (Routes futures) Rattacher les routes utilisateur
    // app.use("/users", userRoutes);

    // Middleware de gestion des erreurs 404
    // Si aucune route ne correspond, on renvoie une 404 au client.
    app.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({ message: "Route non trouvée" });
    });

    // Écoute sur le port défini dans .env ou 5000 par défaut
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend en écoute sur http://localhost:${PORT}`);
    });
  } catch (err) {
    // Si la connexion à la base échoue, on log l’erreur et on arrête l’application.
    console.error("Échec de l'initialisation de TypeORM :", err);
    process.exit(1);
  }
}

main(); // Démarrage du serveur
