import { Router } from 'express';
import { AppDataSource } from '../index';
import { Learn } from '../entities/Learn';
import { LearnController } from '../controllers/LearnController';

const router = Router();
const controller = new LearnController(AppDataSource.getRepository(Learn));

// GET /learn → liste tous les modules
router.get('/', controller.getAll);

// GET /learn/:id → récupère un module par ID
router.get('/:id', controller.getOne);

// POST /learn → crée un nouveau module
router.post('/', controller.create);

// PUT /learn/:id → met à jour un module
router.put('/:id', controller.update);

// DELETE /learn/:id → supprime un module
router.delete('/:id', controller.remove);

export default router;
