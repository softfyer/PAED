import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileUser, 
  Heart, 
  Settings,
  BookOpen
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Início', href: '/' },
  { icon: FileUser, label: 'Meus Materiais', href: '/my-materials' },
  { icon: Heart, label: 'Favoritos', href: '/favorites' },
];

export const SideMenu = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-stone-100 h-[calc(100vh-64px)] sticky top-16 hidden md:flex flex-col p-4">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-stone-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-stone-50">
        <div className="px-4 py-4 bg-stone-50 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">Dica do Dia</span>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            Materiais com alto contraste ajudam alunos com baixa visão e TDAH a manter o foco.
          </p>
        </div>
      </div>
    </aside>
  );
};
