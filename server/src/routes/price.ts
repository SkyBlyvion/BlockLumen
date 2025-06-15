import { Router } from 'express';
import { AppDataSource } from '../index';
import { Price } from '../entities/Price';
import { PriceController } from '../controllers/PriceController';

const router = Router();
const controller = new PriceController(AppDataSource.getRepository(Price));

// GET /prices → liste tous les prix
router.get('/', controller.getAll);

// GET /prices/symbol/:symbol → liste les prix par symbole
router.get('/symbol/:symbol', controller.getBySymbol);

// POST /prices → crée une entrée de prix
router.post('/', controller.create);

// DELETE /prices/:id → supprime une entrée de prix
router.delete('/:id', controller.remove);

export default router;
