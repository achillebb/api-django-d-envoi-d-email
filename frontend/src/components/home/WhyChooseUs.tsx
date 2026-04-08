import { CreditCard, Gift, GraduationCap, MapPin } from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Frais d\'inscription',
    description: 'Seulement 10 000 FCFA pour démarrer votre formation professionnelle.',
    highlight: '10 000 FCFA',
  },
  {
    icon: Gift,
    title: 'Kits OFFERTS',
    description: 'Recevez gratuitement un kit complet par niveau de formation.',
    highlight: 'Gratuit',
  },
  {
    icon: GraduationCap,
    title: 'Examens Certifiants',
    description: 'Préparation complète aux examens de certifications internationales.',
    highlight: 'Certifications',
  },
  {
    icon: MapPin,
    title: '2 Centres à Yaoundé',
    description: 'Deux centres modernes et équipés pour votre apprentissage.',
    highlight: 'Yaoundé & Douala',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Pourquoi choisir REAXACADEMY ?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Des avantages concrets pour une formation de qualité accessible à tous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-3">
                {feature.highlight}
              </span>

              <h3 className="font-heading font-semibold text-xl mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
