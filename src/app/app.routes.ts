import { Routes } from '@angular/router';
import { ExperiencePage } from './experience/page';
export const routes: Routes = [
  ...[
    ['', 'home', 'بلسمي | منصتك لحلول صحية ذكية'],
    ['services', 'services', 'خدمات بلسمي'],
    ['hospitals', 'hospitals', 'المراكز الطبية | بلسمي'],
    ['offers', 'offers', 'الخدمات والعروض | بلسمي'],
    ['prices', 'prices', 'حلول المراكز والباقات | بلسمي'],
    ['about', 'about', 'عن بلسمي'],
    ['contact', 'contact', 'تواصل مع بلسمي'],
    ['book', 'book', 'طلب موعد | بلسمي'],
    ['jobs', 'jobs', 'الانضمام إلى بلسمي'],
    ['privacy', 'privacy', 'الخصوصية | بلسمي'],
    ['medical-login', 'portal', 'بوابة المراكز الطبية | بلسمي'],
  ].map(([path, page, title]) => ({ path, component: ExperiencePage, title, data: { page } })),
  { path: 'medical-centers', redirectTo: 'hospitals', pathMatch: 'full' },
  { path: 'auth/login', redirectTo: 'medical-login', pathMatch: 'full' },
  { path: 'auth/signup', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'login', redirectTo: 'medical-login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'contact', pathMatch: 'full' },
  {
    path: '**',
    component: ExperiencePage,
    title: 'الصفحة غير موجودة | بلسمي',
    data: { page: '404' },
  },
];
