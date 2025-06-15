import { Router } from 'express';
import { AppDataSource } from '../index';
import { Preference } from '../entities/Preference';
import { User } from '../entities/User';
import { PreferenceController } from '../controllers/PreferenceController';

const router = Router();
const controller = new PreferenceController(
  AppDataSource.getRepository(Preference),
  AppDataSource.getRepository(User)
);

// GET /preferences → liste toutes les préférences
router.get('/', controller.getAll);

// GET /preferences/user/:userId → liste préférences d’un user
router.get('/user/:userId', controller.getByUser);

// POST /preferences → crée une préférence
router.post('/', controller.create);

// PUT /preferences/:id → met à jour une préférence
router.put('/:id', controller.update);

// DELETE /preferences/:id → supprime une préférence
router.delete('/:id', controller.remove);

export default router;
