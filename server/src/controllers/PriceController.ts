import { Request, Response, RequestHandler } from 'express';
import { Repository } from 'typeorm';
import { Price } from '../entities/Price';

/**
 * Controller pour la gestion des prix.
 */
export class PriceController {
  constructor(private repo: Repository<Price>) {}

  /**
   * GET /prices
   * Récupère toutes les entrées de prix.
   */
  getAll: RequestHandler = async (_req, res) => {
    try {
      const prices = await this.repo.find();
      res.json(prices);
    } catch (err) {
      console.error('PriceController.getAll error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * GET /prices/symbol/:symbol
   * Récupère l’historique des prix pour un symbole (trié par recorded_at ASC).
   */
  getBySymbol: RequestHandler = async (req, res) => {
    const { symbol } = req.params;
    try {
      const prices = await this.repo.find({
        where: { crypto_symbol: symbol },
        order: { recorded_at: 'ASC' },
      });
      res.json(prices);
    } catch (err) {
      console.error('PriceController.getBySymbol error:', err);
      res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };

  /**
   * POST /prices
   * Crée un nouvel enregistrement de prix.
   * Body : { crypto_symbol, value, recorded_at }.
   */
  create: RequestHandler = async (req, res) => {
    const { crypto_symbol, value, recorded_at } = req.body;
    try {
      const price = this.repo.create({ crypto_symbol, value, recorded_at });
      const saved = await this.repo.save(price);
      res.status(201).json(saved);
    } catch (err) {
      console.error('PriceController.create error:', err);
      res.status(500).json({ message: 'Erreur création price', error: err });
    }
  };

  /**
   * DELETE /prices/:id
   * Supprime une entrée de prix. Si inexistant, 404.
   */
  remove: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      const price = await this.repo.findOneBy({ price_id: id });
      if (!price) {
        res.status(404).json({ message: 'Price non trouvé' });
        return;
      }
      await this.repo.remove(price);
      res.status(204).send();
    } catch (err) {
      console.error('PriceController.remove error:', err);
      res.status(500).json({ message: 'Erreur suppression', error: err });
    }
  };
}
