import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Testimonial } from '../../../models/types';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xl overflow-hidden">
          @if (testimonial().avatar) {
            <img [src]="testimonial().avatar" [alt]="testimonial().author" class="w-full h-full object-cover" referrerpolicy="no-referrer">
          } @else {
            {{ testimonial().author.charAt(0) }}
          }
        </div>
        <div>
          <h4 class="font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? testimonial().author : (testimonial().authorEn || testimonial().author) }}</h4>
          <p class="text-sm text-sky-600 font-medium">{{ lang.isArabic() ? testimonial().role : (testimonial().roleEn || testimonial().role) }}</p>
        </div>
      </div>
      <div class="relative flex-grow">
        <mat-icon class="absolute -top-2 -right-2 text-sky-100 text-4xl transform rotate-180">format_quote</mat-icon>
        <p class="text-slate-600 leading-relaxed italic relative z-10">
          "{{ lang.isArabic() ? testimonial().content : (testimonial().contentEn || testimonial().content) }}"
        </p>
      </div>
    </div>
  `,
})
export class TestimonialCard {
  lang = inject(LanguageService);
  testimonial = input.required<Testimonial>();
}
