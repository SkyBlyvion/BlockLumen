import { Router } from 'express';
import { AppDataSource } from '../index';
import { User } from '../entities/User';
import { UserController } from '../controllers/UserController';

const router = Router();
const controller = new UserController(AppDataSource.getRepository(User));

// GET /users → liste tous les users
router.get('/', controller.getAll);

// GET /users/:id → récupère un user par ID
router.get('/:id', controller.getOne);

// POST /users → crée un nouvel user
router.post('/', controller.create);

// PUT /users/:id → met à jour un user
router.put('/:id', controller.update);

// DELETE /users/:id → supprime un user
router.delete('/:id', controller.remove);

export default router;
