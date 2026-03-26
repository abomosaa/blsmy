import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <footer class="bg-sky-700 text-sky-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-2">
            <div class="flex items-center gap-2 text-white mb-6">
              <img src="assets/logo-white.webp" alt="بلسمي" class="h-8 w-auto" />
              <span class="text-xl font-bold font-tajawal">{{ lang.isArabic() ? 'بلسمي' : 'Blsmy' }}</span>
            </div>
            <p class="max-w-sm leading-relaxed mb-8 text-sky-100">
              {{ lang.isArabic()
                ? 'بلسمي منصة رقمية تجمع المراكز الطبية والعملاء تحت سقف واحد، نقوم بتسهيل إدارة و حجز المواعيد كما نتيح التحكم بجداول الأطباء و العيادات بكل سهولة.'
                : 'Blsmy is a digital platform that brings medical centers and clients together under one roof. We simplify appointment management and booking, and allow easy control of doctor and clinic schedules.' }}
            </p>
            <!-- Social Links -->
            <p class="text-sm text-sky-100 mb-3">{{ lang.isArabic() ? 'تابعنا' : 'Follow Us' }}</p>
            <div class="flex gap-3 mb-8">
              <!-- Instagram -->
              <a href="https://www.instagram.com/blsmycom/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <!-- Twitter / X -->
              <a href="https://twitter.com/BlsmyCom" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all" style="background:#000000;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <!-- TikTok -->
              <a href="https://www.tiktok.com/@blsmyCom" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all" style="background:#000000;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.16 8.16 0 004.77 1.52V7.1a4.85 4.85 0 01-1-.41z"/></svg>
              </a>
              <!-- Facebook -->
              <a href="https://www.facebook.com/share/Gn9gVVKck78sinXF/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all" style="background:#1877F2;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.313 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <!-- Snapchat -->
              <a href="https://www.snapchat.com/add/blsmycom?invite_id=9FDHh02I&locale=ar_SA%40calendar%3Dgregorian&share_id=sIaTM5pBTliRZKbwJQ-MXA&sid=6f6016602a084728805609e1e519c911" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all" style="background:#FFFC00;">
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#000" d="M12.166 4c-1.35 0-3.91.525-5.057 3.093-.247.55-.272 1.176-.3 1.755l-.005.3c-.005.167-.062.323-.174.415-.106.089-.25.11-.38.11-.162 0-.354-.09-.632-.09-.68 0-1.072.267-1.072.643 0 .376.37.643.972.643.097 0 .208.064.208.26 0 .508-1.06 1.68-2.135 2.34-.258.158-.392.4-.392.646 0 .46.443.815 1.023.815.118 0 .232-.015.338-.04.204.857 1.027 1.65 2.13 2.258.493.27.769.62.769.973 0 .166-.05.331-.145.499-.232.413-.364.81-.364 1.214 0 .58.34.97.906 1.145.35.11.655.1 1.092.1.376 0 .74-.021 1.09-.085.344-.13.71-.26 1.132-.26.416 0 .778.129 1.117.258.35.065.717.086 1.092.086.437 0 .742.01 1.092-.1.566-.175.906-.565.906-1.145 0-.404-.132-.8-.364-1.214-.095-.168-.145-.333-.145-.499 0-.353.276-.703.769-.973 1.103-.608 1.926-1.401 2.13-2.258.106.025.22.04.338.04.58 0 1.023-.355 1.023-.815 0-.246-.134-.488-.392-.646-1.075-.66-2.135-1.832-2.135-2.34 0-.196.111-.26.208-.26.602 0 .972-.267.972-.643 0-.376-.392-.643-1.072-.643-.278 0-.47.09-.632.09-.13 0-.274-.021-.38-.11-.112-.092-.169-.248-.174-.415l-.005-.3c-.028-.579-.053-1.205-.3-1.755C16.076 4.525 13.516 4 12.166 4z"/></svg>
              </a>
              <!-- LinkedIn -->
              <a href="https://www.linkedin.com/company/blsmycom" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all" style="background:#0A66C2;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
            <!-- Payment Methods -->
            <div class="flex items-center gap-4">
              <span class="text-xs text-sky-100">{{ lang.isArabic() ? 'طرق الدفع:' : 'Payment:' }}</span>
              <div class="flex gap-2">
                <span class="px-2 py-1 bg-sky-800 rounded text-xs text-white font-bold">Mastercard</span>
                <span class="px-2 py-1 bg-sky-800 rounded text-xs text-white font-bold">Visa</span>
                <span class="px-2 py-1 bg-sky-800 rounded text-xs text-white font-bold">Apple Pay</span>
                <span class="px-2 py-1 bg-sky-800 rounded text-xs text-white font-bold">Mada</span>
                <span class="px-2 py-1 bg-sky-800 rounded text-xs text-white font-bold">Tabby</span>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6 font-tajawal">{{ lang.isArabic() ? 'روابط سريعة' : 'Quick Links' }}</h4>
            <ul class="space-y-4">
              <li><a routerLink="/prices" class="hover:text-white transition-colors">{{ lang.isArabic() ? 'انضم لبلسمي' : 'Join Blsmy' }}</a></li>
              <li><a routerLink="/jobs" class="hover:text-white transition-colors">{{ lang.isArabic() ? 'انضم لفريقنا' : 'Join Our Team' }}</a></li>
              <li><a routerLink="/contact" class="hover:text-white transition-colors">API</a></li>
              <li><a routerLink="/contact" class="hover:text-white transition-colors">{{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6 font-tajawal">{{ lang.isArabic() ? 'حمل التطبيق' : 'Download App' }}</h4>
            <p class="text-sm mb-4 text-sky-100">{{ lang.isArabic() ? 'حمل تطبيق بلسمي لحجز مواعيدك بسهولة' : 'Download Blsmy app to book appointments easily' }}</p>
            <div class="flex flex-col gap-2 mb-6">
              <a href="https://apps.apple.com/sa/app/%D8%A8%D9%84%D8%B3%D9%85%D9%8A/id1609392362?l=ar" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-90 transition-colors" style="background:#000000;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <span class="text-sm text-white font-medium">App Store</span>
              </a>
              <a href="https://play.google.com/store/apps/details?id=sa.balsam" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-90 transition-colors" style="background:#000000;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M3.18 23.76c.3.17.64.24.99.2L16.19 12 12.4 8.21 3.18 23.76zm17.09-11.06L17.6 11.3 13.63 12l3.97 3.97 2.67-1.5a1.54 1.54 0 000-2.77zM2.87.29a1.5 1.5 0 00-.69 1.3v20.82c0 .55.26 1.03.69 1.3L15 12 2.87.29zm10.76 11.01L17.6 7.33l-2.67-1.5c-.94-.53-2.12-.21-2.67.73L3.18.24l9.45 11.06z"/></svg>
                <span class="text-sm text-white font-medium">Google Play</span>
              </a>
            </div>
            <!-- WhatsApp icon only -->
            <a href="https://wa.me/966539366005" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all" style="background:#25D366;">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z"/></svg>
            </a>
          </div>
        </div>

        <div class="pt-8 border-t border-sky-600">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div>
              <p>© {{ currentYear() }} {{ lang.isArabic() ? 'جميع الحقوق محفوظة لشركة فن التطبيقات لتقنية المعلومات' : 'All rights reserved - Fan Al-Tatbiqat Information Technology' }}</p>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-4 text-xs text-sky-100">
              <span>{{ lang.isArabic() ? 'سجل تجاري رقم ٢٠٥٠١٤٢٦٣٧' : 'CR: 2050142637' }}</span>
              <span class="hidden sm:inline">|</span>
              <span>{{ lang.isArabic() ? 'الرقم الضريبي: 312066452700003' : 'VAT: 312066452700003' }}</span>
              <span class="hidden sm:inline">|</span>
              <a routerLink="/contact" class="hover:text-white transition-colors">{{ lang.isArabic() ? 'سياسة الخصوصية' : 'Privacy Policy' }}</a>
              <span class="hidden sm:inline">|</span>
              <a href="https://eauthenticate.saudibusiness.gov.sa/certificate-details/0000110154" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">{{ lang.isArabic() ? 'التحقق الإلكتروني' : 'E-Authenticate' }}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  lang = inject(LanguageService);
  currentYear = signal(new Date().getFullYear());
}
