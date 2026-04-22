import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import PlaceCard from './components/PlaceCard';
import PlaceDetails from './components/PlaceDetails';
import { PLACES } from './data';
import { CategoryFilter, Place } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Sparkles } from 'lucide-react';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredPlaces = useMemo(() => {
    return PLACES.filter(place => {
      if (activeFilter === 'all') return true;
      if (activeFilter === '0800') return place.priceLevel === 0;
      return place.category === activeFilter;
    });
  }, [activeFilter]);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2"
            >
              <Sparkles className="w-4 h-4" />
              Vizinhos Recomendam
            </motion.div>
            <h2 className="text-5xl font-serif font-bold text-brand-dark tracking-tighter leading-[0.85] mb-4">
              Explorar <br /> <span className="text-brand-primary">Sua Vizinhança.</span>
            </h2>
            <p className="text-brand-dark/50 max-w-md text-sm leading-relaxed">
              Descubra lugares autênticos curados pela comunidade. Informações em tempo real sobre lotação e segurança.
            </p>
          </div>

          {/* Places Grid */}
          {filteredPlaces.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center card"
            >
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-4">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-brand-dark">Nada por aqui ainda</h3>
              <p className="text-zinc-500 text-sm">Tente mudar o filtro ou buscar outra vibe.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPlaces.map((place) => (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlaceCard 
                      place={place} 
                      isFavorite={favorites.includes(place.id)}
                      onToggleFavorite={(e) => toggleFavorite(place.id, e)}
                      onClick={() => setSelectedPlace(place)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block col-span-4 space-y-8">
          {/* Quick Filters / Community Feed Widget */}
          <div className="card p-8">
            <h3 className="text-xl font-serif font-bold mb-6">Comunidade Alerta</h3>
            <div className="space-y-6">
               <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
                  <span className="text-lg">💬</span>
                </div>
                <p className="text-sm leading-snug">
                  <span className="font-bold block text-brand-dark">Lucas:</span> 
                  "Estive na Praça agora, está super tranquilo e com policiamento."
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                  <span className="text-lg">💬</span>
                </div>
                <p className="text-sm leading-snug">
                  <span className="font-bold block text-brand-dark">Mari:</span> 
                  "O Mirante mudou o cardápio, cafés a partir de R$ 8,00!"
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="card bg-[#ecece2] p-6 border-none flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold opacity-50 tracking-widest">Seu Perfil</span>
              <span className="text-base font-serif font-bold text-brand-dark">Explorador Nível 4</span>
            </div>
            <div className="h-2 w-24 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary" style={{ width: '60%' }} />
            </div>
          </div>
          
          <div className="p-8 rounded-[32px] border-2 border-dashed border-black/10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="text-brand-primary w-6 h-6" />
            </div>
            <p className="text-xs text-brand-dark/40 font-medium leading-relaxed">
               Participe da curadoria e<br/>ganhe cupons exclusivos.
            </p>
          </div>
        </aside>
      </main>

      <footer className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 gap-4">
        <div>© 2024 Turistei — Inteligência Hiperlocal</div>
        <div className="flex gap-8">
          <span className="hover:text-brand-primary cursor-pointer">Privacidade</span>
          <span className="hover:text-brand-primary cursor-pointer">Ajuda</span>
        </div>
      </footer>

      {/* Detail Modal */}
      <PlaceDetails 
        place={selectedPlace} 
        onClose={() => setSelectedPlace(null)} 
      />
    </div>
  );
}
