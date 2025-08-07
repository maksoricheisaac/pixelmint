/* eslint-disable react/no-unescaped-entities */
'use client'
import { useActionState, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, Download, Heart, Wand2, ExternalLink, Copy } from 'lucide-react'
import Image from 'next/image'
import { generateImage } from '@/actions/public/generate-image.action'
import { CreditsDisplay } from '@/components/credits/credits-display'
import { toast } from 'sonner'


const initialState = {
  error: null,
  issues: null,
  image: null,
  uploadedUrl: null,
}

export default function Generate() {
  const [formState, formAction, isPending] = useActionState(generateImage, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedFormat, setSelectedFormat] = useState('square')
  

  useEffect(() => {
    if (formState.image && formRef.current) {
      formRef.current.reset()
    }
  }, [formState.image])

  const handleDownload = async () => {
    if (formState.uploadedUrl) {
      try {
        const response = await fetch(formState.uploadedUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `generated-image-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success("Image générée avec succès !")
      } catch (e) {
        void e
        toast.error("Erreur lors du téléchargement")
      }
    }
  }

  const handleCopyUrl = async () => {
    if (formState.uploadedUrl) {
      try {
        await navigator.clipboard.writeText(formState.uploadedUrl)
        toast.success("URL copiée dans le presse papier")
      } catch (e) {
        void e
        toast.error("Erreur lors de la copie")
      }
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Générateur d'Images IA
          </h1>
          <p className="text-xl text-muted-foreground">
            Décrivez votre vision et regardez-la prendre vie
          </p>
        </div>

        <div className="space-y-6">
          {/* Affichage des crédits */}
          <div className="max-w-md mx-auto">
            <CreditsDisplay userId="" />
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="mr-2 h-5 w-5" />
                Créer une nouvelle image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={formAction} ref={formRef} className="space-y-4">
                <Textarea
                  name="prompt"
                  placeholder="Décrivez l'image à créer..."
                  className="min-h-[120px] resize-none"
                />
                {formState.issues?.prompt && (
                  <p className="text-red-500 text-sm">{formState.issues.prompt}</p>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format de l'image</label>
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="format"
                        value="square"
                        checked={selectedFormat === 'square'}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-full p-3 text-center border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedFormat === 'square' 
                          ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/80 hover:text-primary-foreground/80' 
                          : 'bg-background border-border'
                      }`}>
                        <div className="text-xs font-medium mb-1">Carré</div>
                        <div className={`text-xs ${selectedFormat === 'square' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>512×512</div>
                      </div>
                    </label>
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="format"
                        value="portrait"
                        checked={selectedFormat === 'portrait'}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-full p-3 text-center border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedFormat === 'portrait' 
                          ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/80 hover:text-primary-foreground/80' 
                          : 'bg-background border-border'
                      }`}>
                        <div className="text-xs font-medium mb-1">Portrait</div>
                        <div className={`text-xs ${selectedFormat === 'portrait' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>512×768</div>
                      </div>
                    </label>
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="format"
                        value="landscape"
                        checked={selectedFormat === 'landscape'}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-full p-3 text-center border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedFormat === 'landscape' 
                          ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/80 hover:text-primary-foreground/80' 
                          : 'bg-background border-border'
                      }`}>
                        <div className="text-xs font-medium mb-1">Paysage</div>
                        <div className={`text-xs ${selectedFormat === 'landscape' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>768×512</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full primary-gradient"
                  size="lg"
                  disabled={isPending}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {isPending ? 'Génération en cours...' : 'Générer l\'image'}
                </Button>
                {formState.error && (
                  <p className="text-sm text-red-500">{formState.error}</p>
                )}
              </form>
            </CardContent>
          </Card>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Résultat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center">
                  {formState.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={formState.image}
                        alt="Image générée"
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        {formState.uploadedUrl && (
                          <>
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="h-8 w-8"
                              onClick={handleDownload}
                              title="Télécharger l'image"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="h-8 w-8"
                              onClick={handleCopyUrl}
                              title="Copier l'URL"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="h-8 w-8"
                              onClick={() => formState.uploadedUrl && window.open(formState.uploadedUrl, '_blank')}
                              title="Ouvrir dans un nouvel onglet"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground h-full">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Votre image apparaîtra ici</p>
                    </div>
                  )}
                </div>
              </div>
              
              {formState.uploadedUrl && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">URL de l'image uploadée :</p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={formState.uploadedUrl}
                      readOnly
                      className="flex-1 text-xs bg-background border rounded px-2 py-1"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleCopyUrl}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copier
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
