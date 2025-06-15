import { Request, Response, RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { Trade, TradeType } from '../entities/Trade';
import { WalletHolding } from '../entities/WalletHolding';

/**
 * Controller pour la gestion des trades.
 */
export class TradeController {
  constructor(
    private repo: Repository<Trade>,
    private holdingRepo: Repository<WalletHolding>
  ) {}

  /**
   * GET /trades
   * Récupère tous les trades (avec leur holding associé).
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const trades = await this.repo.find({ relations: ['holding'] });
      res.json(trades);
    } catch (err) {
      console.error('TradeController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * GET /trades/:id
   * Récupère un trade par ID (inclut sa relation vers holding).
   * Si non trouvé, 404.
   */
  getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const trade = await this.repo.findOne({
        where: { trade_id: id },
        relations: ['holding'],
      });
      if (!trade) {
        res.status(404).json({ message: 'Trade non trouvé' });
        return;
      }
      res.json(trade);
    } catch (err) {
      console.error('TradeController.getOne error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * POST /trades
   * Crée un nouveau trade pour un holding existant.
   * Body : { holding_id, crypto_symbol, type, amount, price, fee }.
   */
  create: RequestHandler = async (req, res) => {
    const { holding_id, crypto_symbol, type, amount, price, fee } = req.body;
    try {
      const holding = await this.holdingRepo.findOneBy({ holding_id });
      if (!holding) {
        res.status(400).json({ message: 'Holding invalide' });
        return;
      }
      const trade = this.repo.create({
        holding,
        crypto_symbol,
        type: type as TradeType,
        amount,
        price,
        fee,
      });
      const saved = await this.repo.save(trade);
      res.status(201).json(saved);
    } catch (err) {
      console.error('TradeController.create error:', err);
      res.status(500).json({ message: 'Erreur création trade', error: err });
    }
  };

  /**
   * PUT /trades/:id
   * Met à jour un trade. Si non trouvé, 404.
   */
  update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { crypto_symbol, type, amount, price, fee } = req.body;
    try {
      const trade = await this.repo.findOneBy({ trade_id: id });
      if (!trade) {
        res.status(404).json({ message: 'Trade non trouvé' });
        return;
      }
      trade.crypto_symbol = crypto_symbol ?? trade.crypto_symbol;
      trade.type = (type as TradeType) ?? trade.type;
      trade.amount = amount ?? trade.amount;
      trade.price = price ?? trade.price;
      trade.fee = fee ?? trade.fee;
      const updated = await this.repo.save(trade);
      res.json(updated);
    } catch (err) {
      console.error('TradeController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
    }
  };

  /**
   * DELETE /trades/:id
   * Supprime un trade. Si inexistant, 404.
   */
  remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const trade = await this.repo.findOneBy({ trade_id: id });
      if (!trade) {
        res.status(404).json({ message: 'Trade non trouvé' });
        return;
      }
      await this.repo.remove(trade);
      res.status(204).send();
    } catch (err) {
      console.error('TradeController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
