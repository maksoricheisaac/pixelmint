'use server'

import { z } from 'zod'
import { put } from '@vercel/blob'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { CREDITS_PER_IMAGE } from '@/lib/pricing'
import { headers } from 'next/headers'

const schema = z.object({
  prompt: z.string().min(2, 'Le prompt est trop court'),
  format: z.enum(['square', 'portrait', 'landscape']).default('square'),
})

type FormState = {
  error: string | null
  issues: { prompt?: string[]; format?: string[] } | null
  image: string | null
  uploadedUrl?: string | null
  remainingCredits?: number
}

export async function generateImage(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    prompt: formData.get('prompt'),
    format: formData.get('format'),
  })

  if (!validatedFields.success) {
    return {
      error: 'Données invalides',
      issues: validatedFields.error.flatten().fieldErrors,
      image: null,
      uploadedUrl: null,
    }
  }

  const { prompt, format } = validatedFields.data

  // Vérifier l'authentification
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session?.user?.id) {
    return {
      error: 'Vous devez être connecté pour générer des images',
      issues: null,
      image: null,
      uploadedUrl: null,
    }
  }

  // Vérifier les crédits
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true }
  })

  if (!user) {
    return {
      error: 'Utilisateur non trouvé',
      issues: null,
      image: null,
      uploadedUrl: null,
    }
  }

  if (user.credits < CREDITS_PER_IMAGE) {
    return {
      error: 'Crédits insuffisants. Veuillez acheter des crédits pour continuer.',
      issues: null,
      image: null,
      uploadedUrl: null,
      remainingCredits: user.credits,
    }
  }

  // Définir les dimensions selon le format
  const dimensions = {
    square: { width: 512, height: 512 },
    portrait: { width: 512, height: 768 },
    landscape: { width: 768, height: 512 },
  }

  const { width, height } = dimensions[format]

  try {
    const response = await fetch(
      'https://router.huggingface.co/nebius/v1/images/generations',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'black-forest-labs/flux-schnell',
          prompt: prompt,
          response_format: 'b64_json',
          width: width,
          height: height,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Échec de la génération d'image: ${response.status}`)
    }

    const data = await response.json()
   
    let base64Data: string | null = null
    
    if (Array.isArray(data) && data.length > 0) {
      if (data[0].b64_json) {
        base64Data = data[0].b64_json
      }
      else if (data[0].image) {
        base64Data = data[0].image
      }
    }
    else if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      if (data.data[0].b64_json) {
        base64Data = data.data[0].b64_json
      } else if (data.data[0].image) {
        base64Data = data.data[0].image
      }
    }
    else if (data.image) {
      base64Data = data.image
    } else if (data.b64_json) {
      base64Data = data.b64_json
    }
    else if (response.headers.get('content-type')?.includes('image/')) {
      const arrayBuffer = await response.arrayBuffer()
      base64Data = Buffer.from(arrayBuffer).toString('base64')
    }

    if (!base64Data) {
      console.error('Structure de réponse non reconnue:', data)
      throw new Error('Format de réponse invalide de l\'API. Vérifiez les logs pour la structure reçue.')
    }

    base64Data = base64Data.replace(/^data:image\/[^;]+;base64,/, '')
    
    const imageUrl = `data:image/png;base64,${base64Data}`
   
    const binaryData = Buffer.from(base64Data, 'base64')
    const blob = new Blob([binaryData], { type: 'image/png' })

    let uploadedUrl = null
    try {
      const { url } = await put(
        `${Date.now()}-${Math.random().toString(36).substring(7)}.png`, 
        blob, 
        {
          access: 'public',
          addRandomSuffix: false,
        }
      )
      uploadedUrl = url
      
    } catch (uploadError) {
      console.error('Erreur lors de l\'upload vers Vercel:', uploadError)
    }

    // Sauvegarder l'image dans la base de données et consommer les crédits
    if (uploadedUrl) {
      await prisma.$transaction([
        prisma.image.create({
          data: {
            url: uploadedUrl,
            prompt: prompt,
            userId: session.user.id,
          }
        }),
        prisma.user.update({
          where: { id: session.user.id },
          data: {
            credits: {
              decrement: CREDITS_PER_IMAGE
            }
          }
        })
      ])
    }

    // Récupérer les crédits restants
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    })

    return {
      error: null,
      issues: null,
      image: imageUrl,
      uploadedUrl: uploadedUrl,
      remainingCredits: updatedUser?.credits || 0,
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Erreur pendant la génération de l\'image',
      issues: null,
      image: null,
      uploadedUrl: null,
    }
  }
}