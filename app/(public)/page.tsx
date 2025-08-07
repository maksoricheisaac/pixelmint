 

import {HeroGeometric} from "@/components/mvpblocks/geometric-hero";
import { TestimonialsCarousel } from "@/components/mvpblocks/testimonials-carousel";
import { FeatureSteps } from "@/components/mvpblocks/feature-2";
import Feature1 from "@/components/mvpblocks/feature-1";





export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Ultra Moderne */}
      <HeroGeometric  />

      {/* Feature Steps Section */}
      <FeatureSteps />

      {/* Features Section */}
      <Feature1 />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      
    </div>
  );
};