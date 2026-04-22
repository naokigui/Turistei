import { Search, MapPin, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  userName?: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Header({ searchQuery, onSearchChange, userName, onLogin, onLogout }: HeaderProps) {
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
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Onde vamos hoje? (Bairro, rua ou vibe...)"
              className="w-full bg-white border border-black/10 rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {userName ? (
              <div className="flex items-center gap-2">
                <motion.div 
                  key="user"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 bg-white border border-black/5 px-4 py-1.5 rounded-full shadow-sm"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Olá,</span>
                    <span className="text-xs font-bold text-brand-dark">{userName}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center p-0.5 border-2 border-white overflow-hidden shadow-sm text-brand-primary">
                    <User className="w-5 h-5" />
                  </div>
                </motion.div>
                
                <motion.button
                  key="logout"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05, backgroundColor: '#fee2e2', color: '#ef4444' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  onClick={onLogout}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-black/5 text-zinc-400 shadow-sm"
                  title="Sair da conta"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <motion.button 
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-black/10 hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Entrar
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
