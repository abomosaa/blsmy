import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

/** One-shot, progressive reveal. Content stays visible without animation support. */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    if (
      !('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    this.host.classList.add('reveal-pending');
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.host.classList.remove('reveal-pending');
          this.host.classList.add('reveal-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    this.observer.observe(this.host);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
