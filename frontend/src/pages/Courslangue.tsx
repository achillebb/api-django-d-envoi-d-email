import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { ArrowRight, Clock, BookOpen, Award, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import des images pour les drapeaux
import anglaisImg from '@/assets/anglais.jpg';
import allemandImg from '@/assets/allemand.jpg';
import italienImg from '@/assets/italie.jpg';

const languages = [
  {
    id: 'anglais',
    title: 'Anglais',
    description: 'Maîtrisez la langue internationale des affaires avec nos cours intensifs.',
    duration: '6 mois',
    students: '1250+',
    modules: 6,
    color: 'bg-red-500',
    textColor: 'text-red-600',
    skills: ['Conversation quotidienne', 'Business English', 'Préparation TOEFL/IELTS', 'Écriture académique'],
    image: anglaisImg,
  },
  {
    id: 'francais',
    title: 'Français',
    description: 'Perfectionnez votre français pour les études et le monde professionnel.',
    duration: '6 mois',
    students: '980+',
    modules: 6,
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    skills: ['DELF/DALF', 'Français des affaires', 'Conversation', 'Écriture formelle'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop',
  },
  {
    id: 'allemand',
    title: 'Allemand',
    description: 'Apprenez l\'allemand, langue clé pour les opportunités en Europe.',
    duration: '6 mois',
    students: '420+',
    modules: 5,
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    skills: ['Goethe-Zertifikat', 'Grammaire allemande', 'Conversation', 'Business Deutsch'],
    image: allemandImg,
  },
  {
    id: 'chinois',
    title: 'Chinois Mandarin',
    description: 'Découvrez le mandarin et ouvrez-vous aux marchés asiatiques.',
    duration: '6 mois',
    students: '280+',
    modules: 5,
    color: 'bg-red-600',
    textColor: 'text-red-600',
    skills: ['HSK Certification', 'Caractères chinois', 'Conversation', 'Business Mandarin'],
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=400&fit=crop',
  },
  {
    id: 'italien',
    title: 'Italien',
    description: 'Parlez italien et découvrez la richesse de la culture italienne.',
    duration: '6 mois',
    students: '180+',
    modules: 5,
    color: 'bg-green-600',
    textColor: 'text-green-600',
    skills: ['CILS Certification', 'Conversation', 'Culture italienne', 'Business Italiano'],
    image: italienImg,
  },
];

const levelDescriptions = {
  'A1': 'Débutant - Découverte',
  'A2': 'Élémentaire - Survie',
  'B1': 'Intermédiaire - Seuil',
  'B2': 'Intermédiaire supérieur - Avancé',
  'C1': 'Avancé - Autonome',
  'C2': 'Maîtrise - Expert',
};

export default function Courses() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Cours de Langues
              </span>
              <h1 className="section-title text-4xl md:text-5xl mb-6">
                Nos Cours de Langues
              </h1>
              <p className="section-subtitle text-lg">
                Apprenez une nouvelle langue avec nos cours intensifs et notre 
                méthodologie éprouvée. Préparation aux certifications internationales.
              </p>
            </div>
          </div>
        </section>

        {/* Languages Grid */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {languages.map((language) => (
                <div
                  key={language.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
                >
                  {/* Image de la formation */}
                  {language.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={language.image}
                        alt={language.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute bottom-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-sm font-medium text-gray-800">
                          Certification
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contenu de la carte */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-gray-900">
                        {language.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${language.textColor} bg-opacity-10`}>
                        {language.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {language.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{language.students} étudiants</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-medium">{language.modules} modules</span>
                      </div>
                    </div>

                    {/* Compétences clés */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Compétences clés
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {language.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-md bg-gray-100 text-xs font-medium text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                        {language.skills.length > 3 && (
                          <span className="px-3 py-1.5 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                            +{language.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Boutons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to={`/cours/${language.id}`} className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full border-primary text-primary hover:border-primary hover:text-primary hover:bg-transparent"
                        >
                          <span className="flex items-center justify-center gap-2">
                            Détails du programme
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Button>
                      </Link>
                      <Link to="/inscription" state={{ course: language.id }} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          <span className="flex items-center justify-center gap-2">
                            S'inscrire
                            <CheckCircle className="h-4 w-4" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Levels Explanation */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl md:text-4xl">
                Comprendre les niveaux CECRL
              </h2>
              <p className="section-subtitle">
                Le Cadre Européen Commun de Référence pour les Langues définit 6 niveaux
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(levelDescriptions).map(([level, description]) => (
                <div key={level} className="card-reax p-4 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold">
                    {level}
                  </span>
                  <span className="text-foreground">{description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Informations Complémentaires */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-200">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">Certifications Reconnues</h3>
                <p className="text-gray-600">
                  Toutes nos formations linguistiques préparent à des certifications 
                  internationalement reconnues (TOEFL, DELF, Goethe, HSK, CILS).
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">Flexibilité des Horaires</h3>
                <p className="text-gray-600">
                  Cours en présentiel ou en ligne. Horaires adaptés pour 
                  les étudiants et les professionnels en activité.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-200">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">Formateurs Natives</h3>
                <p className="text-gray-600">
                  Apprenez avec des formateurs natifs expérimentés qui vous 
                  immergent dans la langue et la culture cible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Award className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à parler couramment une nouvelle langue ?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Rejoignez les milliers d'étudiants qui ont obtenu leur certification linguistique 
                avec REAXACADEMY et ont ouvert les portes de nouvelles opportunités.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/inscription">
                  <Button className="text-lg px-8 py-6 hover:scale-105 transition-transform bg-white text-primary hover:bg-white/90">
                    Commencer mon inscription
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
                <Link to="/inscription">
                 <Button
  className="text-lg px-8 py-6 bg-green-500 text-white hover:bg-green-600 transition"
>
  Demander un conseil
</Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/60">
                Prochaines rentrées : 16 Février 2026 • 30 Mars 2026
              </p>
            </div>
          </div>
        </section>
      </main>
    
    </div>
  );
}