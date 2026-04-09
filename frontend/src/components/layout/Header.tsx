import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import logoReaxAcademy from '../../assets/logo.png';

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/a-propos' },
  { name: 'Formations professionnelles', path: '/formations' },
  { name: 'Cours de langues', path: '/cours' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Contacts', path: '/contacts' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GESTION CORRECTE DU SCROLL - Sans bloquer définitivement
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (isMobileMenuOpen) {
      // Sauvegarde la position de scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restaure le scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = originalStyle;
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = originalStyle;
    };
  }, [isMobileMenuOpen]);

  // Ferme le menu quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Ferme le menu avec la touche Echap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const getLinkClasses = (isActive: boolean) => {
    const baseClasses = "px-3 py-2 text-sm xl:text-base font-medium no-underline transition-all duration-300 whitespace-nowrap";
    
    if (isActive) {
      return `${baseClasses} text-boss-green font-bold`;
    }
    
    return `${baseClasses} text-black dark:text-black hover:text-boss-green`;
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-xl dark:bg-white/95'
            : 'bg-transparent'}
        `}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logoReaxAcademy}
                alt="REAX Academy"
                className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
            
            {/* Navigation Desktop */}
            <nav className="hidden lg:flex flex-1 items-center justify-center mx-4">
              <div className="flex items-center gap-1 xl:gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <div key={item.path} className="relative group">
                      <Link to={item.path} className={getLinkClasses(isActive)}>
                        {item.name}
                      </Link>
                      <span
                        className={`
                          absolute left-1/2 -bottom-1 h-[2px] w-4/5 rounded-full -translate-x-1/2
                          transition-transform duration-300
                          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                        `}
                        style={{ backgroundColor: '#01CC00' }}
                      />
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Bouton Desktop */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <Link to="/inscription" className="no-underline">
                <Button 
                  className="px-5 py-2.5 xl:px-6 xl:py-3 font-bold shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  style={{ backgroundColor: '#01CC00', color: '#0000AA', borderRadius: '8px' }}
                >
                  S'inscrire maintenant
                </Button>
              </Link>
            </div>

            {/* Bouton Menu Mobile */}
            <div className="flex lg:hidden items-center gap-3 ml-auto">
              <button
                className="p-2 rounded-xl hover:bg-boss-green/20 transition-colors text-black dark:text-black z-50 relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MENU MOBILE - VERSION CORRIGÉE */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed inset-0 z-40"
          style={{
            position: 'fixed',
            top: 0,
    left: 0,
    right: 0,
    bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={(e) => {
            // Ferme si on clique sur l'overlay (pas sur le contenu)
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          {/* Contenu du menu */}
          <div
            className="absolute right-0 h-full w-full max-w-md shadow-2xl overflow-y-auto"
            style={{
              backgroundColor: '#FFFFFF',
              borderLeft: '2px solid #01CC00',
              top: 0,
              bottom: 0,
            }}
          >
            <nav className="px-5 py-8 pb-32 space-y-2">
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
                        : 'text-black hover:text-boss-green hover:bg-boss-green/5'
                      }
                    `}
                  >
                    <span>{item.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-boss-green" />}
                  </Link>
                );
              })}

              <div className="pt-6 mt-4 border-t border-gray-200">
                <Link
                  to="/inscription"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="no-underline block"
                >
                  <Button 
                    className="w-full py-5 font-bold text-lg transition-all duration-300 hover:scale-[1.02]"
                    style={{ backgroundColor: '#01CC00', color: '#0000AA', borderRadius: '12px' }}
                  >
                    S'inscrire maintenant
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}