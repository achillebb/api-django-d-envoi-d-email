import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { ArrowRight, Cloud, Shield, Database, Briefcase, FileSpreadsheet, Users, PenTool, Server, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import certification from '@/assets/certification.png';

const certificationDomains = [
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: 'Certifications AWS, Azure et Google Cloud pour la gestion des infrastructures cloud.',
    certifications: ['AWS Solutions Architect', 'Azure Administrator', 'Google Cloud Associate', 'AWS Developer'],
    color: 'bg-orange-500',
  },
  {
    id: 'cybersecurite',
    icon: Shield,
    title: 'Cybersécurité',
    description: 'Protégez les systèmes et données avec les certifications en sécurité informatique.',
    certifications: ['CompTIA Security+', 'CEH', 'CISSP', 'CompTIA CySA+'],
    color: 'bg-red-500',
  },
  {
    id: 'data-ia',
    icon: Database,
    title: 'Data & Intelligence Artificielle',
    description: 'Maîtrisez l\'analyse de données et l\'IA avec des certifications reconnues.',
    certifications: ['Google Data Analytics', 'IBM Data Science', 'Azure AI Engineer', 'TensorFlow Developer'],
    color: 'bg-purple-500',
  },
  {
    id: 'gestion-projets',
    icon: Briefcase,
    title: 'Gestion de Projets',
    description: 'Gérez des projets avec succès grâce aux méthodologies reconnues internationalement.',
    certifications: ['PMP', 'PRINCE2', 'Scrum Master', 'Agile Certified'],
    color: 'bg-blue-500',
  },
  {
    id: 'microsoft-office',
    icon: FileSpreadsheet,
    title: 'Microsoft Office',
    description: 'Devenez expert des outils Microsoft Office avec les certifications officielles.',
    certifications: ['MOS Excel Expert', 'MOS Word Expert', 'MOS PowerPoint', 'Microsoft 365'],
    color: 'bg-green-500',
  },
  {
    id: 'management-it',
    icon: Users,
    title: 'Management IT',
    description: 'Développez vos compétences en gestion des services et ressources IT.',
    certifications: ['ITIL 4 Foundation', 'COBIT', 'ISO 27001', 'IT Service Management'],
    color: 'bg-indigo-500',
  },
  {
    id: 'design-uiux',
    icon: PenTool,
    title: 'Design UI/UX',
    description: 'Créez des interfaces utilisateur exceptionnelles avec des certifications design.',
    certifications: ['Google UX Design', 'Adobe Certified', 'Figma Certification', 'Interaction Design'],
    color: 'bg-pink-500',
  },
  {
    id: 'reseaux',
    icon: Server,
    title: 'Administration Réseaux',
    description: 'Gérez et sécurisez les infrastructures réseaux avec des certifications Cisco et CompTIA.',
    certifications: ['CCNA', 'CCNP', 'CompTIA Network+', 'Juniper Networks'],
    color: 'bg-cyan-500',
  },
  {
    id: 'developpement',
    icon: Code,
    title: 'Développement Web & Mobile',
    description: 'Validez vos compétences en développement avec des certifications techniques.',
    certifications: ['Meta Front-End', 'AWS Developer', 'Oracle Java', 'Microsoft Certified Developer'],
    color: 'bg-emerald-500',
  },
];

export default function Certifications() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat min-h-[500px] flex items-center"
          style={{
            backgroundImage: `url(${certification})`,
          }}
        >
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                Certifications
              </span>

              <h1 className="text-4xl md:text-5xl mb-6 font-bold">
                Certifications Internationales
              </h1>

              <p className="text-lg text-white/90">
                Préparez-vous aux certifications les plus demandées sur le marché
                international avec nos programmes de préparation intensifs.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificationDomains.map((domain) => (
                <div
                  key={domain.id}
                  className="card-reax p-6 flex flex-col"
                >
                  <div className={`w-14 h-14 rounded-xl ${domain.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                    <domain.icon className={`w-7 h-7 ${domain.color.replace('bg-', 'text-')}`} />
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                    {domain.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 flex-grow">
                    {domain.description}
                  </p>

                  {/* Certifications List */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Certifications préparées</p>
                    <div className="flex flex-wrap gap-2">
                      {domain.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-foreground"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to="/inscription" className="mt-auto">
                    <Button className="btn-outline w-full">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Boostez votre carrière
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Les certifications internationales augmentent votre valeur sur le marché
              de l'emploi et ouvrent les portes de l'international.
            </p>
            <Link to="/inscription">
              <Button className="btn-accent text-lg px-8 py-6">
                Préparer ma certification
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}