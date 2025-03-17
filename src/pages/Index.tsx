
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Counter } from '@/components/Counter';
import { Brands } from '@/components/Brands';
import { MessageCarousel } from '@/components/MessageCarousel';
import { Features } from '@/components/Features';
import { Values } from '@/components/Values';
import { Reviews } from '@/components/Reviews';
import { CtaSection } from '@/components/CtaSection';
import { Faq } from '@/components/Faq';

const Index = () => {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Counter />
        <Brands />
        <MessageCarousel />
        <Features />
        <Values />
        <Reviews />
        <CtaSection />
        <Faq />
      </Layout>
    </LanguageProvider>
  );
};

export default Index;
