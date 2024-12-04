'use client'

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, User } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Utilisateur {
  id: string;
  nom_utilisateur: string;
  role: string;
  image_utilisateur_url: string;
}

const UtilisateursPage: React.FC = () => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([
    { id: '1', nom_utilisateur: 'jdupont', role: 'Dentiste', image_utilisateur_url: '/placeholder.svg' },
    { id: '2', nom_utilisateur: 'mmartin', role: 'Administrateur', image_utilisateur_url: '/placeholder.svg' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [utilisateurToEdit, setUtilisateurToEdit] = useState<Utilisateur | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [utilisateurToDelete, setUtilisateurToDelete] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newUtilisateur, setNewUtilisateur] = useState<Omit<Utilisateur, 'id'>>({ nom_utilisateur: '', role: '', image_utilisateur_url: '/placeholder.svg' })
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const filteredUtilisateurs = utilisateurs.filter(utilisateur =>
    Object.values(utilisateur).some(value => 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDelete = (id: string) => {
    setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.id !== id))
    setIsDeleteModalOpen(false)
    showNotification('success', 'Utilisateur supprimé avec succès')
  }

  const handleEdit = (utilisateur: Utilisateur) => {
    setUtilisateurs(utilisateurs.map(u => u.id === utilisateur.id ? utilisateur : u))
    setUtilisateurToEdit(null)
    showNotification('success', 'Utilisateur modifié avec succès')
  }

  const handleAdd = () => {
    const id = Math.max(...utilisateurs.map(u => parseInt(u.id))) + 1
    setUtilisateurs([...utilisateurs, { id: id.toString(), ...newUtilisateur }])
    setIsAddModalOpen(false)
    setNewUtilisateur({ nom_utilisateur: '', role: '', image_utilisateur_url: '/placeholder.svg' })
    showNotification('success', 'Nouvel utilisateur ajouté avec succès')
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Gestion des Utilisateurs</h1>
      <div className="flex justify-between items-center mb-4">
        <Input 
          placeholder="Rechercher un utilisateur..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Utilisateur
        </Button>
      </div>
      {notification && (
        <Alert variant={notification.type === 'success' ? 'default' : 'destructive'} className="mb-4">
          <AlertTitle>{notification.type === 'success' ? 'Succès' : 'Erreur'}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}
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
          {filteredUtilisateurs.map((utilisateur) => (
            <TableRow key={utilisateur.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={utilisateur.image_utilisateur_url} alt={utilisateur.nom_utilisateur} />
                  <AvatarFallback>{utilisateur.nom_utilisateur.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{utilisateur.nom_utilisateur}</TableCell>
              <TableCell>{utilisateur.role}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="mr-2 text-blue-600 border-blue-600" onClick={() => setUtilisateurToEdit(utilisateur)}>
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
                      <Button variant="destructive" size="icon" onClick={() => { setUtilisateurToDelete(utilisateur.id); setIsDeleteModalOpen(true); }}>
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
            <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-nom-utilisateur" className="text-right">
                  Nom d'utilisateur
                </Label>
                <Input id="new-nom-utilisateur" value={newUtilisateur.nom_utilisateur} onChange={(e) => setNewUtilisateur({...newUtilisateur, nom_utilisateur: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-role" className="text-right">
                  Rôle
                </Label>
                <Select onValueChange={(value) => setNewUtilisateur({...newUtilisateur, role: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dentiste">Dentiste</SelectItem>
                    <SelectItem value="Administrateur">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!utilisateurToEdit} onOpenChange={() => setUtilisateurToEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
          </DialogHeader>
          {utilisateurToEdit && (
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(utilisateurToEdit); }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom-utilisateur" className="text-right">
                    Nom d'utilisateur
                  </Label>
                  <Input id="nom-utilisateur" value={utilisateurToEdit.nom_utilisateur} onChange={(e) => setUtilisateurToEdit({...utilisateurToEdit, nom_utilisateur: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rôle
                  </Label>
                  <Select onValueChange={(value) => setUtilisateurToEdit({...utilisateurToEdit, role: value})} defaultValue={utilisateurToEdit.role}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dentiste">Dentiste</SelectItem>
                      <SelectItem value="Administrateur">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Sauvegarder les modifications</Button>
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
          <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={() => utilisateurToDelete && handleDelete(utilisateurToDelete)}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UtilisateursPage

