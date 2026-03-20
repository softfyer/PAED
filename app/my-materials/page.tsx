'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  FileUser,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Material, MaterialType } from '@/lib/types';
import { INITIAL_MATERIALS } from '@/lib/data';

// --- Components ---
import { MainLayout } from '@/components/MainLayout';
import { MaterialCard } from '@/components/MaterialCard';
import { CreateMaterialModal } from '@/components/CreateMaterialModal';

export default function MyMaterialsPage() {
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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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

  const handleUpload = (newMaterial: Partial<Material>) => {
    const material: Material = {
      id: Date.now().toString(),
      title: newMaterial.title || 'Sem título',
      description: newMaterial.description || '',
      type: newMaterial.type as MaterialType,
      tags: newMaterial.tags || [],
      targetAudience: newMaterial.targetAudience || [],
      author: newMaterial.author || 'Prof. Marcos Oliveira',
      authorId: currentUserId,
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

  const myMaterials = materials.filter((m, index) => {
    // For illustration, we treat the first 3 items as "mine" regardless of authorId
    // or if the authorId actually matches the current user
    const isMine = m.authorId === currentUserId || index < 3;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return isMine && matchesSearch;
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
            className="flex items-center justify-between gap-4 flex-wrap"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <FileUser className="w-6 h-6" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-stone-900">Meus Materiais</h1>
              </div>
              <p className="text-stone-500">Gerencie os materiais que você compartilhou na plataforma.</p>
            </div>
            
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              <Plus className="w-5 h-5" />
              Novo Material
            </button>
          </motion.div>
        </header>

        {/* Search */}
        <div className="relative mb-12 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar em meus materiais..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {myMaterials.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
                onToggleFavorite={handleToggleFavorite}
                onTogglePublic={handleTogglePublic}
                isOwner={true}
              />
            ))}
          </AnimatePresence>
        </div>

        {myMaterials.length === 0 && (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
            <FileUser className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium">Você ainda não enviou nenhum material.</p>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 text-emerald-600 font-bold hover:underline"
            >
              Começar a compartilhar agora
            </button>
          </div>
        )}

        <CreateMaterialModal 
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />
      </div>
    </MainLayout>
  );
}
