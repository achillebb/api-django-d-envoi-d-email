import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

import etudient1 from '@/assets/A.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Marie-Claire Nkoulou',
    role: 'Diplômée en Secrétariat',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    content:
      "REAXACADEMY m'a permis d'acquérir toutes les compétences nécessaires pour décrocher mon premier emploi. Les formateurs sont exceptionnels et le suivi personnalisé m'a beaucoup aidée.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Jean-Pierre Mbarga',
    role: 'Diplômé en Marketing Digital',
    image: etudient1,
    content:
      "Grâce à la formation en Marketing Digital, j'ai pu lancer ma propre agence. Le programme était très pratique et adapté aux réalités du marché camerounais.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Sylvie Fotso',
    role: 'Diplômée en Comptabilité',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    content:
      "Une formation de qualité avec des certifications reconnues. J'ai trouvé un emploi dans un cabinet comptable deux mois après ma certification.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Paul Essomba',
    role: 'Diplômé en Développement Web',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content:
      "Les compétences acquises en développement m'ont ouvert les portes de l'international. Je travaille maintenant en freelance avec des clients du monde entier.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce que disent nos étudiants
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des parcours de réussite qui témoignent de la qualité de nos
            formations
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Left */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <ChevronLeft />
          </button>

          {/* Right */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition"
          >
            <ChevronRight />
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              “{testimonials[currentIndex].content}”
            </p>

            {/* Author */}
            <div className="flex flex-col items-center">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-primary/10"
              />
              <h4 className="font-semibold text-lg">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-muted-foreground">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-primary/30 w-3 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}