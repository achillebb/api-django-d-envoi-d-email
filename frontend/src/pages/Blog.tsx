import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Comment choisir sa formation professionnelle en 2026 ?',
    excerpt: 'Guide complet pour sélectionner la formation qui correspond à vos objectifs de carrière et aux besoins du marché.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    category: 'Conseils Carrière',
    author: 'Marie Nguema',
    date: '28 Jan 2026',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Les certifications IT les plus demandées au Cameroun',
    excerpt: 'Découvrez les certifications qui font la différence sur le marché de l\'emploi camerounais.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    category: 'Formation IT',
    author: 'Jean Mbarga',
    date: '25 Jan 2026',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'Témoignage : De secrétaire à directrice administrative',
    excerpt: 'L\'histoire inspirante de Sylvie qui a transformé sa carrière grâce à la formation continue.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
    category: 'Success Story',
    author: 'Rédaction',
    date: '20 Jan 2026',
    readTime: '4 min',
  },
  {
    id: 4,
    title: 'L\'importance des langues dans le monde professionnel',
    excerpt: 'Pourquoi maîtriser plusieurs langues est devenu indispensable pour votre carrière.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
    category: 'Langues',
    author: 'Paul Essomba',
    date: '15 Jan 2026',
    readTime: '6 min',
  },
  {
    id: 5,
    title: 'Marketing Digital : Les tendances 2026',
    excerpt: 'Les stratégies et outils de marketing digital à maîtriser cette année.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'Marketing',
    author: 'Claire Fotso',
    date: '10 Jan 2026',
    readTime: '8 min',
  },
  {
    id: 6,
    title: 'Le marché de l\'emploi IT au Cameroun',
    excerpt: 'Analyse des opportunités et des compétences recherchées dans le secteur technologique.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    category: 'Marché Emploi',
    author: 'André Nkoulou',
    date: '5 Jan 2026',
    readTime: '6 min',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Blog
              </span>
              <h1 className="section-title text-4xl md:text-5xl mb-6">
                Actualités & Conseils
              </h1>
              <p className="section-subtitle text-lg">
                Restez informé sur la formation professionnelle, le marché de l'emploi 
                et les opportunités de carrière au Cameroun.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="card-reax overflow-hidden group"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading font-semibold text-xl text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Lire plus
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
