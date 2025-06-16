import { Router } from 'express';
import { LearnController } from '../controllers/LearnController';

export default (controller: LearnController) => {
  const router = Router();
  router.get('/',    controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/',   controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);
  return router;
};
