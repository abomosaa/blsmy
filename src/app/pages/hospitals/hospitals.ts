import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HOSPITALS } from '../../core/data/hospitals.data';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  templateUrl: './hospitals.html',
})
export class Hospitals {
  private route = inject(ActivatedRoute);

  lang = inject(LanguageService);
  hospitals = signal(HOSPITALS);
  searchQuery = signal('');
  selectedCity = signal('all');

  cities = computed(() => {
    const uniqueCities = new Map<string, { label: string; labelEn: string }>();

    this.hospitals().forEach((hospital) => {
      uniqueCities.set(hospital.locationEn.toLowerCase(), {
        label: hospital.location,
        labelEn: hospital.locationEn,
      });
    });

    return [
      {
        id: 'all',
        label: 'الكل',
        labelEn: 'All',
      },
      ...Array.from(uniqueCities.entries()).map(([id, city]) => ({
        id,
        label: city.label,
        labelEn: city.labelEn,
      })),
    ];
  });

  filteredHospitals = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const selectedCity = this.selectedCity();

    return this.hospitals().filter((hospital) => {
      const matchesCity =
        selectedCity === 'all' || hospital.locationEn.toLowerCase() === selectedCity;
      const matchesQuery =
        query.length === 0 ||
        hospital.name.toLowerCase().includes(query) ||
        hospital.nameEn.toLowerCase().includes(query) ||
        hospital.location.toLowerCase().includes(query) ||
        hospital.locationEn.toLowerCase().includes(query) ||
        hospital.description.toLowerCase().includes(query) ||
        hospital.descriptionEn.toLowerCase().includes(query);

      return matchesCity && matchesQuery;
    });
  });

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery.set(params.get('q') ?? '');
      this.selectedCity.set(params.get('city') ?? 'all');
    });
  }

  setCity(cityId: string) {
    this.selectedCity.set(cityId);
  }
}