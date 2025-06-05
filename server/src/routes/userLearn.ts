import { Router } from 'express';
import { UserLearnController } from '../controllers/UserLearnController';

const router = Router();

// GET /user-learn → liste toutes les entrées user_learn
router.get('/', UserLearnController.getAll);

// GET /user-learn/user/:userId  → liste les entrées pour un utilisateur
router.get('/user/:userId', UserLearnController.getByUser);

// POST /user-learn → crée ou met à jour une entrée
router.post('/', UserLearnController.createOrUpdate);

// DELETE /user-learn/:userId/:learnId → supprime l’entrée
router.delete('/:userId/:learnId', UserLearnController.remove);

export default router;
