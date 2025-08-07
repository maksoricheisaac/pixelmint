'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Search, Plus, Users, Coins } from 'lucide-react'
import { addCredits } from '@/actions/credits.action'
import { toast } from 'sonner'


interface User {
  id: string
  name: string
  email: string
  credits: number
}

export function AdminCreditsManager() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [creditsToAdd, setCreditsToAdd] = useState('')
  const [reason, setReason] = useState('')
  const [addingCredits, setAddingCredits] = useState(false)


  // Fonction pour charger les utilisateurs (simulation)
  const loadUsers = async () => {
    try {
      // TODO: Créer une action serveur pour récupérer tous les utilisateurs
      // Pour l'instant, on simule avec des données
      const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', credits: 25 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', credits: 10 },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', credits: 50 },
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error)
      toast.error('Impossible de charger les utilisateurs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
   
  }, [])

  const handleAddCredits = async () => {
    if (!selectedUser || !creditsToAdd) return

    const credits = parseInt(creditsToAdd)
    if (isNaN(credits) || credits <= 0) {
      toast.error('Veuillez entrer un nombre valide de crédits')
      return
    }

    setAddingCredits(true)
    try {
      const result = await addCredits({
        userId: selectedUser.id,
        credits,
        reason: reason || undefined
      })

      if (result.data) {
        // Mettre à jour la liste des utilisateurs
        setUsers(prev => prev.map(user => 
          user.id === selectedUser.id 
            ? { ...user, credits: result.data ? result.data.user.credits : 0 }
            : user
        ))

        toast.success(`Crédits ajoutés avec succès à ${selectedUser.name}`)

        // Réinitialiser le formulaire
        setSelectedUser(null)
        setCreditsToAdd('')
        setReason('')
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de crédits:', error)
      toast.error('Erreur lors de l\'ajout de crédits')
    } finally {
      setAddingCredits(false)
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédits Totaux</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user.credits, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Liste des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{user.credits} crédits</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formulaire d'ajout de crédits */}
      {selectedUser && (
        <Card>
          <CardHeader>
            <CardTitle>Ajouter des crédits à {selectedUser.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="credits">Nombre de crédits</Label>
              <Input
                id="credits"
                type="number"
                value={creditsToAdd}
                onChange={(e) => setCreditsToAdd(e.target.value)}
                placeholder="Ex: 50"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="reason">Raison (optionnel)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Récompense pour participation"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddCredits}
                disabled={addingCredits || !creditsToAdd}
              >
                {addingCredits ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Ajout...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter
                  </div>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedUser(null)
                  setCreditsToAdd('')
                  setReason('')
                }}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 