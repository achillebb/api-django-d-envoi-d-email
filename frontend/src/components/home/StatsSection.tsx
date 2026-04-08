import { useEffect, useState, useRef } from 'react';
import { GraduationCap, Clock, Award, Building2 } from 'lucide-react';

const stats = [
  {
    icon: GraduationCap,
    value: 2500,
    suffix: '+',
    label: 'Étudiants formés',
  },
  {
    icon: Clock,
    value: 15000,
    suffix: '+',
    label: 'Heures de cours',
  },
  {
    icon: Award,
    value: 850,
    suffix: '+',
    label: 'Certifications obtenues',
  },
  {
    icon: Building2,
    value: 2,
    suffix: '',
    label: 'Centres actifs',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(stepValue * step), value);
      setCount(current);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl">
            REAXACADEMY en chiffres
          </h2>
          <p className="section-subtitle">
            Des résultats concrets qui témoignent de notre engagement envers l'excellence
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="card-reax p-6 md:p-8 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
