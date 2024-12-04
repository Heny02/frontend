import { SiteHeader } from "../utilisateur/components/header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface Illustration {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  status: "active" | "inactive";
}

const illustrations: Illustration[] = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=200&width=300",
    title: "Abstract Shapes",
    description: "A collection of vibrant abstract shapes",
    date: "2023-06-01",
    status: "active"
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=200&width=300",
    title: "Nature Scenes",
    description: "Beautiful illustrations of natural landscapes",
    date: "2023-06-15",
    status: "inactive"
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=200&width=300",
    title: "Character Design",
    description: "Unique and expressive character illustrations",
    date: "2023-07-01",
    status: "active"
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=200&width=300",
    title: "Tech Concepts",
    description: "Illustrations explaining various tech concepts",
    date: "2023-07-15",
    status: "active"
  }
];

export default function IllustrationsPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <SiteHeader />
      <main className="container py-6 space-y-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Illustrations</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {illustrations.map((illustration) => (
            <Card key={illustration.id} className="overflow-hidden">
              <img 
                src={illustration.imageUrl} 
                alt={illustration.title} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{illustration.title}</h2>
                <p className="text-gray-600">{illustration.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/illustrations/${illustration.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

