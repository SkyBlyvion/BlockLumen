import { RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

/** Controller pour la gestion des utilisateurs.
 * 
 * Le repository est injecté via le constructeur pour être sûr
 * que la DataSource est initialisée.
 */
export class UserController {
  constructor(private repo: Repository<User>) {}

  /** GET /users
   * 
   * Récupère la liste de tous les utilisateurs.
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const users = await this.repo.find();
      res.json(users);
    } catch (err) {
      console.error('UserController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /** GET /users/:id
   * 
   * Récupère un utilisateur par son ID.
   * Si l’utilisateur n’existe pas, renvoie 404.
   */
  getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await this.repo.findOneBy({ user_id: id });
      if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
        return;
      }
      res.json(user);
    } catch (err) {
      console.error('UserController.getOne error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /** POST /users
   * POST /users
   * Crée un nouvel utilisateur.
   * Body attendu : { username, email, password_hash }.
   */
  create: RequestHandler = async (req, res) => {
    const { username, email, password_hash } = req.body;
    try {
      const user = this.repo.create({ username, email, password_hash });
      const saved = await this.repo.save(user);
      res.status(201).json(saved);
    } catch (err) {
      console.error('UserController.create error:', err);
      res.status(500).json({ message: 'Erreur création utilisateur', error: err });
    }
  };

  /** PUT /users/:id
   * PUT /users/:id
   * Met à jour un utilisateur existant.
   * Si inexistant, renvoie 404.
   */
  update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { username, email, password_hash } = req.body;
    try {
      const user = await this.repo.findOneBy({ user_id: id });
      if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
        return;
      }
      user.username = username ?? user.username;
      user.email = email ?? user.email;
      user.password_hash = password_hash ?? user.password_hash;
      const updated = await this.repo.save(user);
      res.json(updated);
    } catch (err) {
      console.error('UserController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
    }
  };

  /** DELETE /users/:id
   * DELETE /users/:id
   * Supprime un utilisateur. Si inexistant, renvoie 404.
   */
  remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await this.repo.findOneBy({ user_id: id });
      if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
        return;
      }
      await this.repo.remove(user);
      res.status(204).send();
    } catch (err) {
      console.error('UserController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
