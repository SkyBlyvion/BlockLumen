import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="w-full bg-gray-100 py-6 sm:py-8 flex flex-wrap justify-center gap-6 lg:gap-14 px-4 sm:px-6 lg:px-44 font-['Roboto']">
    <Link to="/about" className="text-sm sm:text-base hover:underline">
      À propos
    </Link>
    <Link to="/contact" className="text-sm sm:text-base hover:underline">
      Contact
    </Link>
    <Link to="/legal" className="text-sm sm:text-base hover:underline">
      Mentions légales
    </Link>
    <Link to="/privacy" className="text-sm sm:text-base hover:underline">
      Confidentialité
    </Link>
  </footer>
);

export default Footer;
