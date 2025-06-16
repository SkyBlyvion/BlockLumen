// src/screens/OfflineScreens/Login.tsx

import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../../components/Input/CustomInput";
import SubmitButton from "../../components/Button/SubmitButton";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import api from "../../services/api";

/**
 * Écran de connexion : 
 * - On récupère l’email et le mot de passe.
 * - On appelle l’API /auth/login pour obtenir le token.
 * - On appelle ensuite /users/me pour récupérer le profil.
 * - Enfin, on stocke token + user via signIn() dans AuthContext.
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { signIn, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  // Si l’utilisateur est déjà authentifié, on le redirige vers le dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // 1. Appel à /auth/login → { token }
      const loginRes = await api.post<{ token: string }>("/auth/login", {
        email,
        password,
      });
      const jwt = loginRes.data.token;

      // 2. Injection du token dans Axios
      api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      // 3. Récupération du profil utilisateur via /users/me
      const meRes = await api.get<{ user_id: number; username: string; email: string }>(
        "/users/me"
      );
      const user = meRes.data;

      // 4. Création de la session dans le contexte
      signIn(user, jwt);

      // 5. Redirection vers la page privée
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMsg(
        error.response?.data?.message || "Impossible de se connecter. Vérifiez vos identifiants."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-screen justify-start items-center bg-brown_dark">
      <h1 className="text-white font-bold text-4xl pb-5">Connectez-vous</h1>
      {errorMsg && (
        <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-4">{errorMsg}</div>
      )}
      <form onSubmit={handleSubmit} className="w-[80%] md:w-1/2 lg:w-4/12">
        <CustomInput
          state={email}
          label="Email"
          type="email"
          callable={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          state={password}
          label="Mot de passe"
          type="password"
          callable={(e) => setPassword(e.target.value)}
        />
        <Link to="/register" className="text-white hover:text-yellow_hover">
          Pas de compte ? Enregistrez-vous
        </Link>
        <div className="flex justify-center items-center pt-5">
          {isLoading ? <ButtonLoader /> : <SubmitButton label="Se connecter" />}
        </div>
      </form>
    </div>
  );
};

export default Login;
