import { Router } from 'express';
import { WalletController } from '../controllers/WalletController';

const router = Router();

// GET /wallets → liste tous les wallets
router.get('/', WalletController.getAll);

// GET/wallets/:id → récupère un wallet par ID
router.get('/:id', WalletController.getOne);

// POST /wallets → crée un nouveau wallet
router.post('/', WalletController.create);

// PUT /wallets/:id → met à jour un wallet
router.put('/:id', WalletController.update);

// DELETE /wallets/:id → supprime un wallet
router.delete('/:id', WalletController.remove);

export default router;
