import { Hospital } from '../../models/types';

export const HOSPITALS: Hospital[] = [
  {
    id: '1',
    name: 'مجمع غيم الطبي',
    nameEn: 'Ghaym Medical Complex',
    location: 'الرياض',
    locationEn: 'Riyadh',
    description:
      'نستخدم منصة بلسمي للحجوزات بشكل كامل لكل عملائنا ، ومع نظام التذكيرات الذكي ساهم بزيادة الحضور',
    descriptionEn:
      'We use the Blsmy platform for bookings for all our clients, and the smart reminder system has contributed to increased attendance',
    logo: 'https://blsmy.com/images/ghaym.png',
    reviewCount: 1,
  },
  {
    id: '2',
    name: 'مجمع الصحة والسلامة',
    nameEn: 'Health & Safety Complex',
    location: 'جدة',
    locationEn: 'Jeddah',
    description:
      'لحرصنا على سماع عملائنا وتقييمهم لخدمتنا ، نحرص يوميا على متابعة تقرير التقييمات الذي يصلنا من بلسمي ..',
    descriptionEn:
      'To ensure we listen to our clients and their feedback, we follow up daily on the ratings report we receive from Blsmy',
    logo: 'https://blsmy.com/images/alsahha.png',
    reviewCount: 1,
  },
  {
    id: '3',
    name: 'مجمع الدمام الأهلي',
    nameEn: 'Dammam National Complex',
    location: 'الدمام',
    locationEn: 'Dammam',
    description:
      'نظام بلسمي ساعدنا في تحسين تجربة العميل ، وخفض مصاريف مركز الاتصال ، وأصبح خدمة أساسية لعملائنا ..',
    descriptionEn:
      'Blsmy system helped us improve client experience, reduce call center costs, and became an essential service for our clients',
    logo: 'https://blsmy.com/images/dammam.png',
    reviewCount: 1,
  },
];