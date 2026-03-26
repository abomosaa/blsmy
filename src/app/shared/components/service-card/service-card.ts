import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Service } from '../../../models/types';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="group p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-100 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 cursor-pointer relative">
      @if (service().comingSoon) {
        <span class="absolute top-3 {{ lang.isArabic() ? 'left-3' : 'right-3' }} px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-700 rounded-full">{{ lang.isArabic() ? 'قريبا' : 'Coming Soon' }}</span>
      }
      <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 mb-4">
        <mat-icon>{{ service().icon }}</mat-icon>
      </div>
      <h3 class="text-lg font-bold text-slate-900 mb-2 font-tajawal group-hover:text-sky-600 transition-colors">
        {{ lang.isArabic() ? service().title : (service().titleEn || service().title) }}
      </h3>
      @if (lang.isArabic() ? service().description : service().descriptionEn) {
        <p class="text-slate-500 text-sm leading-relaxed">
          {{ lang.isArabic() ? service().description : (service().descriptionEn || service().description) }}
        </p>
      }
    </div>
  `,
})
export class ServiceCard {
  lang = inject(LanguageService);
  service = input.required<Service>();
}
