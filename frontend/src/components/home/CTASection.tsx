import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary-foreground rounded-full" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Inscriptions ouvertes jusqu'au 15 Février 2026
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
              Prêt à démarrer votre carrière professionnelle ?
            </h2>
            
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez REAXACADEMY et bénéficiez d'une formation de qualité, 
              reconnue par les entreprises du Cameroun et d'ailleurs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/inscription">
                <Button className="btn-accent text-lg px-8 py-6">
                  S'inscrire maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+237678279957">
                <Button variant="outline" className="text-lg px-8 py-6 border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                  <Phone className="w-5 h-5 mr-2" />
                  Nous appeler
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
