import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DepartementsPage: React.FC = () => {
  // Mock data - replace with actual data fetching logic
  const departements = [
    {
      id: "1",
      titre: "Chirurgie Dentaire",
      description: "Département spécialisé en chirurgie dentaire",
    },
    {
      id: "2",
      titre: "Orthodontie",
      description: "Département spécialisé en orthodontie",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Gestion des Départements
      </h1>
      <Button className="mb-4 bg-blue-600 hover:bg-blue-700">
        Ajouter un Département
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departements.map((departement) => (
            <TableRow key={departement.id}>
              <TableCell>{departement.titre}</TableCell>
              <TableCell>{departement.description}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2 text-blue-600 border-blue-600"
                >
                  Modifier
                </Button>
                <Button variant="destructive" size="sm">
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepartementsPage;
