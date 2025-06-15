import { Router } from 'express';
import { AppDataSource } from '../index';
import { Wallet } from '../entities/Wallet';
import { User } from '../entities/User';
import { WalletController } from '../controllers/WalletController';

const router = Router();
const controller = new WalletController(
  AppDataSource.getRepository(Wallet),
  AppDataSource.getRepository(User)
);

// GET /wallets → liste tous les wallets
router.get('/', controller.getAll);

// GET /wallets/:id → récupère un wallet par ID
router.get('/:id', controller.getOne);

// POST /wallets → crée un nouveau wallet
router.post('/', controller.create);

// PUT /wallets/:id → met à jour un wallet
router.put('/:id', controller.update);

// DELETE /wallets/:id → supprime un wallet
router.delete('/:id', controller.remove);

export default router;
