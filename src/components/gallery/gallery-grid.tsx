'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Download, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { getImages, deleteImage } from '@/actions/gallery.action'
import { toast } from 'sonner'

interface GalleryImage {
  id: string
  url: string
  prompt: string
  createdAt: string
}

export function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)


  const loadImages = async (pageNum: number = 1, append: boolean = false) => {
    try {
      const result = await getImages({ page: pageNum, limit: 12 })
      
      if (result.data?.images) {
        const mappedImages = result.data.images.map(img => ({
          id: img.id,
          url: img.url,
          prompt: img.prompt,
          createdAt: img.createdAt.toISOString()
        }))
        
        if (append) {
          setImages(prev => [...prev, ...mappedImages])
        } else {
          setImages(mappedImages)
        }
        setHasMore(result.data.hasMore)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error)
      toast.error('Impossible de charger les images')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadImages(1, false)
  }, [])

  const handleDelete = async (imageId: string) => {
    try {
      const result = await deleteImage({ imageId })
      if (result.data?.success) {
        setImages(prev => prev.filter(img => img.id !== imageId))
        toast.success('Image supprimée avec succès')
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error('Impossible de supprimer l\'image')
    }
  }

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pixelmint-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Image téléchargée avec succès')
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      toast.error('Impossible de télécharger l\'image')
    }
  }

  const filteredImages = images.filter(img =>
    img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && images.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune image trouvée
        </h3>
        <p className="text-gray-600 mb-4">
          {searchTerm ? 'Aucune image ne correspond à votre recherche' : 'Vous n\'avez pas encore généré d\'images'}
        </p>
        {!searchTerm && (
          <Button asChild>
            <a href="/generate">Générer votre première image</a>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher dans vos images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grille d'images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative w-full h-full min-h-[250px] max-h-none overflow-hidden rounded-t-lg flex">
                <Image
                  src={image.url}
                  alt={image.prompt}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  style={{ position: 'absolute', inset: 0 }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {/* Actions au survol */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={() => handleDownload(image.url, image.prompt)}
                  >
                    <Download className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                {/* Date */}
                <Badge
                  variant="secondary"
                  className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90"
                >
                  {new Date(image.createdAt).toLocaleDateString('fr-FR')}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
               <div className="p-4">
                <p className="text-sm text-gray-900 mb-2 line-clamp-2">
                  {image.prompt}
                </p>
                <div className="text-xs text-gray-500">
                  {new Date(image.createdAt).toLocaleString('fr-FR')}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Bouton charger plus */}
      {hasMore && !searchTerm && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              const nextPage = page + 1
              setPage(nextPage)
              loadImages(nextPage, true)
            }}
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Charger plus d\'images'}
          </Button>
        </div>
      )}
    </div>
  )
} 