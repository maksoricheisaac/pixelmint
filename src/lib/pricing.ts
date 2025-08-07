export interface CreditPack {
  id: string
  name: string
  credits: number
  price: number // en FCFA
  description: string
  popular?: boolean
}

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'discovery',
    name: 'Pack Découverte',
    credits: 100,
    price: 1500,
    description: 'Parfait pour commencer vos créations',
  },
  {
    id: 'creator',
    name: 'Pack Créateur',
    credits: 500,
    price: 6000,
    description: 'Pour les créateurs réguliers',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pack Pro',
    credits: 1500,
    price: 15000,
    description: 'Pour les utilisateurs intensifs',
  },
]

export const FREE_CREDITS_ON_SIGNUP = 10
export const CREDITS_PER_IMAGE = 1

export function getCreditPack(id: string): CreditPack | undefined {
  return CREDIT_PACKS.find(pack => pack.id === id)
}

export function calculatePricePerCredit(pack: CreditPack): number {
  return pack.price / pack.credits
} 