import { useParams } from "react-router-dom"
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
    description: "A collection of vibrant abstract shapes that showcase the beauty of geometric forms and color combinations. This illustration set is perfect for modern and minimalist design projects.",
    date: "2023-06-01",
    status: "active"
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=200&width=300",
    title: "Nature Scenes",
    description: "Beautiful illustrations of natural landscapes that capture the essence of the great outdoors. From serene forests to majestic mountains, these scenes are ideal for environmental and travel-related content.",
    date: "2023-06-15",
    status: "inactive"
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=200&width=300",
    title: "Character Design",
    description: "Unique and expressive character illustrations that bring personality to your projects. These diverse characters are suitable for a wide range of applications, from marketing materials to children's books.",
    date: "2023-07-01",
    status: "active"
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=200&width=300",
    title: "Tech Concepts",
    description: "Illustrations explaining various tech concepts in a visually appealing and easy-to-understand manner. Perfect for educational content, presentations, and tech-related marketing materials.",
    date: "2023-07-15",
    status: "active"
  }
];

export default function IllustrationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const illustration = illustrations.find(ill => ill.id === parseInt(id || ""));

  if (!illustration) {
    return <div>Illustration not found</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <SiteHeader />
      <main className="container py-6 space-y-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Illustration Details</h1>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-blue-900">{illustration.title}</h2>
              <div className={`w-4 h-4 rounded-full ${illustration.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <p className="text-gray-600 mb-4">Date: {illustration.date}</p>
            <p className="text-gray-700">{illustration.description}</p>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-200 p-6">
            <Button className="w-full">
              <Link to={`/illustrations/resources/${id}`}>Start</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

