import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

/**
 * Landing hors-ligne : on réutilise Header et Footer
 */
const HomeOffline: React.FC = () => {
  const modules = [
    { icon: "📘", title: "Module 1", sub: "Introduction aux cryptos" },
    { icon: "📊", title: "Module 2", sub: "Analyse technique" },
    { icon: "🧩", title: "Module 3", sub: "Altcoins" },
  ];

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      <Header />

      {/* Section Héros */}
      <section className="w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-44 py-10 sm:py-16 lg:py-20 gap-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Roboto'] text-center">
          Entraînez-vous au trading crypto en toute sécurité
        </h2>
        <p className="text-base sm:text-lg lg:text-xl font-['Roboto'] text-center max-w-2xl">
          BlockLumen, la simulation réaliste pour débutants.
        </p>
        <Link
          to="/register"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-lg font-['Roboto'] text-base sm:text-lg"
        >
          Commencer maintenant
        </Link>
      </section>

      {/* Modules éducatifs */}
      <section className="w-full px-4 sm:px-6 lg:px-44 py-10 sm:py-14 flex flex-col items-center gap-8">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Roboto']">
          Modules éducatifs
        </h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div
              key={m.title}
              className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center text-5xl sm:text-6xl">
                {m.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-semibold font-['Roboto']">
                {m.title}
              </h4>
              <p className="text-sm sm:text-base text-black/50 font-['Roboto']">
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeOffline;
