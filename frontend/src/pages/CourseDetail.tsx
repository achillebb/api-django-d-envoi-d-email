import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { ArrowRight, Clock, Users, BookOpen, Award, CheckCircle, Star, Globe, Calendar, ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const coursesData: Record<string, {
  name: string;
  flag: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  certification: string;
  duration: string;
  hoursPerWeek: string;
  students: number;
  levels: { code: string; name: string; description: string }[];
  modules: { title: string; lessons: string[] }[];
  benefits: string[];
  pricing: { type: string; duration: string; price: string }[];
  faqs: { question: string; answer: string }[];
  instructor: { name: string; title: string; bio: string };
}> = {
  anglais: {
    name: 'Anglais',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800',
    shortDescription: 'Maîtrisez la langue internationale des affaires',
    fullDescription: 'L\'anglais est la langue la plus parlée au monde dans le domaine des affaires, de la technologie et du tourisme. Notre programme intensif vous permettra d\'acquérir une maîtrise complète de la langue, tant à l\'oral qu\'à l\'écrit, pour communiquer avec aisance dans tous les contextes professionnels et personnels.',
    certification: 'TOEFL / IELTS',
    duration: '6 mois',
    hoursPerWeek: '20-25h',
    students: 1250,
    levels: [
      { code: 'A1', name: 'Débutant', description: 'Apprenez les bases : salutations, présentations, phrases simples' },
      { code: 'A2', name: 'Élémentaire', description: 'Communiquez dans des situations quotidiennes simples' },
      { code: 'B1', name: 'Intermédiaire', description: 'Exprimez-vous sur des sujets familiers et personnels' },
      { code: 'B2', name: 'Intermédiaire avancé', description: 'Conversez avec fluidité et spontanéité' },
      { code: 'C1', name: 'Avancé', description: 'Maîtrisez la langue dans des contextes professionnels complexes' },
      { code: 'C2', name: 'Expert', description: 'Atteignez un niveau proche de la langue maternelle' },
    ],
    modules: [
      { title: 'Foundations of English', lessons: ['Alphabet & Pronunciation', 'Basic Grammar', 'Essential Vocabulary', 'Numbers & Dates'] },
      { title: 'Conversational English', lessons: ['Daily Conversations', 'Travel English', 'Social Interactions', 'Phone Calls'] },
      { title: 'Business English', lessons: ['Professional Emails', 'Meetings & Presentations', 'Negotiations', 'Business Vocabulary'] },
      { title: 'Academic English', lessons: ['Essay Writing', 'Research Skills', 'Academic Vocabulary', 'Presentation Skills'] },
      { title: 'Exam Preparation', lessons: ['TOEFL Strategies', 'IELTS Practice', 'Mock Tests', 'Score Improvement Techniques'] },
    ],
    benefits: [
      'Accès à des emplois internationaux',
      'Communication avec plus de 1,5 milliard de personnes',
      'Meilleure compréhension des médias anglophones',
      'Préparation aux études à l\'étranger',
      'Certification reconnue mondialement',
    ],
    pricing: [
      { type: 'Présentiel', duration: '6 mois', price: '400 000 FCFA' },
      { type: 'En ligne', duration: '6 mois', price: '500 000 FCFA' },
      { type: 'Préparation examen', duration: 'Par mois', price: '50 000 FCFA' },
    ],
    faqs: [
      { question: 'Quel niveau dois-je avoir pour commencer ?', answer: 'Nous accueillons tous les niveaux, du débutant complet au niveau avancé. Un test de placement vous sera proposé pour déterminer votre niveau actuel.' },
      { question: 'Combien de temps pour atteindre le niveau B2 ?', answer: 'En moyenne, il faut 6 à 9 mois de formation intensive pour passer d\'un niveau débutant à B2, selon votre implication et votre pratique quotidienne.' },
      { question: 'Les cours en ligne sont-ils aussi efficaces ?', answer: 'Oui, nos cours en ligne sont interactifs et dispensés en direct par nos formateurs. Vous bénéficiez du même programme et du même suivi qu\'en présentiel.' },
      { question: 'Le kit est-il inclus dans le tarif ?', answer: 'Oui, chaque inscription comprend un kit complet : 2 livres, 1 dictionnaire, 2 cahiers et 1 polo REAXACADEMY.' },
    ],
    instructor: { name: 'Prof. Sarah Johnson', title: 'Formatrice d\'Anglais Certifiée', bio: 'Native anglaise avec 15 ans d\'expérience dans l\'enseignement de l\'anglais comme langue seconde. Certifiée CELTA et DELTA.' },
  },
  francais: {
    name: 'Français',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    shortDescription: 'Perfectionnez votre français pour les études et le monde professionnel',
    fullDescription: 'Le français est une langue de culture, de diplomatie et de commerce international. Notre programme vous accompagne dans la maîtrise de cette langue riche et nuancée, que ce soit pour vos études supérieures, votre carrière professionnelle ou vos projets d\'immigration.',
    certification: 'DELF / DALF / TCF',
    duration: '6 mois',
    hoursPerWeek: '20-25h',
    students: 980,
    levels: [
      { code: 'A1', name: 'Débutant', description: 'Découvrez les bases du français : alphabet, sons, phrases simples' },
      { code: 'A2', name: 'Élémentaire', description: 'Communiquez dans des situations de la vie quotidienne' },
      { code: 'B1', name: 'Intermédiaire', description: 'Exprimez-vous avec plus d\'aisance sur des sujets variés' },
      { code: 'B2', name: 'Intermédiaire avancé', description: 'Argumentez et défendez vos opinions avec fluidité' },
      { code: 'C1', name: 'Avancé', description: 'Maîtrisez le français dans des contextes académiques et professionnels' },
      { code: 'C2', name: 'Expert', description: 'Excellez dans tous les registres de la langue' },
    ],
    modules: [
      { title: 'Les Fondamentaux', lessons: ['Phonétique française', 'Grammaire de base', 'Vocabulaire essentiel', 'Conjugaison'] },
      { title: 'Français Quotidien', lessons: ['Conversations courantes', 'Au travail', 'Dans les commerces', 'Les médias'] },
      { title: 'Français Professionnel', lessons: ['Correspondance professionnelle', 'Réunions et présentations', 'Rédaction de rapports', 'Entretiens d\'embauche'] },
      { title: 'Culture Francophone', lessons: ['Littérature française', 'Histoire et géographie', 'Actualités', 'Art et gastronomie'] },
      { title: 'Préparation aux Examens', lessons: ['Techniques DELF/DALF', 'Exercices types', 'Simulations orales', 'Production écrite'] },
    ],
    benefits: [
      'Accès aux études dans les pays francophones',
      'Opportunités de travail au Canada (Québec)',
      'Avantage pour l\'immigration francophone',
      'Certification reconnue internationalement',
      'Enrichissement culturel',
    ],
    pricing: [
      { type: 'Présentiel', duration: '6 mois', price: '400 000 FCFA' },
      { type: 'En ligne', duration: '6 mois', price: '500 000 FCFA' },
      { type: 'Préparation examen', duration: 'Par mois', price: '50 000 FCFA' },
    ],
    faqs: [
      { question: 'Le DELF est-il reconnu pour l\'immigration au Canada ?', answer: 'Oui, le DELF B2 et le DALF sont reconnus par Immigration Canada et peuvent vous donner des points supplémentaires pour votre demande de résidence.' },
      { question: 'Quelle est la différence entre DELF et TCF ?', answer: 'Le DELF est un diplôme à vie, tandis que le TCF est un test valable 2 ans. Le DELF est généralement préféré pour l\'immigration et les études.' },
      { question: 'Puis-je suivre les cours si le français n\'est pas ma langue maternelle ?', answer: 'Absolument ! Nos cours sont conçus pour les non-francophones qui souhaitent améliorer leur niveau de français.' },
      { question: 'Y a-t-il des cours du soir ?', answer: 'Oui, nous proposons des cours en journée et en soirée pour s\'adapter à votre emploi du temps.' },
    ],
    instructor: { name: 'Dr. Marie Dupont', title: 'Formatrice de Français Langue Étrangère', bio: 'Docteure en linguistique française avec 12 ans d\'expérience. Examinatrice habilitée DELF-DALF.' },
  },
  allemand: {
    name: 'Allemand',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
    shortDescription: 'Apprenez l\'allemand, langue clé pour les opportunités en Europe',
    fullDescription: 'L\'allemand est la langue la plus parlée en Europe et ouvre les portes d\'un marché économique puissant. Que vous visiez des études en Allemagne, en Autriche ou en Suisse, ou que vous souhaitiez accéder à des opportunités professionnelles internationales, notre programme vous prépare efficacement.',
    certification: 'Goethe-Zertifikat / TestDaF',
    duration: '6 mois',
    hoursPerWeek: '20-25h',
    students: 420,
    levels: [
      { code: 'A1', name: 'Anfänger', description: 'Apprenez les bases : se présenter, poser des questions simples' },
      { code: 'A2', name: 'Grundstufe', description: 'Communiquez dans des situations quotidiennes' },
      { code: 'B1', name: 'Mittelstufe', description: 'Exprimez-vous sur des sujets familiers' },
      { code: 'B2', name: 'Fortgeschritten', description: 'Conversez avec aisance sur des sujets complexes' },
      { code: 'C1', name: 'Oberstufe', description: 'Maîtrisez la langue dans des contextes académiques et professionnels' },
    ],
    modules: [
      { title: 'Grundlagen', lessons: ['Alphabet & Aussprache', 'Basisgrammatik', 'Zahlen & Farben', 'Erste Konversation'] },
      { title: 'Alltag', lessons: ['Im Restaurant', 'Einkaufen', 'Bei der Arbeit', 'Freizeit'] },
      { title: 'Beruf', lessons: ['Geschäftskorrespondenz', 'Meetings', 'Telefonate', 'Präsentationen'] },
      { title: 'Kultur', lessons: ['Geschichte Deutschlands', 'Literatur', 'Musik & Kunst', 'Traditionen'] },
      { title: 'Prüfungsvorbereitung', lessons: ['Goethe-Zertifikat', 'TestDaF Strategien', 'Übungstests', 'Mündliche Prüfung'] },
    ],
    benefits: [
      'Études gratuites dans les universités allemandes',
      'Accès au marché de l\'emploi allemand',
      'Opportunités en Allemagne, Autriche, Suisse',
      'Certification Goethe-Institut reconnue',
      'Avantage compétitif en Europe',
    ],
    pricing: [
      { type: 'Présentiel', duration: '6 mois', price: '400 000 FCFA' },
      { type: 'En ligne', duration: '6 mois', price: '500 000 FCFA' },
      { type: 'Préparation examen', duration: 'Par mois', price: '50 000 FCFA' },
    ],
    faqs: [
      { question: 'L\'allemand est-il une langue difficile ?', answer: 'L\'allemand a une grammaire structurée mais logique. Avec notre méthode pédagogique, les progrès sont rapides et constants.' },
      { question: 'Quel niveau pour étudier en Allemagne ?', answer: 'La plupart des universités allemandes demandent un niveau B2 ou C1 (TestDaF ou DSH) pour les programmes en allemand.' },
      { question: 'Y a-t-il des bourses pour étudier en Allemagne ?', answer: 'Oui, des organismes comme le DAAD offrent de nombreuses bourses. Nous vous accompagnons dans vos démarches.' },
      { question: 'Les études en Allemagne sont-elles vraiment gratuites ?', answer: 'Oui, les frais de scolarité sont nuls ou très faibles dans les universités publiques allemandes. Seuls les frais de vie sont à prévoir.' },
    ],
    instructor: { name: 'Herr Thomas Weber', title: 'Formateur d\'Allemand Certifié Goethe', bio: 'Natif allemand, certifié par le Goethe-Institut avec 10 ans d\'expérience dans l\'enseignement de l\'allemand en Afrique.' },
  },
  chinois: {
    name: 'Chinois Mandarin',
    flag: '🇨🇳',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
    shortDescription: 'Découvrez le mandarin et ouvrez-vous aux marchés asiatiques',
    fullDescription: 'Le chinois mandarin est parlé par plus de 1,4 milliard de personnes et est la langue des affaires en Asie. Apprenez à communiquer avec la deuxième économie mondiale et découvrez une culture millénaire fascinante à travers notre programme spécialement conçu pour les francophones.',
    certification: 'HSK (Hanyu Shuiping Kaoshi)',
    duration: '6 mois',
    hoursPerWeek: '20-25h',
    students: 280,
    levels: [
      { code: 'HSK1', name: 'Niveau 1', description: 'Maîtrisez 150 mots et les bases de la communication' },
      { code: 'HSK2', name: 'Niveau 2', description: 'Étendez votre vocabulaire à 300 mots' },
      { code: 'HSK3', name: 'Niveau 3', description: 'Communiquez dans des situations quotidiennes (600 mots)' },
      { code: 'HSK4', name: 'Niveau 4', description: 'Discutez de sujets variés (1200 mots)' },
      { code: 'HSK5', name: 'Niveau 5', description: 'Lisez la presse et regardez des films chinois (2500 mots)' },
    ],
    modules: [
      { title: '汉语入门 (Introduction)', lessons: ['Pinyin & Tons', 'Caractères de base', 'Chiffres', 'Salutations'] },
      { title: '日常会话 (Vie quotidienne)', lessons: ['Au restaurant', 'Shopping', 'Transport', 'Météo'] },
      { title: '商务汉语 (Business)', lessons: ['Emails professionnels', 'Négociations', 'Présentations', 'Networking'] },
      { title: '中国文化 (Culture)', lessons: ['Histoire de Chine', 'Fêtes traditionnelles', 'Calligraphie', 'Art & Musique'] },
      { title: 'HSK 考试准备 (Préparation HSK)', lessons: ['Grammaire HSK', 'Vocabulaire ciblé', 'Compréhension orale', 'Écriture'] },
    ],
    benefits: [
      'Accès au marché chinois en pleine expansion',
      'Opportunités commerciales avec la Chine',
      'Bourses d\'études en Chine',
      'Certification HSK reconnue internationalement',
      'Découverte d\'une culture millénaire',
    ],
    pricing: [
      { type: 'Présentiel', duration: '6 mois', price: '400 000 FCFA' },
      { type: 'En ligne', duration: '6 mois', price: '500 000 FCFA' },
      { type: 'Préparation examen', duration: 'Par mois', price: '50 000 FCFA' },
    ],
    faqs: [
      { question: 'Faut-il apprendre les caractères chinois ?', answer: 'Oui, mais progressivement. Au niveau HSK1, vous apprendrez environ 150 caractères. Notre méthode rend cet apprentissage ludique et mémorable.' },
      { question: 'Les tons sont-ils vraiment importants ?', answer: 'Absolument ! Le mandarin a 4 tons qui changent le sens des mots. Nous accordons une attention particulière à la prononciation dès le début.' },
      { question: 'Puis-je étudier en Chine avec le HSK ?', answer: 'Oui, le HSK4 est généralement requis pour les programmes en licence et le HSK5 pour les masters. Des bourses sont disponibles.' },
      { question: 'Combien de temps pour atteindre HSK3 ?', answer: 'Avec une formation intensive de 6 mois et une pratique régulière, vous pouvez atteindre le niveau HSK3.' },
    ],
    instructor: { name: 'Mme. Li Wei (李薇)', title: 'Formatrice de Mandarin Certifiée', bio: 'Native de Pékin, certifiée IPA. 8 ans d\'expérience dans l\'enseignement du mandarin aux apprenants africains.' },
  },
  italien: {
    name: 'Italien',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
    shortDescription: 'Parlez italien et découvrez la richesse de la culture italienne',
    fullDescription: 'L\'italien est la langue de l\'art, de la mode, de la gastronomie et du design. Notre programme vous permet de maîtriser cette langue mélodieuse tout en découvrant une culture riche et passionnante. Idéal pour les études, le travail ou simplement pour le plaisir.',
    certification: 'CILS / CELI / PLIDA',
    duration: '6 mois',
    hoursPerWeek: '20-25h',
    students: 180,
    levels: [
      { code: 'A1', name: 'Principiante', description: 'Apprenez les bases : salutations, présentations' },
      { code: 'A2', name: 'Elementare', description: 'Communiquez dans des situations simples' },
      { code: 'B1', name: 'Intermedio', description: 'Exprimez-vous sur des sujets quotidiens' },
      { code: 'B2', name: 'Intermedio superiore', description: 'Conversez avec aisance' },
      { code: 'C1', name: 'Avanzato', description: 'Maîtrisez l\'italien dans des contextes professionnels' },
    ],
    modules: [
      { title: 'Fondamenti', lessons: ['Alfabeto & Pronuncia', 'Grammatica base', 'Numeri & Colori', 'Presentazioni'] },
      { title: 'Vita Quotidiana', lessons: ['Al ristorante', 'Shopping', 'In viaggio', 'Tempo libero'] },
      { title: 'Italiano Professionale', lessons: ['Email formali', 'Riunioni', 'Telefonate', 'Presentazioni'] },
      { title: 'Cultura Italiana', lessons: ['Storia & Arte', 'Cinema italiano', 'Musica', 'Gastronomia'] },
      { title: 'Preparazione Esami', lessons: ['Tecniche CILS', 'Esercizi CELI', 'Simulazioni orali', 'Produzione scritta'] },
    ],
    benefits: [
      'Études dans les universités italiennes',
      'Opportunités dans la mode et le design',
      'Appréciation de l\'art et de la culture italienne',
      'Certification CILS reconnue',
      'Facilité d\'apprentissage pour les francophones',
    ],
    pricing: [
      { type: 'Présentiel', duration: '6 mois', price: '400 000 FCFA' },
      { type: 'En ligne', duration: '6 mois', price: '500 000 FCFA' },
      { type: 'Préparation examen', duration: 'Par mois', price: '50 000 FCFA' },
    ],
    faqs: [
      { question: 'L\'italien est-il facile pour un francophone ?', answer: 'Oui ! L\'italien et le français partagent de nombreuses similitudes (vocabulaire, grammaire, prononciation). Les francophones progressent généralement très vite.' },
      { question: 'Quel niveau pour étudier en Italie ?', answer: 'Un niveau B2 (CILS B2) est généralement requis pour les universités italiennes, sauf pour les programmes en anglais.' },
      { question: 'Y a-t-il des bourses pour l\'Italie ?', answer: 'Oui, le gouvernement italien offre des bourses aux étudiants internationaux. Nous pouvons vous guider dans vos démarches.' },
      { question: 'Puis-je commencer sans aucune base ?', answer: 'Absolument ! Nos cours débutants sont conçus pour les personnes n\'ayant aucune connaissance préalable de l\'italien.' },
    ],
    instructor: { name: 'Prof. Marco Rossi', title: 'Formateur d\'Italien Certifié', bio: 'Natif italien de Rome, certifié DITALS II. 9 ans d\'expérience dans l\'enseignement de l\'italien langue étrangère.' },
  },
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState('apercu');
  
  const course = courseId ? coursesData[courseId] : null;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['apercu', 'details', 'formateur', 'faq'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-custom text-center">
            <h1 className="section-title">Cours non trouvé</h1>
            <p className="text-muted-foreground mb-8">Le cours que vous recherchez n'existe pas.</p>
            <Link to="/cours">
              <Button className="btn-primary">Retour aux cours</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12 lg:py-16">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    Cours de Langues
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium">
                    {course.certification}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{course.flag}</span>
                  <span className="text-sm text-primary-foreground/80">Formateur : REAXACADEMY</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                  Cours de {course.name}
                </h1>
                
                <p className="text-lg text-primary-foreground/90 mb-6">
                  {course.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    <span>{course.hoursPerWeek}/semaine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span>{course.levels.length} niveaux</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span>{course.students} Étudiants</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={`Cours de ${course.name}`}
                  className="rounded-xl shadow-xl w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Navigation */}
        <nav className="sticky top-20 z-40 bg-background border-b border-border shadow-sm">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto">
              {[
                { id: 'apercu', label: 'Aperçu' },
                { id: 'details', label: 'Détails' },
                { id: 'formateur', label: 'Formateur' },
                { id: 'faq', label: 'FAQ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - 70% */}
            <div className="lg:col-span-2 space-y-12">
              {/* Aperçu Section */}
              <section id="apercu">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Cours de {course.name} à REAXACADEMY
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {course.fullDescription}
                </p>
                
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  Pourquoi apprendre le {course.name.toLowerCase()} ?
                </h3>
                <ul className="space-y-3 mb-8">
                  {course.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  Niveaux disponibles
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.levels.map((level) => (
                    <div key={level.code} className="card-reax p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                          {level.code}
                        </span>
                        <span className="font-medium text-foreground">{level.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Details Section */}
              <section id="details">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Programme détaillé
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {course.modules.map((module, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`module-${index}`}
                      className="card-reax px-4 border-none"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </span>
                          <span className="font-medium text-foreground text-left">{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <ul className="ml-12 space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center gap-2 text-muted-foreground">
                              <Play className="w-3 h-3 text-accent" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Formateur Section */}
              <section id="formateur">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Votre Formateur
                </h2>
                <div className="card-reax p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                        {course.instructor.name}
                      </h3>
                      <p className="text-accent font-medium mb-3">{course.instructor.title}</p>
                      <p className="text-muted-foreground">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Questions Fréquentes
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {course.faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="card-reax px-4 border-none"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 text-left">
                        <span className="font-medium text-foreground">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            {/* Right Column - Sidebar (30%) */}
            <div className="lg:col-span-1">
              <div className="sticky top-36 space-y-6">
                {/* Pricing Card */}
                <div className="card-reax p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Tarifs
                  </h3>
                  <div className="space-y-3 mb-6">
                    {course.pricing.map((price, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{price.type}</p>
                          <p className="text-sm text-muted-foreground">{price.duration}</p>
                        </div>
                        <span className="font-bold text-primary">{price.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-accent/10 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-accent mb-2">🎁 Kit OFFERT inclus :</p>
                    <p className="text-sm text-muted-foreground">2 livres + 1 dictionnaire + 2 cahiers + 1 polo REAXACADEMY</p>
                  </div>
                  
                  <Link to="/inscription">
                    <Button className="btn-primary w-full text-base py-6">
                      S'inscrire maintenant
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Frais d'inscription : <strong>10 000 FCFA</strong>
                  </p>
                </div>

                {/* Reviews Card */}
                <div className="card-reax p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Avis des étudiants
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">4.9/5</span>
                    <span className="text-muted-foreground">({course.students} avis)</span>
                  </div>
                  <div className="relative">
                    <span className="text-6xl text-muted/30 absolute -top-2 -left-2">"</span>
                    <p className="text-muted-foreground italic pl-6">
                      Excellente formation ! Les cours sont bien structurés et les formateurs sont très compétents.
                    </p>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="card-reax p-6 bg-primary text-primary-foreground">
                  <h3 className="font-heading font-semibold text-lg mb-4">
                    Besoin d'informations ?
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Nos conseillers sont disponibles pour répondre à vos questions.
                  </p>
                  <a 
                    href="https://wa.me/696823691" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    Contacter sur WhatsApp
                  </a>
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

