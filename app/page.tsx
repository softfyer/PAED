'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Material, MaterialType, TARGET_AUDIENCES, MATERIAL_TYPES } from '@/lib/types';
import { INITIAL_MATERIALS } from '@/lib/data';

// --- Components ---
import { MainLayout } from '@/components/MainLayout';
import { MaterialCard } from '@/components/MaterialCard';
import { CreateMaterialModal } from '@/components/CreateMaterialModal';

// --- Main Page ---

export default function RepositoryPage() {
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
  const [selectedType, setSelectedType] = useState<MaterialType | 'all'>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('paed_auth');
      if (!isAuth) {
        router.push('/login');
      } else {
        // Use a small delay to avoid synchronous state update in effect
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

  const handleUpload = (newMaterial: Partial<Material>) => {
    const material: Material = {
      id: Date.now().toString(),
      title: newMaterial.title || 'Sem título',
      description: newMaterial.description || '',
      type: newMaterial.type as MaterialType,
      tags: newMaterial.tags || [],
      targetAudience: newMaterial.targetAudience || [],
      author: newMaterial.author || 'Prof. Marcos Oliveira',
      authorId: 'user-1', // Current user ID
      createdAt: new Date().toISOString().split('T')[0],
      url: '#',
      fileSize: 'N/A',
      isPublic: true,
      isFavorite: false
    };

    const updated = [material, ...materials];
    setMaterials(updated);
    localStorage.setItem('edu_materials', JSON.stringify(updated));
    setIsUploadModalOpen(false);
  };

  const filteredMaterials = materials;

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
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-emerald-600 font-medium tracking-widest uppercase text-xs mb-4 block">Repositório Pedagógico</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-6">PAED</h1>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Plataforma de Apoio à Educação Diversificada. 
              Compartilhando conhecimento para uma educação verdadeiramente inclusiva.
            </p>
          </motion.div>
        </header>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-2 w-full lg:max-w-3xl">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar por título, tag ou descrição..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className="px-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none text-stone-600 text-sm shadow-sm min-w-[180px]"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
            >
              <option value="all">Todos os Tipos</option>
              {MATERIAL_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto justify-end">
            <select 
              className="px-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none text-stone-600 text-sm shadow-sm"
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
            >
              <option value="all">Público-alvo</option>
              {TARGET_AUDIENCES.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>

            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              <Plus className="w-5 h-5" />
              Subir Material
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
                onToggleFavorite={handleToggleFavorite}
                onTogglePublic={handleTogglePublic}
                isOwner={material.authorId === 'user-1'}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
            <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium">Nenhum material encontrado para os filtros selecionados.</p>
          </div>
        )}

        <CreateMaterialModal 
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-stone-100 text-center text-stone-400 text-sm">
          <p>© 2024 PAED - Tecnologia para uma Educação sem Barreiras</p>
        </footer>
      </div>
    </MainLayout>
  );
}
