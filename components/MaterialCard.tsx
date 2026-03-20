import React from 'react';
import { FileText, Video, Headphones, Gamepad2, Download, User, Heart, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { Material, MaterialType, MATERIAL_TYPES } from '@/lib/types';
import { Badge } from './ui/Badge';

const IconByType = ({ type, className }: { type: MaterialType; className?: string }) => {
  switch (type) {
    case 'document': return <FileText className={className} />;
    case 'video': return <Video className={className} />;
    case 'audio': return <Headphones className={className} />;
    case 'game': return <Gamepad2 className={className} />;
    default: return <FileText className={className} />;
  }
};

interface MaterialCardProps {
  material: Material;
  onToggleFavorite?: (id: string) => void;
  onTogglePublic?: (id: string) => void;
  isOwner?: boolean;
}

export const MaterialCard = ({ material, onToggleFavorite, onTogglePublic, isOwner }: MaterialCardProps) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 flex flex-col h-full relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${
          material.type === 'document' ? 'bg-blue-50 text-blue-600' :
          material.type === 'video' ? 'bg-purple-50 text-purple-600' :
          material.type === 'audio' ? 'bg-orange-50 text-orange-600' :
          'bg-emerald-50 text-emerald-600'
        }`}>
          <IconByType type={material.type} className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-1">
            {isOwner && (
              <Badge variant={material.isPublic ? 'accent' : 'outline'}>
                {material.isPublic ? <Eye className="w-3 h-3 inline mr-1" /> : <EyeOff className="w-3 h-3 inline mr-1" />}
                {material.isPublic ? 'Público' : 'Privado'}
              </Badge>
            )}
            <Badge variant="outline">{material.fileSize || 'N/A'}</Badge>
          </div>
          <Badge>{MATERIAL_TYPES.find(t => t.value === material.type)?.label}</Badge>
        </div>
      </div>

      <div className="absolute top-5 right-5 flex gap-2">
        {/* Favorite Button moved to bottom for better UX, but keeping it accessible */}
      </div>

      <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-emerald-800 transition-colors">
        {material.title}
      </h3>
      
      <p className="text-stone-500 text-sm line-clamp-2 mb-4 flex-grow">
        {material.description}
      </p>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {material.targetAudience.map(audience => (
            <Badge key={audience} variant="accent">{audience}</Badge>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-400 text-xs">
            <User className="w-3 h-3" />
            <span>{material.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onToggleFavorite?.(material.id)}
              className={`p-2 rounded-lg transition-colors ${
                material.isFavorite 
                  ? 'bg-red-50 text-red-500' 
                  : 'bg-stone-50 text-stone-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${material.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              <Download className="w-4 h-4" />
              Baixar
            </button>
          </div>
        </div>
        
        {isOwner && onTogglePublic && (
          <button 
            onClick={() => onTogglePublic(material.id)}
            className="w-full mt-2 py-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-emerald-600 border border-dashed border-stone-200 rounded-lg transition-colors"
          >
            Mudar para {material.isPublic ? 'Privado' : 'Público'}
          </button>
        )}
      </div>
    </motion.div>
  );
};
