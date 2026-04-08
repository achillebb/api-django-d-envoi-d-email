import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Target, 
  Heart, 
  Award, 
  Users, 
  Globe,
  Shield,
  Lightbulb,
  Monitor,
  BookOpen,
  UserCheck,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Phone,
  Star,
  HandHeart
} from 'lucide-react';

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(stepValue * step), value);
      setCount(current);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-primary">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

// Mission items
const missionItems = [
  {
    icon: Target,
    title: "Former l'Excellence",
    description: "Dispenser des formations de haute qualité alignées sur les standards internationaux et les besoins du marché.",
  },
  {
    icon: Globe,
    title: "Ouverture Internationale",
    description: "Préparer nos apprenants à évoluer dans un environnement professionnel globalisé grâce aux certifications reconnues.",
  },
  {
    icon: Users,
    title: "Accompagnement Personnalisé",
    description: "Offrir un suivi individualisé pour garantir la réussite de chaque apprenant dans son parcours de formation.",
  },
];

// Values items
const valuesItems = [
  {
    icon: Star,
    title: "Excellence",
    description: "Nous visons l'excellence dans tous nos programmes et services pour garantir le meilleur à nos apprenants.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "La passion de l'enseignement et du développement des compétences guide chacune de nos actions.",
  },
  {
    icon: HandHeart,
    title: "Intégrité",
    description: "Nous agissons avec honnêteté, transparence et respect envers tous nos partenaires et apprenants.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous adoptons les méthodes pédagogiques modernes et les technologies pour une formation efficace.",
  },
];

// Why choose us items
const whyChooseItems = [
  {
    icon: Shield,
    title: "Agrément Officiel",
    description: "Centre agréé par le Ministère de l'Emploi et de la Formation Professionnelle (MINEFOP).",
  },
  {
    icon: GraduationCap,
    title: "Formateurs Experts",
    description: "Une équipe de formateurs certifiés avec une expérience professionnelle avérée.",
  },
  {
    icon: Monitor,
    title: "Équipements Modernes",
    description: "Salles équipées de matériel informatique de dernière génération.",
  },
  {
    icon: BookOpen,
    title: "Programmes Complets",
    description: "Des cursus couvrant tous les aspects théoriques et pratiques des métiers.",
  },
  {
    icon: UserCheck,
    title: "Suivi Personnalisé",
    description: "Accompagnement individualisé tout au long du parcours de formation.",
  },
  {
    icon: Briefcase,
    title: "Insertion Professionnelle",
    description: "Aide à l'insertion professionnelle et partenariats avec les entreprises locales.",
  },
];

// Timeline items
const timelineItems = [
  { year: "2015", title: "Création à Yaoundé", description: "Fondation du premier centre de formation." },
  { year: "2017", title: "Agrément MINEFOP", description: "Reconnaissance officielle par le ministère." },
  { year: "2019", title: "Expansion Langues", description: "Lancement des cours de langues étrangères." },
  { year: "2021", title: "Ouverture Douala", description: "Extension avec un second centre." },
  { year: "2023", title: "Certifications Int.", description: "Partenariats pour certifications internationales." },
  { year: "2026", title: "5000+ Étudiants", description: "Cap symbolique franchi avec succès." },
];

// Stats items
const statsItems = [
  { value: 5000, suffix: "+", label: "Étudiants Formés", icon: Users },
  { value: 12, suffix: "", label: "Formations DQP", icon: BookOpen },
  { value: 5, suffix: "", label: "Langues Enseignées", icon: Globe },
  { value: 98, suffix: "%", label: "Taux de Satisfaction", icon: Star },
];

// Badges
const badges = [
  { icon: Shield, label: "Agréé MINEFOP" },
  { icon: Award, label: "Certifications Reconnues" },
  { icon: GraduationCap, label: "Formateurs Qualifiés" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Section 1: Hero Banner */}
        <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
          <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-medium">Centre de Formation de Référence</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                🎓 REAXACADEMY : Centre de Formation Agréé MINEFOP
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                Centre de formation professionnelle et linguistique de référence au Cameroun, 
                reconnu pour l'excellence de ses programmes et la qualité de son enseignement.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/formations" className="gap-2">
                  Découvrir nos formations
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Section 2: Qui Sommes-Nous */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Notre Identité
                </span>
                <h2 className="section-title text-3xl md:text-4xl mb-6">
                  Qui Sommes-Nous ?
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-muted-foreground mb-10 text-center">
                <p className="text-lg leading-relaxed">
                  <strong className="text-foreground">REAXACADEMY</strong> est un centre de formation professionnelle et linguistique 
                  <strong className="text-primary"> agréé par le Ministère de l'Emploi et de la Formation Professionnelle (MINEFOP)</strong> du Cameroun. 
                  Depuis notre création, nous nous sommes imposés comme une référence en matière de formation de qualité, 
                  alliant excellence académique et préparation concrète au monde professionnel.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Notre mission est de former des professionnels compétents et opérationnels, capables de répondre 
                  aux exigences du marché de l'emploi national et international grâce à des programmes certifiants 
                  et un encadrement personnalisé.
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {badges.map((badge, index) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-3 px-6 py-4 bg-secondary/50 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <badge.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Mission & Valeurs */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Ce qui nous guide
              </span>
              <h2 className="section-title text-3xl md:text-4xl">
                Notre Mission & Nos Valeurs
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Mission Column */}
              <div className="card-reax p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Notre Mission</h3>
                </div>
                <div className="space-y-6">
                  {missionItems.map((item, index) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Values Column */}
              <div className="card-reax p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Heart className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Nos Valeurs</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {valuesItems.map((item, index) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Pourquoi Choisir REAXACADEMY */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Nos Atouts
              </span>
              <h2 className="section-title text-3xl md:text-4xl mb-4">
                Pourquoi Choisir REAXACADEMY ?
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Des avantages concrets qui font de nous le choix idéal pour votre formation professionnelle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseItems.map((item, index) => (
                <div
                  key={item.title}
                  className="group card-reax p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Notre Parcours - Timeline */}
        <section className="section-padding bg-primary text-primary-foreground overflow-hidden">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                Notre Histoire
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Notre Parcours
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Une aventure de passion et d'engagement pour l'excellence depuis 2015
              </p>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-accent/30 -translate-y-1/2"></div>
              <div className="flex justify-between relative">
                {timelineItems.map((item, index) => (
                  <div key={item.year} className="flex flex-col items-center relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 mb-4 ${
                      index === timelineItems.length - 1 
                        ? 'bg-accent text-accent-foreground ring-4 ring-accent/30' 
                        : 'bg-primary-foreground/20 text-primary-foreground border-2 border-accent/50'
                    }`}>
                      <span className="font-bold text-lg">{item.year}</span>
                    </div>
                    <div className={`text-center max-w-[140px] ${
                      index === timelineItems.length - 1 ? 'text-accent' : ''
                    }`}>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-xs text-primary-foreground/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30"></div>
              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <div key={item.year} className="flex items-start gap-6 relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      index === timelineItems.length - 1 
                        ? 'bg-accent text-accent-foreground ring-4 ring-accent/30' 
                        : 'bg-primary-foreground/20 text-primary-foreground border-2 border-accent/50'
                    }`}>
                      <span className="font-bold">{item.year}</span>
                    </div>
                    <div className={`pt-3 ${index === timelineItems.length - 1 ? 'text-accent' : ''}`}>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-primary-foreground/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Chiffres Clés */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Nos Résultats
              </span>
              <h2 className="section-title text-3xl md:text-4xl mb-4">
                REAXACADEMY en Chiffres
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Des résultats concrets qui témoignent de notre engagement envers l'excellence
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {statsItems.map((stat, index) => (
                <div
                  key={stat.label}
                  className="card-reax p-6 md:p-8 text-center hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-accent" />
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: CTA Final */}
        <section className="section-padding bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent/20 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Rejoignez-Nous Dès Aujourd'hui !
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Faites partie de notre communauté de plus de 5000 étudiants formés avec succès. 
                Votre avenir professionnel commence ici.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/inscription" className="gap-2">
                    S'inscrire Maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/contacts" className="gap-2">
                    <Phone className="w-5 h-5" />
                    Nous Contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
