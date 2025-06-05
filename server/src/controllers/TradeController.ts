import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../index';
import { Trade, TradeType } from '../entities/Trade';
import { WalletHolding } from '../entities/WalletHolding';

export class TradeController {
  /**
   * GET /trades
   * Récupère tous les trades (avec leur holding associé).
   */
  static getAll: RequestHandler = async (req, res) => {
    try {
      const repo = AppDataSource.getRepository(Trade);
      const trades = await repo.find({ relations: ['holding'] });
      res.json(trades);
    } catch (err) {
      console.error('TradeController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * GET /trades/:id
   * Récupère un trade par ID (inclut sa relation vers holding).
   * Si non trouvé, 404.
   */
  static getOne: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Trade);
      const trade = await repo.findOne({
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
      return;
    }
  };

  /**
   * POST /trades
   * Crée un nouveau trade pour un holding existant.
   * Body : { holding_id, crypto_symbol, type, amount, price, fee }.
   * type doit être 'buy' ou 'sell'. Si holding invalide, 400.
   */
  static create: RequestHandler = async (req, res) => {
    const { holding_id, crypto_symbol, type, amount, price, fee } = req.body;
    try {
      const holdingRepo = AppDataSource.getRepository(WalletHolding);
      const holding = await holdingRepo.findOneBy({ holding_id });
      if (!holding) {
        res.status(400).json({ message: 'Holding invalide' });
        return;
      }
      const repo = AppDataSource.getRepository(Trade);
      const trade = repo.create({
        holding,
        crypto_symbol,
        type: type as TradeType,
        amount,
        price,
        fee,
      });
      const saved = await repo.save(trade);
      res.status(201).json(saved);
    } catch (err) {
      console.error('TradeController.create error:', err);
      res.status(500).json({ message: 'Erreur création trade', error: err });
      return;
    }
  };

  /**
   * PUT /trades/:id
   * Met à jour un trade (crypto_symbol, type, amount, price, fee).
   * Si non trouvé, 404.
   */
  static update: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { crypto_symbol, type, amount, price, fee } = req.body;
    try {
      const repo = AppDataSource.getRepository(Trade);
      const trade = await repo.findOneBy({ trade_id: id });
      if (!trade) {
        res.status(404).json({ message: 'Trade non trouvé' });
        return;
      }
      trade.crypto_symbol = crypto_symbol ?? trade.crypto_symbol;
      trade.type = (type as TradeType) ?? trade.type;
      trade.amount = amount ?? trade.amount;
      trade.price = price ?? trade.price;
      trade.fee = fee ?? trade.fee;
      const updated = await repo.save(trade);
      res.json(updated);
    } catch (err) {
      console.error('TradeController.update error:', err);
      res.status(500).json({ message: 'Erreur mise à jour', error: err });
      return;
    }
  };

  /**
   * DELETE /trades/:id
   * Supprime un trade. Si inexistant, 404.
   */
  static remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Trade);
      const trade = await repo.findOneBy({ trade_id: id });
      if (!trade) {
        res.status(404).json({ message: 'Trade non trouvé' });
        return;
      }
      await repo.remove(trade);
      res.status(204).send();
    } catch (err) {
      console.error('TradeController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
      return;
    }
  };
}
