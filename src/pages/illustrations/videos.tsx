import { useParams, Link } from "react-router-dom"
import { SiteHeader } from "../utilisateur/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder, Video, FileText } from 'lucide-react'

interface Resource {
  id: number;
  type: 'video' | 'pdf';
  count: number;
}

const resources: Record<number, Resource[]> = {
  1: [
    { id: 1, type: 'video', count: 5 },
    { id: 2, type: 'pdf', count: 3 },
  ],
  2: [
    { id: 3, type: 'video', count: 3 },
    { id: 4, type: 'pdf', count: 2 },
  ],
  3: [
    { id: 5, type: 'video', count: 4 },
    { id: 6, type: 'pdf', count: 1 },
  ],
  4: [
    { id: 7, type: 'video', count: 6 },
    { id: 8, type: 'pdf', count: 4 },
  ],
};

export default function ResourcesPage() {
  const { id } = useParams<{ id: string }>();
  const illustrationResources = resources[parseInt(id || "1")] || [];

  return (
    <div className="min-h-screen bg-blue-50">
      <SiteHeader />
      <main className="container py-6 space-y-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Resources</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {illustrationResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  {resource.type === 'video' ? (
                    <Folder className="h-12 w-12 text-blue-500" />
                  ) : (
                    <Folder className="h-12 w-12 text-red-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">
                    {resource.type === 'video' ? 'Videos' : 'PDFs'}
                  </h2>
                  <p className="text-gray-600">{resource.count} {resource.type === 'video' ? 'videos' : 'documents'}</p>
                </div>
                <Link to={`/illustrations/resources/${id}/${resource.type}`}>
                  <Button variant="outline">View</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button size="lg">Start Quiz</Button>
        </div>
      </main>
    </div>
  )
}

