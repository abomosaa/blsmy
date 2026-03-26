import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'ar' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLang = signal<Lang>(this.getInitialLang());

  constructor() {
    this.applyDocumentDirection(this.currentLang());
  }

  lang = this.currentLang.asReadonly();
  isArabic = computed(() => this.currentLang() === 'ar');
  dir = computed(() => (this.currentLang() === 'ar' ? 'rtl' : 'ltr'));

  toggle() {
    const newLang: Lang = this.currentLang() === 'ar' ? 'en' : 'ar';
    this.setLang(newLang);
  }

  setLang(lang: Lang) {
    this.currentLang.set(lang);
    this.applyDocumentDirection(lang);
    localStorage.setItem('blsmy-lang', lang);
  }

  private applyDocumentDirection(lang: Lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
  }

  private getInitialLang(): Lang {
    const stored = localStorage.getItem('blsmy-lang');
    if (stored === 'ar' || stored === 'en') return stored;
    return 'ar';
  }
}
