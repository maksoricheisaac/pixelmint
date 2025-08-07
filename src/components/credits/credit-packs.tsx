'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CREDIT_PACKS, calculatePricePerCredit } from '@/lib/pricing'
import { Check, Crown, Star } from 'lucide-react'

export function CreditPacks() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePurchase = async (packId: string) => {
    setLoading(true)
    setSelectedPack(packId)
    
    // TODO: Intégrer le système de paiement (Stripe ou Paydunya)
    console.log('Achat du pack:', packId)
    
    // Simulation d'un délai de paiement
    setTimeout(() => {
      setLoading(false)
      setSelectedPack(null)
      alert('Fonctionnalité de paiement à implémenter')
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CREDIT_PACKS.map((pack) => {
        const pricePerCredit = calculatePricePerCredit(pack)
        const isSelected = selectedPack === pack.id
        
        return (
          <Card 
            key={pack.id} 
            className={`relative transition-all duration-200 hover:shadow-lg ${
              pack.popular ? 'ring-2 ring-blue-500' : ''
            } ${isSelected ? 'ring-2 ring-green-500' : ''}`}
          >
            {pack.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Populaire
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                {pack.popular && <Crown className="h-5 w-5 text-yellow-500" />}
                {pack.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {pack.credits}
                </div>
                <div className="text-sm text-gray-600">crédits</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {pack.price.toLocaleString()} FCFA
                </div>
                <div className="text-sm text-gray-500">
                  {pricePerCredit.toFixed(1)} FCFA/crédit
                </div>
              </div>
              
              <div className="text-sm text-gray-600 text-center">
                {pack.description}
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => handlePurchase(pack.id)}
                disabled={loading}
              >
                {loading && isSelected ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Traitement...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Acheter
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 