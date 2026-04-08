import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import logoReaxAcademy from '../../assets/logo.png';
//import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/a-propos' },
  { name: 'Formations professionnelles', path: '/formations' },
  { name: 'Cours de langues', path: '/cours' },
  { name: 'Certifications', path: '/certifications' },
 // { name: 'Blog', path: '/blog' },
  { name: 'Contacts', path: '/contacts' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Empêcher le défilement quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Style pour les liens - toujours noirs, sauf pour l'état actif
  const getLinkClasses = (isActive: boolean) => {
    const baseClasses = "px-3 py-2 text-sm xl:text-base font-medium no-underline transition-all duration-300 whitespace-nowrap";
    
    if (isActive) {
      return `${baseClasses} text-boss-green font-bold`; // Lien actif en vert
    }
    
    // Liens inactifs - toujours noirs, même au scroll et en mode sombre
    return `${baseClasses} text-black dark:text-black hover:text-boss-green`;
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-xl dark:bg-white/95' // Fond blanc même en mode sombre
          : 'bg-transparent'}
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          
          {/* ================= LOGO (plus à gauche) ================= */}
          <img
            src={logoReaxAcademy}
            alt="REAX Academy"
            className="
              h-10
              sm:h-20
              md:h-15
              lg:h-24
              xl:h-30
              w-auto
              object-contain
              drop-shadow-lg
              transition-transform duration-300
              hover:scale-105
            "
          />
          
          {/* ================= NAVIGATION DESKTOP (centrée) ================= */}
          <nav className="hidden lg:flex flex-1 items-center justify-center mx-4">
            <div className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <div key={item.path} className="relative group">
                    <Link
                      to={item.path}
                      className={getLinkClasses(isActive)}
                    >
                      {item.name}
                    </Link>

                    {/* underline animé */}
                    <span
                      className={`
                        absolute left-1/2 -bottom-1 h-[2px] w-4/5
                        rounded-full -translate-x-1/2
                        transition-transform duration-300
                        ${isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                      style={{ backgroundColor: '#01CC00' }}
                    />
                  </div>
                );
              })}
            </div>
          </nav>

          {/* ================= ACTIONS DESKTOP (à droite) ================= */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            
            <Link to="/inscription" className="no-underline">
              <Button 
                className="px-5 py-2.5 xl:px-6 xl:py-3 font-bold shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{ 
                  backgroundColor: '#01CC00', 
                  color: '#0000AA',
                  borderRadius: '8px'
                }}
              >
                S'inscrire maintenant
              </Button>
            </Link>
          </div>

          {/* ================= MENU MOBILE BUTTON ================= */}
          <div className="flex lg:hidden items-center gap-3 ml-auto">
            
            <button
              className="p-2 rounded-xl hover:bg-boss-green/20 transition-colors text-black dark:text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MENU MOBILE ================= */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 top-20
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
          }
        `}
      >
        {/* Overlay avec flou */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Contenu du menu */}
        <div 
          className="absolute top-0 right-0 w-full max-w-md h-full overflow-y-auto shadow-2xl"
          style={{ 
            backgroundColor: '#FFFFFF',
            borderLeft: '2px solid #01CC00'
          }}
        >
          <nav className="px-5 py-8 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium no-underline
                    transition-all duration-300
                    ${isActive
                      ? 'text-boss-green font-bold border-2 border-boss-green bg-boss-green/5'
                      : 'text-black hover:text-boss-green hover:bg-boss-green/5'} /* Texte noir pour liens inactifs */
                  `}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-boss-green" />
                  )}
                </Link>
              );
            })}

            
              <div className="flex justify-center mb-6">
                
              <Link
                to="/inscription"
                onClick={() => setIsMobileMenuOpen(false)}
                className="no-underline"
              >
                <Button 
                  className="w-full py-5 font-bold text-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: '#01CC00', 
                    color: '#0000AA',
                    borderRadius: '12px'
                  }}
                >
                  S'inscrire maintenant
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}