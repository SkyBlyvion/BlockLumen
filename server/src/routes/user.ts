import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// GET /users → liste tous les users
router.get('/', UserController.getAll);

// GET /users/:id → récupère un user par ID
router.get('/:id', UserController.getOne);

// POST /users → crée un nouvel user
router.post('/', UserController.create);

// PUT /users/:id → met à jour un user
router.put('/:id', UserController.update);

// DELETE /users/:id → supprime un user
router.delete('/:id', UserController.remove);

export default router;
