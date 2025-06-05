import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../../src/index';
import { Preference } from '../entities/Preference';
import { User } from '../entities/User';

export class PreferenceController {
  /**
   * GET /preferences
   * Récupère toutes les préférences, avec relation vers User.
   */
  static getAll: RequestHandler = async (req, res) => {
    try {
      const repo = AppDataSource.getRepository(Preference);
      const prefs = await repo.find({ relations: ['user'] });
      res.json(prefs);
    } catch (err) {
      console.error('PreferenceController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * GET /preferences/user/:userId
   * Récupère les préférences d’un utilisateur donné.
   * Si aucun userId valide, renvoie tableau vide ou 400 selon implémentation.
   */
  static getByUser: RequestHandler = async (req, res) => {
    const user_id = parseInt(req.params.userId, 10);
    try {
      const repo = AppDataSource.getRepository(Preference);
      const prefs = await repo.find({
        where: { user: { user_id } },
        relations: ['user'],
      });
      res.json(prefs);
    } catch (err) {
      console.error('PreferenceController.getByUser error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * POST /preferences
   * Crée une préférence pour un utilisateur existant.
   * Body : { user_id, pref_key, pref_value }.
   * Si user_id invalide, renvoie 400.
   */
  static create: RequestHandler = async (req, res) => {
    const { user_id, pref_key, pref_value } = req.body;
    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ user_id });
      if (!user) {
        res.status(400).json({ message: 'Utilisateur invalide' });
        return;
      }
      const repo = AppDataSource.getRepository(Preference);
      const pref = repo.create({ user, pref_key, pref_value });
      const saved = await repo.save(pref);
      res.status(201).json(saved);
    } catch (err) {
      console.error('PreferenceController.create error:', err);
      res.status(500).json({ message: 'Erreur création préférence', error: err });
      return;
    }
  };

  /**
   * PUT /preferences/:id
   * Met à jour une préférence existante.
   * Si inexistant, 404.
   */
  static update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { pref_key, pref_value } = req.body;
    try {
      const repo = AppDataSource.getRepository(Preference);
      const pref = await repo.findOneBy({ preference_id: id });
      if (!pref) {
        res.status(404).json({ message: 'Préférence non trouvée' });
        return;
      }
      pref.pref_key = pref_key ?? pref.pref_key;
      pref.pref_value = pref_value ?? pref.pref_value;
      const updated = await repo.save(pref);
      res.json(updated);
    } catch (err) {
      console.error('PreferenceController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
      return;
    }
  };

  /**
   * DELETE /preferences/:id
   * Supprime une préférence. Si inexistant, 404.
   */
  static remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Preference);
      const pref = await repo.findOneBy({ preference_id: id });
      if (!pref) {
        res.status(404).json({ message: 'Préférence non trouvée' });
        return;
      }
      await repo.remove(pref);
      res.status(204).send();
    } catch (err) {
      console.error('PreferenceController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
      return;
    }
  };
}
