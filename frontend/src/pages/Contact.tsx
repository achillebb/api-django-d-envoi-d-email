import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Inscription from '@/assets/ins.png';

// Importer la configuration API
import { apiEndpoints, defaultHeaders, errorMessages, API_TIMEOUT, checkApiConfig } from '@/config';

const locations = [
  {
    city: 'Yaoundé',
    address: "Carrefour De L'amitie",
    phone: '+237 678 279 957',
    hours: 'Lun - Ven: 8h00 - 17h00',
  },
  {
    city: 'Yaoundé',
    address: 'Awae escalier',
    phone: '+237 699 556 021',
    hours: 'Lun - Ven: 8h00 - 17h00',
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  // État pour les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Vérifier la config au chargement
  useEffect(() => {
    checkApiConfig();
  }, []);

  // Gérer les changements dans les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.sujet.trim()) {
      newErrors.sujet = 'Le sujet est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Erreur de validation",
        description: errorMessages.VALIDATION_ERROR,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoi des données à l'API Django
      const response = await axios.post(apiEndpoints.contact, formData, {
        headers: defaultHeaders,
        timeout: API_TIMEOUT,
      });

      // Succès
      toast({
        title: "✅ Message envoyé !",
        description: response.data.message || "Nous vous répondrons dans les plus brefs délais.",
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Erreur détaillée:', error);
      
      // Gestion des erreurs avec Axios
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          toast({
            title: "Timeout",
            description: errorMessages.TIMEOUT_ERROR,
            variant: "destructive",
          });
        } else if (!error.response) {
          toast({
            title: "Erreur réseau",
            description: errorMessages.NETWORK_ERROR,
            variant: "destructive",
          });
        } else if (error.response.status === 400) {
          // Erreur de validation du serveur
          const serverErrors = error.response.data;
          setErrors(serverErrors);
          toast({
            title: "Erreur de validation",
            description: errorMessages.VALIDATION_ERROR,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur serveur",
            description: errorMessages.SERVER_ERROR,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur inattendue est survenue.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section avec image de fond */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={Inscription} 
              alt="Fond contact" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                Contactez-nous
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Une question ? Besoin d'informations ? Notre équipe est à votre 
                disposition pour vous accompagner.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="card-reax p-8">
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">
                    Envoyez-nous un message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nom" className={errors.nom ? 'text-destructive' : ''}>
                          Nom complet <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          className={errors.nom ? 'border-destructive' : ''}
                          required
                        />
                        {errors.nom && (
                          <p className="text-sm text-destructive">{errors.nom}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className={errors.email ? 'text-destructive' : ''}>
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          className={errors.email ? 'border-destructive' : ''}
                          required
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input
                          id="telephone"
                          name="telephone"
                          type="tel"
                          value={formData.telephone}
                          onChange={handleChange}
                          placeholder="+237 6XX XXX XXX"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sujet" className={errors.sujet ? 'text-destructive' : ''}>
                          Sujet <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="sujet"
                          name="sujet"
                          value={formData.sujet}
                          onChange={handleChange}
                          placeholder="Sujet de votre message"
                          className={errors.sujet ? 'border-destructive' : ''}
                          required
                        />
                        {errors.sujet && (
                          <p className="text-sm text-destructive">{errors.sujet}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className={errors.message ? 'text-destructive' : ''}>
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Votre message..."
                        rows={6}
                        className={errors.message ? 'border-destructive' : ''}
                        required
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="btn-primary w-full md:w-auto text-lg py-6 px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info (inchangé) */}
              <div className="space-y-6">
                {locations.map((location) => (
                  <div key={location.city} className="card-reax p-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                      {location.city}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{location.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-accent shrink-0" />
                        <a href={`tel:${location.phone}`} className="text-foreground hover:text-primary transition-colors">
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-muted-foreground">{location.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="card-reax p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Email
                  </h3>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent shrink-0" />
                    <a href="mailto:contact@reaxacademy.com" className="text-foreground hover:text-primary transition-colors">
                      contact@reaxacademy.com
                    </a>
                  </div>
                </div>

                <div className="card-reax p-6 bg-primary/5 border-primary/20">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    Liaison Internationale
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Montréal / Ottawa - Canada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (inchangé) */}
        <section className="pb-16">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="card-reax overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127356.40974089485!2d11.435726799999999!3d3.848033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7a309a7977%3A0x7f54bad35e693c51!2sYaound%C3%A9%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="REAXACADEMY Location"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}