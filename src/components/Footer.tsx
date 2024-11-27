import { Link } from 'react-router-dom';
import { Facebook, Twitter, LinkedinIcon as LinkedIn } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">OdontoEval</h3>
            <p>Plateforme d'auto-évaluation pour les professionnels en odontostomatologie.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">À propos</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/privacy" className="hover:underline">Politique de confidentialité</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300"><Facebook /></a>
              <a href="#" className="hover:text-blue-300"><Twitter /></a>
              <a href="#" className="hover:text-blue-300"><LinkedIn /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p>&copy; {new Date().getFullYear()} OdontoEval. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

