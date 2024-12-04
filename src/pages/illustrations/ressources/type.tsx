import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/pages/utilisateur/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  description: string;
}

const videoResources: Record<number, Resource[]> = {
  1: [
    {
      id: 1,
      title: "Introduction to Abstract Shapes",
      description: "Learn the basics of abstract shape design",
    },
    {
      id: 2,
      title: "Advanced Techniques",
      description: "Explore advanced techniques in abstract art",
    },
  ],
  2: [
    {
      id: 3,
      title: "Capturing Nature's Beauty",
      description: "Tips for illustrating natural landscapes",
    },
    {
      id: 4,
      title: "Color Theory in Nature",
      description: "Understanding color palettes in nature scenes",
    },
  ],
};

const pdfResources: Record<number, Resource[]> = {
  1: [
    {
      id: 1,
      title: "Abstract Shapes Cheat Sheet",
      description: "Quick reference guide for abstract shapes",
    },
    {
      id: 2,
      title: "History of Abstract Art",
      description: "A comprehensive look at abstract art history",
    },
  ],
  2: [
    {
      id: 3,
      title: "Nature Illustration Techniques",
      description: "Detailed guide on nature illustration methods",
    },
    {
      id: 4,
      title: "Environmental Art Impact",
      description: "Study on the impact of nature-inspired art",
    },
  ],
};

export default function ResourceTypePage() {
  const { id, type } = useParams<{ id: string; type: string }>();
  const resources =
    type === "video"
      ? videoResources[parseInt(id || "1")]
      : pdfResources[parseInt(id || "1")] || [];

  return (
    <div className="min-h-screen bg-blue-50">
      <SiteHeader />
      <main className="container py-6 space-y-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          {type === "video" ? "Videos" : "PDFs"}
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  {type === "video" ? (
                    <Video className="h-8 w-8 text-blue-500" />
                  ) : (
                    <FileText className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">
                    {resource.title}
                  </h2>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
                <Button variant="outline">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to={`/illustrations/resources/${id}`}>
            <Button variant="outline">Back to Resources</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
