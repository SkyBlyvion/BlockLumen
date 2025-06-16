// src/screens/OfflineScreens/LandingOffline.tsx

import React from "react";
import { Link } from "react-router-dom";
import { API_ROOT } from "../../constants/ApiConstant";

/**
 * Page de présentation (landing) hors-ligne,
 * dérivée directement du design Figma.
 * Les boutons « Inscription » et « Connexion »
 * sont des <Link> vers /register et /login.
 */
const LandingOffline: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-20 bg-white shadow-md flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <img
            src={`src/images/logo.svg`}
            alt="BlockLumen Logo"
            width={36}
            height={40}
          />
          <h1 className="text-4xl font-bold font-['Roboto']">BlockLumen</h1>
        </div>
        <nav className="flex gap-10 text-base font-['Roboto']">
          <Link to="/market" className="hover:underline">Marché</Link>
          <Link to="/trade"  className="hover:underline">Trader</Link>
          <Link to="/learn"  className="hover:underline">Apprendre</Link>
        </nav>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-2 rounded-lg border border-black font-['Roboto']"
          >
            Inscription
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 rounded-lg bg-black text-white font-['Roboto']"
          >
            Connexion
          </Link>
        </div>
      </div>

      {/* Grand titre + bouton d’appel à l’action */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-44 py-20 gap-6">
        <h2 className="text-4xl font-bold font-['Roboto'] text-center">
          Entraînez-vous au trading crypto en toute sécurité
        </h2>
        <p className="text-base font-['Roboto'] text-center">
          BlockLumen, la simulation réaliste pour débutants.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-black text-white rounded-lg font-['Roboto']"
        >
          Commencer maintenant
        </Link>
      </div>

      {/* Modules éducatifs (aperçu) */}
      <section className="w-full px-44 py-14 flex flex-col items-center gap-10">
        <h3 className="text-4xl font-bold font-['Roboto']">Modules éducatifs</h3>
        <div className="w-full flex gap-10">
          {[
            { icon: "📘", title: "Module 1", sub: "Introduction aux cryptos" },
            { icon: "📊", title: "Module 2", sub: "Analyse technique" },
            { icon: "🧩", title: "Module 3", sub: "Altcoins" },
          ].map((m) => (
            <div key={m.title} className="flex-1 flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center text-6xl">
                {m.icon}
              </div>
              <h4 className="text-xl font-['Roboto']">{m.title}</h4>
              <p className="text-base text-black/50 font-['Roboto']">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer simplifié */}
      <footer className="w-full p-10 bg-gray-100 flex justify-center gap-14 font-['Roboto']">
        <Link to="/about" className="hover:underline">À propos</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/legal" className="hover:underline">Mentions légales</Link>
        <Link to="/privacy" className="hover:underline">Confidentialité</Link>
      </footer>
    </div>
  );
};

export default LandingOffline;
