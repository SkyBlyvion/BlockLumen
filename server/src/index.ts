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

// Import des entités TypeORM
import { User } from "./entities/User";
import { Wallet } from "./entities/Wallet";
import { Preference } from "./entities/Preference";
import { UserLearn } from "./entities/UserLearn";
import { Learn } from "./entities/Learn";
import { WalletHolding } from "./entities/WalletHolding";
import { Price } from "./entities/Price";
import { Trade } from "./entities/Trade";

// Import des routes
import userRoutes from './routes/user';
import walletRoutes from './routes/wallet';
import walletHoldingRoutes from './routes/walletHolding';
import tradeRoutes from './routes/trade';
import priceRoutes from './routes/price';
import learnRoutes from './routes/learn';
import preferenceRoutes from './routes/preference';
import userLearnRoutes from './routes/userLearn';

dotenv.config(); // Charger les variables d’environnement depuis le fichier .env

// --- Configuration TypeORM ---
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,                    // ex. 'mysql' (nom du service Docker)
  port: Number(process.env.DB_PORT) || 3306,    // ex. 3306
  username: process.env.DB_USER,                // ex. 'root'
  password: process.env.DB_PASSWORD,            // ex. 'rootpassword'
  database: process.env.DB_NAME,                // ex. 'blocklumen'
  synchronize: false,                           // false, on utilisera des migrations
  logging: false,
  entities: [User, Wallet, Preference, UserLearn, Learn, WalletHolding, Price, Trade ], // Ajouter les autres entités ici
  migrations: ['src/migrations/*.ts'],
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
    app.use('/users', userRoutes);
    app.use('/wallets', walletRoutes);
    app.use('/holdings', walletHoldingRoutes);
    app.use('/trades', tradeRoutes);
    app.use('/prices', priceRoutes);
    app.use('/learn', learnRoutes);
    app.use('/preferences', preferenceRoutes);
    app.use('/user-learn', userLearnRoutes);

    // 404 pour routes non définies
    app.use((_req: Request, res: Response, next: NextFunction) => {
      res.status(404)
      next(new Error('Route non trouvée'))
    })

    // Gestionnaire d’erreurs
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      const status = res.statusCode !== 200 ? res.statusCode : 500
      res.status(status).json({
        message: err.message,
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
      })
    })

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
