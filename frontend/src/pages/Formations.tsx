import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { ArrowRight, Clock, Users, BookOpen, Award, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import des images pour chaque formation
import secretariatImg from '@/assets/design.jpg';
import marketingImg from '@/assets/marketing.jpg';
import devImg from '@/assets/design.jpg';
import formation from '@/assets/WhatsApp Image 2026-02-13 at 11.57.03.jpeg';

// Images par défaut pour les formations manquantes
import comptabiliteImg from '@/assets/design.jpg';
import graphismeImg from '@/assets/design.jpg';
import montageImg from '@/assets/marketing.jpg';

const formations = [
  {
    id: 'secretariat',
    title: 'Secrétariat Bureautique',
    description: 'Maîtrisez les outils bureautiques et la gestion administrative professionnelle.',
    duration: '12 mois',
    students: '250+',
    modules: 8,
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    image: secretariatImg,
  },
  {
    id: 'comptabilite',
    title: 'Comptabilité',
    description: 'Devenez expert en gestion comptable et financière des entreprises.',
    duration: '12 mois',
    students: '200+',
    modules: 10,
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    image: comptabiliteImg,
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Apprenez les stratégies de marketing en ligne et les réseaux sociaux.',
    duration: '12 mois',
    students: '180+',
    modules: 9,
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    image: marketingImg,
  },
  {
    id: 'graphisme',
    title: 'Graphisme de Production',
    description: 'Créez des visuels professionnels avec les outils de design modernes.',
    duration: '12 mois',
    students: '150+',
    modules: 8,
    color: 'bg-pink-500',
    textColor: 'text-pink-600',
    image: graphismeImg,
  },
  {
    id: 'montage',
    title: 'Montage Audio-Visuel',
    description: 'Maîtrisez le montage vidéo et la production audiovisuelle.',
    duration: '12 mois',
    students: '120+',
    modules: 7,
    color: 'bg-orange-500',
    textColor: 'text-orange-600',
    image: montageImg,
  },
  {
    id: 'developpement',
    title: 'Développement d\'Applications',
    description: 'Créez des applications web et mobiles avec les technologies modernes.',
    duration: '12 mois',
    students: '100+',
    modules: 12,
    color: 'bg-cyan-500',
    textColor: 'text-cyan-600',
    image: devImg,
  },
];

export default function FormationsPreview() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 flex items-center min-h-[600px]">
          {/* Image de fond */}
          <div className="absolute inset-0 z-0">
            <img 
              src={formation} 
              alt="Fond formations professionnelles" 
              className="w-full h-full object-cover"
            />
            {/* Overlay sombre uniquement (pas de bleu) */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          {/* Contenu avec texte blanc */}
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-white">Formations Professionnelles DQP</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
              Nos Formations Professionnelles
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Des programmes certifiants de 12 mois pour acquérir des compétences 
              recherchées sur le marché de l'emploi. Formation pratique avec stages.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/inscription">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-6">
                  Commencer mon inscription
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="/#formations" className="no-underline">
              <Button 
  className="border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6 bg-transparent"
>
  Découvrir toutes nos formations
</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Formations DQP</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Étudiants formés</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Taux de réussite</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Formateurs experts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Formations Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                DQP - Diplôme de Qualification Professionnelle
              </span>
              <h2 className="section-title">
                Nos Formations Professionnelles
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Des programmes certifiants de 12 mois pour acquérir des compétences 
                recherchées sur le marché de l'emploi. Formation pratique avec stages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {formations.map((formation) => (
                <div
                  key={formation.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
                >
                  {/* Image de la formation */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={formation.image}
                      alt={formation.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800">
                        DQP
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full bg-white/90 text-xs font-semibold ${formation.textColor}`}>
                        {formation.duration}
                      </span>
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-heading font-bold text-xl text-gray-900">
                        {formation.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">
                      {formation.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{formation.students} étudiants</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-medium">{formation.modules} modules</span>
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-3">
                      <Link
                        to={`/formations/${formation.id}`}
                        className="flex-1"
                      >
                        <Button 
  variant="outline" 
  className="w-full border-primary text-primary hover:border-primary hover:text-primary hover:bg-transparent cursor-pointer"
>
  <span className="flex items-center justify-center gap-1 text-sm">
    Détails
    <ArrowRight className="w-3 h-3" />
  </span>
</Button>
                      </Link>
                      <Link
                        to="/inscription"
                        state={{ formation: formation.title }}
                        className="flex-1"
                      >
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                          Inscription
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pourquoi choisir nos formations */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-4">
                  Pourquoi choisir nos formations DQP ?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900 mb-1">Certification reconnue</span>
                  <span className="text-sm text-gray-500">Diplôme MINEFOP</span>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-900 mb-1">Stages garantis</span>
                  <span className="text-sm text-gray-500">2 mois en entreprise</span>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-900 mb-1">Suivi personnalisé</span>
                  <span className="text-sm text-gray-500">Accompagnement individuel</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to="/formations">
                <Button className="btn-primary text-base px-8 py-6">
                  Découvrir toutes nos formations
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Prochaine rentrée : 16 Février 2026 • 30 Mars 2026
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-primary/5">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
                Besoin d'informations ?
              </h2>
              <p className="text-gray-600 mb-8">
                Nos conseillers sont disponibles pour répondre à toutes vos questions 
                sur nos formations professionnelles et les modalités d'inscription.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/+237696823691" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 21.91L7.3 20.53C8.75 21.32 10.38 21.73 12.05 21.73C17.5 21.73 21.96 17.27 21.96 11.81C21.96 6.45 17.5 2 12.04 2Z"/>
                  </svg>
                  Contacter sur WhatsApp
                </a>
                <Link to="/inscription">
                  <Button 
  variant="outline" 
  className="border-primary text-primary hover:!border-primary hover:!text-primary hover:!bg-transparent px-8 py-6"
>
  Nous contacter
</Button>
                </Link>
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