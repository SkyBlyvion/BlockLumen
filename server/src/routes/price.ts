import { Router } from 'express';
import { PriceController } from '../controllers/PriceController';

export default (controller: PriceController) => {
  const router = Router();
  router.get('/',               controller.getAll);
  router.get('/symbol/:symbol', controller.getBySymbol);
  router.post('/',              controller.create);
  router.delete('/:id',         controller.remove);
  return router;
};
