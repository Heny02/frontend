import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Contient les pages publiques comme LandingPage */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;