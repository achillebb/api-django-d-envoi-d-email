import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WhatsAppButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  phoneNumber?: string;
  message?: string;
  showOnScroll?: boolean;
}

export default function WhatsAppButton({ 
  position = 'bottom-right',
  phoneNumber = '+237696823691',
  message = "Bonjour REAXACADEMY, je souhaite avoir plus d'informations sur vos formations.",
  showOnScroll = false
}: WhatsAppButtonProps) {
  
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const encodedMessage = encodeURIComponent(message);

  // Gérer l'affichage au scroll si showOnScroll est true
  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Afficher après 300px de scroll
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll]);

  // Définir les classes de position
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  };

  // Vérifier que le numéro de téléphone est valide
  const isValidPhone = phoneNumber.replace(/\D/g, '').length >= 8;

  if (!isValidPhone) {
    console.error('Numéro de téléphone WhatsApp invalide');
    return null;
  }

  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed ${positionClasses[position]} z-50
        w-14 h-14 sm:w-16 sm:h-16
        bg-[#25D366] hover:bg-[#20BD5A]
        rounded-full
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-110 hover:rotate-3
        animate-bounce-gentle
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
        focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2
      `}
      aria-label="Contacter sur WhatsApp"
      title="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      
      {/* Badge de notification (optionnel) */}
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
        1
      </span>
    </a>
  );
}

// Version simplifiée si vous n'avez pas besoin de toutes les options
export function WhatsAppButtonSimple() {
  const phoneNumber = '+237696823691';
  const message = encodeURIComponent(
    "Bonjour REAXACADEMY, je souhaite avoir plus d'informations sur vos formations."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-gentle group"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Tooltip au survol */}
      <span className="absolute right-16 bg-gray-800 text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        WhatsApp
      </span>
    </a>
  );
}