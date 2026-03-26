import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  template: `
    <section class="py-24 bg-slate-50 min-h-[80vh] flex items-center">
      <div class="max-w-5xl mx-auto px-4 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Illustration (Desktop) -->
          <div class="hidden lg:block">
            <img src="https://blsmy.com/images/screenshot5.webp" [alt]="lang.isArabic() ? 'منصة بلسمي' : 'Blsmy Platform'" class="w-full h-auto rounded-3xl shadow-xl" referrerpolicy="no-referrer">
          </div>

          <!-- Login Form -->
          <div class="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
            <div class="text-center mb-8">
              <a routerLink="/" class="inline-flex items-center gap-2 mb-4">
                <img src="assets/logo-white.webp" alt="بلسمي" class="h-12" />
                <span class="text-xl font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? 'بلسمي' : 'Blsmy' }}</span>
              </a>
              <h2 class="text-2xl font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? 'تسجيل الدخول' : 'Login' }}</h2>
            </div>

            <form (ngSubmit)="onLogin()" class="space-y-5">
              <div>
                <label for="email" class="block text-sm font-bold text-slate-700 mb-2">{{ lang.isArabic() ? 'البريد الإلكتروني' : 'Email' }}</label>
                <input
                  id="email"
                  type="email"
                  [(ngModel)]="email"
                  name="email"
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
              </div>

              <div>
                <label for="password" class="block text-sm font-bold text-slate-700 mb-2">{{ lang.isArabic() ? 'كلمة المرور' : 'Password' }}</label>
                <div class="relative">
                  <input
                    id="password"
                    [type]="showPassword() ? 'text' : 'password'"
                    [(ngModel)]="password"
                    name="password"
                    required
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
                  <button type="button" (click)="showPassword.update(v => !v)" class="absolute {{ lang.isArabic() ? 'left-3' : 'right-3' }} top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>
              </div>

              <div class="text-right">
                <a href="#" class="text-sky-600 text-sm font-medium hover:underline">{{ lang.isArabic() ? 'هل نسيت كلمة المرور ؟' : 'Forgot your password?' }}</a>
              </div>

              @if (errorMessage()) {
                <div class="p-3 bg-red-50 text-red-700 rounded-xl text-sm flex items-center gap-2">
                  <mat-icon class="text-lg">error</mat-icon>
                  {{ errorMessage() }}
                </div>
              }

              <button
                type="submit"
                [disabled]="isLoading()"
                class="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-200 disabled:opacity-50">
                @if (isLoading()) {
                  {{ lang.isArabic() ? 'جاري التسجيل...' : 'Logging in...' }}
                } @else {
                  {{ lang.isArabic() ? 'تسجيل الدخول' : 'Login' }}
                }
              </button>
            </form>

            <div class="mt-6 text-center space-y-3">
              <button (click)="lang.toggle()" class="text-sky-600 text-sm font-bold hover:underline">
                {{ lang.isArabic() ? 'English' : 'عربي' }}
              </button>
              <p>
                <a routerLink="/" class="text-slate-500 text-sm hover:text-sky-600 transition-colors">{{ lang.isArabic() ? 'الذهاب لموقع بلسمي' : 'Go to Blsmy website' }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Login {
  lang = inject(LanguageService);
  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  async onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.errorMessage.set(this.lang.isArabic() ? 'سيتم ربط تسجيل الدخول بـ Supabase قريباً.' : 'Login will be connected to Supabase soon.');
    } catch {
      this.errorMessage.set(this.lang.isArabic() ? 'حدث خطأ أثناء تسجيل الدخول.' : 'An error occurred during login.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
