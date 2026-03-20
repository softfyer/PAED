import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Material, MaterialType, TARGET_AUDIENCES, MATERIAL_TYPES } from '@/lib/types';
import { Modal } from './ui/Modal';

interface CreateMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (material: Partial<Material>) => void;
}

export const CreateMaterialModal = ({ isOpen, onClose, onUpload }: CreateMaterialModalProps) => {
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    type: 'document',
    targetAudience: [],
    tags: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload(newMaterial);
    // Reset form
    setNewMaterial({ type: 'document', targetAudience: [], tags: [] });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Novo Material Didático"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Título do Material</label>
          <input 
            required
            type="text" 
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            placeholder="Ex: Guia de Atividades para TDAH"
            value={newMaterial.title || ''}
            onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Tipo</label>
            <select 
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
              value={newMaterial.type}
              onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value as MaterialType})}
            >
              {MATERIAL_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Autor</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
              placeholder="Seu nome ou instituição"
              value={newMaterial.author || ''}
              onChange={(e) => setNewMaterial({...newMaterial, author: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Descrição</label>
          <textarea 
            required
            rows={3}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
            placeholder="Descreva brevemente o conteúdo e como ele ajuda no ensino inclusivo..."
            value={newMaterial.description || ''}
            onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Público-alvo (Selecione um ou mais)</label>
          <div className="flex flex-wrap gap-2">
            {TARGET_AUDIENCES.map(audience => (
              <button
                key={audience}
                type="button"
                onClick={() => {
                  const current = newMaterial.targetAudience || [];
                  const updated = current.includes(audience) 
                    ? current.filter(a => a !== audience)
                    : [...current, audience];
                  setNewMaterial({...newMaterial, targetAudience: updated});
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  newMaterial.targetAudience?.includes(audience)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {audience}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Tags (Separadas por vírgula)</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
            placeholder="Ex: alfabetização, visual, jogos"
            value={newMaterial.tags?.join(', ') || ''}
            onChange={(e) => setNewMaterial({...newMaterial, tags: e.target.value.split(',').map(t => t.trim())})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Anexar Arquivo (PDF, MP4, MP3, ZIP)</label>
          <div className="border-2 border-dashed border-stone-200 rounded-2xl p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer bg-stone-50/50 group">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-600">Arraste seu arquivo aqui ou clique para selecionar</p>
                <p className="text-xs text-stone-400 mt-1">Tamanho máximo: 50MB</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all"
        >
          Publicar Material no Repositório
        </button>
      </form>
    </Modal>
  );
};
