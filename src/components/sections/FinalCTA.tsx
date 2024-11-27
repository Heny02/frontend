import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function FinalCTA() {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Prenez votre carrière en main dès aujourd'hui</h2>
        <p className="mb-8 text-xl">Rejoignez notre communauté de professionnels en odontostomatologie</p>
        <form className="max-w-md mx-auto flex flex-col gap-4">
          <Input type="text" placeholder="Nom" className="bg-white text-blue-900" />
          <Input type="email" placeholder="Email" className="bg-white text-blue-900" />
          <Input type="password" placeholder="Mot de passe" className="bg-white text-blue-900" />
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            Rejoindre maintenant
          </Button>
        </form>
      </div>
    </section>
  );
}

export default FinalCTA;

