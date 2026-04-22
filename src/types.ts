export type OccupancyStatus = 'calm' | 'moderate' | 'busy';

export interface Place {
  id: string;
  name: string;
  category: 'nature' | 'food' | 'culture' | 'leisure';
  description: string;
  imageUrl: string;
  address: string;
  priceLevel: 0 | 1 | 2 | 3; // 0 is Free (0800)
  priceExample: string;
  verifiedHours: string;
  securityRating: number; // 1-5
  occupancy: OccupancyStatus;
  distance: string;
  isFavorite?: boolean;
}

export type CategoryFilter = 'all' | '0800' | 'nature' | 'food' | 'culture' | 'leisure';
