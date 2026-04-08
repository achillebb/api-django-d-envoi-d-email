// src/components/GoogleTranslate.jsx
import { useEffect } from 'react';
import './GoogleTranslate.css'; // Pour le style (optionnel)

const GoogleTranslate = () => {
  useEffect(() => {
    // Fonction d'initialisation qui sera appelée par le script Google
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr', // Langue par défaut de ton site
          includedLanguages: 'fr,en,es,de,ar,zh-CN', // Langues disponibles
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // Évite l'affichage automatique
        },
        'google_translate_element' // ID de l'élément conteneur
      );
    };

    // Charger le script Google Translate
    const addScript = () => {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    addScript();

    // Nettoyage : supprimer le script et la fonction globale
    return () => {
      const scripts = document.querySelectorAll(
        'script[src*="translate.google.com"]'
      );
      scripts.forEach((script) => script.remove());
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;