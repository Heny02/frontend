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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UtilisateursPage: React.FC = () => {
  // Mock data - replace with actual data fetching logic
  const utilisateurs = [
    {
      id: "1",
      nom_utilisateur: "jdupont",
      role: "Dentiste",
      image_utilisateur_url: "/placeholder.svg",
    },
    {
      id: "2",
      nom_utilisateur: "mmartin",
      role: "Administrateur",
      image_utilisateur_url: "/placeholder.svg",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Gestion des Utilisateurs
      </h1>
      <Button className="mb-4 bg-blue-600 hover:bg-blue-700">
        Ajouter un Utilisateur
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Nom d'utilisateur</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {utilisateurs.map((utilisateur) => (
            <TableRow key={utilisateur.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={utilisateur.image_utilisateur_url}
                    alt={utilisateur.nom_utilisateur}
                  />
                  <AvatarFallback>
                    {utilisateur.nom_utilisateur.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{utilisateur.nom_utilisateur}</TableCell>
              <TableCell>{utilisateur.role}</TableCell>
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

export default UtilisateursPage;
