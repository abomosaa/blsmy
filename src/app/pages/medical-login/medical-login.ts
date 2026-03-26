import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-medical-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  templateUrl: './medical-login.html',
})
export class MedicalLogin {
  lang = inject(LanguageService);
  email = '';
  password = '';
  isLoading = signal(false);
  showPassword = signal(false);
  noticeMessage = signal('');

  async onLogin() {
    this.noticeMessage.set('');
    this.isLoading.set(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      this.noticeMessage.set(
        this.lang.isArabic()
          ? 'تم تجهيز واجهة الدخول. سيتم ربط التحقق الفعلي بالخدمة لاحقاً.'
          : 'Login UI is ready. Backend verification will be connected next.'
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}
