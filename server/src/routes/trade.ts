import { Router } from 'express';
import { TradeController } from '../controllers/TradeController';

export default (controller: TradeController) => {
  const router = Router();
  router.get('/',    controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/',   controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id',controller.remove);
  return router;
};
