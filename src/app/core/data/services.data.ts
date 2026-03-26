import { Service } from '../../models/types';

export const SERVICES: Service[] = [
  // Featured services (with full descriptions on the live site)
  { id: '1', title: 'حجز المواعيد', titleEn: 'Appointment Booking', description: 'نظام حجز مواعيد متطور لتسهيل إدارة مواعيد عملائك و تنظيمها بخطوات بسيطة و مرنة', descriptionEn: 'An advanced appointment booking system to simplify managing and organizing your clients\' appointments with easy, flexible steps', icon: 'calendar_today', image: 'https://blsmy.com/images/bookReservations.svg', category: 'both', featured: true },
  { id: '2', title: 'نظام التقييمات', titleEn: 'Ratings System', description: 'إمكانية تقييم الخدمة بعد كل حجز لتمكين عملائك من التعبير عن تجاربهم و تعزيز ثقتهم بخدماتك', descriptionEn: 'Service rating after each booking to let your clients share their experiences and build trust in your services', icon: 'star_rate', image: 'https://blsmy.com/images/ratingsSystem.jpg', category: 'both', featured: true },
  { id: '3', title: 'تطبيق جوال خاص', titleEn: 'Custom Mobile App', description: 'تطبيق بهوية مركزك يتيح للمراجع حجز المواعيد و متابعة ملفه الطبي و التنبيهات بسهولة', descriptionEn: 'A branded app for your center that lets patients book appointments, track their medical records and receive notifications easily', icon: 'smartphone', image: 'https://blsmy.com/images/customApp.png', category: 'medical-center', featured: true },
  { id: '4', title: 'جهاز الخدمة الذاتية', titleEn: 'Self-Service Kiosk', description: 'حل ذكي يقلل الزحام ويرفع كفاءة التشغيل في منشأتك الصحية على مدار 24/7', descriptionEn: 'A smart solution that reduces crowding and boosts operational efficiency in your healthcare facility 24/7', icon: 'touch_app', image: 'https://blsmy.com/images/kiosk.png', category: 'medical-center', featured: true },
  // Secondary services
  { id: '5', title: 'الأكواد الترويجية', titleEn: 'Promo Codes', icon: 'local_offer', image: 'https://blsmy.com/images/promoCode.svg', category: 'medical-center' },
  { id: '6', title: 'متجر الكتروني', titleEn: 'Online Store', icon: 'shopping_cart', image: 'https://blsmy.com/images/e-store.png', category: 'medical-center' },
  { id: '7', title: 'موقع تعريفي', titleEn: 'Introductory Website', icon: 'web', image: 'https://blsmy.com/images/web-site.png', category: 'medical-center' },
  { id: '8', title: 'نظام التذكيرات', titleEn: 'Reminder System', icon: 'notifications_active', image: 'https://blsmy.com/images/notifySystem.svg', category: 'both' },
  { id: '9', title: 'السداد الإلكتروني', titleEn: 'Electronic Payment', icon: 'payment', image: 'https://blsmy.com/images/e-pay.png', category: 'both' },
  { id: '10', title: 'الربط البرمجي', titleEn: 'API Integration', icon: 'api', image: 'https://blsmy.com/images/linking.png', category: 'medical-center' },
  { id: '11', title: 'تسجيل الدخول الذاتي', titleEn: 'Self Check-in', icon: 'login', image: 'https://blsmy.com/images/enter.png', category: 'both' },
  { id: '12', title: 'التأمين الطبي', titleEn: 'Medical Insurance', icon: 'health_and_safety', image: 'https://blsmy.com/images/medInsurance.svg', category: 'both' },
  { id: '13', title: 'نتائج المختبر و الوصفات و تقارير الأشعة', titleEn: 'Lab Results, Prescriptions & Radiology Reports', icon: 'science', image: 'https://blsmy.com/images/labResults.svg', category: 'patient' },
  { id: '14', title: 'نطاق الحجوزات', titleEn: 'Booking Range', icon: 'map', image: 'https://blsmy.com/images/map.png', category: 'both' },
  { id: '15', title: 'الوصول إلى عملاء أكثر', titleEn: 'Reach More Clients', icon: 'group_add', image: 'https://blsmy.com/images/moreCustomers.svg', category: 'medical-center' },
  { id: '16', title: 'نظام التوظيف', titleEn: 'Recruitment System', icon: 'work', image: 'https://blsmy.com/images/jobsSystem.png', category: 'medical-center' },
  { id: '17', title: 'الانضمام لتطبيق بلسمي', titleEn: 'Join Blsmy App', icon: 'app_shortcut', image: 'https://blsmy.com/images/joinBlsmyApp.png', category: 'both' },
  { id: '18', title: 'الزيارات المنزلية', titleEn: 'Home Visits', icon: 'home_health', image: 'https://blsmy.com/images/homeVisits.svg', category: 'patient' },
  // Coming soon
  { id: '19', title: 'نقاط الولاء', titleEn: 'Loyalty Points', icon: 'loyalty', image: 'https://blsmy.com/images/loyality.png', category: 'both', comingSoon: true },
  { id: '20', title: 'استشارات عن بعد', titleEn: 'Remote Consultations', icon: 'video_call', image: 'https://blsmy.com/images/e-consul.svg', category: 'patient', comingSoon: true },
  { id: '21', title: 'دعم فني متقدم', titleEn: 'Advanced Technical Support', icon: 'support_agent', image: 'https://blsmy.com/images/techSupport.png', category: 'both', comingSoon: true },
];
