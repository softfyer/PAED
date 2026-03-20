export type MaterialType = 'document' | 'video' | 'audio' | 'game';

export interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  tags: string[];
  targetAudience: string[];
  author: string;
  authorId: string; // To identify user's own materials
  createdAt: string;
  url: string; // In a real app, this would be a link to storage
  fileSize?: string;
  isPublic: boolean;
  isFavorite: boolean;
}

export const TARGET_AUDIENCES = [
  'TDAH - Nível 1',
  'TDAH - Nível 2',
  'TDAH - Nível 3',
  'Autismo - Nível 1',
  'Autismo - Nível 2',
  'Autismo - Nível 3',
  'Deficiência Visual',
  'Deficiência Auditiva',
  'Neurodivergência Geral'
];

export const MATERIAL_TYPES: { value: MaterialType; label: string }[] = [
  { value: 'document', label: 'Documento' },
  { value: 'video', label: 'Videoaula' },
  { value: 'audio', label: 'Audiolivro' },
  { value: 'game', label: 'Jogo Didático (ZIP)' },
];
