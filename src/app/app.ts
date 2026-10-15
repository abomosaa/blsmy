import { Component, inject, signal, DestroyRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <a class="skip-link" href="#main-content" (click)="skipToContent($event)">تجاوز إلى المحتوى</a>
    <div class="topbar">
      <div class="container">
        <span>منصتك ... لحلول صحية ذكية</span
        ><a href="https://medical.blsmy.com" target="_blank" rel="noopener noreferrer"
          >تسجيل دخول المراكز الطبية ↗</a
        >
      </div>
    </div>
    <header class="header" (keydown.escape)="menuOpen.set(false)">
      <div class="container nav-row">
        <a routerLink="/" class="brand" aria-label="بلسمي، الرئيسية"
          ><img
            class="original-brand-mark"
            src="assets/original/logo-blsam-mobile.webp"
            alt=""
            width="50"
            height="50"
          /><span>بلسمي<small>لحلول صحية ذكية</small></span></a
        >
        <nav aria-label="القائمة الرئيسية" [class.open]="menuOpen()" id="site-navigation">
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="active"
              ariaCurrentWhenActive="page"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              >{{ link.label }}</a
            >
          }
        </nav>
        <a
          routerLink="/contact"
          [queryParams]="{ subject: 'انضمام مركز طبي' }"
          class="button nav-book"
          >انضم لبلسمي <span aria-hidden="true">↖</span></a
        >
        <button
          class="menu-toggle"
          (click)="menuOpen.set(!menuOpen())"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="site-navigation"
          [attr.aria-label]="menuOpen() ? 'إغلاق القائمة' : 'فتح القائمة'"
        >
          {{ menuOpen() ? '✕' : '☰' }}
        </button>
      </div>
    </header>
    <main id="main-content" tabindex="-1"><router-outlet /></main>
    <footer class="source-footer">
      <div class="container">
        <div class="source-footer-grid">
          <div class="source-footer-brand">
            <a routerLink="/" aria-label="بلسمي، الرئيسية" class="footer-brand"
              ><img
                src="assets/original/logo-white.webp"
                alt="شعار بلسمي"
                width="72"
                height="68"
              /><span>بلسمي<small>منصتك لحلول صحية ذكية</small></span></a
            >
            <p>منصة رقمية تجمع المراكز الطبية والعملاء تحت سقف واحد.</p>
            <span class="social-label">تابعنا</span>
            <div class="source-socials">
              @for (social of socials; track social.name) {
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="social.name"
                  >{{ social.symbol }}</a
                >
              }
            </div>
            <div class="source-payments" aria-label="وسائل الدفع المعروضة في منصة بلسمي">
              @for (payment of payments; track payment.file) {
                <img
                  [src]="'assets/original/' + payment.file"
                  [alt]="payment.name"
                  width="50"
                  height="26"
                  loading="lazy"
                />
              }
            </div>
          </div>
          <div class="source-footer-links">
            <h2>روابط تهمك</h2>
            <a routerLink="/contact" [queryParams]="{ subject: 'انضمام مركز طبي' }">انضم لبلسمي</a
            ><a routerLink="/jobs">انضم لفريقنا</a
            ><a
              href="https://developer.blsmy.com/docs/overview/"
              target="_blank"
              rel="noopener noreferrer"
              >API — الربط البرمجي ↗</a
            ><a
              href="https://blsmy.com/integration-status"
              target="_blank"
              rel="noopener noreferrer"
              >حالة الاتصال بالأنظمة ↗</a
            ><a routerLink="/contact">تواصل معنا</a><a routerLink="/hospitals">المراكز الطبية</a
            ><a href="https://medical.blsmy.com" target="_blank" rel="noopener noreferrer"
              >تسجيل دخول المراكز ↗</a
            >
          </div>
          <div class="source-footer-app">
            <h2>حمل تطبيق بلسمي<br />لحجز مواعيدك بسهولة</h2>
            <div class="source-store-links">
              <a
                href="https://apps.apple.com/sa/app/id1609392362"
                target="_blank"
                rel="noopener noreferrer"
                ><span class="store-symbol">●</span
                ><span><small>حمّله من</small><strong>App Store</strong></span></a
              ><a
                href="https://play.google.com/store/apps/details?id=sa.balsam"
                target="_blank"
                rel="noopener noreferrer"
                ><span class="store-symbol">▷</span
                ><span><small>متوفر على</small><strong>Google Play</strong></span></a
              >
            </div>
            <a
              href="https://wa.me/966539366005"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-contact"
              >تحدث معنا عبر واتساب ↗</a
            ><a href="mailto:info@blsmy.com" class="footer-contact">info&#64;blsmy.com</a>
          </div>
        </div>
        <div class="source-footer-bottom">
          <div>
            <p>جميع الحقوق محفوظة لشركة فن التطبيقات لتقنية المعلومات © {{ year }}</p>
            <span>سجل تجاري رقم <bdi>٢٠٥٠١٤٢٦٣٧</bdi></span
            ><span class="legal-divider">|</span><a routerLink="/privacy">الخصوصية</a
            ><span class="legal-divider">|</span
            ><a href="https://blsmy.com/terms" target="_blank" rel="noopener noreferrer"
              >سياسة الخصوصية والشروط الأصلية ↗</a
            >
          </div>
          <div class="source-certificates">
            <a
              href="https://eauthenticate.saudibusiness.gov.sa/certificate-details/0000110154"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="التحقق الإلكتروني من المركز السعودي للأعمال"
              ><img
                src="assets/original/sbc.png"
                alt="المركز السعودي للأعمال"
                width="115"
                height="34"
                loading="lazy"
            /></a>
            <div><span>الرقم الضريبي</span><strong dir="ltr">312066452700003</strong></div>
            <img
              src="assets/original/vat.png"
              alt="ضريبة القيمة المضافة"
              width="28"
              height="37"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
    <a
      class="floating-support"
      href="https://wa.me/966539366005"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="الدعم الفني عبر واتساب"
      ><svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.6a8 8 0 0 1-11.8 7L3 20l1.4-5.1A8 8 0 1 1 20 11.6Z" />
        <path
          d="M8.1 7.9c-.4 2.8 2 5.3 4.8 6.6.8.4 1.7.4 2.2-.1l.8-1-2.5-1.3-.8.8c-1.5-.7-2.5-1.7-3.2-3.1l.6-.8-1-2.1Z"
        /></svg
    ></a>
  `,
})
export class App {
  menuOpen = signal(false);
  year = new Date().getFullYear();
  links = [
    { path: '/', label: 'الرئيسية' },
    { path: '/services', label: 'خدمات بلسمي' },
    { path: '/hospitals', label: 'المراكز الطبية' },
    { path: '/offers', label: 'الخدمات والعروض' },
    { path: '/about', label: 'عن بلسمي' },
    { path: '/contact', label: 'تواصل معنا' },
  ];
  payments = [
    { file: 'mastercard.png', name: 'Mastercard' },
    { file: 'visa.png', name: 'Visa' },
    { file: 'applePay.png', name: 'Apple Pay' },
    { file: 'mada.png', name: 'مدى' },
    { file: 'tabby.svg', name: 'تابي' },
  ];
  socials = [
    { name: 'Instagram', symbol: '◎', url: 'https://www.instagram.com/blsmycom/' },
    { name: 'X', symbol: '𝕏', url: 'https://twitter.com/BlsmyCom' },
    { name: 'TikTok', symbol: '♪', url: 'https://www.tiktok.com/@blsmyCom' },
    {
      name: 'Facebook',
      symbol: 'f',
      url: 'https://www.facebook.com/share/Gn9gVVKck78sinXF/?mibextid=LQQJ4d',
    },
    { name: 'Snapchat', symbol: '♧', url: 'https://www.snapchat.com/add/blsmycom' },
    { name: 'LinkedIn', symbol: 'in', url: 'https://www.linkedin.com/company/blsmycom' },
  ];
  skipToContent(event: Event) {
    event.preventDefault();
    const main = document.getElementById('main-content');
    main?.focus();
    main?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  constructor() {
    const destroyRef = inject(DestroyRef);
    inject(Router)
      .events.pipe(takeUntilDestroyed(destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) this.menuOpen.set(false);
      });
  }
}
