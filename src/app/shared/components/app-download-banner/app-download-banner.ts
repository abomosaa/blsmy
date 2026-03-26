import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-app-download-banner',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-sky-600 rounded-[3rem] p-8 sm:p-16 relative overflow-hidden shadow-2xl shadow-sky-200">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div class="relative z-10">
            <div class="text-center lg:text-right">
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-tajawal leading-tight">
                {{ lang.isArabic() ? 'حمل تطبيق بلسمي' : 'Download Blsmy App' }} <br>{{ lang.isArabic() ? 'لحجز مواعيدك بسهولة' : 'Book Appointments Easily' }}
              </h2>
              <p class="text-sky-100 text-lg mb-10 max-w-xl mx-auto lg:mx-0">
                {{ lang.isArabic()
                  ? 'انضم إلى آلاف المستخدمين الذين يستمتعون بتجربة حجز مواعيد طبية سلسة وسريعة عبر هواتفهم الذكية.'
                  : 'Join thousands of users enjoying a smooth and fast medical appointment booking experience on their smartphones.' }}
              </p>
              <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href="https://blsmy.com"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-2xl hover:bg-slate-50 transition-all shadow-lg">
                  <mat-icon class="text-3xl">apple</mat-icon>
                  <div class="text-right">
                    <p class="text-[10px] uppercase font-bold text-slate-500">Download on the</p>
                    <p class="text-lg font-bold leading-none">App Store</p>
                  </div>
                </a>
                <a href="https://blsmy.com"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-lg">
                  <mat-icon class="text-3xl">play_arrow</mat-icon>
                  <div class="text-right">
                    <p class="text-[10px] uppercase font-bold text-slate-400">Get it on</p>
                    <p class="text-lg font-bold leading-none">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AppDownloadBanner {
  lang = inject(LanguageService);
}
