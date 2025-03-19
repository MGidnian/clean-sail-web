
import { useState, useCallback } from 'react';

export const useGooglePlayModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  return {
    isOpen,
    openModal,
    closeModal
  };
};
