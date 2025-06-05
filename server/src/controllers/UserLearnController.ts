import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../../src/index';
import { UserLearn } from '../entities/UserLearn';
import { User } from '../entities/User';
import { Learn } from '../entities/Learn';

export class UserLearnController {
  /**
   * GET /user-learn
   * Récupère toutes les entrées UserLearn (relation user ↔ learn).
   */
  static getAll: RequestHandler = async (req, res) => {
    try {
      const repo = AppDataSource.getRepository(UserLearn);
      const ul = await repo.find({ relations: ['user', 'learn'] });
      res.json(ul);
    } catch (err) {
      console.error('UserLearnController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * GET /user-learn/user/:userId
   * Récupère toutes les entrées pour un utilisateur donné.
   */
  static getByUser: RequestHandler = async (req, res) => {
    const user_id = parseInt(req.params.userId, 10);
    try {
      const repo = AppDataSource.getRepository(UserLearn);
      const ul = await repo.find({
        where: { user: { user_id } },
        relations: ['learn'],
      });
      res.json(ul);
    } catch (err) {
      console.error('UserLearnController.getByUser error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * POST /user-learn
   * Crée ou met à jour une entrée UserLearn (progression d’un user sur un module).
   * Body : { user_id, learn_id, is_completed?, completed_at? }.
   * Si user_id ou learn_id invalide, renvoie 400.
   */
  static createOrUpdate: RequestHandler = async (req, res) => {
    const { user_id, learn_id, is_completed, completed_at } = req.body;
    try {
      const userRepo = AppDataSource.getRepository(User);
      const learnRepo = AppDataSource.getRepository(Learn);
      const user = await userRepo.findOneBy({ user_id });
      const learn = await learnRepo.findOneBy({ learn_id });
      if (!user || !learn) {
        res.status(400).json({ message: 'Utilisateur ou module invalide' });
        return;
      }
      const repo = AppDataSource.getRepository(UserLearn);
      // Recherche d’une entrée existante
      let ul = await repo.findOne({
        where: { user: { user_id }, learn: { learn_id } },
      });
      if (!ul) {
        // Création si n’existe pas
        ul = repo.create({ user, learn, is_completed, completed_at });
      } else {
        // Mise à jour des champs reçus
        ul.is_completed = is_completed ?? ul.is_completed;
        ul.completed_at = completed_at ?? ul.completed_at;
      }
      const saved = await repo.save(ul);
      res.json(saved);
    } catch (err) {
      console.error('UserLearnController.createOrUpdate error:', err);
      res.status(500).json({ message: 'Erreur création/mise à jour', error: err });
      return;
    }
  };

  /**
   * DELETE /user-learn/:userId/:learnId
   * Supprime une entrée UserLearn. Si inexistant, renvoie 404.
   */
  static remove: RequestHandler = async (req, res) => {
    const user_id = parseInt(req.params.userId, 10);
    const learn_id = parseInt(req.params.learnId, 10);
    try {
      const repo = AppDataSource.getRepository(UserLearn);
      const ul = await repo.findOne({
        where: { user: { user_id }, learn: { learn_id } },
      });
      if (!ul) {
        res.status(404).json({ message: 'Entrée non trouvée' });
        return;
      }
      await repo.remove(ul);
      res.status(204).send();
    } catch (err) {
      console.error('UserLearnController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
      return;
    }
  };
}
