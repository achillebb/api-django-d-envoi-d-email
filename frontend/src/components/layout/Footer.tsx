// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  LucideIcon
} from "lucide-react";

import logoReaxAcademy from "@/assets/logo-reaxacademy.png";
//import FooterTranslate from "./FooterTranslate";

interface FooterLink {
  name: string;
  path: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  brandColor: string;
}

interface ContactInfo {
  icon: LucideIcon;
  content: string | JSX.Element;
}

const footerLinks = {
  formations: [
    { name: "Secrétariat Bureautique", path: "/formations" },
    { name: "Comptabilité", path: "/formations" },
    { name: "Marketing Digital", path: "/formations" },
    { name: "Graphisme", path: "/formations" },
    { name: "Développement Web", path: "/formations" }
  ],
  langues: [
    { name: "Anglais", path: "/cours" },
    { name: "Français", path: "/cours" },
    { name: "Allemand", path: "/cours" },
    { name: "Chinois", path: "/cours" },
    { name: "Italien", path: "/cours" }
  ],
  ressources: [
    { name: "Blog", path: "/blog" },
    { name: "Certifications", path: "/certifications" },
    { name: "À propos", path: "/a-propos" },
    { name: "FAQ", path: "/contacts" }
  ]
};

const socialLinks: SocialLink[] = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61568792376102",
    label: "Facebook",
    brandColor: "#1877F2",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    brandColor: "#E4405F",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
    brandColor: "#0A66C2",
  },
  {
    icon: Twitter,
    href: "#",
    label: "Twitter",
    brandColor: "#1DA1F2",
  },
  {
    icon: Youtube,
    href: "#",
    label: "YouTube",
    brandColor: "#FF0000",
  }
];

const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    content: (
      <>
        Yaoundé, Carrefour de l’Amitié
        <br />
        Yaoundé, Awae Escalier
      </>
    )
  },
  {
    icon: Phone,
    content: "+237 678 279 957"
  },
  {
    icon: Mail,
    content: "contact@reaxacademy.com"
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* BRAND SECTION */}
          <div className="lg:col-span-2">
            <img
              src={logoReaxAcademy}
              alt="REAX Academy"
              className="h-14 w-auto object-contain brightness-0 invert mb-6"
            />
            <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
              Centre de formation professionnelle et linguistique agréé MINEFOP.
              Nous formons les leaders de demain avec des certifications reconnues
              internationalement.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{ 
                      backgroundColor: social.brandColor,
                      color: 'white'
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* FORMATIONS */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Formations</h4>
            <ul className="space-y-3">
              {footerLinks.formations.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LANGUES */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Cours de Langues</h4>
            <ul className="space-y-3">
              {footerLinks.langues.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT & TRADUCTION */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4 text-sm">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 text-accent mt-0.5" />
                    <span className="text-primary-foreground/70">{item.content}</span>
                  </li>
                );
              })}
            </ul>

            {/* WIDGET GOOGLE TRANSLATE */}
            <div className="mt-6 pt-4 border-t border-primary-foreground/10">
              <h5 className="font-heading font-medium text-base mb-3 text-accent">
                Traduire le site
              </h5>
          
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} REAXACADEMY. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link to="/confidentialite" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Confidentialité
              </Link>
              <Link to="/conditions" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}