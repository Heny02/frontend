import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const DentistesPage: React.FC = () => {
  // Mock data - replace with actual data fetching logic
  const dentistes = [
    { id: '1', nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', telephone: '0123456789' },
    { id: '2', nom: 'Martin', prenom: 'Marie', email: 'marie.martin@example.com', telephone: '0987654321' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Gestion des Dentistes</h1>
      <Button className="mb-4 bg-blue-600 hover:bg-blue-700">Ajouter un Dentiste</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dentistes.map((dentiste) => (
            <TableRow key={dentiste.id}>
              <TableCell>{dentiste.nom}</TableCell>
              <TableCell>{dentiste.prenom}</TableCell>
              <TableCell>{dentiste.email}</TableCell>
              <TableCell>{dentiste.telephone}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2 text-blue-600 border-blue-600">Modifier</Button>
                <Button variant="destructive" size="sm">Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DentistesPage;

