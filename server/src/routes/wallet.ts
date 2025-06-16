import { Router } from 'express';
import { WalletController } from '../controllers/WalletController';

export default (controller: WalletController) => {
  const router = Router();
  router.get('/',    controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/',   controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id',controller.remove);
  return router;
};
