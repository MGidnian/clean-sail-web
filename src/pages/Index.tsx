
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Values } from '@/components/Values';
import { Reviews } from '@/components/Reviews';
import { Brands } from '@/components/Brands';
import { Features } from '@/components/Features';
import { CtaSection } from '@/components/CtaSection';
import { Faq } from '@/components/Faq';

const Index = () => {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Values />
        <Reviews />
        <Brands />
        <Features />
        <CtaSection />
        <Faq />
      </Layout>
    </LanguageProvider>
  );
};

export default Index;
