import { Search, MapPin, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-3xl font-serif font-bold tracking-tight text-brand-dark">
            Turistei.
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40">
            Inteligência Hiperlocal
          </span>
        </motion.div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Onde vamos hoje? (Bairro, rua ou vibe...)"
              className="w-full bg-white border border-black/10 rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-zinc-200 p-0.5 border-2 border-white overflow-hidden"
          >
            <div className="w-full h-full bg-brand-primary" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
