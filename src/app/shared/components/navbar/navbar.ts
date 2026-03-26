import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatIconModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="hidden lg:grid grid-cols-[auto_1fr_auto] items-center gap-6 py-4">
          <a routerLink="/" class="justify-self-end flex items-center gap-2">
            <img src="assets/logo-white.webp" alt="بلسمي" class="h-11 w-auto" />
            <span class="text-2xl font-bold text-slate-900 font-tajawal tracking-tight">{{ lang.isArabic() ? 'بلسمي' : 'Blsmy' }}</span>
          </a>

          <div class="flex items-center justify-center gap-4 text-slate-600 text-sm font-bold">
            <a routerLink="/offers" class="hover:text-sky-600 transition-colors">{{ lang.isArabic() ? 'العروض' : 'Offers' }}</a>
            <span class="text-slate-300">|</span>
            <a routerLink="/hospitals" class="hover:text-sky-600 transition-colors">{{ lang.isArabic() ? 'المراكز الطبية' : 'Medical Centers' }}</a>
            <span class="text-slate-300">|</span>
            <a routerLink="/contact" class="hover:text-sky-600 transition-colors">{{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}</a>
            <span class="text-slate-300">|</span>

            <div #loginMenuContainer class="relative">
              <button
                type="button"
                (click)="toggleLoginMenu($event)"
                class="text-slate-700 hover:text-sky-600 transition-colors flex items-center gap-1">
                {{ lang.isArabic() ? 'تسجيل الدخول' : 'Login' }}
                <mat-icon class="text-base">expand_more</mat-icon>
              </button>

              @if (showLoginMenu()) {
                <div
                  class="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 py-2 min-w-[220px] z-50"
                  (click)="$event.stopPropagation()">
                  <button
                    type="button"
                    (click)="openPatientLoginModal()"
                    class="w-full text-right block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-sky-600 text-sm font-medium">
                    {{ lang.isArabic() ? 'مراجع' : 'Patient' }}
                  </button>
                  <a
                    routerLink="/medical-login"
                    (click)="closeLoginMenu()"
                    class="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-sky-600 text-sm font-medium">
                    {{ lang.isArabic() ? 'تسجيل دخول مركز طبي' : 'Medical center login' }}
                  </a>
                </div>
              }
            </div>
          </div>

          <div class="justify-self-start flex items-center gap-3">
            <button (click)="lang.toggle()" class="px-3 py-2 text-sm font-bold text-slate-600 hover:text-sky-600 border border-slate-200 rounded-full transition-all hover:border-sky-300">
              {{ lang.isArabic() ? 'En' : 'عربي' }}
            </button>
            <a routerLink="/prices"
               class="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl transition-colors active:scale-95">
              {{ lang.isArabic() ? 'انضم لبلسمي' : 'Join Blsmy' }}
            </a>
          </div>
        </div>

        <div class="lg:hidden flex items-center justify-between h-20">
          <a routerLink="/" class="flex items-center gap-2">
            <img src="assets/logo-white.webp" alt="بلسمي" class="h-10 w-auto" />
            <span class="text-xl font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? 'بلسمي' : 'Blsmy' }}</span>
          </a>

          <div class="flex items-center gap-2">
            <a routerLink="/prices" class="px-3 py-2 bg-sky-600 text-white text-sm font-bold rounded-lg">
              {{ lang.isArabic() ? 'انضم' : 'Join' }}
            </a>
            <button (click)="toggleMenu()" class="p-2 text-slate-600">
              <mat-icon>{{ isMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>

      @if (isMenuOpen()) {
        <div class="lg:hidden bg-white border-b border-slate-200 animate-fade-in-up">
          <div class="px-4 pt-3 pb-6 space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <a routerLink="/offers" (click)="closeMenu()" class="block px-4 py-3 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50">{{ lang.isArabic() ? 'العروض' : 'Offers' }}</a>
              <a routerLink="/hospitals" (click)="closeMenu()" class="block px-4 py-3 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50">{{ lang.isArabic() ? 'المراكز الطبية' : 'Medical Centers' }}</a>
              <a routerLink="/contact" (click)="closeMenu()" class="block px-4 py-3 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50">{{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}</a>
              <button type="button" (click)="toggleMobileLoginOptions()" class="block px-4 py-3 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 text-right">
                {{ lang.isArabic() ? 'تسجيل الدخول' : 'Login' }}
              </button>
            </div>

            @if (showMobileLoginOptions()) {
              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2">
                <button type="button" (click)="openPatientLoginModal()" class="w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 border border-slate-200 text-right">
                  {{ lang.isArabic() ? 'مراجع' : 'Patient' }}
                </button>
                <a routerLink="/medical-login" (click)="closeMenu()" class="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 border border-slate-200">
                  {{ lang.isArabic() ? 'تسجيل دخول مركز طبي' : 'Medical center login' }}
                </a>
              </div>
            }

            <div class="pt-2 grid grid-cols-2 gap-2">
              <button (click)="lang.toggle()" class="py-3 text-slate-600 font-medium border border-slate-200 rounded-xl">
                {{ lang.isArabic() ? 'English' : 'عربي' }}
              </button>
              <a routerLink="/jobs" (click)="closeMenu()" class="text-center py-3 bg-sky-600 text-white font-bold rounded-xl">{{ lang.isArabic() ? 'انضم لفريقنا' : 'Join Team' }}</a>
            </div>
          </div>
        </div>
      }
    </nav>

    @if (showPatientLoginModal()) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4" (click)="closePatientLoginModal()">
        <div class="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl" (click)="$event.stopPropagation()">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-2xl font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? 'تسجيل دخول المراجع' : 'Patient Login' }}</h3>
              <p class="mt-2 text-sm text-slate-500">{{ lang.isArabic() ? 'أدخل رقم الجوال لإرسال رمز التحقق.' : 'Enter your mobile number to receive a verification code.' }}</p>
            </div>
            <button type="button" (click)="closePatientLoginModal()" class="text-slate-400 hover:text-slate-600">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div class="mt-6 space-y-4">
            <div>
              <label class="mb-2 block text-sm font-bold text-slate-700">{{ lang.isArabic() ? 'رقم الجوال' : 'Mobile Number' }}</label>
              <div class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span class="text-sm font-bold text-slate-500">+966</span>
                <input
                  type="tel"
                  [(ngModel)]="patientPhone"
                  [placeholder]="lang.isArabic() ? '5xxxxxxxx' : '5xxxxxxxx'"
                  class="w-full bg-transparent text-sm text-slate-700 outline-none"
                  [class.text-right]="lang.isArabic()"
                  [class.text-left]="!lang.isArabic()">
              </div>
            </div>
            @if (otpStep() === 2) {
              <div>
                <label class="mb-2 block text-sm font-bold text-slate-700">{{ lang.isArabic() ? 'رمز التحقق' : 'Verification Code' }}</label>
                <input
                  type="text"
                  [(ngModel)]="patientOtp"
                  [placeholder]="lang.isArabic() ? 'أدخل الرمز المرسل' : 'Enter the code sent'"
                  class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-500"
                  [class.text-right]="lang.isArabic()"
                  [class.text-left]="!lang.isArabic()">
              </div>
            }
            @if (otpMessage()) {
              <div class="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
                {{ otpMessage() }}
              </div>
            }
            <div class="flex gap-3">
              @if (otpStep() === 1) {
                <button type="button" (click)="requestOtp()" class="flex-1 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700">
                  {{ lang.isArabic() ? 'إرسال الرمز' : 'Send Code' }}
                </button>
              } @else {
                <button type="button" (click)="submitOtp()" class="flex-1 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700">
                  {{ lang.isArabic() ? 'تأكيد الدخول' : 'Confirm Login' }}
                </button>
              }
              <button type="button" (click)="closePatientLoginModal()" class="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
                {{ lang.isArabic() ? 'إغلاق' : 'Close' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class Navbar {
  @ViewChild('loginMenuContainer') loginMenuContainer?: ElementRef<HTMLElement>;

  lang = inject(LanguageService);
  isMenuOpen = signal(false);
  showLoginMenu = signal(false);
  showMobileLoginOptions = signal(false);
  showPatientLoginModal = signal(false);
  otpStep = signal(1);
  otpMessage = signal('');
  patientPhone = '';
  patientOtp = '';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node | null;

    if (!target) {
      return;
    }

    if (this.loginMenuContainer?.nativeElement.contains(target)) {
      return;
    }

    this.closeLoginMenu();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeLoginMenu();
    this.closePatientLoginModal();
  }

  toggleLoginMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showLoginMenu.update((value) => !value);
  }

  closeLoginMenu() {
    this.showLoginMenu.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.showMobileLoginOptions.set(false);
  }

  toggleMobileLoginOptions() {
    this.showMobileLoginOptions.update((value) => !value);
  }

  openPatientLoginModal() {
    this.closeLoginMenu();
    this.closeMenu();
    this.otpStep.set(1);
    this.otpMessage.set('');
    this.patientPhone = '';
    this.patientOtp = '';
    this.showPatientLoginModal.set(true);
  }

  closePatientLoginModal() {
    this.showPatientLoginModal.set(false);
  }

  requestOtp() {
    if (!this.patientPhone.trim()) {
      this.otpMessage.set(
        this.lang.isArabic()
          ? 'يرجى إدخال رقم الجوال.'
          : 'Please enter your mobile number.'
      );
      return;
    }

    this.otpStep.set(2);
    this.otpMessage.set(
      this.lang.isArabic()
        ? 'تم إرسال رمز التحقق. هذه واجهة أولية لحين ربط الخدمة.'
        : 'Verification code sent. This is a UI-only flow until the service is connected.'
    );
  }

  submitOtp() {
    if (!this.patientOtp.trim()) {
      this.otpMessage.set(
        this.lang.isArabic()
          ? 'يرجى إدخال رمز التحقق.'
          : 'Please enter the verification code.'
      );
      return;
    }

    this.otpMessage.set(
      this.lang.isArabic()
        ? 'تم التحقق مبدئياً. سيتم ربط تسجيل الدخول بالخدمة لاحقاً.'
        : 'Verification completed locally. Login will be connected to the service later.'
    );
  }
}
