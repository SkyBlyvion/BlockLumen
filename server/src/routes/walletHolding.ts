import { Router } from 'express';
import { WalletHoldingController } from '../controllers/WalletHoldingController';

export default (controller: WalletHoldingController) => {
  const router = Router();
  router.get('/',    controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/',   controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id',controller.remove);
  return router;
};
