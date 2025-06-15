import { Request, Response, RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { UserLearn } from '../entities/UserLearn';
import { User } from '../entities/User';
import { Learn } from '../entities/Learn';

/**
 * Controller pour la jonction User ↔ Learn.
 */
export class UserLearnController {
  constructor(
    private repo: Repository<UserLearn>,
    private userRepo: Repository<User>,
    private learnRepo: Repository<Learn>
  ) {}

  /**
   * GET /user-learn
   * Récupère toutes les entrées UserLearn (relation user ↔ learn).
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const ul = await this.repo.find({ relations: ['user', 'learn'] });
      res.json(ul);
    } catch (err) {
      console.error('UserLearnController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * GET /user-learn/user/:userId
   * Récupère toutes les entrées pour un utilisateur donné.
   */
  getByUser: RequestHandler = async (req, res) => {
    const user_id = parseInt(req.params.userId, 10);
    try {
      const ul = await this.repo.find({
        where: { user: { user_id } },
        relations: ['learn'],
      });
      res.json(ul);
    } catch (err) {
      console.error('UserLearnController.getByUser error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * POST /user-learn
   * Crée ou met à jour une entrée UserLearn (progression d’un user sur un module).
   * Body : { user_id, learn_id, is_completed?, completed_at? }.
   */
  createOrUpdate: RequestHandler = async (req, res) => {
    const { user_id, learn_id, is_completed, completed_at } = req.body;
    try {
      const user = await this.userRepo.findOneBy({ user_id });
      const learn = await this.learnRepo.findOneBy({ learn_id });
      if (!user || !learn) {
        res.status(400).json({ message: 'Utilisateur ou module invalide' });
        return;
      }
      let ul = await this.repo.findOne({
        where: { user: { user_id }, learn: { learn_id } },
      });
      if (!ul) {
        ul = this.repo.create({ user, learn, is_completed, completed_at });
      } else {
        ul.is_completed = is_completed ?? ul.is_completed;
        ul.completed_at = completed_at ?? ul.completed_at;
      }
      const saved = await this.repo.save(ul);
      res.json(saved);
    } catch (err) {
      console.error('UserLearnController.createOrUpdate error:', err);
      res.status(500).json({ message: 'Erreur création/mise à jour', error: err });
    }
  };

  /**
   * DELETE /user-learn/:userId/:learnId
   * Supprime une entrée UserLearn. Si inexistant, renvoie 404.
   */
  remove: RequestHandler = async (req, res) => {
    const user_id = parseInt(req.params.userId, 10);
    const learn_id = parseInt(req.params.learnId, 10);
    try {
      const ul = await this.repo.findOne({
        where: { user: { user_id }, learn: { learn_id } },
      });
      if (!ul) {
        res.status(404).json({ message: 'Entrée non trouvée' });
        return;
      }
      await this.repo.remove(ul);
      res.status(204).send();
    } catch (err) {
      console.error('UserLearnController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
