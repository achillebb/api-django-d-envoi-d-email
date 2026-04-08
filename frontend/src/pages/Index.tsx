import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ScrollToTop from '@/components/layout/ScrollToTop';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FormationsPreview from '@/components/home/FormationsPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';
import CTASection from '@/components/home/CTASection';
import Courslangue from '@/pages/Courslangue' 
//import Formations from '@/pages/Formations' ;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FormationsPreview />
        <WhyChooseUs />
        <TestimonialsSection />
      < Courslangue  />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;
