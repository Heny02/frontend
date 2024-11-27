import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function MainFeatures() {
  const features = [
    {
      title: "Auto-évaluation sur mesure",
      description: "Identifiez vos lacunes en quelques clics.",
    },
    {
      title: "Mise à jour des connaissances",
      description: "Cours basés sur les dernières recherches en odontostomatologie.",
    },
    {
      title: "Communauté interactive",
      description: "Échangez avec d'autres professionnels.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Fonctionnalités principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MainFeatures;

