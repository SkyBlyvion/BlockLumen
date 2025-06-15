import { Router } from 'express';
import { AppDataSource } from '../index';
import { UserLearn } from '../entities/UserLearn';
import { User } from '../entities/User';
import { Learn } from '../entities/Learn';
import { UserLearnController } from '../controllers/UserLearnController';

const router = Router();
const controller = new UserLearnController(
  AppDataSource.getRepository(UserLearn),
  AppDataSource.getRepository(User),
  AppDataSource.getRepository(Learn)
);

// GET /user-learn → liste toutes les entrées user_learn
router.get('/', controller.getAll);

// GET /user-learn/user/:userId → liste les entrées pour un utilisateur
router.get('/user/:userId', controller.getByUser);

// POST /user-learn → crée ou met à jour une entrée
router.post('/', controller.createOrUpdate);

// DELETE /user-learn/:userId/:learnId → supprime l’entrée
router.delete('/:userId/:learnId', controller.remove);

export default router;
