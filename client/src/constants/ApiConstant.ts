/**
 * API_ROOT : URL de base de notre backend BlockLumen.
 * Par défaut, on utilise la variable d’environnement VITE_API_BASE_URL (définie dans .env),
 * sinon on retombe sur "http://localhost:5000".
 */
export const API_ROOT: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * API_URL : point d’entrée commun pour toutes les routes exposées par notre backend.
 * Si jamais on prefixe toutes nos routes par "/api", on pourra changer ici.
 * Pour l’instant, nos routes (users, trades, wallets, etc.) sont montées à la racine,
 * donc API_URL === API_ROOT.
 */
export const API_URL: string = API_ROOT;

/**
 * Endpoints métier. 
 * On peut directement importer ces constantes dans les services ou slices Redux.
 */
export const ENDPOINTS = {
  USERS: `${API_URL}/users`,
  TRADES: `${API_URL}/trades`,
  WALLETS: `${API_URL}/wallets`,
  PRICES: `${API_URL}/prices`,
  LEARN: `${API_URL}/learn`,
  USER_LEARN: `${API_URL}/user-learn`,
  PREFERENCES: `${API_URL}/preferences`,
};
