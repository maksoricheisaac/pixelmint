import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminCreditsManager } from '@/components/admin/admin-credits-manager'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'

export default async function AdminCreditsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Vérifier si l'utilisateur est admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  if (user?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestion des Crédits
          </h1>
          <p className="text-lg text-gray-600">
            Interface d&apos;administration pour gérer les crédits des utilisateurs
          </p>
        </div>

        <AdminCreditsManager />
      </div>
    </div>
  )
} 