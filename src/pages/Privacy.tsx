
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { t, isRtl } = useLanguage();
  
  return (
    <div className="container mx-auto py-16 px-4 md:px-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Fisherman ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and while using our app.
            This Privacy Policy explains our data practices regarding Personal Information we collect from you in connection with your use of the Fisherman app and website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
          <p>
            <strong>2.1 Information You Provide to Us</strong><br />
            When you register for or use our Service, we may collect the following categories of information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact Information: Email address, phone number (only when you subscribe to our waitlist)</li>
            <li>User Feedback: Information you provide when reporting spam messages</li>
          </ul>
          
          <p>
            <strong>2.2 Information We Collect Automatically</strong><br />
            When you use our Service, we may automatically collect certain information about your device and usage:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Device Information: Device type, operating system version</li>
            <li>Usage Data: How you interact with our app, features used, actions taken</li>
            <li>Performance Data: App crashes, diagnostics information</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our Service</li>
            <li>To improve our spam and phishing detection algorithms</li>
            <li>To respond to your requests or inquiries</li>
            <li>To send you technical notices and updates</li>
            <li>To monitor usage patterns and analyze trends</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Storage and Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the data we collect and process.
            Message filtering is performed locally on your device. We do not have access to the content of your messages.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Right to access personal information we hold about you</li>
            <li>Right to request correction of your personal information</li>
            <li>Right to request deletion of your personal information</li>
            <li>Right to data portability</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:<br />
            Email: privacy@fisherman.app
          </p>
        </div>
      </div>
    </div>
  );
};

const Privacy = () => {
  return (
    <LanguageProvider>
      <Layout>
        <PrivacyPolicy />
      </Layout>
    </LanguageProvider>
  );
};

export default Privacy;
