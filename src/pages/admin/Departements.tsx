'use client'

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

interface Departement {
  id: string;
  titre: string;
  description: string;
}

const DepartementsPage: React.FC = () => {
  const [departements, setDepartements] = useState<Departement[]>([
    { id: '1', titre: 'Chirurgie Dentaire', description: 'Département spécialisé en chirurgie dentaire' },
    { id: '2', titre: 'Orthodontie', description: 'Département spécialisé en orthodontie' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [departementToEdit, setDepartementToEdit] = useState<Departement | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [departementToDelete, setDepartementToDelete] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newDepartement, setNewDepartement] = useState<Omit<Departement, 'id'>>({ titre: '', description: '' })
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const filteredDepartements = departements.filter(departement =>
    Object.values(departement).some(value => 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDelete = (id: string) => {
    setDepartements(departements.filter(departement => departement.id !== id))
    setIsDeleteModalOpen(false)
    showNotification('success', 'Département supprimé avec succès')
  }

  const handleEdit = (departement: Departement) => {
    setDepartements(departements.map(d => d.id === departement.id ? departement : d))
    setDepartementToEdit(null)
    showNotification('success', 'Département modifié avec succès')
  }

  const handleAdd = () => {
    const id = Math.max(...departements.map(d => parseInt(d.id))) + 1
    setDepartements([...departements, { id: id.toString(), ...newDepartement }])
    setIsAddModalOpen(false)
    setNewDepartement({ titre: '', description: '' })
    showNotification('success', 'Nouveau département ajouté avec succès')
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
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Gestion des Départements</h1>
      <div className="flex justify-between items-center mb-4">
        <Input 
          placeholder="Rechercher un département..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Département
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
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDepartements.map((departement) => (
            <TableRow key={departement.id}>
              <TableCell>{departement.titre}</TableCell>
              <TableCell>{departement.description}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="mr-2 text-blue-600 border-blue-600" onClick={() => setDepartementToEdit(departement)}>
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
                      <Button variant="destructive" size="icon" onClick={() => { setDepartementToDelete(departement.id); setIsDeleteModalOpen(true); }}>
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
            <DialogTitle>Ajouter un nouveau département</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-titre" className="text-right">
                  Titre
                </Label>
                <Input id="new-titre" value={newDepartement.titre} onChange={(e) => setNewDepartement({...newDepartement, titre: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-description" className="text-right">
                  Description
                </Label>
                <Textarea id="new-description" value={newDepartement.description} onChange={(e) => setNewDepartement({...newDepartement, description: e.target.value})} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!departementToEdit} onOpenChange={() => setDepartementToEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le département</DialogTitle>
          </DialogHeader>
          {departementToEdit && (
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(departementToEdit); }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="titre" className="text-right">
                    Titre
                  </Label>
                  <Input id="titre" value={departementToEdit.titre} onChange={(e) => setDepartementToEdit({...departementToEdit, titre: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" value={departementToEdit.description} onChange={(e) => setDepartementToEdit({...departementToEdit, description: e.target.value})} className="col-span-3" />
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
          <p>Êtes-vous sûr de vouloir supprimer ce département ?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={() => departementToDelete && handleDelete(departementToDelete)}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DepartementsPage

