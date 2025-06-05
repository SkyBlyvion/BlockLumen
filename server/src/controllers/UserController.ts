import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../index';
import { User } from '../entities/User';

export class UserController {
    /**
     * GET /users
     * Récupère la liste de tous les utilisateurs.
     */
    static getAll: RequestHandler = async (req, res) => {
        try {
            const repo = AppDataSource.getRepository(User);
            const users = await repo.find();
            // Envoi de la réponse (200 OK implicite)
            res.json(users);
            // La fonction se termine implicitement → Promise<void>
        } catch (err) {
            console.error('UserController.getAll error:', err);
            res.status(500).json({ message: 'Erreur serveur', error: err });
            return;
        }
    };

    /**
     * GET /users/:id
     * Récupère un utilisateur par son ID.
     * Si l’utilisateur n’existe pas, renvoie 404.
     */
    static getOne: RequestHandler = async (req, res) => {
        const id = parseInt(req.params.id, 10);
        try {
            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOneBy({ user_id: id });
            if (!user) {
                // Utilisateur non trouvé → 404 Not Found
                res.status(404).json({ message: 'Utilisateur non trouvé' });
                return;
            }
            // Envoi de l’utilisateur trouvé
            res.json(user);
        } catch (err) {
            console.error('UserController.getOne error:', err);
            res.status(500).json({ message: 'Erreur serveur', error: err });
            return;
        }
    };

    /**
     * POST /users
     * Crée un nouvel utilisateur.
     * Body attendu : { username, email, password_hash }.
     */
    static create: RequestHandler = async (req, res) => {
        const { username, email, password_hash } = req.body;
        try {
            const repo = AppDataSource.getRepository(User);
            const user = repo.create({ username, email, password_hash });
            const saved = await repo.save(user);
            // 201 Created
            res.status(201).json(saved);
        } catch (err) {
            console.error('UserController.create error:', err);
            res.status(500).json({ message: 'Erreur création utilisateur', error: err });
            return;
        }
    };

    /**
     * PUT /users/:id
     * Met à jour un utilisateur existant.
     * Si inexistant, renvoie 404.
     */
    static update: RequestHandler = async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const { username, email, password_hash } = req.body;
        try {
            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOneBy({ user_id: id });
            if (!user) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
                return;
            }
            // Mise à jour des champs reçus
            user.username = username ?? user.username;
            user.email = email ?? user.email;
            user.password_hash = password_hash ?? user.password_hash;
            const updated = await repo.save(user);
            res.json(updated);
        } catch (err) {
            console.error('UserController.update error:', err);
            res.status(500).json({ message: 'Erreur mise à jour', error: err });
            return;
        }
    };

    /**
     * DELETE /users/:id
     * Supprime un utilisateur. Si inexistant, renvoie 404.
     */
    static remove: RequestHandler = async (req, res) => {
        const id = parseInt(req.params.id, 10);
        try {
            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOneBy({ user_id: id });
            if (!user) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
                return;
            }
            await repo.remove(user);
            // 204 No Content
            res.status(204).send();
        } catch (err) {
            console.error('UserController.remove error:', err);
            res.status(500).json({ message: 'Erreur suppression', error: err });
            return;
        }
    };
}
