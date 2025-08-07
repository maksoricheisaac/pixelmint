'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, Zap } from 'lucide-react'

interface CreditsData {
  credits: number
  canGenerate: boolean
  creditsPerImage: number
}

interface CreditsDisplayProps {
  userId: string
}

export function CreditsDisplay({ }: CreditsDisplayProps) {
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchCredits = async () => {
    try {
      const response = await fetch('/api/credits/check')
      if (response.ok) {
        const data = await response.json()
        setCreditsData(data)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des crédits:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCredits()
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!creditsData) {
    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Coins className="h-6 w-6 text-yellow-500" />
          Vos Crédits
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {creditsData.credits}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-white mb-4">
          <Zap className="h-4 w-4" />
          {creditsData.creditsPerImage} crédit par image
        </div>
        <div className={`text-sm font-medium ${
          creditsData.canGenerate 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {creditsData.canGenerate 
            ? 'Vous pouvez générer des images' 
            : 'Crédits insuffisants pour générer une image'
          }
        </div>
      </CardContent>
    </Card>
  )
} 