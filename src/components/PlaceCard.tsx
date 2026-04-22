import React from 'react';
import { Place } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Clock, DollarSign, Shield, MapPin, Users } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export default function PlaceCard({ place, isFavorite, onToggleFavorite, onClick }: PlaceCardProps) {
  const getOccupancyLabel = (status: Place['occupancy']) => {
    switch (status) {
      case 'calm': return 'Tranquilo';
      case 'moderate': return 'Moderado';
      case 'busy': return 'Lotado';
      default: return 'Desconhecido';
    }
  };

  const getOccupancyClass = (status: Place['occupancy']) => {
    switch (status) {
      case 'calm': return 'status-green';
      case 'moderate': return 'status-orange';
      case 'busy': return 'status-red';
      default: return 'bg-zinc-400';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card group cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
          src={place.imageUrl} 
          alt={place.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleFavorite}
            className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center border transition-colors ${
              isFavorite 
                ? 'bg-brand-secondary text-white border-brand-secondary' 
                : 'bg-white/20 text-white border-white/30 hover:bg-white/40'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
              {place.name}
            </h3>
            <p className="text-xs text-zinc-500 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {place.address}
            </p>
          </div>
          <span className={`status-dot ${getOccupancyClass(place.occupancy)}`} title={getOccupancyLabel(place.occupancy)} />
        </div>
        
        <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed mb-6">
          {place.description}
        </p>

        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-brand-primary font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              Segurança: {place.securityRating >= 4 ? 'Alta' : 'Média'}
            </div>
            <p className="text-sm font-serif font-black text-brand-dark">
              {place.priceExample}
            </p>
          </div>

          {place.priceLevel === 0 && (
            <span className="badge-free mb-1 shadow-sm">Rolê 0800</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
