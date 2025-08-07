import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CreditPacks } from '@/components/credits/credit-packs'
import { CreditsDisplay } from '@/components/credits/credits-display'
import { headers } from 'next/headers'

export default async function CreditsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Achetez des Crédits
          </h1>
          <p className="text-lg text-gray-600">
            Choisissez le pack qui correspond à vos besoins
          </p>
        </div>

        <CreditsDisplay userId={session.user.id} />
        
        <div className="mt-12">
          <CreditPacks />
        </div>
      </div>
    </div>
  )
} 