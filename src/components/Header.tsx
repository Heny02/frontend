import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-900">
          OdontoEval
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-700 hover:text-blue-900">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-700 hover:text-blue-900">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-700 hover:text-blue-900">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Button
          variant="outline"
          className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
        >
          Se connecter
        </Button>
      </div>
    </header>
  );
}

export default Header;
