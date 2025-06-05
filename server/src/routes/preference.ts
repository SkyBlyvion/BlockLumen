import { Router } from 'express';
import { PreferenceController } from '../controllers/PreferenceController';

const router = Router();

// GET /preferences → liste toutes les préférences
router.get('/', PreferenceController.getAll);

// GET /preferences/user/:userId → liste préférences d’un user
router.get('/user/:userId', PreferenceController.getByUser);

// POST /preferences → crée une préférence
router.post('/', PreferenceController.create);

// PUT /preferences/:id → met à jour une préférence
router.put('/:id', PreferenceController.update);

// DELETE /preferences/:id → supprime une préférence
router.delete('/:id', PreferenceController.remove);

export default router;
