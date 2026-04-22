import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(username);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-brand-bg rounded-[40px] shadow-2xl overflow-hidden border border-black/5"
          >
            {/* Header / Brand Area */}
            <div className="bg-brand-dark p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-brand-primary mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Turistei Hub</span>
                </div>
                <h2 className="text-4xl font-serif font-bold leading-tight tracking-tight">
                  Bem-vindo à <br />
                  <span className="text-brand-primary">Comunidade.</span>
                </h2>
              </div>
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Area */}
            <div className="p-10 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block ml-1">
                    Nome de Usuário
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="text" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Como você quer ser chamado?"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                      Senha
                    </label>
                    <button type="button" className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">
                      Esqueceu?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-dark/10 hover:bg-brand-primary hover:text-brand-dark transition-all disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Entrar na vizinhança
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 pt-8 border-t border-zinc-100 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-primary" />
                  Ambiente Seguro
                </div>
                <div className="w-1 h-1 bg-zinc-200 rounded-full" />
                <button className="hover:text-brand-primary transition-colors">Criar conta</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
