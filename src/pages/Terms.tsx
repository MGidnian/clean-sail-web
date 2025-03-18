
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsAndConditions = () => {
  const { t, isRtl } = useLanguage();
  
  return (
    <div className="container mx-auto py-16 px-4 md:px-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms and Conditions</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By downloading, installing, or using the Fisherman app, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms, you should not use the app.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
          <p>
            Fisherman is an application designed to filter and block spam and phishing messages on your mobile device. The app uses pattern recognition and user reports to identify potentially harmful or unwanted messages.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of the Service</h2>
          <p>
            <strong>3.1 Eligibility</strong><br />
            You must be at least 13 years old to use our Service. By using our Service, you represent and warrant that you meet this requirement.
          </p>
          <p>
            <strong>3.2 User Account</strong><br />
            You are responsible for maintaining the confidentiality of any login information associated with your use of the Service. You are responsible for all activities that occur under your account.
          </p>
          <p>
            <strong>3.3 Acceptable Use</strong><br />
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
            <li>Attempt to gain unauthorized access to the Service or its related systems or networks</li>
            <li>Use the Service in a manner that could disable, overburden, or impair the Service</li>
            <li>Use automated scripts to collect information from or interact with the Service</li>
            <li>Attempt to reverse-engineer the app</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property Rights</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Fisherman and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Fisherman.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Fisherman shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from the Service</li>
            <li>The content of messages that are incorrectly filtered or not filtered</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will notify you through the Service or by other means.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">7. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Israel, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:<br />
            Email: legal@fisherman.app
          </p>
        </div>
      </div>
    </div>
  );
};

const Terms = () => {
  return (
    <LanguageProvider>
      <Layout>
        <TermsAndConditions />
      </Layout>
    </LanguageProvider>
  );
};

export default Terms;
