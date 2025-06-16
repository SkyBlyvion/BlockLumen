import { Router } from 'express';
import { UserLearnController } from '../controllers/UserLearnController';

export default (controller: UserLearnController) => {
  const router = Router();
  router.get('/',                controller.getAll);
  router.get('/user/:userId',    controller.getByUser);
  router.post('/',               controller.createOrUpdate);
  router.delete('/:userId/:learnId', controller.remove);
  return router;
};
