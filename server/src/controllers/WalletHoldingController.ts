import { Request, Response, RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { WalletHolding } from '../entities/WalletHolding';
import { Wallet } from '../entities/Wallet';

/**
 * Controller pour la gestion des holdings.
 */
export class WalletHoldingController {
  constructor(
    private repo: Repository<WalletHolding>,
    private walletRepo: Repository<Wallet>
  ) {}

  /**
   * GET /holdings
   * Liste tous les holdings, avec la relation vers leur wallet.
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const holdings = await this.repo.find({ relations: ['wallet'] });
      res.json(holdings);
    } catch (err) {
      console.error('WalletHoldingController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * GET /holdings/:id
   * Récupère un holding par ID. Si non trouvé, 404.
   */
  getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const holding = await this.repo.findOne({
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
    }
  };

  /**
   * POST /holdings
   * Crée un nouveau holding pour un wallet existant.
   * Body : { wallet_id, crypto_symbol, quantity?, average_price? }
   */
  create: RequestHandler = async (req, res) => {
    const { wallet_id, crypto_symbol, quantity, average_price } = req.body;
    try {
      const wallet = await this.walletRepo.findOneBy({ wallet_id });
      if (!wallet) {
        res.status(400).json({ message: 'Portefeuille invalide' });
        return;
      }
      const holding = this.repo.create({
        wallet,
        crypto_symbol,
        quantity,
        average_price,
      });
      const saved = await this.repo.save(holding);
      res.status(201).json(saved);
    } catch (err) {
      console.error('WalletHoldingController.create error:', err);
      res.status(500).json({ message: 'Erreur création holding', error: err });
    }
  };

  /**
   * PUT /holdings/:id
   * Met à jour un holding. Si non trouvé, 404.
   */
  update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { crypto_symbol, quantity, average_price } = req.body;
    try {
      const holding = await this.repo.findOneBy({ holding_id: id });
      if (!holding) {
        res.status(404).json({ message: 'Holding non trouvé' });
        return;
      }
      holding.crypto_symbol = crypto_symbol ?? holding.crypto_symbol;
      holding.quantity = quantity ?? holding.quantity;
      holding.average_price = average_price ?? holding.average_price;
      const updated = await this.repo.save(holding);
      res.json(updated);
    } catch (err) {
      console.error('WalletHoldingController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
    }
  };

  /**
   * DELETE /holdings/:id
   * Supprime un holding. Si inexistant, 404.
   */
  remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const holding = await this.repo.findOneBy({ holding_id: id });
      if (!holding) {
        res.status(404).json({ message: 'Holding non trouvé' });
        return;
      }
      await this.repo.remove(holding);
      res.status(204).send();
    } catch (err) {
      console.error('WalletHoldingController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
