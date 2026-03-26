import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <section class="py-24 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-tajawal">
            <span class="text-sky-600">{{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}</span>
            {{ lang.isArabic() ? ' ... يسعدنا تلقي استفساراتك، و سنكون بخدمتك في أسرع وقت' : ' ... We are happy to receive your inquiries] and will serve you as soon as possible' }}
          </h2>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-bold text-slate-700 mb-2">
                <mat-icon class="text-sm align-middle">person</mat-icon>
                {{ lang.isArabic() ? 'الاسم الكامل (مطلوب)' : 'Full Name (required)' }}
              </label>
              <input
                id="name"
                type="text"
                [(ngModel)]="form.name"
                name="name"
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
            </div>
            <div>
              <label for="phone" class="block text-sm font-bold text-slate-700 mb-2">
                <mat-icon class="text-sm align-middle">phone</mat-icon>
                {{ lang.isArabic() ? 'رقم الجوال (مطلوب)' : 'Mobile Number (required)' }}
              </label>
              <input
                id="phone"
                type="tel"
                [(ngModel)]="form.phone"
                name="phone"
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-bold text-slate-700 mb-2">
                <mat-icon class="text-sm align-middle">email</mat-icon>
                {{ lang.isArabic() ? 'البريد الإلكتروني (مطلوب)' : 'Email (required)' }}
              </label>
              <input
                id="email"
                type="email"
                [(ngModel)]="form.email"
                name="email"
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
            </div>
            <div>
              <label for="captcha" class="block text-sm font-bold text-slate-700 mb-2">
                <mat-icon class="text-sm align-middle">verified</mat-icon>
                {{ lang.isArabic() ? 'فضلا الإجابة (مطلوب)' : 'Please answer (required)' }} {{ captchaA }} + {{ captchaB }} = ?
              </label>
              <input
                id="captcha"
                type="number"
                [(ngModel)]="form.captcha"
                name="captcha"
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all">
            </div>
          </div>

          <div>
            <label for="message" class="block text-sm font-bold text-slate-700 mb-2">
              <mat-icon class="text-sm align-middle">edit_note</mat-icon>
              {{ lang.isArabic() ? 'الرسالة (مطلوبة)' : 'Message (required)' }}
            </label>
            <textarea
              id="message"
              [(ngModel)]="form.message"
              name="message"
              required
              rows="5"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"></textarea>
          </div>

          @if (successMessage()) {
            <div class="p-4 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center gap-3">
              <mat-icon>check_circle</mat-icon>
              <span>{{ successMessage() }}</span>
            </div>
          }

          @if (errorMessage()) {
            <div class="p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-3">
              <mat-icon>error</mat-icon>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <div class="flex justify-end">
            <button
              type="submit"
              [disabled]="isSubmitting()"
              class="px-12 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              @if (isSubmitting()) {
                <mat-icon class="animate-spin">autorenew</mat-icon>
                {{ lang.isArabic() ? 'جاري الإرسال...' : 'Sending...' }}
              } @else {
                {{ lang.isArabic() ? 'إرسال' : 'Send' }}
              }
            </button>
          </div>
        </form>

        <!-- Contact Info -->
        <div class="mt-16 grid sm:grid-cols-2 gap-6">
          <a href="tel:+966539366005" class="flex items-center justify-center gap-3 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
            <mat-icon class="text-sky-600">phone</mat-icon>
            <span class="text-slate-700 font-bold" dir="ltr">+966539366005</span>
          </a>
          <a href="mailto:info@blsmy.com" class="flex items-center justify-center gap-3 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
            <mat-icon class="text-sky-600">email</mat-icon>
            <span class="text-sky-600 font-bold">info&#64;blsmy.com</span>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  lang = inject(LanguageService);
  captchaA = Math.floor(Math.random() * 9) + 1;
  captchaB = Math.floor(Math.random() * 9) + 1;

  form: { name: string; email: string; phone: string; captcha: string; message: string } = {
    name: '',
    email: '',
    phone: '',
    captcha: '',
    message: '',
  };

  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  async onSubmit() {
    if (parseInt(this.form.captcha) !== this.captchaA + this.captchaB) {
      this.errorMessage.set(this.lang.isArabic() ? 'الإجابة غير صحيحة، حاول مرة أخرى.' : 'Incorrect answer, please try again.');
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.successMessage.set(
        this.lang.isArabic()
          ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
          : 'Your message has been sent successfully! We will contact you soon.'
      );
      this.form = { name: '', email: '', phone: '', captcha: '', message: '' };
      this.captchaA = Math.floor(Math.random() * 9) + 1;
      this.captchaB = Math.floor(Math.random() * 9) + 1;
    } catch {
      this.errorMessage.set(
        this.lang.isArabic()
          ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.'
          : 'An error occurred while sending. Please try again.'
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
