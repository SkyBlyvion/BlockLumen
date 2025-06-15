import { Request, Response, RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { Learn } from '../entities/Learn';

/**
 * Controller pour la gestion des modules pédagogiques.
 */
export class LearnController {
  constructor(private repo: Repository<Learn>) {}

  /**
   * GET /learn
   * Récupère tous les modules pédagogiques, triés par order_index.
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const modules = await this.repo.find({ order: { order_index: 'ASC' } });
      res.json(modules);
    } catch (err) {
      console.error('LearnController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * GET /learn/:id
   * Récupère un module par son ID. Si non trouvé, 404.
   */
  getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const module = await this.repo.findOneBy({ learn_id: id });
      if (!module) {
        res.status(404).json({ message: 'Module non trouvé' });
        return;
      }
      res.json(module);
    } catch (err) {
      console.error('LearnController.getOne error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * POST /learn
   * Crée un nouveau module pédagogique.
   * Body : { title, content, order_index }.
   */
  create: RequestHandler = async (req, res) => {
    const { title, content, order_index } = req.body;
    try {
      const module = this.repo.create({ title, content, order_index });
      const saved = await this.repo.save(module);
      res.status(201).json(saved);
    } catch (err) {
      console.error('LearnController.create error:', err);
      res.status(500).json({ message: 'Erreur création module', error: err });
    }
  };

  /**
   * PUT /learn/:id
   * Met à jour un module existant. Si inexistant, 404.
   */
  update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, content, order_index } = req.body;
    try {
      const module = await this.repo.findOneBy({ learn_id: id });
      if (!module) {
        res.status(404).json({ message: 'Module non trouvé' });
        return;
      }
      module.title = title ?? module.title;
      module.content = content ?? module.content;
      module.order_index = order_index ?? module.order_index;
      const updated = await this.repo.save(module);
      res.json(updated);
    } catch (err) {
      console.error('LearnController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
    }
  };

  /**
   * DELETE /learn/:id
   * Supprime un module. Si inexistant, 404.
   */
  remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const module = await this.repo.findOneBy({ learn_id: id });
      if (!module) {
        res.status(404).json({ message: 'Module non trouvé' });
        return;
      }
      await this.repo.remove(module);
      res.status(204).send();
    } catch (err) {
      console.error('LearnController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
