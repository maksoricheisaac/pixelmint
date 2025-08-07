/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { SimplePricing } from "@/components/mvpblocks/simple-pricing";

const plans = [
  {
    name: "Free",
    price: "0€",
    period: "/mois",
    description: "Parfait pour découvrir PixelMint",
    icon: Sparkles,
    features: [
      "10 générations par mois",
      "Résolution standard (512x512)",
      "Accès à la galerie communautaire",
      "Support par email"
    ],
    popular: false,
    ctaText: "Commencer gratuitement"
  },
  {
    name: "Pro",
    price: "19€",
    period: "/mois",
    description: "Pour les créatifs qui veulent plus",
    icon: Zap,
    features: [
      "500 générations par mois",
      "Haute résolution (1024x1024)",
      "Styles avancés et effets",
      "Historique illimité",
      "Téléchargements sans filigrane",
      "Support prioritaire"
    ],
    popular: true,
    ctaText: "Essayer Pro"
  },
  {
    name: "Premium",
    price: "49€",
    period: "/mois", 
    description: "Pour les professionnels et équipes",
    icon: Crown,
    features: [
      "Générations illimitées",
      "Ultra haute résolution (2048x2048)",
      "Accès anticipé aux nouveautés",
      "Styles personnalisés",
      "API et intégrations",
      "Formation et support dédié",
      "Licence commerciale étendue"
    ],
    popular: false,
    ctaText: "Choisir Premium"
  }
];

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-6xl mx-auto">
       <SimplePricing />

        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Questions fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. 
                Les changements prennent effet immédiatement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Comment fonctionnent les crédits ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Chaque image générée consomme 1 crédit. Vous recevez 10 crédits gratuits 
                à l'inscription pour tester la plateforme.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Que se passe-t-il si je n'ai plus de crédits ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Vous recevrez une notification avant d'atteindre votre limite. 
                Vous pouvez ensuite acheter un nouveau pack de crédits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Les images générées m'appartiennent-elles ?
              </h3>
              <p className="text-muted-foreground text-sm">
                Oui, vous possédez tous les droits sur les images que vous générez 
                avec PixelMint.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <div className="bg-muted/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prêt à commencer ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Rejoignez des milliers de créatifs qui utilisent déjà PixelMint.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              Commencer maintenant
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};