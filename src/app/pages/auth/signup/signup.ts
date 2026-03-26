import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  template: `
    <section class="py-24 bg-slate-50 min-h-[80vh] flex items-center">
      <div class="max-w-md mx-auto px-4 w-full">
        <div class="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div class="text-center mb-8">
            <a routerLink="/" class="inline-flex items-center gap-2 mb-4">
              <img src="assets/logo-white.webp" alt="بلسمي" class="h-12" />
              <span class="text-xl font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? 'بلسمي' : 'Blsmy' }}</span>
            </a>
            <h2 class="text-2xl font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? 'إنشاء حساب جديد' : 'Create New Account' }}</h2>
            <p class="text-slate-500 mt-2">{{ lang.isArabic() ? 'انضم إلى بلسمي واحجز مواعيدك بسهولة' : 'Join Blsmy and book your appointments easily' }}</p>
          </div>

          <form (ngSubmit)="onSignup()" class="space-y-5">
            <div>
              <label for="name" class="block text-sm font-bold text-slate-700 mb-2">{{ lang.isArabic() ? 'الاسم الكامل' : 'Full Name' }}</label>
              <input
                id="name"
                type="text"
                [(ngModel)]="name"
                name="name"
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
            </div>

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
              <label for="phone" class="block text-sm font-bold text-slate-700 mb-2">{{ lang.isArabic() ? 'رقم الجوال' : 'Mobile Number' }}</label>
              <input
                id="phone"
                type="tel"
                [(ngModel)]="phone"
                name="phone"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
            </div>

            <div>
              <label for="password" class="block text-sm font-bold text-slate-700 mb-2">{{ lang.isArabic() ? 'كلمة المرور' : 'Password' }}</label>
              <input
                id="password"
                type="password"
                [(ngModel)]="password"
                name="password"
                required
                minlength="8"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
            </div>

            @if (errorMessage()) {
              <div class="p-3 bg-red-50 text-red-700 rounded-xl text-sm flex items-center gap-2">
                <mat-icon class="text-lg">error</mat-icon>
                {{ errorMessage() }}
              </div>
            }

            @if (successMessage()) {
              <div class="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm flex items-center gap-2">
                <mat-icon class="text-lg">check_circle</mat-icon>
                {{ successMessage() }}
              </div>
            }

            <button
              type="submit"
              [disabled]="isLoading()"
              class="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-200 disabled:opacity-50">
              @if (isLoading()) {
                {{ lang.isArabic() ? 'جاري الإنشاء...' : 'Creating...' }}
              } @else {
                {{ lang.isArabic() ? 'إنشاء حساب' : 'Create Account' }}
              }
            </button>
          </form>

          <p class="text-center text-slate-500 mt-6 text-sm">
            {{ lang.isArabic() ? 'لديك حساب بالفعل؟' : 'Already have an account?' }}
            <a routerLink="/auth/login" class="text-sky-600 font-bold hover:underline">{{ lang.isArabic() ? 'تسجيل الدخول' : 'Login' }}</a>
          </p>

          <div class="mt-4 text-center">
            <button (click)="lang.toggle()" class="text-sky-600 text-sm font-bold hover:underline">
              {{ lang.isArabic() ? 'English' : 'عربي' }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Signup {
  lang = inject(LanguageService);
  name = '';
  email = '';
  phone = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  async onSignup() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.successMessage.set(this.lang.isArabic() ? 'سيتم ربط إنشاء الحساب بـ Supabase قريباً.' : 'Account creation will be connected to Supabase soon.');
    } catch {
      this.errorMessage.set(this.lang.isArabic() ? 'حدث خطأ أثناء إنشاء الحساب.' : 'An error occurred while creating the account.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
