import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Sophie Martin",
      specialty: "Chirurgien-dentiste",
      content:
        "Cette plateforme a révolutionné ma façon d'apprendre et de me tenir à jour.",
      avatar: "/avatar1.jpg",
    },
    {
      name: "Dr. Thomas Dubois",
      specialty: "Orthodontiste",
      content:
        "Les auto-évaluations m'ont permis d'identifier rapidement mes points faibles.",
      avatar: "/avatar2.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Témoignages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {testimonial.specialty}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
