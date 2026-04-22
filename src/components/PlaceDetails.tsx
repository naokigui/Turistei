import { Place } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, DollarSign, Shield, MapPin, Navigation, Share2, Info, CheckCircle2 } from 'lucide-react';

interface PlaceDetailsProps {
  place: Place | null;
  onClose: () => void;
}

export default function PlaceDetails({ place, onClose }: PlaceDetailsProps) {
  if (!place) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
        />

        {/* Content */}
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-brand-bg sm:rounded-[32px] overflow-hidden shadow-2xl h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto no-scrollbar border border-black/5"
        >
          {/* Hero Image */}
          <div className="relative h-72 sm:h-96 w-full">
            <img 
              src={place.imageUrl} 
              alt={place.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent " />
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="px-8 pb-16 -mt-16 relative">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-free">
                    {place.category}
                  </span>
                  {place.priceLevel === 0 && (
                    <span className="badge-free !bg-brand-secondary">
                      Rolê 0800
                    </span>
                  )}
                </div>
                <h1 className="text-5xl font-serif font-bold text-brand-dark leading-[0.9] tracking-tighter">
                  {place.name}
                </h1>
              </div>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-white border border-black/5 flex items-center justify-center text-zinc-600 shadow-sm"
              >
                <Share2 className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Tríade da Confiança Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm">
                <div className="flex items-center gap-2 text-brand-primary mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Horários</span>
                </div>
                <p className="text-sm font-bold text-brand-dark leading-tight">{place.verifiedHours}</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm">
                <div className="flex items-center gap-2 text-brand-primary mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Investimento</span>
                </div>
                <p className="text-sm font-bold text-brand-dark leading-tight">
                  {place.priceExample}
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm">
                <div className="flex items-center gap-2 text-brand-primary mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Segurança</span>
                </div>
                <p className="text-sm font-bold text-brand-primary leading-tight">
                   Status: {place.securityRating >= 4 ? 'Alta Confiança' : 'Monitorada'}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <section className="bg-white/40 p-6 rounded-3xl border border-black/5">
                <h3 className="text-lg font-serif font-bold mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-brand-primary" />
                  Experiência
                </h3>
                <p className="text-brand-dark/70 leading-relaxed italic font-serif">
                  "{place.description}"
                </p>
              </section>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center gap-4 bg-white p-4 rounded-3xl border border-black/5">
                  <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Localização</p>
                    <p className="text-sm font-medium">{place.address}</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-brand-dark text-white px-8 py-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-brand-dark/10"
                >
                  <Navigation className="w-5 h-5" />
                  Como chegar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
