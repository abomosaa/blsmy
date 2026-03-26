import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PARTNERS } from '../../../core/data/partners.data';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-partner-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 border-t border-slate-100 bg-slate-50/50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">{{ lang.isArabic() ? 'شركاؤنا' : 'Our Partners' }}</p>
      </div>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

        <div class="flex animate-scroll whitespace-nowrap">
          @for (partner of displayPartners(); track $index) {
            <div class="flex-shrink-0 px-12">
              <img
                [src]="partner.logo"
                [alt]="lang.isArabic() ? partner.name : (partner.nameEn || partner.name)"
                class="h-12 w-auto logo-tint cursor-pointer"
                referrerpolicy="no-referrer">
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class PartnerCarousel {
  lang = inject(LanguageService);
  partners = signal(PARTNERS);
  displayPartners = computed(() => [...this.partners(), ...this.partners()]);
}
