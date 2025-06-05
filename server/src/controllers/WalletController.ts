import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../index';
import { Wallet } from '../entities/Wallet';
import { User } from '../entities/User';

export class WalletController {
  /**
   * GET /wallets
   * Récupère tous les portefeuilles (avec relation vers User).
   */
  static getAll: RequestHandler = async (req, res) => {
    try {
      const repo = AppDataSource.getRepository(Wallet);
      const wallets = await repo.find({ relations: ['user'] });
      res.json(wallets);
    } catch (err) {
      console.error('WalletController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * GET /wallets/:id
   * Récupère un portefeuille par ID (inclut relations 'user' et 'holdings').
   * Si non trouvé, 404.
   */
  static getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Wallet);
      const wallet = await repo.findOne({
        where: { wallet_id: id },
        relations: ['user', 'holdings'],
      });
      if (!wallet) {
        res.status(404).json({ message: 'Portefeuille non trouvé' });
        return;
      }
      res.json(wallet);
    } catch (err) {
      console.error('WalletController.getOne error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * POST /wallets
   * Crée un portefeuille pour un utilisateur existant.
   * Body : { user_id, initial_balance? }
   * Si user_id invalide, renvoie 400.
   */
  static create: RequestHandler = async (req, res) => {
    const { user_id, initial_balance } = req.body;
    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ user_id });
      if (!user) {
        res.status(400).json({ message: 'Utilisateur invalide' });
        return;
      }
      const repo = AppDataSource.getRepository(Wallet);
      const wallet = repo.create({ user, initial_balance });
      const saved = await repo.save(wallet);
      res.status(201).json(saved);
    } catch (err) {
      console.error('WalletController.create error:', err);
      res.status(500).json({ message: 'Erreur création portefeuille', error: err });
      return;
    }
  };

  /**
   * PUT /wallets/:id
   * Met à jour un portefeuille (modifie initial_balance uniquement).
   * Si non trouvé, 404.
   */
  static update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { initial_balance } = req.body;
    try {
      const repo = AppDataSource.getRepository(Wallet);
      const wallet = await repo.findOneBy({ wallet_id: id });
      if (!wallet) {
        res.status(404).json({ message: 'Portefeuille non trouvé' });
        return;
      }
      wallet.initial_balance = initial_balance ?? wallet.initial_balance;
      const updated = await repo.save(wallet);
      res.json(updated);
    } catch (err) {
      console.error('WalletController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
      return;
    }
  };

  /**
   * DELETE /wallets/:id
   * Supprime un portefeuille. Si inexistant, 404.
   */
  static remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Wallet);
      const wallet = await repo.findOneBy({ wallet_id: id });
      if (!wallet) {
        res.status(404).json({ message: 'Portefeuille non trouvé' });
        return;
      }
      await repo.remove(wallet);
      res.status(204).send();
    } catch (err) {
      console.error('WalletController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
      return;
    }
  };
}
