import { Router } from 'express';
import { PriceController } from '../controllers/PriceController';

const router = Router();

// GET /prices → liste tous les prix
router.get('/', PriceController.getAll);

// GET /prices/symbol/:symbol → liste les prix par symbole (ex. BTC)
router.get('/symbol/:symbol', PriceController.getBySymbol);

// POST /prices → crée une entrée de prix
router.post('/', PriceController.create);

// DELETE /prices/:id → supprime une entrée de prix
router.delete('/:id', PriceController.remove);

export default router;
