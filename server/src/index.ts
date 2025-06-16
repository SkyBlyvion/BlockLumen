import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "./entities/User";
import { Wallet } from "./entities/Wallet";
import { WalletHolding } from "./entities/WalletHolding";
import { Preference } from "./entities/Preference";
import { Price } from "./entities/Price";
import { Trade } from "./entities/Trade";
import { Learn } from "./entities/Learn";
import { UserLearn } from "./entities/UserLearn";

import { UserController } from "./controllers/UserController";
import { WalletController } from "./controllers/WalletController";
import { WalletHoldingController } from "./controllers/WalletHoldingController";
import { PreferenceController } from "./controllers/PreferenceController";
import { PriceController } from "./controllers/PriceController";
import { TradeController } from "./controllers/TradeController";
import { LearnController } from "./controllers/LearnController";
import { UserLearnController } from "./controllers/UserLearnController";

import userRoutesFactory from "./routes/user";
import walletRoutesFactory from "./routes/wallet";
import walletHoldingRoutesFactory from "./routes/walletHolding";
import preferenceRoutesFactory from "./routes/preference";
import priceRoutesFactory from "./routes/price";
import tradeRoutesFactory from "./routes/trade";
import learnRoutesFactory from "./routes/learn";
import userLearnRoutesFactory from "./routes/userLearn";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    User, Wallet, WalletHolding,
    Preference, Price, Trade,
    Learn, UserLearn
  ],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source initialized");

    const app = express();
    app.use(express.json());

    app.get("/health", (_req: Request, res: Response) => {
      res.status(200).json({ message: "Le serveur est en bonne santé" });
    });

    // Instantiate controllers after DataSource is ready
    const userController = new UserController(AppDataSource.getRepository(User));
    const walletController = new WalletController(
      AppDataSource.getRepository(Wallet),
      AppDataSource.getRepository(User)
    );
    const walletHoldingController = new WalletHoldingController(
      AppDataSource.getRepository(WalletHolding),
      AppDataSource.getRepository(Wallet)
    );
    const preferenceController = new PreferenceController(
      AppDataSource.getRepository(Preference),
      AppDataSource.getRepository(User)
    );
    const priceController = new PriceController(AppDataSource.getRepository(Price));
    const tradeController = new TradeController(
      AppDataSource.getRepository(Trade),
      AppDataSource.getRepository(WalletHolding)
    );
    const learnController = new LearnController(AppDataSource.getRepository(Learn));
    const userLearnController = new UserLearnController(
      AppDataSource.getRepository(UserLearn),
      AppDataSource.getRepository(User),
      AppDataSource.getRepository(Learn)
    );

    // Mount routes
    app.use("/users",       userRoutesFactory(userController));
    app.use("/wallets",     walletRoutesFactory(walletController));
    app.use("/holdings",    walletHoldingRoutesFactory(walletHoldingController));
    app.use("/preferences", preferenceRoutesFactory(preferenceController));
    app.use("/prices",      priceRoutesFactory(priceController));
    app.use("/trades",      tradeRoutesFactory(tradeController));
    app.use("/learn",       learnRoutesFactory(learnController));
    app.use("/user-learn",  userLearnRoutesFactory(userLearnController));

    // 404 handler
    app.use((_req, _res, next) => {
      _res.status(404);
      next(new Error("Route non trouvée"));
    });

    // Error handler
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      const status = res.statusCode !== 200 ? res.statusCode : 500;
      res.status(status).json({
        message: err.message,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
      });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend en écoute sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Échec de l'initialisation de TypeORM :", err);
    process.exit(1);
  }
}

main();
