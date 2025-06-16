import { Router } from 'express';
import { PreferenceController } from '../controllers/PreferenceController';

export default (controller: PreferenceController) => {
  const router = Router();
  router.get('/',               controller.getAll);
  router.get('/user/:userId',   controller.getByUser);
  router.post('/',              controller.create);
  router.put('/:id',            controller.update);
  router.delete('/:id',         controller.remove);
  return router;
};
