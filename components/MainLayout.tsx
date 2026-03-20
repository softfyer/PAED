'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { SideMenu } from './SideMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('paed_auth');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogout={handleLogout} />
      <div className="flex flex-1">
        <SideMenu />
        <main className="flex-1 bg-[#fdfcf9]">
          {children}
        </main>
      </div>
    </div>
  );
};
