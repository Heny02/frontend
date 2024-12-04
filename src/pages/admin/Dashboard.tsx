"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Users, Building2, Calendar, Trash2, Edit } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DonutChart from "./donat"

const DashboardPage: React.FC = () => {
  const stats = [
    { title: "Dentistes", value: 42, icon: UserCircle },
    { title: "Utilisateurs", value: 120, icon: Users },
    { title: "Départements", value: 8, icon: Building2 },
    { title: "Évaluations", value: 24, icon: Calendar },
  ]

  const [tableData, setTableData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Dentiste" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Utilisateur" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Administrateur" },
  ])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" })

  const handleDelete = (item: any) => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setTableData(tableData.filter((data) => data.id !== selectedItem.id))
    setIsDeleteModalOpen(false)
  }

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setEditForm({ name: item.name, email: item.email, role: item.role })
    setIsEditModalOpen(true)
  }

  const confirmEdit = () => {
    setTableData(
      tableData.map((data) => (data.id === selectedItem.id ? { ...data, ...editForm } : data))
    )
    setIsEditModalOpen(false)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de Bord</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-64">
          <h2 className="text-xl font-semibold mb-4">Répartition des Rôles</h2>
          <DonutChart data={tableData} />
        </div>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rôle
              </Label>
              <Input
                id="role"
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmEdit}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashboardPage

