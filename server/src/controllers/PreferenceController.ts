import { Request, Response, RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { Preference } from '../entities/Preference';
import { User } from '../entities/User';

/**
 * Controller pour la gestion des préférences utilisateur.
 */
export class PreferenceController {
  constructor(
    private repo: Repository<Preference>,
    private userRepo: Repository<User>
  ) {}

  /**
   * GET /preferences
   * Récupère toutes les préférences, avec relation vers User.
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const prefs = await this.repo.find({ relations: ['user'] });
      res.json(prefs);
    } catch (err) {
      console.error('PreferenceController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * GET /preferences/user/:userId
   * Récupère les préférences d’un utilisateur donné.
   */
  getByUser: RequestHandler = async (req, res) => {
    const user_id = parseInt(req.params.userId, 10);
    try {
      const prefs = await this.repo.find({
        where: { user: { user_id } },
        relations: ['user'],
      });
      res.json(prefs);
    } catch (err) {
      console.error('PreferenceController.getByUser error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * POST /preferences
   * Crée une préférence pour un utilisateur existant.
   * Body : { user_id, pref_key, pref_value }.
   */
  create: RequestHandler = async (req, res) => {
    const { user_id, pref_key, pref_value } = req.body;
    try {
      const user = await this.userRepo.findOneBy({ user_id });
      if (!user) {
        res.status(400).json({ message: 'Utilisateur invalide' });
        return;
      }
      const pref = this.repo.create({ user, pref_key, pref_value });
      const saved = await this.repo.save(pref);
      res.status(201).json(saved);
    } catch (err) {
      console.error('PreferenceController.create error:', err);
      res.status(500).json({ message: 'Erreur création préférence', error: err });
    }
  };

  /**
   * PUT /preferences/:id
   * Met à jour une préférence existante. Si inexistant, 404.
   */
  update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { pref_key, pref_value } = req.body;
    try {
      const pref = await this.repo.findOneBy({ preference_id: id });
      if (!pref) {
        res.status(404).json({ message: 'Préférence non trouvée' });
        return;
      }
      pref.pref_key = pref_key ?? pref.pref_key;
      pref.pref_value = pref_value ?? pref.pref_value;
      const updated = await this.repo.save(pref);
      res.json(updated);
    } catch (err) {
      console.error('PreferenceController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
    }
  };

  /**
   * DELETE /preferences/:id
   * Supprime une préférence. Si inexistant, 404.
   */
  remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const pref = await this.repo.findOneBy({ preference_id: id });
      if (!pref) {
        res.status(404).json({ message: 'Préférence non trouvée' });
        return;
      }
      await this.repo.remove(pref);
      res.status(204).send();
    } catch (err) {
      console.error('PreferenceController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
