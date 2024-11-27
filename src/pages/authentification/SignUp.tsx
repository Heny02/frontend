import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";

export default function SignUpComponent() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Section gauche avec l'illustration */}
      <div className="w-full lg:w-1/2 bg-blue-50 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="max-w-md text-center z-10">
          <div className="mb-8">
            <div
              className="w-64 h-64 mx-auto mb-8 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/placeholder.svg')" }}
            />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Rejoignez-nous et concrétisez vos idées.
          </h1>
          <p className="text-blue-700">
            Inscrivez-vous gratuitement et profitez des offres de notre
            communauté.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
      </div>

      {/* Section droite avec le formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center">
              Créer un compte
            </CardTitle>
            <CardDescription className="text-center">
              Rejoignez-nous pour explorer de nouvelles opportunités 👋👋
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                {/* <Label htmlFor="firstName">Prénom</Label> */}
                <Input id="firstName" placeholder="Votre prénom" />
              </div>
              <div className="space-y-2">
                {/* <Label htmlFor="lastName">Nom</Label> */}
                <Input id="lastName" placeholder="Votre nom" />
              </div>
              <div className="space-y-2">
                {/* <Label htmlFor="email">Email</Label> */}
                <Input
                  id="email"
                  placeholder="exemple@email.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                {/* <Label htmlFor="password">Mot de passe</Label> */}
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                {/* <Label htmlFor="confirmPassword"> */}
                Confirmez le mot de passe
                {/* </Label> */}
                <Input id="confirmPassword" type="password" />
              </div>

              <div className="flex items-center space-x-2">
                {/* <Checkbox id="terms" /> */}
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J'accepte les termes et conditions
                </label>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                S'inscrire
              </Button>

              <p className="text-center text-sm text-gray-600">
                Déjà inscrit ?{" "}
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Connexion
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
