import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg1 from '@/assets/hero-bg1.jpg';
import heroBg2 from '@/assets/hero-bg2.jpg';
import heroBg3 from '@/assets/hero-bg3.jpg';

export default function HeroSection() {

  /* =========================
     CONFIG HERO IMAGES
  ========================== */
  const heroImages = [heroBg1, heroBg2, heroBg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  /* =========================
     AUTO SLIDER
  ========================== */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6s = luxe, pas pressé

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

      {/* ==================================================
         BACKGROUND HERO — CINEMA / PREMIUM
      =================================================== */}
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
              filter: 'brightness(0.9) contrast(1.15) saturate(1.15)',
            }}
          />
        ))}

        {/* Overlay cinématographique */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/85" />

        {/* Lumière naturelle (radial highlight) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

        {/* Ombre de profondeur */}
        <div className="absolute inset-0 shadow-[inset_0_-220px_320px_rgba(0,0,0,0.7)]" />
      </div>

      {/* ==================================================
         DÉCORATIONS FLOTTANTES (PROFONDEUR)
      =================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-16 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* ==================================================
         CONTENU
      =================================================== */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">

        

          {/* Titre */}
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mb-6 text-white animate-fade-in-up">
            Institut de Formations Professionnelles, Linguistique
            <span className="block text-primary">
              &amp; Certification
               Internationale 
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="section-subtitle mb-10 text-gray-200 animate-fade-in-up">
            Reax Academy, Centre de Formation Professionnelle, Linguistique et de Certification
            agréé par le MINEFOP. Formez-vous aujourd’hui pour les
            certifications reconnues mondialement.
          </p>

          {/* =========================
             CARTES D’INFORMATIONS
          ========================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 animate-fade-in-up">

            <div className="card-reax p-5 flex items-center gap-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Prochaine rentrée</p>
                <p className="font-heading font-semibold text-foreground">
                  17 Février 2026
                </p>
              </div>
            </div>

            <div className="card-reax p-5 flex items-center gap-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Deuxième session</p>
                <p className="font-heading font-semibold text-foreground">
                  30 Mars 2026
                </p>
              </div>
            </div>

            <div className="card-reax p-5 flex items-center gap-4 border-destructive/30 bg-destructive/10 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Clôture inscriptions</p>
                <p className="font-heading font-semibold text-destructive">
                  15 Février 2026
                </p>
              </div>
            </div>

          </div>

          {/* =========================
             CTA
          ========================== */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link to="/contacts">
              <Button className="btn-primary text-lg px-10 py-6 shadow-xl">
                Nous contactez
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link to="/formations">
              <Button variant="outline" className="btn-outline text-lg px-10 py-6">
                Découvrir nos formations
              </Button>
            </Link>
          </div>

          {/* =========================
             TRUST INDICATORS
          ========================== */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-12 border-t border-white/10 animate-fade-in-up">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">
                Agrément MINEFOP
              </span>
            </div>

            <div className="w-px h-8 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Centres à Yaoundé & Douala
              </span>
            </div>

            <div className="w-px h-8 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <span className="text-accent font-bold text-sm">✓</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Certifications Internationales
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
