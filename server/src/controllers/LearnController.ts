import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../../src/index';
import { Learn } from '../entities/Learn';

export class LearnController {
  /**
   * GET /learn
   * Récupère tous les modules pédagogiques, triés par order_index.
   */
  static getAll: RequestHandler = async (req, res) => {
    try {
      const repo = AppDataSource.getRepository(Learn);
      const modules = await repo.find({ order: { order_index: 'ASC' } });
      res.json(modules);
    } catch (err) {
      console.error('LearnController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * GET /learn/:id
   * Récupère un module par son ID. Si non trouvé, 404.
   */
  static getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Learn);
      const module = await repo.findOneBy({ learn_id: id });
      if (!module) {
        res.status(404).json({ message: 'Module non trouvé' });
        return;
      }
      res.json(module);
    } catch (err) {
      console.error('LearnController.getOne error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * POST /learn
   * Crée un nouveau module pédagogique.
   * Body : { title, content, order_index }.
   */
  static create: RequestHandler = async (req, res) => {
    const { title, content, order_index } = req.body;
    try {
      const repo = AppDataSource.getRepository(Learn);
      const module = repo.create({ title, content, order_index });
      const saved = await repo.save(module);
      res.status(201).json(saved);
    } catch (err) {
      console.error('LearnController.create error:', err);
      res.status(500).json({ message: 'Erreur création module', error: err });
      return;
    }
  };

  /**
   * PUT /learn/:id
   * Met à jour un module existant. Si inexistant, 404.
   */
  static update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, content, order_index } = req.body;
    try {
      const repo = AppDataSource.getRepository(Learn);
      const module = await repo.findOneBy({ learn_id: id });
      if (!module) {
        res.status(404).json({ message: 'Module non trouvé' });
        return;
      }
      module.title = title ?? module.title;
      module.content = content ?? module.content;
      module.order_index = order_index ?? module.order_index;
      const updated = await repo.save(module);
      res.json(updated);
    } catch (err) {
      console.error('LearnController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
      return;
    }
  };

  /**
   * DELETE /learn/:id
   * Supprime un module. Si inexistant, 404.
   */
  static remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Learn);
      const module = await repo.findOneBy({ learn_id: id });
      if (!module) {
        res.status(404).json({ message: 'Module non trouvé' });
        return;
      }
      await repo.remove(module);
      res.status(204).send();
    } catch (err) {
      console.error('LearnController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
      return;
    }
  };
}
