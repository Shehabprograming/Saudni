import { User, HelpRequest, HelpCategory } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'أحمد محمد',
  phone: '+966501234567',
  role: 'requester',
  rating: 4.8,
  totalHelps: 23,
  points: 450,
  badges: ['نجم المساعدة', 'مساعد سريع', 'الأكثر نشاطاً'],
  createdAt: new Date('2024-01-15'),
};

export const helpers: User[] = [
  {
    id: 'helper-1',
    name: 'محمد علي',
    phone: '+966501234568',
    role: 'helper',
    rating: 4.9,
    totalHelps: 156,
    points: 2340,
    badges: ['خبير المساعدة', 'بطل الإنقاذ'],
    isActive: true,
    createdAt: new Date('2023-08-10'),
  },
  {
    id: 'helper-2',
    name: 'فاطمة حسن',
    phone: '+966501234569',
    role: 'helper',
    rating: 4.7,
    totalHelps: 89,
    points: 1560,
    badges: ['نجم المساعدة'],
    isActive: true,
    createdAt: new Date('2023-11-20'),
  },
];

export const helpRequests: HelpRequest[] = [
  {
    id: 'req-1',
    requesterId: 'user-2',
    requesterName: 'سارة أحمد',
    category: 'car_breakdown',
    title: 'عطل في السيارة',
    description: 'سيارتي تعطلت على الطريق السريع وأحتاج مساعدة عاجلة',
    location: {
      latitude: 24.7136,
      longitude: 46.6753,
      address: 'طريق الملك فهد، الرياض',
    },
    status: 'active',
    createdAt: new Date(Date.now() - 15 * 60000),
  },
  {
    id: 'req-2',
    requesterId: 'user-3',
    requesterName: 'خالد عبدالله',
    category: 'first_aid',
    title: 'إسعافات أولية',
    description: 'شخص أصيب بجرح بسيط ويحتاج للمساعدة',
    location: {
      latitude: 24.7100,
      longitude: 46.6800,
      address: 'حي العليا، الرياض',
    },
    status: 'active',
    createdAt: new Date(Date.now() - 8 * 60000),
  },
  {
    id: 'req-3',
    requesterId: 'user-1',
    requesterName: 'أحمد محمد',
    category: 'tech_support',
    title: 'مساعدة تقنية',
    description: 'أحتاج مساعدة في إعداد الراوتر الجديد',
    location: {
      latitude: 24.7200,
      longitude: 46.6900,
      address: 'حي السليمانية، الرياض',
    },
    status: 'completed',
    helperId: 'helper-1',
    helperName: 'محمد علي',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60000),
    acceptedAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 5 * 60000),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 45 * 60000),
  },
];

export const categoryLabels: Record<HelpCategory, string> = {
  car_breakdown: 'عطل سيارة',
  first_aid: 'إسعافات أولية',
  home_repair: 'إصلاح منزلي',
  tech_support: 'دعم تقني',
  shopping: 'تسوق ومساعدة',
  other: 'أخرى',
};
