import { CategoryFilter } from '../types';
import { motion } from 'motion/react';
import { Trees, Coffee, Landmark, PartyPopper, Zap } from 'lucide-react';

interface FilterBarProps {
  active: CategoryFilter;
  onChange: (filter: CategoryFilter) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tudo', icon: null },
  { id: '0800', label: 'Rolê 0800', icon: <Landmark className="w-4 h-4" /> },
  { id: 'nature', label: 'Natureza', icon: <Trees className="w-4 h-4" /> },
  { id: 'food', label: 'Comer', icon: <Coffee className="w-4 h-4" /> },
  { id: 'culture', label: 'Cultura', icon: <Landmark className="w-4 h-4" /> },
  { id: 'leisure', label: 'Lazer', icon: <PartyPopper className="w-4 h-4" /> },
] as const;

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="bg-brand-bg/50 border-b border-black/5 py-4 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="max-w-7xl mx-auto px-4 flex gap-3">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(cat.id as CategoryFilter)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all
              ${active === cat.id 
                ? 'bg-brand-primary text-white shadow-md' 
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-black/5'}
            `}
          >
            {cat.icon}
            <span className={active === cat.id ? 'font-bold' : ''}>{cat.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
