
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GooglePlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GooglePlayModal: React.FC<GooglePlayModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [prefix, setPrefix] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Log modal interaction to Clarity
  React.useEffect(() => {
    if (isOpen && window.clarity) {
      window.clarity("event", "android_signup_modal_opened");
    }
  }, [isOpen]);
  
  const handleInputChange = (type: string, value: string) => {
    // Log input interaction to Clarity
    if (window.clarity) {
      window.clarity("event", "modal_input_interaction", {
        inputType: type
      });
    }
    
    if (type === 'prefix') {
      setPrefix(value);
    } else if (type === 'phone') {
      // Only allow digits and limit to 7 characters
      const digitsOnly = value.replace(/\D/g, '');
      setPhone(digitsOnly.slice(0, 7));
    } else if (type === 'email') {
      setEmail(value);
    } else if (type === 'contactMethod') {
      setContactMethod(value as 'phone' | 'email');
    }
  };
  
  const validateInputs = (): boolean => {
    if (contactMethod === 'phone') {
      if (!prefix) {
        toast({
          title: "Error",
          description: "Please select a phone prefix",
          variant: "destructive"
        });
        return false;
      }
      
      if (phone.length !== 7) {
        toast({
          title: "Error",
          description: "Phone number must be 7 digits",
          variant: "destructive"
        });
        return false;
      }
    } else { // email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async () => {
    if (!validateInputs()) return;
    
    // Log submission attempt to Clarity
    if (window.clarity) {
      window.clarity("event", "android_signup_submitted", {
        contactMethod
      });
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call - in a real app, you would send data to your endpoint
      // const response = await fetch('https://script.google.com/macros/save_fisherman_data_to_excel', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     contactMethod,
      //     email: contactMethod === 'email' ? email : '',
      //     phone: contactMethod === 'phone' ? `${prefix}${phone}` : '',
      //     timestamp: new Date().toISOString()
      //   })
      // });
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: "Success!",
        description: t('modal.success'),
      });
      
      // Close modal
      onClose();
      
      // Clear form
      setPrefix('');
      setPhone('');
      setEmail('');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {t('modal.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('modal.subtitle')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 py-4">
          {/* Contact Method Toggle */}
          <div className="flex space-x-4 justify-center mb-2">
            <Button
              variant={contactMethod === 'phone' ? 'default' : 'outline'}
              onClick={() => handleInputChange('contactMethod', 'phone')}
              className="w-1/2"
            >
              {t('modal.phone')}
            </Button>
            <Button
              variant={contactMethod === 'email' ? 'default' : 'outline'}
              onClick={() => handleInputChange('contactMethod', 'email')}
              className="w-1/2"
            >
              {t('modal.email')}
            </Button>
          </div>
          
          {contactMethod === 'phone' ? (
            <div className="space-y-2">
              <Label htmlFor="phone">{t('modal.phone')}</Label>
              <div className="flex space-x-2">
                <div className="w-1/3">
                  <Select value={prefix} onValueChange={(value) => handleInputChange('prefix', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('modal.prefix')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="050">050</SelectItem>
                      <SelectItem value="051">051</SelectItem>
                      <SelectItem value="052">052</SelectItem>
                      <SelectItem value="053">053</SelectItem>
                      <SelectItem value="054">054</SelectItem>
                      <SelectItem value="055">055</SelectItem>
                      <SelectItem value="058">058</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-2/3">
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="1234567"
                    maxLength={7}
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="email">{t('modal.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="user@example.com"
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-fisherman-blue hover:bg-fisherman-darkBlue w-full"
          >
            {isSubmitting ? 'Submitting...' : t('modal.submit')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
