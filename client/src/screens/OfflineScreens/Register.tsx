// src/screens/OfflineScreens/Register.tsx

import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../../components/Input/CustomInput";
import SubmitButton from "../../components/Button/SubmitButton";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import api from "../../services/api";

/**
 * Écran d’inscription : 
 * - On récupère le username, l’email et le mot de passe.
 * - On appelle l’API POST /users pour créer l’utilisateur.
 * - Puis on redirige vers l’écran de connexion.
 */
const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  // Si déjà authentifié, on redirige vers la page privée
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
      // 1. Appel à POST /users (création d’un nouvel utilisateur)
      await api.post("/users", {
        username,
        email,
        password_hash: password,
      });

      // 2. Redirection vers l’écran de connexion
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement :", error);
      setErrorMsg(
        error.response?.data?.message || "Impossible de créer le compte. Réessayez plus tard."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-screen justify-start items-center bg-brown_dark">
      <h1 className="text-white font-bold text-4xl pb-5">Enregistrez-vous</h1>
      {errorMsg && (
        <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-4">{errorMsg}</div>
      )}
      <form onSubmit={handleSubmit} className="w-[80%] md:w-1/2 lg:w-4/12">
        <CustomInput
          state={username}
          label="Nom d’utilisateur"
          type="text"
          callable={(e) => setUsername(e.target.value)}
        />
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
        <Link to="/" className="text-white hover:text-yellow_hover">
          Déjà inscrit ? Connectez-vous
        </Link>
        <div className="flex justify-center items-center pt-5">
          {isLoading ? <ButtonLoader /> : <SubmitButton label="Enregistrer" />}
        </div>
      </form>
    </div>
  );
};

export default Register;
