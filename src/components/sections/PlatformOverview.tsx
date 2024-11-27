import { CheckCircle } from "lucide-react";

function PlatformOverview() {
  const features = [
    "Tests d'évaluation interactive",
    "Accès à des cours et ressources mises à jour",
    "Analyse détaillée des performances",
    "Certificats après chaque formation",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Notre Plateforme
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span className="text-lg">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlatformOverview;
