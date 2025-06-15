import { Router } from 'express';
import { AppDataSource } from '../index';
import { WalletHolding } from '../entities/WalletHolding';
import { Wallet } from '../entities/Wallet';
import { WalletHoldingController } from '../controllers/WalletHoldingController';

const router = Router();
const controller = new WalletHoldingController(
  AppDataSource.getRepository(WalletHolding),
  AppDataSource.getRepository(Wallet)
);

// GET /holdings → liste tous les holdings
router.get('/', controller.getAll);

// GET /holdings/:id → récupère un holding par ID
router.get('/:id', controller.getOne);

// POST /holdings → crée un nouveau holding
router.post('/', controller.create);

// PUT /holdings/:id → met à jour un holding
router.put('/:id', controller.update);

// DELETE /holdings/:id → supprime un holding
router.delete('/:id', controller.remove);

export default router;
