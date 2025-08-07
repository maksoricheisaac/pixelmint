'use server'

import { z } from 'zod'
import { actionClient } from './safe-action'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const getImagesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
})

const deleteImageSchema = z.object({
  imageId: z.string().uuid(),
})

export const getImages = actionClient
  .inputSchema(getImagesSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      throw new Error('Non authentifié')
    }
    const { page, limit } = parsedInput
    const offset = (page - 1) * limit

    const [images, total] = await Promise.all([
      prisma.image.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        select: {
          id: true,
          url: true,
          prompt: true,
          createdAt: true,
        }
      }),
      prisma.image.count({
        where: { userId: session.user.id }
      })
    ])

    return {
      images,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total
    }
  })

export const deleteImage = actionClient
  .inputSchema(deleteImageSchema)
  .action(async ({ parsedInput }) => {
    const { imageId } = parsedInput

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      throw new Error('Non authentifié')
    }

    // Vérifier que l'image appartient à l'utilisateur
    const image = await prisma.image.findFirst({
      where: {
        id: imageId,
        userId: session.user.id
      }
    })

    if (!image) {
      throw new Error('Image non trouvée ou accès non autorisé')
    }

    await prisma.image.delete({
      where: { id: imageId }
    })

    return { success: true }
  }) 