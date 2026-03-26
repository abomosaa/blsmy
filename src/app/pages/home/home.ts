import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ServiceCard } from '../../shared/components/service-card/service-card';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';
import { PartnerCarousel } from '../../shared/components/partner-carousel/partner-carousel';
import { AppDownloadBanner } from '../../shared/components/app-download-banner/app-download-banner';
import { SERVICES } from '../../core/data/services.data';
import { TESTIMONIALS } from '../../core/data/testimonials.data';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    ServiceCard,
    TestimonialCard,
    PartnerCarousel,
    AppDownloadBanner,
  ],
  templateUrl: './home.html',
})
export class Home {
  private router = inject(Router);
  lang = inject(LanguageService);
  services = signal(SERVICES);
  testimonials = signal(TESTIMONIALS);
  searchQuery = '';
  selectedCity = 'all';

  cities = [
    { id: 'all', name: 'اختر المدينة', nameEn: 'Select City' },
    { id: 'riyadh', name: 'الرياض', nameEn: 'Riyadh' },
    { id: 'jeddah', name: 'جدة', nameEn: 'Jeddah' },
    { id: 'dammam', name: 'الدمام', nameEn: 'Dammam' },
  ];

  featuredServices = computed(() => this.services().filter(s => s.featured));

  executeSearch() {
    const query = this.searchQuery.trim();
    const queryParams: Record<string, string> = {};

    if (query) {
      queryParams['q'] = query;
    }

    if (this.selectedCity !== 'all') {
      queryParams['city'] = this.selectedCity;
    }

    this.router.navigate(['/hospitals'], { queryParams });
  }
}
