import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { headers } from 'next/headers'

export default async function GalleryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ma Galerie
          </h1>
          <p className="text-lg text-gray-600">
            Retrouvez toutes vos images générées
          </p>
        </div>

        <GalleryGrid />
      </div>
    </div>
  )
}