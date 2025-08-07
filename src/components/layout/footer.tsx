/* eslint-disable react/no-unescaped-entities */

import { Sparkles, Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg primary-gradient">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">PixelMint</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transformez vos idées en œuvres d'art avec l'intelligence artificielle.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="/generate" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Générer
              </Link>
              <Link href="/gallery" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Galerie
              </Link>
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Tarifs
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                À propos
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Aide
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Conditions
              </Link>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Suivez-nous</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 PixelMint. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};