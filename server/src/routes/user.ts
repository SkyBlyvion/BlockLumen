import { Router } from 'express';
import { UserController } from '../controllers/UserController';

/**
 * Crée un Router Express pour les users en injectant une instance de UserController.
 */
export default (controller: UserController) => {
  const router = Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
};
