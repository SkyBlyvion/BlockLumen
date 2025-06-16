import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";

const Header: React.FC = () => (
  <header className="w-full h-20 bg-white shadow-md flex items-center justify-between px-4 sm:px-6 lg:px-10">
    {/* Logo + titre */}
    <div className="flex items-center gap-3">
      <img src={logo} alt="BlockLumen Logo" className="w-9 h-10" />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Roboto']">
        BlockLumen
      </h1>
    </div>

    {/* Navigation principale (cachée sur petit écran) */}
    <nav className="hidden md:flex gap-6 text-base font-['Roboto']">
      <Link to="/market" className="hover:underline">
        Marché
      </Link>
      <Link to="/trade" className="hover:underline">
        Trader
      </Link>
      <Link to="/learn" className="hover:underline">
        Apprendre
      </Link>
    </nav>

    {/* Boutons Inscription / Connexion */}
    <div className="flex gap-2 sm:gap-4">
      <Link
        to="/register"
        className="px-4 sm:px-6 py-2 rounded-lg border border-black text-sm sm:text-base font-['Roboto']"
      >
        Inscription
      </Link>
      <Link
        to="/login"
        className="px-4 sm:px-6 py-2 rounded-lg bg-black text-white text-sm sm:text-base font-['Roboto']"
      >
        Connexion
      </Link>
    </div>
  </header>
);

export default Header;
