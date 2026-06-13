import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg1 from '@/assets/hero-bg1.jpg';
import heroBg2 from '@/assets/hero-bg2.jpg';
import heroBg3 from '@/assets/hero-bg3.jpg';

export default function HeroSection() {
  const heroImages = [heroBg1, heroBg2, heroBg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* BACKGROUND HERO — CINEMA / PREMIUM */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 bg-cover bg-center md:bg-top
              transition-all duration-[9000ms] ease-linear
              ${index === currentIndex
                ? 'opacity-100 scale-110'
                : 'opacity-0 scale-100'}
            `}
            style={{
              backgroundImage: `url(${image})`,
              filter: 'brightness(0.85) contrast(1.2) saturate(1.25)',
            }}
          />
        ))}

        {/* Overlay cinématographique amélioré */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

        {/* Lumière naturelle (radial highlight) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_50%)]" />

        {/* Ombre de profondeur */}
        <div className="absolute inset-0 shadow-[inset_0_-300px_400px_rgba(0,0,0,0.8)]" />
      </div>

      {/* DÉCORATIONS FLOTTANTES */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-80 h-80 bg-primary/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-24 right-16 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* CONTENU */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-white">Leader de la Formation en Afrique</span>
          </div>

          {/* Titre avec meilleure typographie */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6 text-white leading-tight animate-fade-in-up" style={{textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
            Institut de Formations
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent">
              Professionnelles & Internationales
            </span>
          </h1>

          {/* Sous-titre amélioré */}
          <p className="section-subtitle mb-12 text-lg md:text-xl text-gray-100 leading-relaxed animate-fade-in-up max-w-2xl mx-auto">
            Reax Academy, agréé par le MINEFOP. Formez-vous avec les meilleures méthodes pour obtenir des certifications reconnues mondialement.
          </p>

          {/* CARTES D'INFORMATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
            <div className="card-reax p-6 flex flex-col items-center gap-4 backdrop-blur-md hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="text-sm text-white/70 mb-1">Prochaine rentrée</p>
                <p className="font-heading font-bold text-lg text-white">17 Février 2026</p>
              </div>
            </div>

            <div className="card-reax p-6 flex flex-col items-center gap-4 backdrop-blur-md hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-white/70 mb-1">Deuxième session</p>
                <p className="font-heading font-bold text-lg text-white">30 Mars 2026</p>
              </div>
            </div>

            <div className="card-reax p-6 flex flex-col items-center gap-4 backdrop-blur-md hover:bg-destructive/20 transition-all duration-300 border border-destructive/40 bg-destructive/10">
              <div className="w-14 h-14 rounded-xl bg-destructive/30 flex items-center justify-center">
                <Clock className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-white/70 mb-1">Clôture inscriptions</p>
                <p className="font-heading font-bold text-lg text-destructive">15 Février 2026</p>
              </div>
            </div>
          </div>

          {/* CTA avec meilleures interactions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up mb-14">
            <Link to="/contacts">
              <Button size="lg" className="btn-primary text-lg px-10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Nous contactez
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link to="/formations">
              <Button size="lg" variant="outline" className="btn-outline text-lg px-10 hover:bg-white/20">
                Découvrir nos formations
              </Button>
            </Link>
          </div>

          {/* TRUST INDICATORS */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-12 border-t border-white/10 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/60">Accrédité par</p>
                <p className="font-bold text-white">MINEFOP</p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/60">Centres</p>
                <p className="font-bold text-white">Yaoundé & Douala</p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">✓</span>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/60">Reconnu</p>
                <p className="font-bold text-white">Internationalement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}