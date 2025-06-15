import { Request, Response, RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/Wallet';
import { User } from '../entities/User';

/**
 * Controller pour la gestion des portefeuilles.
 */
export class WalletController {
  constructor(
    private repo: Repository<Wallet>,
    private userRepo: Repository<User>
  ) {}

  /**
   * GET /wallets
   * Récupère tous les portefeuilles (avec relation vers User).
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const wallets = await this.repo.find({ relations: ['user'] });
      res.json(wallets);
    } catch (err) {
      console.error('WalletController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * GET /wallets/:id
   * Récupère un portefeuille par ID.
   * Si non trouvé, 404.
   */
  getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const wallet = await this.repo.findOne({
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
    }
  };

  /**
   * POST /wallets
   * Crée un portefeuille pour un utilisateur existant.
   * Body : { user_id, initial_balance? }
   */
  create: RequestHandler = async (req, res) => {
    const { user_id, initial_balance } = req.body;
    try {
      const user = await this.userRepo.findOneBy({ user_id });
      if (!user) {
        res.status(400).json({ message: 'Utilisateur invalide' });
        return;
      }
      const wallet = this.repo.create({ user, initial_balance });
      const saved = await this.repo.save(wallet);
      res.status(201).json(saved);
    } catch (err) {
      console.error('WalletController.create error:', err);
      res.status(500).json({ message: 'Erreur création portefeuille', error: err });
    }
  };

  /**
   * PUT /wallets/:id
   * Met à jour un portefeuille (initial_balance).
   * Si non trouvé, 404.
   */
  update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { initial_balance } = req.body;
    try {
      const wallet = await this.repo.findOneBy({ wallet_id: id });
      if (!wallet) {
        res.status(404).json({ message: 'Portefeuille non trouvé' });
        return;
      }
      wallet.initial_balance = initial_balance ?? wallet.initial_balance;
      const updated = await this.repo.save(wallet);
      res.json(updated);
    } catch (err) {
      console.error('WalletController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
    }
  };

  /**
   * DELETE /wallets/:id
   * Supprime un portefeuille. Si inexistant, 404.
   */
  remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const wallet = await this.repo.findOneBy({ wallet_id: id });
      if (!wallet) {
        res.status(404).json({ message: 'Portefeuille non trouvé' });
        return;
      }
      await this.repo.remove(wallet);
      res.status(204).send();
    } catch (err) {
      console.error('WalletController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
