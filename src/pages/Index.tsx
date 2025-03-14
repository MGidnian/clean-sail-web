
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Values } from '@/components/Values';
import { Reviews } from '@/components/Reviews';
import { Brands } from '@/components/Brands';
import { CtaSection } from '@/components/CtaSection';
import { Faq } from '@/components/Faq';

const Index = () => {
  return (
    <LanguageProvider>
      <Layout>
        <Hero />
        <Features />
        <Values />
        <Reviews />
        <Brands />
        <CtaSection />
        <Faq />
      </Layout>
    </LanguageProvider>
  );
};

export default Index;
