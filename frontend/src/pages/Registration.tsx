import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { Calendar, CreditCard, Clock, CheckCircle, Send, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Importer la configuration API
import { apiEndpoints, defaultHeaders, errorMessages, API_TIMEOUT, checkApiConfig } from '@/config';

// ===== LISTES AVEC SLUGS =====
const formations = [
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'comptabilite', label: 'Comptabilité' },
  { value: 'dev-web', label: 'Développement Web' },
  { value: 'dev-mobile', label: 'Développement Mobile' },
  { value: 'secretaire-bureautique', label: 'Secrétariat Bureautique' },
  { value: 'secretaire-comptable', label: 'Secrétariat Comptable' },
  { value: 'compta-gestion', label: 'Comptabilité et Gestion' },
  { value: 'montage-audio-visuel', label: 'Montage Audio Visuel' },
  { value: 'graphisme', label: 'Graphisme de Production' },
  { value: 'maintenance-info', label: 'Maintenance Informatique' },
];

const langues = [
  { value: 'francais', label: 'Français' },
  { value: 'anglais', label: 'Anglais' },
  { value: 'chinois', label: 'Chinois' },
  { value: 'italien', label: 'Italien' },
];

const modalites = [
  { value: 'presentiel', label: 'Présentiel' },
  { value: 'en-ligne', label: 'En ligne' },
  { value: 'hybride', label: 'Hybride' },
];

const niveaux = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function Registration() {
  const { toast } = useToast();
  const [formType, setFormType] = useState<'formation' | 'langue'>('formation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  
  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    modalite: '',
    formation: '',
    langue: '',
    niveau: ''
  });

  // État pour les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Vérifier la config au chargement
  useEffect(() => {
    checkApiConfig();
  }, []);

  // Réinitialiser les champs quand on change de type de formulaire
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      formation: '',
      langue: '',
      niveau: ''
    }));
    const newErrors = { ...errors };
    delete newErrors.formation;
    delete newErrors.langue;
    delete newErrors.niveau;
    setErrors(newErrors);
  }, [formType]);

  // Gérer les changements dans les champs input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Gérer les changements dans les selects
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Fonction pour obtenir le libellé à partir de la valeur
  const getLabelFromValue = (value: string, list: any[]) => {
    const item = list.find(item => item.value === value);
    return item ? item.label : value;
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';
    if (!formData.modalite) newErrors.modalite = 'La modalité est requise';
    
    if (formType === 'formation' && !formData.formation) {
      newErrors.formation = 'Veuillez sélectionner une formation';
    }
    
    if (formType === 'langue' && !formData.langue) {
      newErrors.langue = 'Veuillez sélectionner une langue';
    }
    
    return newErrors;
  };

  // Fonction pour afficher un toast de succès personnalisé
  const showSuccessToast = () => {
    const formationLabel = formData.formation ? getLabelFromValue(formData.formation, formations) : '';
    const langueLabel = formData.langue ? getLabelFromValue(formData.langue, langues) : '';
    const modaliteLabel = getLabelFromValue(formData.modalite, modalites);
    
    const detail = formType === 'formation' ? formationLabel : langueLabel;
    
    toast({
      description: (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            <span className="font-semibold">Inscription envoyée avec succès !</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Merci <strong>{formData.prenom} {formData.nom}</strong> !</p>
            <p className="mt-1">Votre demande d'inscription pour <strong>{detail}</strong> en <strong>{modaliteLabel}</strong> a bien été reçue.</p>
            <p className="mt-2 text-xs">Un email de confirmation a été envoyé à <strong>{formData.email}</strong></p>
          </div>
        </div>
      ),
      duration: 6000,
    });
  };

  // Fonction pour afficher un toast d'erreur personnalisé
  const showErrorToast = (message: string) => {
    toast({
      variant: "destructive",
      description: (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">Erreur d'envoi</span>
          </div>
          <p className="text-sm">{message}</p>
        </div>
      ),
      duration: 5000,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showErrorToast('Veuillez remplir tous les champs obligatoires correctement.');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        modalite: formData.modalite,
        formation: formType === 'formation' ? formData.formation : null,
        langue: formType === 'langue' ? formData.langue : null,
      };

      console.log('📤 Envoi:', apiData);

      const response = await axios.post(apiEndpoints.inscription, apiData, {
        headers: defaultHeaders,
        timeout: API_TIMEOUT,
      });

      // Sauvegarder les données pour affichage
      setSubmittedData({
        ...formData,
        formationLabel: formData.formation ? getLabelFromValue(formData.formation, formations) : '',
        langueLabel: formData.langue ? getLabelFromValue(formData.langue, langues) : '',
        modaliteLabel: getLabelFromValue(formData.modalite, modalites)
      });
      
      // Afficher le toast de succès personnalisé
      showSuccessToast();
      
      // Optionnel : Afficher un message de succès dans le formulaire
      setShowSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        modalite: '',
        formation: '',
        langue: '',
        niveau: ''
      });
      setErrors({});
      
      // Cacher le message de succès après 5 secondes
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast('Les données envoyées ne sont pas valides. Vérifiez votre formulaire.');
      } else if (axios.isAxiosError(error) && !error.response) {
        showErrorToast(errorMessages.NETWORK_ERROR);
      } else {
        showErrorToast('Une erreur inattendue est survenue.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Inscription
              </span>
              <h1 className="section-title text-4xl md:text-5xl mb-6">
                Inscrivez-vous maintenant
              </h1>
              <p className="section-subtitle text-lg">
                Remplissez le formulaire ci-dessous pour démarrer votre parcours 
                de formation avec REAXACADEMY.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="card-reax p-8">
                  {/* Message de succès (optionnel en plus du toast) */}
                  {showSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                          <h3 className="font-semibold text-green-800">Inscription envoyée !</h3>
                          <p className="text-sm text-green-700">
                            Merci {submittedData?.prenom} {submittedData?.nom}. Votre demande a bien été reçue.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Type Toggle */}
                  <div className="flex gap-4 mb-8">
                    <button
                      type="button"
                      onClick={() => setFormType('formation')}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                        formType === 'formation'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                      }`}
                    >
                      Formation Professionnelle
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType('langue')}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                        formType === 'langue'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                      }`}
                    >
                      Cours de Langue
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nom" className={errors.nom ? 'text-destructive' : ''}>
                          Nom <span className="text-destructive">*</span>
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
                        <Label htmlFor="prenom" className={errors.prenom ? 'text-destructive' : ''}>
                          Prénom <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          placeholder="Votre prénom"
                          className={errors.prenom ? 'border-destructive' : ''}
                          required
                        />
                        {errors.prenom && (
                          <p className="text-sm text-destructive">{errors.prenom}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="telephone" className={errors.telephone ? 'text-destructive' : ''}>
                          Téléphone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="telephone"
                          name="telephone"
                          type="tel"
                          value={formData.telephone}
                          onChange={handleChange}
                          placeholder="+237 6XX XXX XXX"
                          className={errors.telephone ? 'border-destructive' : ''}
                          required
                        />
                        {errors.telephone && (
                          <p className="text-sm text-destructive">{errors.telephone}</p>
                        )}
                      </div>
                    </div>

                    {formType === 'formation' ? (
                      <div className="space-y-2">
                        <Label htmlFor="formation" className={errors.formation ? 'text-destructive' : ''}>
                          Formation souhaitée <span className="text-destructive">*</span>
                        </Label>
                        <Select 
                          name="formation" 
                          value={formData.formation}
                          onValueChange={(value) => handleSelectChange('formation', value)}
                        >
                          <SelectTrigger className={errors.formation ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Choisissez une formation" />
                          </SelectTrigger>
                          <SelectContent>
                            {formations.map((f) => (
                              <SelectItem key={f.value} value={f.value}>
                                {f.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.formation && (
                          <p className="text-sm text-destructive">{errors.formation}</p>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="langue" className={errors.langue ? 'text-destructive' : ''}>
                            Langue souhaitée <span className="text-destructive">*</span>
                          </Label>
                          <Select 
                            name="langue" 
                            value={formData.langue}
                            onValueChange={(value) => handleSelectChange('langue', value)}
                          >
                            <SelectTrigger className={errors.langue ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Choisissez une langue" />
                            </SelectTrigger>
                            <SelectContent>
                              {langues.map((l) => (
                                <SelectItem key={l.value} value={l.value}>
                                  {l.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.langue && (
                            <p className="text-sm text-destructive">{errors.langue}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="niveau">Niveau actuel</Label>
                          <Select 
                            name="niveau" 
                            value={formData.niveau}
                            onValueChange={(value) => handleSelectChange('niveau', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Votre niveau actuel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="debutant">Débutant complet</SelectItem>
                              {niveaux.map((n) => (
                                <SelectItem key={n} value={n}>
                                  {n}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="modalite" className={errors.modalite ? 'text-destructive' : ''}>
                        Modalité préférée <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        name="modalite" 
                        value={formData.modalite}
                        onValueChange={(value) => handleSelectChange('modalite', value)}
                      >
                        <SelectTrigger className={errors.modalite ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Choisissez une modalité" />
                        </SelectTrigger>
                        <SelectContent>
                          {modalites.map((m) => (
                            <SelectItem key={m.value} value={m.value}>
                              {m.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.modalite && (
                        <p className="text-sm text-destructive">{errors.modalite}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="btn-primary w-full text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer ma demande
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Info Sidebar */}
              <div className="space-y-6">
                <div className="card-reax p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Informations importantes
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Frais d'inscription</p>
                        <p className="text-sm text-muted-foreground">10 000 FCFA</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Prochaine rentrée</p>
                        <p className="text-sm text-muted-foreground">16 Février 2026</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Clôture des inscriptions</p>
                        <p className="text-sm text-muted-foreground">15 Février 2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-reax p-6 bg-accent/5 border-accent/20">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Ce qui est inclus
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Kit de formation OFFERT',
                      'Accès aux supports numériques',
                      'Suivi personnalisé',
                      'Préparation aux examens',
                      'Certificat de fin de formation',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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