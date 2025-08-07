import {
  Zap,
  Palette,
  Shield,
  Sparkles,
  Clock,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Génération ultra-rapide',
    desc: 'Créez des images en quelques secondes grâce à notre IA de pointe optimisée pour la vitesse.',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Styles variés',
    desc: 'De l\'art numérique au photorealistic, explorez tous les styles et techniques artistiques.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Qualité garantie',
    desc: 'Images haute résolution avec une qualité professionnelle, parfaites pour tous vos projets.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Créativité illimitée',
    desc: 'Transformez n\'importe quelle idée en œuvre d\'art unique avec notre IA créative.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Disponible 24/7',
    desc: 'Accédez à votre créativité à tout moment, jour et nuit, sans aucune interruption.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Communauté active',
    desc: 'Rejoignez des milliers d\'artistes et créatifs qui partagent leurs créations.',
  },
];

export default function Feature1() {
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Pourquoi choisir <span className="text-gradient">PixelMint</span> ?
            </h3>
            <p className="font-geist text-foreground/60 mt-3">
              Découvrez les avantages qui font de notre plateforme le choix 
              préféré des créatifs du monde entier.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(192, 11, 109, 0.26) 34.2%, rgba(192, 15, 102, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_#ff7aa42f_inset] hover:scale-105 transition-transform duration-300"
              >
                <div className="text-primary w-fit transform-gpu rounded-full border p-4 [box-shadow:0_-20px_80px_-20px_#ff7aa43f_inset] dark:[box-shadow:0_-20px_80px_-20px_#ff7aa40f_inset]">
                  {item.icon}
                </div>
                <h4 className="font-geist text-lg font-bold tracking-tighter">
                  {item.title}
                </h4>
                <p className="text-gray-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
