import axios from "axios";
// Importe la constante de base d'URL de l'API
import { API_ROOT } from "../constants/ApiConstant";

// Crée une instance Axios avec la base d'URL de l'API
const api = axios.create({ baseURL: API_ROOT });

// Ajoute un intercepteur pour inclure le token JWT dans chaque requête si présent
api.interceptors.request.use(config => {
  // Récupère le token depuis le localStorage (clé "blocklumenSession")
  const token = localStorage.getItem("blocklumenSession")
    ? JSON.parse(localStorage.getItem("blocklumenSession") as string).token
    : null;
  // Si un token existe, l'ajoute dans l'en-tête Authorization
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  // Retourne la configuration modifiée
  return config;
});

// Exporte l'instance Axios personnalisée pour utilisation dans l'app
export default api;