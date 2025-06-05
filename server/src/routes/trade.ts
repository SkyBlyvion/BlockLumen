import { Router } from 'express';
import { TradeController } from '../controllers/TradeController';

const router = Router();

// GET /trades → liste tous les trades
router.get('/', TradeController.getAll);

// GET /trades/:id → récupère un trade par ID
router.get('/:id', TradeController.getOne);

// POST /trades → crée un nouveau trade
router.post('/', TradeController.create);

// PUT /trades/:id → met à jour un trade
router.put('/:id', TradeController.update);

// DELETE /trades/:id → supprime un trade
router.delete('/:id', TradeController.remove);

export default router;
