'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '../components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  onSuccess: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = 'login',
  onSuccess,
}: AuthModalProps) {
  const [currentTab, setCurrentTab] = useState<'login' | 'register'>(defaultTab);

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  const handleSwitchToLogin = () => setCurrentTab('login');
  const handleSwitchToRegister = () => setCurrentTab('register');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="sm:max-w-md p-0 bg-white border-none shadow-xl rounded-2xl">
        {currentTab === 'login' ? (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
