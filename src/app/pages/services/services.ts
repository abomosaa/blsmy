import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ServiceCard } from '../../shared/components/service-card/service-card';
import { SERVICES } from '../../core/data/services.data';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ServiceCard],
  templateUrl: './services.html',
})
export class Services {
  lang = inject(LanguageService);
  services = signal(SERVICES);
  searchQuery = signal('');
  selectedCategory = signal('all');

  filteredServices = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    return this.services().filter((s) => {
      const matchesQuery =
        s.title.toLowerCase().includes(query) ||
        (s.titleEn?.toLowerCase().includes(query) ?? false) ||
        (s.description?.toLowerCase().includes(query) ?? false) ||
        (s.descriptionEn?.toLowerCase().includes(query) ?? false);
      const matchesCategory =
        category === 'all' || s.category === category || s.category === 'both';
      return matchesQuery && matchesCategory;
    });
  });

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
