'use client'

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, Users } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


interface Comite {
  id: string;
  departement: string;
  membres: number;
}

const ComitesEvaluationPage: React.FC = () => {
  const [comites, setComites] = useState<Comite[]>([
    { id: '1', departement: 'Chirurgie Dentaire', membres: 5 },
    { id: '2', departement: 'Orthodontie', membres: 3 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [comiteToEdit, setComiteToEdit] = useState<Comite | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [comiteToDelete, setComiteToDelete] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newComite, setNewComite] = useState<Omit<Comite, 'id'>>({ departement: '', membres: 0 })
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const filteredComites = comites.filter(comite =>
    Object.values(comite).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDelete = (id: string) => {
    setComites(comites.filter(comite => comite.id !== id))
    setIsDeleteModalOpen(false)
    showNotification('success', 'Comité supprimé avec succès')
  }

  const handleEdit = (comite: Comite) => {
    setComites(comites.map(c => c.id === comite.id ? comite : c))
    setComiteToEdit(null)
    showNotification('success', 'Comité modifié avec succès')
  }

  const handleAdd = () => {
    const id = Math.max(...comites.map(c => parseInt(c.id))) + 1
    setComites([...comites, { id: id.toString(), ...newComite }])
    setIsAddModalOpen(false)
    setNewComite({ departement: '', membres: 0 })
    showNotification('success', 'Nouveau comité ajouté avec succès')
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
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Comités d'Évaluation</h1>
      <div className="flex justify-between items-center mb-4">
        <Input 
          placeholder="Rechercher un comité..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Créer un Comité
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
            <TableHead>Département</TableHead>
            <TableHead>Nombre de Membres</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComites.map((comite) => (
            <TableRow key={comite.id}>
              <TableCell>{comite.departement}</TableCell>
              <TableCell>{comite.membres}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="mr-2 text-blue-600 border-blue-600" onClick={() => setComiteToEdit(comite)}>
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
                      <Button variant="destructive" size="icon" onClick={() => { setComiteToDelete(comite.id); setIsDeleteModalOpen(true); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Supprimer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="ml-2 text-green-600 border-green-600">
                        <Users className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gérer les membres</p>
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
            <DialogTitle>Créer un nouveau comité</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-departement" className="text-right">
                  Département
                </Label>
                <Input id="new-departement" value={newComite.departement} onChange={(e) => setNewComite({...newComite, departement: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-membres" className="text-right">
                  Nombre de Membres
                </Label>
                <Input 
                  id="new-membres" 
                  type="number" 
                  min="1"
                  value={newComite.membres} 
                  onChange={(e) => setNewComite({...newComite, membres: parseInt(e.target.value)})} 
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Créer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!comiteToEdit} onOpenChange={() => setComiteToEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le comité</DialogTitle>
          </DialogHeader>
          {comiteToEdit && (
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(comiteToEdit); }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="departement" className="text-right">
                    Département
                  </Label>
                  <Input id="departement" value={comiteToEdit.departement} onChange={(e) => setComiteToEdit({...comiteToEdit, departement: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="membres" className="text-right">
                    Nombre de Membres
                  </Label>
                  <Input 
                    id="membres" 
                    type="number" 
                    min="1"
                    value={comiteToEdit.membres} 
                    onChange={(e) => setComiteToEdit({...comiteToEdit, membres: parseInt(e.target.value)})} 
                    className="col-span-3" 
                  />
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
          <p>Êtes-vous sûr de vouloir supprimer ce comité ?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={() => comiteToDelete && handleDelete(comiteToDelete)}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ComitesEvaluationPage

