import { useEffect, useRef, useState } from 'react';

const partners = [
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { name: 'Cisco', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
  { name: 'CompTIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/CompTIA_logo.svg' },
  { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg' },
];

export default function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-16 border-y border-border">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
            Nos Partenaires & Certifications
          </h2>
          <p className="text-muted-foreground">
            Des certifications reconnues mondialement
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-12 overflow-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate partners for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <a
                key={`${partner.name}-${index}`}
                href="#"
                className="flex-shrink-0 h-16 px-8 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
