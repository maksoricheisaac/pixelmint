'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NumberFlow from '@number-flow/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, Check, Star, Zap, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    id: 'discovery',
    name: 'Pack Découverte',
    icon: Star,
    price: 1500,
    description: 'Parfait pour commencer vos créations',
    features: [
      '100 crédits',
      'Résolution standard (512x512)',
      'Accès à votre galerie privée',
      'Support par email',
      'Téléchargements illimités',
    ],
    cta: 'Acheter 100 crédits',
  },
  {
    id: 'creator',
    name: 'Pack Créateur',
    icon: Zap,
    price: 6000,
    description: 'Pour les créateurs réguliers',
    features: [
      '500 crédits',
      'Haute résolution (1024x1024)',
      'Styles avancés et effets',
      'Historique illimité',
      'Téléchargements sans filigrane',
      'Support prioritaire',
    ],
    cta: 'Acheter 500 crédits',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pack Pro',
    icon: Shield,
    price: 15000,
    description: 'Pour les utilisateurs intensifs',
    features: [
      '1500 crédits',
      'Ultra haute résolution (2048x2048)',
      'Accès anticipé aux nouveautés',
      'Styles personnalisés',
      'API et intégrations',
      'Formation et support dédié',
      'Licence commerciale étendue',
    ],
    cta: 'Acheter 1500 crédits',
  },
];

export function SimplePricing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="not-prose relative flex w-full flex-col gap-16 overflow-hidden px-4 py-24 text-center sm:px-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 absolute -top-[10%] left-[50%] h-[40%] w-[60%] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
        <div className="bg-gradient-to-r from-pink-500/5 to-blue-500/5 absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center space-y-2">
          <Badge
            variant="outline"
            className="border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-purple-500/10 mb-4 rounded-full px-4 py-1 text-sm font-medium"
          >
            <Sparkles className="text-pink-500 mr-1 h-3.5 w-3.5 animate-pulse" />
            Packs de Crédits
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="from-foreground to-foreground/30 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            Choisissez le pack qui vous convient
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-md pt-2 text-lg"
          >
            Des prix simples et transparents. Achetez des crédits selon vos besoins.
          </motion.p>
        </div>



        <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex"
            >
              <Card
                className={cn(
                  'bg-secondary/20 relative h-full w-full text-left transition-all duration-300 hover:shadow-lg',
                  plan.popular
                    ? 'ring-pink-500/50 dark:shadow-pink-500/10 shadow-md ring-2'
                    : 'hover:border-pink-500/30',
                  plan.popular &&
                    'from-pink-500/[0.03] bg-gradient-to-b to-transparent',
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-0 left-0 mx-auto w-fit">
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-4 py-1 shadow-sm">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      Populaire
                    </Badge>
                  </div>
                )}
                <CardHeader className={cn('pb-4', plan.popular && 'pt-8')}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        plan.popular
                          ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-500'
                          : 'bg-secondary text-foreground',
                      )}
                    >
                      <plan.icon className="h-4 w-4" />
                    </div>
                    <CardTitle
                      className={cn(
                        'text-xl font-bold',
                        plan.popular && 'text-pink-500',
                      )}
                    >
                      {plan.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-3 space-y-2">
                    <p className="text-sm">{plan.description}</p>
                    <div className="pt-2">
                      <div className="flex items-baseline">
                        <span
                          className={cn(
                            'text-3xl font-bold',
                            plan.popular ? 'text-pink-500' : 'text-foreground',
                          )}
                        >
                          {plan.price.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 pb-6">
                  {plan.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full',
                          plan.popular
                            ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-500'
                            : 'bg-secondary text-secondary-foreground',
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span
                        className={
                          plan.popular
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className={cn(
                      'w-full font-medium transition-all duration-300',
                      plan.popular
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/20 hover:shadow-md'
                        : 'hover:border-pink-500/30 hover:bg-gradient-to-r hover:from-pink-500/5 hover:to-purple-500/5 hover:text-pink-500',
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>

                {/* Subtle gradient effects */}
                {plan.popular ? (
                  <>
                    <div className="from-pink-500/[0.05] pointer-events-none absolute right-0 bottom-0 left-0 h-1/2 rounded-b-lg bg-gradient-to-t to-transparent" />
                    <div className="border-pink-500/20 pointer-events-none absolute inset-0 rounded-lg border" />
                  </>
                ) : (
                  <div className="hover:border-pink-500/10 pointer-events-none absolute inset-0 rounded-lg border border-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
