export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  layout: 'modern' | 'classic' | 'minimal';
}

export const templates: ResumeTemplate[] = [
  {
    id: 'modern-1',
    name: 'Modern Pro',
    description: 'Un design moderne avec une mise en page dynamique',
    thumbnail: '/templates/modern-1.png',
    layout: 'modern'
  },
  {
    id: 'classic-1',
    name: 'Classic Elite',
    description: 'Un style traditionnel et professionnel',
    thumbnail: '/templates/classic-1.png',
    layout: 'classic'
  },
  {
    id: 'minimal-1',
    name: 'Minimal Clean',
    description: 'Design épuré et minimaliste',
    thumbnail: '/templates/minimal-1.png',
    layout: 'minimal'
  }
]; 