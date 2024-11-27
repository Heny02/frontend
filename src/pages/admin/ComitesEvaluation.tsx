import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const ComitesEvaluationPage: React.FC = () => {
  // Mock data - replace with actual data fetching logic
  const comites = [
    { id: '1', departement: 'Chirurgie Dentaire', membres: 5 },
    { id: '2', departement: 'Orthodontie', membres: 3 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Comités d'Évaluation</h1>
      <Button className="mb-4 bg-blue-600 hover:bg-blue-700">Créer un Comité</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Département</TableHead>
            <TableHead>Nombre de Membres</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comites.map((comite) => (
            <TableRow key={comite.id}>
              <TableCell>{comite.departement}</TableCell>
              <TableCell>{comite.membres}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2 text-blue-600 border-blue-600">Gérer</Button>
                <Button variant="destructive" size="sm">Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
</Table>
    </div>
  );
};

export default ComitesEvaluationPage;

