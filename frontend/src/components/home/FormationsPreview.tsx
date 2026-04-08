import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import des images pour chaque formation
import secretariatImg from '@/assets/design.jpg';
import marketingImg from '@/assets/marketing.jpg';
import devImg from '@/assets/devellopement.jpg';

const formations = [
  {
    id: 'secretariat',
    title: 'Secrétariat Bureautique',
    description: 'Maîtrisez les outils bureautiques et la gestion administrative professionnelle.',
    duration: '12 mois',
    color: 'bg-blue-500',
    image: secretariatImg,
    skills: ['Word/Excel/PowerPoint', 'Gestion administrative', 'Accueil client', 'Organisation bureau']
  },
  {
    id: 'comptabilite',
    title: 'Comptabilité',
    description: 'Devenez expert en gestion comptable et financière des entreprises.',
    duration: '12 mois',
    color: 'bg-emerald-500',
    image: secretariatImg,
    skills: ['Comptabilité générale', 'Fiscalité', 'Paie', 'Logiciels comptables']
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Apprenez les stratégies de marketing en ligne et les réseaux sociaux.',
    duration: '12 mois',
    color: 'bg-purple-500',
    image: marketingImg,
    skills: ['SEO/SEA', 'Réseaux sociaux', 'Content marketing', 'Analytics']
  },
  {
    id: 'graphisme',
    title: 'Graphisme de Production',
    description: 'Créez des visuels professionnels avec les outils de design modernes.',
    duration: '12 mois',
    color: 'bg-pink-500',
    image: secretariatImg,
    skills: ['Photoshop/Illustrator', 'Design print/web', 'Identité visuelle', 'UI/UX']
  },
  {
    id: 'montage',
    title: 'Montage Audio-Visuel',
    description: 'Maîtrisez le montage vidéo et la production audiovisuelle.',
    duration: '12 mois',
    color: 'bg-orange-500',
    image: marketingImg,
    skills: ['Premiere Pro', 'After Effects', 'Prise de son', 'Animation']
  },
  {
    id: 'developpement',
    title: 'Développement d\'Applications',
    description: 'Créez des applications web et mobiles avec les technologies modernes.',
    duration: '12 mois',
    color: 'bg-cyan-500',
    image: devImg,
    skills: ['HTML/CSS/JS', 'React/Node.js', 'Bases de données', 'DevOps']
  },
];

export default function FormationsPreview() {
  return (
    <section className="section-padding bg-secondary/5">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
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
          {formations.map((formation, index) => (
            <div
              key={formation.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                  <span className="px-3 py-1 rounded-full bg-white/90 text-sm font-medium text-gray-800">
                    {formation.duration}
                  </span>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                  {formation.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formation.description}
                </p>

                {/* Compétences clés */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Compétences clés :</h4>
                  <div className="flex flex-wrap gap-2">
                    {formation.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-md bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Boutons d'action - CORRIGÉS */}
                <div className="flex gap-3">
                  <Link
                    to={`/formations/${formation.id}`}
                    className="flex-1"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:border-primary hover:text-primary hover:bg-transparent"
                    >
                      <span className="flex items-center justify-center gap-2">
                        En savoir plus
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </Link>
                  <Link
                    to="/inscription"
                    state={{ formation: formation.title }}
                    className="flex-1"
                  >
                    <Button 
                      className="w-full bg-primary hover:bg-primary text-white hover:border-primary hover:border"
                    >
                      S'inscrire
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-8">
            <h3 className="font-heading font-semibold text-2xl text-gray-900 mb-4">
              Pourquoi choisir nos formations DQP ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <span>Certification reconnue</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <span>Stages garantis</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
                <span>Suivi personnalisé</span>
              </div>
            </div>
          </div>

          <Link to="/formations">
            <Button className="bg-primary hover:bg-primary text-white text-lg px-8 py-6 border-primary hover:border-primary">
              Découvrir toutes nos formations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Prochaine rentrée : 15 Mars 2026 • Places limitées
          </p>
        </div>
      </div>
    </section>
  );
}