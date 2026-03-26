import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <div [dir]="lang.dir()" [class.font-tajawal]="lang.isArabic()">
      <app-navbar />
      <main class="pt-20 lg:pt-32 min-h-screen">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class MainLayout {
  lang = inject(LanguageService);
}
