import { Button } from "@/components/ui/button"

function HeroSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
            Perfectionnez vos compétences odontostomatologiques avec une plateforme d'auto-évaluation dédiée
          </h1>
          <p className="text-xl mb-6 text-blue-700">
            Découvrez des outils modernes et des contenus à jour pour exceller dans votre pratique médicale.
          </p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            Commencer maintenant
          </Button>
        </div>
        <div className="md:w-1/2">
          <img src="/Work in progress-pana.svg" alt="Professional using computer" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

