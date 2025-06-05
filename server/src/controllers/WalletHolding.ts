import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../../src/index';
import { WalletHolding } from '../entities/WalletHolding';
import { Wallet } from '../entities/Wallet';

export class WalletHoldingController {
  /**
   * GET /holdings
   * Liste tous les holdings, avec la relation vers leur wallet.
   */
  static getAll: RequestHandler = async (req, res) => {
    try {
      const repo = AppDataSource.getRepository(WalletHolding);
      const holdings = await repo.find({ relations: ['wallet'] });
      res.json(holdings);
    } catch (err) {
      console.error('WalletHoldingController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * GET /holdings/:id
   * Récupère un holding par ID (avec 'wallet' et 'trades').
   * Si non trouvé, 404.
   */
  static getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(WalletHolding);
      const holding = await repo.findOne({
        where: { holding_id: id },
        relations: ['wallet', 'trades'],
      });
      if (!holding) {
        res.status(404).json({ message: 'Holding non trouvé' });
        return;
      }
      res.json(holding);
    } catch (err) {
      console.error('WalletHoldingController.getOne error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * POST /holdings
   * Crée un nouveau holding pour un wallet existant.
   * Body : { wallet_id, crypto_symbol, quantity?, average_price? }
   * Si wallet_id invalide, renvoie 400.
   */
  static create: RequestHandler = async (req, res) => {
    const { wallet_id, crypto_symbol, quantity, average_price } = req.body;
    try {
      const walletRepo = AppDataSource.getRepository(Wallet);
      const wallet = await walletRepo.findOneBy({ wallet_id });
      if (!wallet) {
        res.status(400).json({ message: 'Portefeuille invalide' });
        return;
      }
      const repo = AppDataSource.getRepository(WalletHolding);
      const holding = repo.create({
        wallet,
        crypto_symbol,
        quantity,
        average_price,
      });
      const saved = await repo.save(holding);
      res.status(201).json(saved);
    } catch (err) {
      console.error('WalletHoldingController.create error:', err);
      res.status(500).json({ message: 'Erreur création holding', error: err });
      return;
    }
  };

  /**
   * PUT /holdings/:id
   * Met à jour un holding (crypto_symbol, quantity, average_price).
   * Si non trouvé, renvoie 404.
   */
  static update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { crypto_symbol, quantity, average_price } = req.body;
    try {
      const repo = AppDataSource.getRepository(WalletHolding);
      const holding = await repo.findOneBy({ holding_id: id });
      if (!holding) {
        res.status(404).json({ message: 'Holding non trouvé' });
        return;
      }
      holding.crypto_symbol = crypto_symbol ?? holding.crypto_symbol;
      holding.quantity = quantity ?? holding.quantity;
      holding.average_price = average_price ?? holding.average_price;
      const updated = await repo.save(holding);
      res.json(updated);
    } catch (err) {
      console.error('WalletHoldingController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
      return;
    }
  };

  /**
   * DELETE /holdings/:id
   * Supprime un holding. Si inexistant, renvoie 404.
   */
  static remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(WalletHolding);
      const holding = await repo.findOneBy({ holding_id: id });
      if (!holding) {
        res.status(404).json({ message: 'Holding non trouvé' });
        return;
      }
      await repo.remove(holding);
      res.status(204).send();
    } catch (err) {
      console.error('WalletHoldingController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
      return;
    }
  };
}
