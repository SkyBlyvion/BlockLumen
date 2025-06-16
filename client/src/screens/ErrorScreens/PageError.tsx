// src/screens/ErrorScreens/PageError.tsx

import React from "react";
import { Link } from "react-router-dom";

/**
 * Affiché lorsque l’utilisateur tente d’accéder à une route inexistante ou qu’une erreur survient.
 */
const PageError: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Erreur 404</h1>
      <p className="text-lg mb-6">La page que vous recherchez est introuvable.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
};

export default PageError;
