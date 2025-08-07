/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Mail, Lock, User, Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


// Schéma de validation avec Zod
const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez saisir une adresse email valide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        image: "",
        callbackURL: "/generate",
      });
      
      if (error) {
        toast.error(error.message || "Erreur lors de l'inscription");
      } else {
        toast.success("Compte créé avec succès !");
        router.push("/generate");
      }
    } catch (error) {
      toast.error("Une erreur inattendue s'est produite");
      console.error("Erreur d'inscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/generate",
      });
      
      if (error) {
        toast.error(error.message || `Erreur d'inscription avec ${provider}`);
      }
    } catch (error) {
      toast.error(`Erreur d'inscription avec ${provider}`);
      console.error(`Erreur d'inscription ${provider}:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl primary-gradient">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Créer un compte</h2>
          <p className="mt-2 text-muted-foreground">
            Rejoignez PixelMint et libérez votre créativité
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Inscription</CardTitle>
            <CardDescription className="text-center">
              Commencez votre aventure créative dès maintenant
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Boutons de connexion sociale */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full"
                disabled={socialLoading !== null}
                onClick={() => handleSocialSignUp("google")}
              >
                {socialLoading === "google" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={socialLoading !== null}
                onClick={() => handleSocialSignUp("github")}
              >
                {socialLoading === "github" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou s'inscrire avec
                </span>
              </div>
            </div>

            {/* Formulaire avec react-hook-form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Noms séparés */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Jean"
                              className="pl-10"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Dupont"
                              className="pl-10"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="votre@email.com"
                            className="pl-10"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                

                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    J'accepte les{" "}
                    <Link href="#" className="text-primary hover:text-primary/80">
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link href="#" className="text-primary hover:text-primary/80">
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full primary-gradient" 
                  size="lg"
                  disabled={isLoading || socialLoading !== null}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création du compte...
                    </>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <div className="text-center text-sm text-muted-foreground w-full">
              Déjà un compte ?{" "}
              <Link 
                href="/login" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Avantages */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            En rejoignant PixelMint, vous obtenez :
          </p>
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
            <span>✨ 10 images gratuites</span>
            <span>🎨 Accès à tous les styles</span>
            <span>📱 Interface intuitive</span>
          </div>
        </div>
      </div>
    </div>
  );
}

