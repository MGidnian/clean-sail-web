
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trash2, ShieldAlert, Bell, RefreshCw } from 'lucide-react';

// Define feature data structure
interface Feature {
  id: number;
  icon: React.ElementType;
  color: string;
  key: string;
}

export const Features = () => {
  const { t } = useLanguage();
  
  // Feature data with updated ordering
  const features: Feature[] = [
    {
      id: 2,
      icon: ShieldAlert,
      color: 'bg-green-100 text-green-600',
      key: 'feature2'
    },
    {
      id: 3,
      icon: Bell,
      color: 'bg-purple-100 text-purple-600',
      key: 'feature3'
    },
    {
      id: 1,
      icon: Trash2,
      color: 'bg-blue-100 text-blue-600',
      key: 'feature1'
    },
    {
      id: 4,
      icon: RefreshCw,
      color: 'bg-orange-100 text-orange-600',
      key: 'feature4'
    }
  ];

  // Log feature card hover to Clarity
  const handleFeatureHover = (featureId: number) => {
    if (window.clarity) {
      window.clarity("event", "feature_hover", {
        featureId: featureId
      });
    }
  };

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          {t('features.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(feature => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={feature.id}
                className="feature-card bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md"
                onMouseEnter={() => handleFeatureHover(feature.id)}
              >
                <div className="flex items-start">
                  <div className={`rounded-full p-3 mr-6 ${feature.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      {t(`${feature.key}.title`)}
                    </h3>
                    <p className="text-gray-600">
                      {t(`${feature.key}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
