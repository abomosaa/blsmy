import { Component, inject, signal, DestroyRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a>
    <div class="topbar">
      <div class="container">
        <span>رعاية أقرب لك، أينما كنت</span
        ><a routerLink="/prices">لديك مركز طبي؟ <strong>انضم إلى بلسمي ←</strong></a>
      </div>
    </div>
    <header class="header">
      <div class="container nav-row">
        <a routerLink="/" class="brand" aria-label="بلسمي، الرئيسية"
          ><span class="brand-symbol">✦</span><span>بلسمي<small>BLSMY</small></span></a
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
        <a routerLink="/book" class="button nav-book"
          >احجز موعدك <span aria-hidden="true">↖</span></a
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
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a routerLink="/" class="brand"
              ><span class="brand-symbol">✦</span><span>بلسمي<small>BLSMY</small></span></a
            >
            <p>
              منصة رقمية تجمع المراكز الطبية والمراجعين؛ لتصبح رحلة الرعاية أكثر سهولة، من اختيار
              المركز إلى طلب الموعد.
            </p>
            <div class="socials">
              <a
                href="https://www.instagram.com/blsmycom/"
                target="_blank"
                rel="noopener noreferrer"
                >Instagram ↗</a
              ><a
                href="https://www.linkedin.com/company/blsmycom"
                target="_blank"
                rel="noopener noreferrer"
                >LinkedIn ↗</a
              >
            </div>
          </div>
          <div>
            <h3>اكتشف بلسمي</h3>
            <a routerLink="/about">عن بلسمي</a><a routerLink="/hospitals">المراكز الطبية</a
            ><a routerLink="/offers">الخدمات والعروض</a><a routerLink="/services">خدماتنا</a>
          </div>
          <div>
            <h3>للمراكز الطبية</h3>
            <a routerLink="/prices">الحلول والباقات</a
            ><a routerLink="/medical-login">بوابة المراكز</a><a routerLink="/jobs">الانضمام إلينا</a
            ><a routerLink="/contact">اطلب عرضًا توضيحيًا</a>
          </div>
          <div>
            <h3>نحن هنا لمساعدتك</h3>
            <a href="tel:+966539366005" dir="ltr">+966 53 936 6005</a
            ><a href="mailto:info@blsmy.com">info&#64;blsmy.com</a
            ><a href="https://wa.me/966539366005" target="_blank" rel="noopener noreferrer"
              >تحدث معنا عبر واتساب ↗</a
            ><a routerLink="/contact">تواصل معنا</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© {{ year }} بلسمي. جميع الحقوق محفوظة.</span>
          <div>
            <a routerLink="/privacy">الخصوصية</a
            ><a href="https://blsmy.com/terms" target="_blank" rel="noopener noreferrer"
              >الشروط والأحكام ↗</a
            >
          </div>
          <span>صُنع بعناية، من أجلك <span class="coral">♥</span></span>
        </div>
      </div>
    </footer>
  `,
})
export class App {
  menuOpen = signal(false);
  year = new Date().getFullYear();
  links = [
    { path: '/', label: 'الرئيسية' },
    { path: '/services', label: 'خدماتنا' },
    { path: '/hospitals', label: 'المراكز الطبية' },
    { path: '/offers', label: 'الخدمات والعروض' },
    { path: '/about', label: 'عن بلسمي' },
    { path: '/contact', label: 'تواصل معنا' },
  ];
  constructor() {
    const destroyRef = inject(DestroyRef);
    inject(Router)
      .events.pipe(takeUntilDestroyed(destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) this.menuOpen.set(false);
      });
  }
}
