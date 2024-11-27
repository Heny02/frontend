import { CheckCircle } from "lucide-react";

function ValueProposition() {
  const values = [
    "Gain de temps",
    "Adapté aux emplois du temps chargés des professionnels",
    "Aligné avec les dernières normes et pratiques du domaine",
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Pourquoi nous choisir ?
        </h2>
        <div className="max-w-2xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="flex items-center mb-4">
              <CheckCircle className="text-green-500 mr-2" />
              <span className="text-lg">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueProposition;
