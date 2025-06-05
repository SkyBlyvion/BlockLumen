import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../index';
import { Price } from '../entities/Price';

export class PriceController {
  /**
   * GET /prices
   * Récupère toutes les entrées de prix.
   */
  static getAll: RequestHandler = async (req, res) => {
    try {
      const repo = AppDataSource.getRepository(Price);
      const prices = await repo.find();
      res.json(prices);
    } catch (err) {
      console.error('PriceController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * GET /prices/symbol/:symbol
   * Récupère l’historique des prix pour un symbole (trié par recorded_at ASC).
   */
  static getBySymbol: RequestHandler = async (req, res) => {
    const { symbol } = req.params;
    try {
      const repo = AppDataSource.getRepository(Price);
      const prices = await repo.find({
        where: { crypto_symbol: symbol },
        order: { recorded_at: 'ASC' },
      });
      res.json(prices);
    } catch (err) {
      console.error('PriceController.getBySymbol error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
      return;
    }
  };

  /**
   * POST /prices
   * Crée un nouvel enregistrement de prix.
   * Body : { crypto_symbol, value, recorded_at }.
   */
  static create: RequestHandler = async (req, res) => {
    const { crypto_symbol, value, recorded_at } = req.body;
    try {
      const repo = AppDataSource.getRepository(Price);
      const price = repo.create({ crypto_symbol, value, recorded_at });
      const saved = await repo.save(price);
      res.status(201).json(saved);
    } catch (err) {
      console.error('PriceController.create error:', err);
      res.status(500).json({ message: 'Erreur création price', error: err });
      return;
    }
  };

  /**
   * DELETE /prices/:id
   * Supprime une entrée de prix. Si inexistant, 404.
   */
  static remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const repo = AppDataSource.getRepository(Price);
      const price = await repo.findOneBy({ price_id: id });
      if (!price) {
        res.status(404).json({ message: 'Price non trouvé' });
        return;
      }
      await repo.remove(price);
      res.status(204).send();
    } catch (err) {
      console.error('PriceController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
      return;
    }
  };
}
