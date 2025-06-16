import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar / Header */}
      <header className="w-full bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] py-5 px-4 sm:px-8 lg:px-20 flex justify-center items-center">
        <div className="max-w-screen-xl w-full flex items-center gap-5">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <rect width="40" height="40" rx="20" fill="black" fillOpacity="0.1" />
          </svg>
          <div className="flex-1 text-black text-xl sm:text-2xl lg:text-3xl font-medium font-['Roboto'] leading-9">Bienvenue sur BlockLumen</div>
          <nav className="hidden sm:flex justify-center items-center gap-5 sm:gap-10">
            <Link to="/" className="text-black text-base font-normal font-['Roboto'] leading-normal hover:underline">Home</Link>
            <Link to="/about" className="text-black text-base font-normal font-['Roboto'] leading-normal hover:underline">À propos</Link>
            <Link to="/contact" className="text-black text-base font-normal font-['Roboto'] leading-normal hover:underline">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center py-10 sm:py-14 px-4 sm:px-8 lg:px-44">
        {/* Separator Line */}
        <div className="w-full max-w-screen-xl border-t border-black/10 my-10" />

        {/* Connexion / Inscription Title Section */}
        <section className="w-full max-w-screen-md text-center mb-14">
          <h2 className="text-black text-3xl sm:text-4xl font-bold font-['Roboto'] leading-[48px] mb-2">Connexion / Inscription</h2>
          <p className="text-black text-base font-normal font-['Roboto'] leading-normal">Accédez à votre compte ou créez-en un nouveau.</p>
        </section>

        {/* Connexion Section (Login Form) */}
        <section className="w-full max-w-screen-md flex flex-col items-center gap-10 mb-14">
          <h2 className="text-black text-3xl sm:text-4xl font-bold font-['Roboto'] leading-[48px]">Connexion</h2>

          <form className="w-full flex flex-col items-center gap-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {/* Input: Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="login-email" className="text-black text-sm font-medium font-['Roboto'] leading-tight">Email</label>
                <input
                  type="email"
                  id="login-email"
                  className="w-full h-9 px-3 py-2 bg-white rounded-md border border-black/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre adresse email"
                />
              </div>

              {/* Input: Mot de passe */}
              <div className="flex flex-col gap-1">
                <label htmlFor="login-password" className="text-black text-sm font-medium font-['Roboto'] leading-tight">Mot de passe</label>
                <input
                  type="password"
                  id="login-password"
                  className="w-full h-9 px-3 py-2 bg-white rounded-md border border-black/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre mot de passe"
                />
              </div>
            </div>

            {/* Buttons for Login */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-md">
              <button
                type="button" // This button isn't submitting the form
                className="w-full sm:w-60 p-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-black text-black text-base font-medium font-['Roboto'] leading-normal hover:bg-gray-100 transition-colors"
              >
                Mot de passe oublié ?
              </button>
              <button
                type="submit" // This button submits the form
                className="w-full sm:w-60 p-3 bg-black rounded-lg text-white text-base font-medium font-['Roboto'] leading-normal hover:bg-gray-800 transition-colors"
              >
                Se connecter
              </button>
            </div>
          </form>
        </section>

        {/* Separator Line */}
        <div className="w-full max-w-screen-xl border-t border-black/10 my-10" />

        {/* Create Account Section (Call to Action) */}
        <section className="w-full max-w-screen-md flex flex-col items-center py-5">
          <div className="w-full p-4 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col sm:flex-row justify-center items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-24 h-24 flex justify-center items-center flex-shrink-0">
              {/* Placeholder for an icon or image */}
              <div className="w-full h-full bg-zinc-300/50 rounded-md" />
            </div>
            <div className="flex-1 flex flex-col justify-start items-center sm:items-start gap-2">
              <h3 className="text-black text-xl font-medium font-['Roboto'] leading-7">Créer un compte</h3>
              <p className="text-black text-base font-normal font-['Roboto'] leading-normal">
                Prêt à rejoindre BlockLumen ? Inscrivez-vous dès maintenant et découvrez nos services !
              </p>
              {/* This div was empty and large, so I've replaced it with some explanatory text. 
                  If it was meant for something else, adjust accordingly. */}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-4 sm:px-8 lg:px-14 bg-white flex justify-center items-center">
        <div className="max-w-screen-xl w-full flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-14 text-center">
          <div className="text-black text-base sm:text-xl font-normal font-['Roboto'] leading-7">Tous droits réservés © 2025 BlockLumen</div>
          <div className="text-black text-base sm:text-xl font-normal font-['Roboto'] leading-7 hover:underline">
            <Link to="/privacy">Politique de confidentialité</Link>
          </div>
          <div className="text-black text-base sm:text-xl font-normal font-['Roboto'] leading-7 hover:underline">
            <Link to="/terms">Conditions d'utilisation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;