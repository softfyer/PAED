'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Material } from '@/lib/types';
import { INITIAL_MATERIALS } from '@/lib/data';

// --- Components ---
import { MainLayout } from '@/components/MainLayout';
import { MaterialCard } from '@/components/MaterialCard';

export default function FavoritesPage() {
  const router = useRouter();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [materials, setMaterials] = useState<Material[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('edu_materials');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('edu_materials', JSON.stringify(INITIAL_MATERIALS));
    }
    return INITIAL_MATERIALS;
  });
  const [searchTerm, setSearchTerm] = useState('');

  const currentUserId = 'user-1'; // Hardcoded for now

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('paed_auth');
      if (!isAuth) {
        router.push('/login');
      } else {
        const timer = setTimeout(() => setIsAuthReady(true), 0);
        return () => clearTimeout(timer);
      }
    }
  }, [router]);

  const handleToggleFavorite = (id: string) => {
    const updated = materials.map(m => 
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    );
    setMaterials(updated);
    localStorage.setItem('edu_materials', JSON.stringify(updated));
  };

  const handleTogglePublic = (id: string) => {
    const updated = materials.map(m => 
      m.id === id ? { ...m, isPublic: !m.isPublic } : m
    );
    setMaterials(updated);
    localStorage.setItem('edu_materials', JSON.stringify(updated));
  };

  const favoriteMaterials = materials.filter(m => {
    const isFavorite = m.isFavorite;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return isFavorite && matchesSearch;
  });

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-[#fdfcf9] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-stone-900">Materiais Favoritos</h1>
            </div>
            <p className="text-stone-500">Acesse rapidamente os materiais que você marcou como favoritos.</p>
          </motion.div>
        </header>

        {/* Search */}
        <div className="relative mb-12 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar em favoritos..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {favoriteMaterials.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
                onToggleFavorite={handleToggleFavorite}
                onTogglePublic={handleTogglePublic}
                isOwner={material.authorId === currentUserId}
              />
            ))}
          </AnimatePresence>
        </div>

        {favoriteMaterials.length === 0 && (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
            <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium">Você ainda não favoritou nenhum material.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
