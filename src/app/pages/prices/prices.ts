import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

interface FeatureRow {
  id: string;
  name: string;
  nameEn: string;
  basic: boolean;
  premium: boolean;
  pro: boolean;
}

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <section class="py-16 sm:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center mb-8">
          <div class="inline-flex p-1 rounded-full border border-cyan-300 bg-cyan-50">
            <button
              (click)="billing.set('monthly')"
              [class.bg-cyan-500]="billing() === 'monthly'"
              [class.text-white]="billing() === 'monthly'"
              [class.text-cyan-700]="billing() !== 'monthly'"
              class="px-6 py-2 rounded-full text-sm font-bold transition-all"
            >
              {{ lang.isArabic() ? 'شهرياً' : 'Monthly' }}
            </button>
            <button
              (click)="billing.set('yearly')"
              [class.bg-cyan-500]="billing() === 'yearly'"
              [class.text-white]="billing() === 'yearly'"
              [class.text-cyan-700]="billing() !== 'yearly'"
              class="px-6 py-2 rounded-full text-sm font-bold transition-all"
            >
              {{ lang.isArabic() ? 'سنوياً (توفير 20%)' : 'Yearly (Save 20%)' }}
            </button>
          </div>
        </div>

        <div class="overflow-x-auto rounded-3xl border border-slate-200">
          <table class="w-full min-w-[900px] border-collapse text-center">
            <thead class="bg-slate-50">
              <tr class="text-slate-700">
                <th class="py-5 px-4 text-right font-bold">{{ lang.isArabic() ? 'الخدمة' : 'Service' }}</th>
                <th class="py-5 px-4 font-bold text-cyan-700">{{ lang.isArabic() ? 'النسخة الأساسية من العيادات' : 'Clinic Basic' }}</th>
                <th class="py-5 px-4 bg-cyan-50 font-bold text-cyan-700">
                  <p class="font-tajawal text-lg">{{ lang.isArabic() ? 'المتميز' : 'Premium' }}</p>
                  <p class="text-xs mt-1 text-slate-500">{{ lang.isArabic() ? 'الأكثر طلباً' : 'Most Requested' }}</p>
                  <p class="mt-1">
                    @if (billing() === 'yearly') {
                      <span class="text-xs text-red-500 line-through mx-1">700 {{ lang.isArabic() ? 'ر.س' : 'SAR' }}</span>
                    }
                    <span class="text-cyan-700">{{ premiumPrice() }}</span>
                  </p>
                </th>
                <th class="py-5 px-4 font-bold text-cyan-700">{{ lang.isArabic() ? 'الاحترافية' : 'Professional' }}</th>
              </tr>
            </thead>
            <tbody>
              @for (row of features; track row.id) {
                <tr class="border-t border-slate-100">
                  <td class="py-4 px-4 text-right font-medium text-slate-700">{{ lang.isArabic() ? row.name : row.nameEn }}</td>
                  <td class="py-4 px-4">
                    @if (row.basic) {
                      <mat-icon class="text-cyan-500">check</mat-icon>
                    }
                  </td>
                  <td class="py-4 px-4 bg-cyan-50/60">
                    @if (row.premium) {
                      <mat-icon class="text-cyan-500">check</mat-icon>
                    }
                  </td>
                  <td class="py-4 px-4">
                    @if (row.pro) {
                      <mat-icon class="text-cyan-500">check</mat-icon>
                    }
                  </td>
                </tr>
              }
              <tr class="border-t border-slate-100">
                <td class="py-6 px-4"></td>
                <td class="py-6 px-4">
                  <a routerLink="/contact" class="inline-flex px-7 py-2.5 rounded-full bg-cyan-500 text-white text-sm font-bold hover:bg-cyan-600 transition-colors">
                    {{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}
                  </a>
                </td>
                <td class="py-6 px-4 bg-cyan-50/60">
                  <a routerLink="/contact" class="inline-flex px-7 py-2.5 rounded-full bg-cyan-500 text-white text-sm font-bold hover:bg-cyan-600 transition-colors">
                    {{ lang.isArabic() ? 'اشترك الآن' : 'Subscribe Now' }}
                  </a>
                </td>
                <td class="py-6 px-4">
                  <a routerLink="/contact" class="inline-flex px-7 py-2.5 rounded-full bg-cyan-500 text-white text-sm font-bold hover:bg-cyan-600 transition-colors">
                    {{ lang.isArabic() ? 'اشترك الآن' : 'Subscribe Now' }}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5 text-sm text-slate-500 leading-7">
          <p>[1] {{ lang.isArabic() ? 'هذا السعر تكلفة إضافية' : 'This price is an additional fee.' }}</p>
          <p>[2] {{ lang.isArabic() ? '15٪ عمولة من قيمة المعاملة' : '15% commission from transaction value.' }}</p>
          <p>[3] {{ lang.isArabic() ? 'يمكن طلب أي خدمة بشكل منفصل' : 'Any service can be requested separately.' }}</p>
        </div>

        <div class="mt-10 space-y-5">
          <div class="rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 bg-white">
            <div>
              <h3 class="text-2xl font-bold text-cyan-600 font-tajawal mb-3">{{ lang.isArabic() ? 'ما الباقة الأنسب لك؟' : 'Which package fits you?' }}</h3>
              <ul class="text-slate-600 space-y-2 leading-7">
                <li>• {{ lang.isArabic() ? 'النمو: المراكز الصغيرة التي تبحث عن توسيع الحضور الرقمي' : 'Growth: small centers looking to expand digitally.' }}</li>
                <li>• {{ lang.isArabic() ? 'المتميز: المراكز المتوسطة التي ترغب في تسويق أقوى وربح أكبر' : 'Premium: mid-size centers wanting stronger marketing.' }}</li>
                <li>• {{ lang.isArabic() ? 'الاحترافية: المراكز المتقدمة التي تبحث عن أتمتة ومرونة أعلى' : 'Professional: advanced centers needing more automation.' }}</li>
              </ul>
            </div>
            <div class="w-40 h-40 rounded-full bg-cyan-50 flex items-center justify-center">
              <mat-icon class="text-cyan-500 text-6xl">help</mat-icon>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 class="text-2xl font-bold text-cyan-600 font-tajawal mb-2">{{ lang.isArabic() ? 'الطلبات الخاصة' : 'Custom Requests' }}</h3>
              <p class="text-slate-600">{{ lang.isArabic() ? 'نوفر لك مزايا إضافية خاصة حسب احتياجك' : 'We provide custom add-ons based on your needs.' }}</p>
            </div>
            <a routerLink="/contact" class="inline-flex px-8 py-3 rounded-full bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors">
              {{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Prices {
  lang = inject(LanguageService);
  billing = signal<'monthly' | 'yearly'>('monthly');

  premiumPrice = computed(() =>
    this.billing() === 'yearly'
      ? this.lang.isArabic()
        ? '560 ر.س'
        : '560 SAR'
      : this.lang.isArabic()
        ? '700 ر.س'
        : '700 SAR'
  );

  features: FeatureRow[] = [
    { id: '1', name: 'نظام حجز المواعيد', nameEn: 'Appointment Booking System', basic: true, premium: true, pro: true },
    { id: '2', name: 'الانضمام لتطبيق بلسمي', nameEn: 'Join Blsmy App', basic: true, premium: true, pro: true },
    { id: '3', name: 'نظام التذكيرات', nameEn: 'Reminder System', basic: true, premium: true, pro: true },
    { id: '4', name: 'نظام التقييمات', nameEn: 'Ratings System', basic: true, premium: true, pro: true },
    { id: '5', name: 'متجر إلكتروني', nameEn: 'E-Store', basic: false, premium: true, pro: true },
    { id: '6', name: 'الأكواد الترويجية', nameEn: 'Promo Codes', basic: false, premium: true, pro: true },
    { id: '7', name: 'حجوزات الزيارات المنزلية', nameEn: 'Home Visit Bookings', basic: false, premium: true, pro: true },
    { id: '8', name: 'السداد الإلكتروني', nameEn: 'Electronic Payment', basic: true, premium: true, pro: true },
    { id: '9', name: 'نقاط الولاء', nameEn: 'Loyalty Points', basic: false, premium: true, pro: true },
    { id: '10', name: 'الطب الاتصالي', nameEn: 'Telemedicine', basic: false, premium: true, pro: true },
    { id: '11', name: 'موقع إلكتروني', nameEn: 'Website', basic: false, premium: true, pro: true },
    { id: '12', name: 'الربط البرمجي', nameEn: 'API Integration', basic: false, premium: true, pro: true },
    { id: '13', name: 'تطوير تطبيق خاص', nameEn: 'Custom App Development', basic: false, premium: true, pro: true },
  ];
}
