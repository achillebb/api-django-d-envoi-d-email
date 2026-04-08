import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { 
  Clock, 
  Target, 
  HelpCircle, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  GraduationCap,
  Award,
  Phone,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoReaxAcademy from '@/assets/logo-reaxacademy.png';

// Import seulement des images qui existent
import secretariatImg from '@/assets/design.jpg';
import marketingImg from '@/assets/marketing.jpg';
import devImg from '@/assets/devellopement.jpg';

// URLs par défaut pour les images manquantes
const defaultImages = {
  comptabilite: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  graphisme: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  montage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  maintenance: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

// Formation data avec images
const formationsData: Record<string, {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  quizzes: number;
  students: number;
  price: string;
  description: string;
  whyFollow: string;
  opportunities: string[];
  skills: string[];
  modules: { title: string; lessons: string[]; duration: string }[];
  instructor: { name: string; role: string; bio: string };
  testimonials: { name: string; text: string; rating: number }[];
  image: string;
}> = {
  'secretariat': {
    id: 'secretariat',
    title: 'Formation Secrétariat Bureautique',
    category: 'Formations Certifiantes',
    duration: '12 Mois',
    level: 'Tous niveaux',
    quizzes: 24,
    students: 250,
    price: '250 000 FCFA',
    description: 'Maîtrisez tous les aspects du secrétariat moderne : gestion administrative, outils bureautiques avancés, communication professionnelle et organisation d\'entreprise.',
    whyFollow: 'Le secrétariat bureautique reste l\'un des métiers les plus demandés au Cameroun. Avec la digitalisation croissante des entreprises, les assistants administratifs qualifiés sont essentiels pour le bon fonctionnement des organisations.',
    opportunities: [
      'Assistant(e) de direction',
      'Secrétaire administratif(ve)',
      'Gestionnaire de bureau',
      'Chargé(e) d\'accueil',
      'Assistant(e) commercial(e)'
    ],
    skills: ['Microsoft Office (Word, Excel, PowerPoint)', 'Gestion documentaire', 'Communication professionnelle', 'Comptabilité de base', 'Gestion du temps', 'Rédaction administrative'],
    modules: [
      { title: 'Fondamentaux du secrétariat', lessons: ['Rôle et responsabilités', 'Organisation du travail', 'Gestion du temps'], duration: '4 semaines' },
      { title: 'Maîtrise de Microsoft Office', lessons: ['Word avancé', 'Excel et tableaux croisés', 'PowerPoint professionnel', 'Outlook et agenda'], duration: '8 semaines' },
      { title: 'Communication professionnelle', lessons: ['Rédaction administrative', 'Communication orale', 'Accueil et relation client'], duration: '6 semaines' },
      { title: 'Gestion administrative', lessons: ['Classement et archivage', 'Gestion des réunions', 'Suivi de dossiers'], duration: '6 semaines' },
      { title: 'Comptabilité de base', lessons: ['Notions comptables', 'Facturation', 'Suivi de trésorerie'], duration: '6 semaines' },
      { title: 'Projet professionnel', lessons: ['Stage en entreprise', 'Préparation au DQP', 'Soutenance'], duration: '8 semaines' }
    ],
    instructor: { name: 'Marie Ngono', role: 'Experte en gestion administrative', bio: 'Plus de 15 ans d\'expérience en secrétariat de direction dans des multinationales. Formatrice certifiée MINEFOP.' },
    testimonials: [
      { name: 'Pauline M.', text: 'Formation complète qui m\'a permis de décrocher un emploi dès la fin de mon stage !', rating: 5 },
      { name: 'Jean-Pierre K.', text: 'Excellente formation, les formateurs sont très professionnels et à l\'écoute.', rating: 5 }
    ],
    image: secretariatImg
  },
  'comptabilite': {
    id: 'comptabilite',
    title: 'Formation Comptabilité',
    category: 'Formations Certifiantes',
    duration: '12 Mois',
    level: 'Tous niveaux',
    quizzes: 30,
    students: 200,
    price: '300 000 FCFA',
    description: 'Devenez un expert en comptabilité générale, fiscalité et gestion financière. Cette formation vous prépare aux réalités du métier de comptable au Cameroun.',
    whyFollow: 'La comptabilité est le pilier de toute entreprise. Les comptables qualifiés sont très recherchés dans tous les secteurs d\'activité au Cameroun et en Afrique centrale.',
    opportunities: [
      'Comptable en entreprise',
      'Assistant comptable',
      'Gestionnaire de paie',
      'Aide-comptable',
      'Agent fiscal'
    ],
    skills: ['Comptabilité générale', 'Fiscalité camerounaise', 'Logiciels comptables (Sage, Excel)', 'Paie et déclarations sociales', 'Analyse financière', 'Déclarations fiscales'],
    modules: [
      { title: 'Introduction à la comptabilité', lessons: ['Principes comptables', 'Plan OHADA', 'Documents comptables'], duration: '6 semaines' },
      { title: 'Comptabilité générale', lessons: ['Opérations courantes', 'TVA et taxes', 'Écritures de fin d\'exercice'], duration: '10 semaines' },
      { title: 'Logiciels comptables', lessons: ['Sage Comptabilité', 'Excel avancé pour comptables', 'Outils de gestion'], duration: '6 semaines' },
      { title: 'Fiscalité', lessons: ['Impôts sur les sociétés', 'Impôts sur le revenu', 'Déclarations fiscales'], duration: '6 semaines' },
      { title: 'Paie et social', lessons: ['Calcul des salaires', 'Charges sociales', 'CNPS et déclarations'], duration: '6 semaines' },
      { title: 'Projet professionnel', lessons: ['Stage en cabinet ou entreprise', 'Préparation au DQP', 'Soutenance'], duration: '8 semaines' }
    ],
    instructor: { name: 'Emmanuel Tamba', role: 'Expert-comptable diplômé', bio: 'Expert-comptable avec 20 ans d\'expérience en cabinet et entreprise. Formateur certifié en normes OHADA.' },
    testimonials: [
      { name: 'Sylvie A.', text: 'J\'ai pu maîtriser Sage et décrocher un poste de comptable junior dès ma sortie.', rating: 5 },
      { name: 'Patrick N.', text: 'Formation très pratique avec beaucoup d\'exercices concrets.', rating: 5 }
    ],
    image: defaultImages.comptabilite
  },
  'marketing-digital': {
    id: 'marketing-digital',
    title: 'Formation Marketing Digital',
    category: 'Formations Certifiantes',
    duration: '12 Mois',
    level: 'Tous niveaux',
    quizzes: 28,
    students: 180,
    price: '340 000 FCFA',
    description: 'Maîtrisez les stratégies de marketing en ligne, les réseaux sociaux, le SEO, la publicité digitale et le e-commerce pour développer des marques sur internet.',
    whyFollow: 'Le marketing digital est en pleine expansion au Cameroun. Les entreprises recherchent des spécialistes capables de gérer leur présence en ligne et d\'attirer des clients via le digital.',
    opportunities: [
      'Community Manager',
      'Chargé(e) de marketing digital',
      'Spécialiste SEO/SEA',
      'Consultant en e-commerce',
      'Créateur de contenu'
    ],
    skills: ['Réseaux sociaux (Facebook, Instagram, LinkedIn, TikTok)', 'SEO/SEA', 'Email marketing', 'Google Analytics', 'Publicité en ligne', 'Content marketing'],
    modules: [
      { title: 'Fondamentaux du marketing digital', lessons: ['Stratégie digitale', 'Parcours client', 'Persona et ciblage'], duration: '4 semaines' },
      { title: 'Réseaux sociaux', lessons: ['Community management', 'Création de contenu', 'Publicité sociale'], duration: '8 semaines' },
      { title: 'SEO & SEA', lessons: ['Référencement naturel', 'Google Ads', 'Analytics et KPIs'], duration: '8 semaines' },
      { title: 'Email marketing', lessons: ['Stratégie emailing', 'Automatisation', 'Newsletter et conversion'], duration: '4 semaines' },
      { title: 'E-commerce', lessons: ['Création de boutique en ligne', 'Stratégies de vente', 'Paiement et logistique'], duration: '6 semaines' },
      { title: 'Projet professionnel', lessons: ['Campagne réelle', 'Préparation au DQP', 'Soutenance'], duration: '8 semaines' }
    ],
    instructor: { name: 'Armelle Mballa', role: 'Consultante en stratégie digitale', bio: 'Spécialiste du marketing digital avec 10 ans d\'expérience. A accompagné plus de 50 entreprises dans leur transformation digitale.' },
    testimonials: [
      { name: 'Christelle F.', text: 'Grâce à cette formation, je gère maintenant les réseaux sociaux de 3 entreprises !', rating: 5 },
      { name: 'Hervé B.', text: 'Formation très actuelle avec des cas pratiques concrets.', rating: 5 }
    ],
    image: marketingImg
  },
  'graphisme': {
    id: 'graphisme',
    title: 'Formation Graphisme de Production',
    category: 'Formations Certifiantes',
    duration: '12 Mois',
    level: 'Tous niveaux',
    quizzes: 20,
    students: 150,
    price: '340 000 FCFA',
    description: 'Apprenez à créer des visuels professionnels avec les logiciels Adobe. De l\'identité visuelle à la mise en page, maîtrisez tous les aspects du graphisme.',
    whyFollow: 'Le graphisme est essentiel pour toute communication visuelle. Les entreprises et agences recherchent des graphistes capables de créer des supports de qualité professionnelle.',
    opportunities: [
      'Graphiste en agence',
      'Infographiste',
      'Designer d\'identité visuelle',
      'Maquettiste',
      'Graphiste freelance'
    ],
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Identité visuelle', 'Mise en page', 'Préparation pour l\'impression'],
    modules: [
      { title: 'Fondamentaux du design graphique', lessons: ['Théorie des couleurs', 'Typographie', 'Composition'], duration: '6 semaines' },
      { title: 'Adobe Photoshop', lessons: ['Retouche photo', 'Photomontage', 'Effets visuels'], duration: '8 semaines' },
      { title: 'Adobe Illustrator', lessons: ['Dessin vectoriel', 'Logo et identité', 'Illustration'], duration: '8 semaines' },
      { title: 'Adobe InDesign', lessons: ['Mise en page', 'Brochures et magazines', 'Préparation impression'], duration: '6 semaines' },
      { title: 'Projets créatifs', lessons: ['Identité visuelle complète', 'Supports marketing', 'Portfolio'], duration: '6 semaines' },
      { title: 'Projet professionnel', lessons: ['Stage en agence', 'Préparation au DQP', 'Soutenance'], duration: '8 semaines' }
    ],
    instructor: { name: 'Boris Essomba', role: 'Directeur artistique', bio: 'Directeur artistique avec 12 ans d\'expérience en agence. A travaillé pour des marques internationales en Afrique.' },
    testimonials: [
      { name: 'Nadège T.', text: 'Formation complète qui m\'a permis de créer mon portfolio et trouver mes premiers clients.', rating: 5 },
      { name: 'Samuel O.', text: 'Les formateurs sont de vrais professionnels passionnés.', rating: 5 }
    ],
    image: defaultImages.graphisme
  },
  'montage-video': {
    id: 'montage-video',
    title: 'Formation Montage Audio-Visuel',
    category: 'Formations Certifiantes',
    duration: '12 Mois',
    level: 'Tous niveaux',
    quizzes: 18,
    students: 120,
    price: '340 000 FCFA',
    description: 'Maîtrisez le montage vidéo professionnel, l\'animation graphique et la production audiovisuelle avec les logiciels les plus utilisés de l\'industrie.',
    whyFollow: 'Avec l\'explosion du contenu vidéo sur les réseaux sociaux et le web, les monteurs vidéo qualifiés sont très demandés par les agences, les médias et les entreprises.',
    opportunities: [
      'Monteur vidéo',
      'Motion designer',
      'Réalisateur',
      'Vidéaste freelance',
      'Producteur de contenu'
    ],
    skills: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Montage audio', 'Color grading', 'Motion graphics'],
    modules: [
      { title: 'Fondamentaux de l\'audiovisuel', lessons: ['Langage cinématographique', 'Cadrage et prise de vue', 'Éclairage'], duration: '4 semaines' },
      { title: 'Adobe Premiere Pro', lessons: ['Montage de base', 'Transitions et effets', 'Montage multicam'], duration: '10 semaines' },
      { title: 'Adobe After Effects', lessons: ['Animation de base', 'Motion graphics', 'Compositing'], duration: '10 semaines' },
      { title: 'Son et audio', lessons: ['Prise de son', 'Mixage audio', 'Sound design'], duration: '4 semaines' },
      { title: 'Color grading', lessons: ['Étalonnage couleur', 'DaVinci Resolve', 'Looks cinématographiques'], duration: '4 semaines' },
      { title: 'Projet professionnel', lessons: ['Production complète', 'Préparation au DQP', 'Soutenance'], duration: '8 semaines' }
    ],
    instructor: { name: 'Franck Ndjana', role: 'Réalisateur et monteur', bio: 'Réalisateur avec 15 ans d\'expérience en production audiovisuelle. A collaboré avec des chaînes TV nationales et internationales.' },
    testimonials: [
      { name: 'Kevin M.', text: 'J\'ai lancé ma chaîne YouTube professionnelle grâce à cette formation !', rating: 5 },
      { name: 'Aline R.', text: 'Formation très pratique avec du matériel professionnel.', rating: 5 }
    ],
    image: defaultImages.montage
  },
  'developpement': {
    id: 'developpement',
    title: 'Formation Développeur d\'Applications',
    category: 'Formations Certifiantes',
    duration: '12 Mois',
    level: 'Tous niveaux',
    quizzes: 36,
    students: 100,
    price: '340 000 FCFA',
    description: 'Apprenez à créer des applications web et mobiles modernes avec les technologies et frameworks les plus demandés sur le marché du travail.',
    whyFollow: 'Le développement d\'applications est l\'un des métiers les plus demandés au monde. Au Cameroun, la transformation digitale crée un besoin croissant de développeurs qualifiés.',
    opportunities: [
      'Développeur web full stack',
      'Développeur front-end',
      'Développeur back-end',
      'Développeur mobile',
      'Freelance / Consultant'
    ],
    skills: ['HTML, CSS, JavaScript', 'React / Vue.js', 'Node.js / PHP', 'Bases de données (MySQL, MongoDB)', 'Git et déploiement', 'API REST'],
    modules: [
      { title: 'Fondamentaux du web', lessons: ['HTML5 et sémantique', 'CSS3 et responsive', 'JavaScript ES6+'], duration: '8 semaines' },
      { title: 'Frontend avancé', lessons: ['React.js', 'Tailwind CSS', 'Gestion d\'état'], duration: '8 semaines' },
      { title: 'Backend', lessons: ['Node.js et Express', 'PHP et Laravel', 'API REST'], duration: '8 semaines' },
      { title: 'Bases de données', lessons: ['MySQL', 'MongoDB', 'ORM et migrations'], duration: '6 semaines' },
      { title: 'DevOps de base', lessons: ['Git et GitHub', 'Déploiement', 'CI/CD'], duration: '4 semaines' },
      { title: 'Projet professionnel', lessons: ['Projet complet full stack', 'Préparation au DQP', 'Soutenance'], duration: '10 semaines' }
    ],
    instructor: { name: 'Patrick Fouda', role: 'Lead développeur full stack', bio: 'Développeur senior avec 10 ans d\'expérience. A travaillé pour des startups et des entreprises tech en Afrique et en Europe.' },
    testimonials: [
      { name: 'Michel T.', text: 'Formation intensive mais très complète. J\'ai trouvé un emploi avant même la fin du stage !', rating: 5 },
      { name: 'Grace A.', text: 'Les projets pratiques m\'ont vraiment préparée au monde professionnel.', rating: 5 }
    ],
    image: devImg
  },
  'maintenance': {
    id: 'maintenance',
    title: 'Formation Maintenance Informatique',
    category: 'Formations Certifiantes',
    duration: '12 Mois',
    level: 'Tous niveaux',
    quizzes: 22,
    students: 90,
    price: '340 000 FCFA',
    description: 'Apprenez à diagnostiquer, réparer et maintenir tous types d\'équipements informatiques. De l\'assemblage au dépannage réseau.',
    whyFollow: 'Avec la numérisation croissante des entreprises, les techniciens de maintenance informatique sont indispensables pour assurer le bon fonctionnement des infrastructures IT.',
    opportunities: [
      'Technicien de maintenance',
      'Support informatique',
      'Administrateur réseau',
      'Technicien helpdesk',
      'Réparateur indépendant'
    ],
    skills: ['Hardware (assemblage, diagnostic)', 'Systèmes d\'exploitation (Windows, Linux)', 'Réseaux (TCP/IP, WiFi)', 'Sécurité informatique', 'Support utilisateur', 'Virtualisation'],
    modules: [
      { title: 'Architecture des ordinateurs', lessons: ['Composants matériels', 'Assemblage PC', 'Diagnostic hardware'], duration: '6 semaines' },
      { title: 'Systèmes d\'exploitation', lessons: ['Windows installation et config', 'Linux fondamentaux', 'Dual boot'], duration: '8 semaines' },
      { title: 'Réseaux', lessons: ['Fondamentaux TCP/IP', 'Configuration réseau', 'WiFi et routeurs'], duration: '8 semaines' },
      { title: 'Sécurité', lessons: ['Antivirus et malwares', 'Sauvegarde et récupération', 'Sécurité réseau de base'], duration: '6 semaines' },
      { title: 'Support et dépannage', lessons: ['Méthodologie de diagnostic', 'Support utilisateur', 'Documentation technique'], duration: '6 semaines' },
      { title: 'Projet professionnel', lessons: ['Stage en entreprise', 'Préparation au DQP', 'Soutenance'], duration: '8 semaines' }
    ],
    instructor: { name: 'Albert Nkodo', role: 'Ingénieur systèmes et réseaux', bio: 'Ingénieur IT avec 18 ans d\'expérience en entreprise. Certifié CompTIA A+ et Network+.' },
    testimonials: [
      { name: 'Eric N.', text: 'J\'ai ouvert mon propre atelier de réparation grâce à cette formation !', rating: 5 },
      { name: 'Diane K.', text: 'Formateurs compétents et équipements modernes.', rating: 5 }
    ],
    image: defaultImages.maintenance
  }
};

const tabs = [
  { id: 'apercu', label: 'Aperçu' },
  { id: 'details', label: 'Détails' },
  { id: 'formateur', label: 'Formateur' },
  { id: 'faq', label: 'FAQ' },
];

export default function FormationDetail() {
  const { formationId } = useParams<{ formationId: string }>();
  const [activeTab, setActiveTab] = useState('apercu');
  const [openModules, setOpenModules] = useState<number[]>([0]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const formation = formationsData[formationId || 'secretariat'] || formationsData['secretariat'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const tab of tabs) {
        const section = sectionRefs.current[tab.id];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const offset = 150;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveTab(sectionId);
  };

  const toggleModule = (index: number) => {
    setOpenModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12 lg:py-16">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Formation Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    {formation.category}
                  </span>
                </div>
                
                <p className="text-primary-foreground/80 text-sm">
                  Formateur : <span className="font-semibold text-primary-foreground">{formation.instructor.name}</span>
                </p>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight">
                  {formation.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent-foreground" />
                    <span>{formation.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent-foreground" />
                    <span>{formation.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-accent-foreground" />
                    <span>{formation.quizzes} Quiz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent-foreground" />
                    <span>{formation.students} Étudiants</span>
                  </div>
                </div>
              </div>
              
              {/* Right: Image de la formation */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden border-2 border-primary-foreground/20 shadow-2xl">
                  <img 
                    src={formation.image} 
                    alt={formation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800">
                        DQP - Diplôme de Qualification Professionnelle
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                      {formation.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Tabs Navigation */}
        <nav className="sticky top-20 z-40 bg-background border-b border-border shadow-sm">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Content (2/3) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Aperçu Section */}
              <section 
                ref={el => sectionRefs.current['apercu'] = el}
                id="apercu"
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    {formation.title} à REAXACADEMY
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {formation.description}
                  </p>
                </div>

                {/* Image visible sur mobile */}
                <div className="lg:hidden relative aspect-video rounded-xl overflow-hidden border border-border shadow-lg">
                  <img 
                    src={formation.image} 
                    alt={formation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-sm font-medium text-gray-800">
                        DQP Certifié MINEFOP
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                        {formation.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    Pourquoi suivre cette formation au Cameroun ?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {formation.whyFollow}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    Débouchés professionnels
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {formation.opportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <CheckCircle2 className="w-5 h-5 text-accent-foreground shrink-0" />
                        <span className="text-foreground">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    Compétences acquises
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formation.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Details Section (Modules) */}
              <section 
                ref={el => sectionRefs.current['details'] = el}
                id="details"
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  Programme de la formation
                </h2>
                <p className="text-muted-foreground">
                  {formation.modules.length} modules • {formation.duration} de formation intensive
                </p>

                <div className="space-y-3">
                  {formation.modules.map((module, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-xl overflow-hidden bg-card"
                    >
                      <button
                        onClick={() => toggleModule(index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold text-foreground">{module.title}</h4>
                            <p className="text-sm text-muted-foreground">{module.duration}</p>
                          </div>
                        </div>
                        {openModules.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      
                      {openModules.includes(index) && (
                        <div className="px-4 pb-4 pl-16 space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center gap-3 text-sm text-muted-foreground py-1"
                            >
                              <BookOpen className="w-4 h-4 text-accent-foreground" />
                              {lesson}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Formateur Section */}
              <section 
                ref={el => sectionRefs.current['formateur'] = el}
                id="formateur"
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  Votre formateur
                </h2>

                <div className="card-reax p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                        {formation.instructor.name}
                      </h3>
                      <p className="text-accent-foreground font-medium mb-3">
                        {formation.instructor.role}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {formation.instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section 
                ref={el => sectionRefs.current['faq'] = el}
                id="faq"
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  Questions fréquentes
                </h2>

                <div className="space-y-4">
                  <div className="card-reax p-5">
                    <h4 className="font-semibold text-foreground mb-2">Quels sont les prérequis pour cette formation ?</h4>
                    <p className="text-muted-foreground">Aucun prérequis spécifique. La formation est ouverte à tous les niveaux, du débutant au niveau intermédiaire souhaitant se perfectionner.</p>
                  </div>
                  <div className="card-reax p-5">
                    <h4 className="font-semibold text-foreground mb-2">Comment se déroulent les cours ?</h4>
                    <p className="text-muted-foreground">Les cours sont dispensés en présentiel dans nos centres de Yaoundé et Douala, avec des sessions pratiques intensives et un accompagnement personnalisé.</p>
                  </div>
                  <div className="card-reax p-5">
                    <h4 className="font-semibold text-foreground mb-2">Quelle certification est délivrée ?</h4>
                    <p className="text-muted-foreground">À l'issue de la formation, vous obtenez un Diplôme de Qualification Professionnelle (DQP) reconnu par le MINEFOP.</p>
                  </div>
                  <div className="card-reax p-5">
                    <h4 className="font-semibold text-foreground mb-2">Y a-t-il un stage en entreprise ?</h4>
                    <p className="text-muted-foreground">Oui, un stage de 2 mois minimum en entreprise est inclus dans le programme pour vous permettre d'acquérir une expérience professionnelle réelle.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar (1/3) - Card d'inscription avec image */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 space-y-6">
                {/* Price Card avec image de la formation */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  {/* Image de la formation */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={formation.image} 
                      alt={formation.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800">
                        {formation.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-lg">
                        {formation.price}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-sm font-medium text-gray-800">
                        DQP Certifié
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenu de la carte */}
                  <div className="p-6 space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Frais de formation complets</p>
                      <p className="text-3xl font-bold text-primary">{formation.price}</p>
                      <p className="text-xs text-gray-500 mt-1">Paiement en plusieurs fois possible</p>
                    </div>
                    
                    {/* Info sur la formation */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Durée : {formation.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{formation.students}+ étudiants formés</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Stage en entreprise inclus</span>
                      </div>
                    </div>
                    
                    {/* Bouton d'inscription */}
                    <Link to="/inscription" className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white text-base py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <Phone className="w-5 h-5 mr-2" />
                        Demander une inscription
                      </Button>
                    </Link>
                    
                    {/* Contact rapide */}
                    <div className="text-center pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Besoin d'aide pour choisir ?</p>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full text-sm">
                          Contacter un conseiller
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Testimonials Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Avis des étudiants
                  </h4>
                  
                  <div className="space-y-4">
                    {formation.testimonials.map((testimonial, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -top-1 -left-1 text-4xl text-primary/10 font-serif">"</div>
                        <div className="pl-4">
                          <div className="flex gap-0.5 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 italic mb-2">
                            "{testimonial.text}"
                          </p>
                          <p className="text-sm font-medium text-gray-900">— {testimonial.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 space-y-4">
                  <h4 className="font-bold text-gray-900">Inclus dans la formation</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Supports de cours complets</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Accès aux équipements modernes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Stage en entreprise garanti</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Préparation au DQP MINEFOP</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Accompagnement à l'emploi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
    
  );
}