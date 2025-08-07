import { AboutUs } from "@/components/mvpblocks/about-us-1";

export default function About() {
  return (
    <div>
      <AboutUs />
      
      {/* Section Histoire */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Notre histoire</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              PixelMint est né de la passion de quatre amis pour l&apos;art et la technologie. 
              En 2023, nous avons observé que malgré les avancées révolutionnaires de l&apos;IA générative, 
              les outils existants restaient complexes et peu accessibles au grand public.
            </p>
            <p className="mb-4">
              Nous avons donc décidé de créer une plateforme intuitive qui permettrait à chacun, 
              artiste confirmé ou simple amateur de beauté, de donner vie à ses idées les plus créatives 
              en quelques clics seulement.
            </p>
            <p>
              Aujourd&apos;hui, des milliers de créateurs du monde entier utilisent PixelMint pour 
              explorer de nouveaux territoires artistiques et repousser les limites de leur imagination.
            </p>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            PixelMint en chiffres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Images générées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50k+</div>
              <div className="text-muted-foreground">Utilisateurs actifs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Temps de disponibilité</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}