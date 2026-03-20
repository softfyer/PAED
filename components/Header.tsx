import React from 'react';
import Image from 'next/image';
import { FileText, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

export const Header = ({ onLogout }: HeaderProps) => {
  return (
    <nav className="bg-white border-b border-stone-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900">PAED</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-stone-800">Prof. Marcos Oliveira</span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">Pedagogo Especialista</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-stone-100 border-2 border-emerald-100 flex items-center justify-center overflow-hidden relative">
                <Image 
                  src="https://picsum.photos/seed/teacher/100/100" 
                  alt="Avatar" 
                  fill
                  sizes="40px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <button 
              onClick={onLogout}
              className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
