'use server'

import { z } from 'zod'
import { actionClient } from './safe-action'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { CREDITS_PER_IMAGE } from '@/lib/pricing'
import { headers } from 'next/headers'

const checkCreditsSchema = z.object({})

const consumeCreditsSchema = z.object({
  prompt: z.string().min(1),
})

const addCreditsSchema = z.object({
  userId: z.string(),
  credits: z.number().positive(),
  reason: z.string().optional(),
})

export const checkCredits = actionClient
  .inputSchema(checkCreditsSchema)
  .action(async ({ }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user?.id) {
      throw new Error('Non authentifié')
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    })

    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    return {
      credits: user.credits,
      canGenerate: user.credits >= CREDITS_PER_IMAGE
    }
  })

export const consumeCredits = actionClient
  .inputSchema(consumeCreditsSchema)
  .action(async ({  }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user?.id) {
      throw new Error('Non authentifié')
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    })

    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    if (user.credits < CREDITS_PER_IMAGE) {
      throw new Error('Crédits insuffisants')
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        credits: {
          decrement: CREDITS_PER_IMAGE
        }
      },
      select: { credits: true }
    })

    return {
      remainingCredits: updatedUser.credits,
      consumed: CREDITS_PER_IMAGE
    }
  })

export const addCredits = actionClient
  .inputSchema(addCreditsSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user?.id) {
      throw new Error('Non authentifié')
    }

    // Vérifier si l'utilisateur est admin
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (currentUser?.role !== 'admin') {
      throw new Error('Accès non autorisé')
    }

    const updatedUser = await prisma.user.update({
      where: { id: parsedInput.userId },
      data: {
        credits: {
          increment: parsedInput.credits
        }
      },
      select: { 
        id: true,
        name: true,
        email: true,
        credits: true
      }
    })

    return {
      user: updatedUser,
      addedCredits: parsedInput.credits,
      reason: parsedInput.reason
    }
  }) 