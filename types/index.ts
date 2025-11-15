export type UserRole = 'requester' | 'helper' | 'admin';

export type RequestStatus = 'active' | 'accepted' | 'completed' | 'cancelled';

export type HelpCategory = 
  | 'car_breakdown'
  | 'first_aid'
  | 'home_repair'
  | 'tech_support'
  | 'shopping'
  | 'other';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  rating: number;
  totalHelps: number;
  points: number;
  badges: string[];
  isActive?: boolean;
  createdAt: Date;
}

export interface HelpRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar?: string;
  category: HelpCategory;
  title: string;
  description: string;
  images?: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: RequestStatus;
  helperId?: string;
  helperName?: string;
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}
