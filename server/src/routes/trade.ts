import { Router } from 'express';
import { AppDataSource } from '../index';
import { Trade } from '../entities/Trade';
import { WalletHolding } from '../entities/WalletHolding';
import { TradeController } from '../controllers/TradeController';

const router = Router();
const controller = new TradeController(
  AppDataSource.getRepository(Trade),
  AppDataSource.getRepository(WalletHolding)
);

// GET /trades → liste tous les trades
router.get('/', controller.getAll);

// GET /trades/:id → récupère un trade par ID
router.get('/:id', controller.getOne);

// POST /trades → crée un nouveau trade
router.post('/', controller.create);

// PUT /trades/:id → met à jour un trade
router.put('/:id', controller.update);

// DELETE /trades/:id → supprime un trade
router.delete('/:id', controller.remove);

export default router;
