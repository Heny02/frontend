"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";

const DentistSchema = z.object({
  id_dentiste: z.string(),
  nom: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne doit pas dépasser 50 caractères" })
    .regex(/^[A-Za-zÀ-ÿ\s-]+$/, {
      message:
        "Le nom ne peut contenir que des lettres, espaces et traits d'union",
    }),
  prenom: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le prénom ne doit pas dépasser 50 caractères" })
    .regex(/^[A-Za-zÀ-ÿ\s-]+$/, {
      message:
        "Le prénom ne peut contenir que des lettres, espaces et traits d'union",
    }),
  email: z
    .string()
    .email({ message: "Adresse email invalide" })
    .max(100, { message: "L'email ne doit pas dépasser 100 caractères" }),
  telephone: z.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
    message:
      "Numéro de téléphone invalide. Utilisez un format comme +33123456789 ou 0123456789",
  }),
  adresse: z
    .string()
    .max(200, { message: "L'adresse ne doit pas dépasser 200 caractères" })
    .optional(),
});

type Dentist = z.infer<typeof DentistSchema>;

const api = axios.create({
  baseURL: "http://localhost:6500/api",
});

const fetchDentistes = async (): Promise<Dentist[]> => {
  const { data } = await api.get("/dentiste");
  console.log(data);
  return data;
};

const createDentiste = async (
  dentist: Omit<Dentist, "id">
): Promise<Dentist> => {
  const { data } = await api.post("/dentiste", dentist);
  return data;
};

const updateDentiste = async (dentist: Dentist): Promise<Dentist> => {
  try {
    const { data } = await api.put(`/dentiste/${dentist.id_dentiste}`, dentist);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update dentist"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const deleteDentiste = async (userId: String): Promise<void> => {
  const res = await api.delete(`/dentiste/${userId}`);
  return res.data;
};

const DentistesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: dentistes = [], isLoading } = useQuery<Dentist[]>({
    queryKey: ["dentistes"],
    queryFn: fetchDentistes,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [dentistToEdit, setDentistToEdit] = useState<Dentist | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dentistToDelete, setDentistToDelete] = useState<String | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDentist, setNewDentist] = useState<Omit<Dentist, "id_dentiste">>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
  });

  const filteredDentistes = dentistes.filter((dentiste) =>
    Object.values(dentiste)
      .filter((value): value is string => typeof value === "string")
      .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const mutationDelete = useMutation({
    mutationFn: deleteDentiste,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentistes"] });
      setIsDeleteModalOpen(false);
      toast.error("Dentiste  supprimé avec succès");
    },
    onError: (error: Error) => {
      toast.error(
        `Une erreur est survenue lors de la suppression : ${error.message}`
      );
    },
  });

  const mutationEdit = useMutation({
    mutationFn: updateDentiste,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentistes"] });
      setDentistToEdit(null);
      toast.warning("Dentiste modifié avec succès");
    },
    onError: (error: Error) => {
      toast.error(
        `Une erreur est survenue lors de la modification : ${error.message}`
      );
    },
  });

  const mutationCreate = useMutation({
    mutationFn: createDentiste,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentistes"] });
      setIsAddModalOpen(false);
      setNewDentist({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
      });
      toast.success("Dentiste ajouté avec succès");
    },
    onError: (error: Error) => {
      toast.error(`Une erreur est survenue lors de l'ajout : ${error.message}`);
    },
  });

  const handleDelete = (userId: String) => {
    mutationDelete.mutate(userId);
  };

  const handleEdit = (dentist: Dentist) => {
    mutationEdit.mutate(dentist);
  };

  if (isLoading) return <p>Chargement...</p>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Gestion des Dentistes
      </h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Rechercher un dentiste..."
          value={searchTerm}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
          }}
          className="max-w-sm"
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Dentiste
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dentistes.map((dentiste) => (
            <TableRow key={dentiste.id_dentiste}>
              <TableCell>{dentiste.nom}</TableCell>
              <TableCell>{dentiste.prenom}</TableCell>
              <TableCell>{dentiste.email}</TableCell>
              <TableCell>{dentiste.telephone}</TableCell>
              <TableCell>{dentiste.adresse}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mr-2 text-blue-600 border-blue-600"
                        onClick={() => setDentistToEdit(dentiste)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Modifier</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setDentistToDelete(dentiste.id_dentiste);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Supprimer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau dentiste</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutationCreate.mutate(newDentist);
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-nom" className="text-right">
                  Nom
                </Label>
                <Input
                  id="new-nom"
                  value={newDentist.nom}
                  onChange={(e) =>
                    setNewDentist({ ...newDentist, nom: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-prenom" className="text-right">
                  Prénom
                </Label>
                <Input
                  id="new-prenom"
                  value={newDentist.prenom}
                  onChange={(e) =>
                    setNewDentist({ ...newDentist, prenom: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newDentist.email}
                  onChange={(e) =>
                    setNewDentist({ ...newDentist, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-telephone" className="text-right">
                  Téléphone
                </Label>
                <Input
                  id="new-telephone"
                  value={newDentist.telephone}
                  onChange={(e) =>
                    setNewDentist({ ...newDentist, telephone: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-adresse" className="text-right">
                  Adresse
                </Label>
                <Input
                  id="new-adresse"
                  value={newDentist.adresse}
                  onChange={(e) =>
                    setNewDentist({ ...newDentist, adresse: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!dentistToEdit}
        onOpenChange={() => setDentistToEdit(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le dentiste</DialogTitle>
          </DialogHeader>
          {dentistToEdit && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(dentistToEdit);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="nom"
                    value={dentistToEdit.nom}
                    onChange={(e) =>
                      setDentistToEdit({
                        ...dentistToEdit,
                        nom: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prenom" className="text-right">
                    Prénom
                  </Label>
                  <Input
                    id="prenom"
                    value={dentistToEdit.prenom}
                    onChange={(e) =>
                      setDentistToEdit({
                        ...dentistToEdit,
                        prenom: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={dentistToEdit.email}
                    onChange={(e) =>
                      setDentistToEdit({
                        ...dentistToEdit,
                        email: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telephone" className="text-right">
                    Téléphone
                  </Label>
                  <Input
                    id="telephone"
                    value={dentistToEdit.telephone}
                    onChange={(e) =>
                      setDentistToEdit({
                        ...dentistToEdit,
                        telephone: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="adresse" className="text-right">
                    Adresse
                  </Label>
                  <Input
                    id="adresse"
                    value={dentistToEdit.adresse}
                    onChange={(e) =>
                      setDentistToEdit({
                        ...dentistToEdit,
                        adresse: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant={"destructive"} type="submit">
                  Sauvegarder les modifications
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <p>Êtes-vous sûr de vouloir supprimer ce dentiste ?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Annuler
            </Button>
            {dentistToDelete !== null && dentistToDelete !== undefined && (
              <Button
                variant="destructive"
                onClick={() => handleDelete(dentistToDelete)}
              >
                Supprimer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default DentistesPage;

