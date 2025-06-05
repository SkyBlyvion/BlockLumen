import { Router } from 'express';
import { LearnController } from '../controllers/LearnController';

const router = Router();

// GET /learn → liste tous les modules
router.get('/', LearnController.getAll);

// GET /learn/:id → récupère un module par ID
router.get('/:id', LearnController.getOne);

// POST /learn → crée un nouveau module
router.post('/', LearnController.create);

// PUT /learn/:id → met à jour un module
router.put('/:id', LearnController.update);

// DELETE /learn/:id → supprime un module
router.delete('/:id', LearnController.remove);

export default router;
