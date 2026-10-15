import { Component, computed, inject, signal, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SERVICES } from '../core/data/services.data';
import { TESTIMONIALS } from '../core/data/testimonials.data';
import { PARTNERS } from '../core/data/partners.data';
import { RevealDirective } from './reveal';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [FormsModule, RouterLink, RevealDirective],
  templateUrl: './page.html',
})
export class ExperiencePage {
  route = inject(ActivatedRoute);
  page = signal('home');
  query = signal('');
  category = signal('all');
  services = SERVICES.map((service) => ({
    ...service,
    comingSoon: false,
    image: service.image?.replace('https://blsmy.com/images/', 'assets/original/'),
  }));
  featuredServices = ['1', '2', '4', '3'].map(
    (id) => this.services.find((service) => service.id === id)!,
  );
  secondaryServices = [
    '11',
    '10',
    '9',
    '8',
    '7',
    '6',
    '5',
    '18',
    '17',
    '16',
    '15',
    '14',
    '13',
    '12',
  ].map((id) => this.services.find((service) => service.id === id)!);
  additionalServices = ['21', '20', '19'].map(
    (id) => this.services.find((service) => service.id === id)!,
  );
  testimonials = TESTIMONIALS.map((review, index) => ({
    ...review,
    avatar:
      'assets/original/' +
      ['ghayem.37jxozqdtnayw.png', 'sahha.09an2-elivfl2.jpeg', 'bilal.1idots4xgdc_7.jpeg'][index],
  }));
  partners = PARTNERS.map((partner) => ({
    ...partner,
    logo: partner.logo.replace('https://blsmy.com/images/', 'assets/original/'),
  }));
  stats = [
    { value: '250,000', label: 'حجز ناجح', icon: 'stat-0.svg' },
    { value: '70', label: 'المراكز', icon: 'stat-1.svg' },
    { value: '500', label: 'الأطباء', icon: 'stat-2.svg' },
    { value: '35,000', label: 'مستخدم راضي', icon: 'stat-3.svg' },
    { value: '20,000', label: 'تقييم حقيقي', icon: 'stat-4.svg' },
  ];
  appScreens = [
    'screenshot5.webp',
    'screenshot4.webp',
    'screenshot3.webp',
    'screenshot2.webp',
    'screenshot1.webp',
  ];
  scrollPartners(element: HTMLElement, direction: number) {
    element.scrollBy({
      left: direction * Math.max(250, element.clientWidth * 0.8),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
  filteredServices = computed(() =>
    this.services.filter(
      (s) =>
        (this.category() === 'all' || s.category === this.category() || s.category === 'both') &&
        (s.title + (s.description ?? '')).includes(this.query().trim()),
    ),
  );
  filteredPartners = computed(() =>
    this.partners.filter((center) =>
      (center.name + ' ' + (center.nameEn || ''))
        .toLowerCase()
        .includes(this.query().trim().toLowerCase()),
    ),
  );
  specialties = [
    { name: 'الأسنان', icon: '◇', key: 'dental', description: 'عناية تبدأ بابتسامة' },
    { name: 'الجلدية والتجميل', icon: '✧', key: 'skin', description: 'اهتمام ببشرتك وثقتك' },
    { name: 'الطب العام', icon: '✚', key: 'general', description: 'خطوتك الأولى للاطمئنان' },
    { name: 'طب الأطفال', icon: '♧', key: 'children', description: 'رعاية للصغار، وراحة للكبار' },
    { name: 'العيون', icon: '◉', key: 'eyes', description: 'العالم أوضح بصحة عينيك' },
    { name: 'المختبرات', icon: '⌁', key: 'lab', description: 'الفحص بداية الاهتمام' },
  ];
  selectedSpecialty = signal('all');
  filteredSpecialties = computed(() =>
    this.specialties.filter(
      (s) =>
        this.selectedSpecialty() === 'all' ||
        (this.selectedSpecialty() === 'dental' ? s.key === 'dental' : s.key === 'skin'),
    ),
  );
  steps = ['اختيار الخدمة', 'تفاصيل الطلب', 'مراجعة الطلب'];
  step = signal(1);
  booking = {
    center: '',
    specialty: '',
    name: '',
    phone: '',
    date: '',
    period: 'صباحًا',
    consent: false,
  };
  contact = { name: '', email: '', subject: 'استفسار عام', message: '', consent: false };
  messageReady = signal(false);
  contactUrl = signal('');
  error = signal('');
  minDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Riyadh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  faqs = [
    {
      q: 'كيف أطلب موعدًا عبر بلسمي؟',
      a: 'اختر المركز والتخصص، ثم جهّز طلبك عبر الموقع وأرسله إلى فريق بلسمي على واتساب. لتصفّح المواعيد الفعلية وإتمام الحجز، استخدم تطبيق بلسمي.',
    },
    {
      q: 'هل طلب الموعد يعني تأكيد الحجز؟',
      a: 'طلب الموعد لا يعني تأكيده. يؤكد المركز أو فريق بلسمي الموعد بحسب التوفر. لا توجد عملية دفع في هذا الموقع.',
    },
    {
      q: 'كيف ينضم مركزي الطبي إلى بلسمي؟',
      a: 'تواصل مع فريقنا من صفحة التواصل، واختر «انضمام مركز طبي». سنناقش احتياج منشأتك والحلول المناسبة لها.',
    },
    {
      q: 'أين أجد الأسعار والعروض المحدثة؟',
      a: 'تظهر الأسعار والتفاصيل المتاحة داخل تطبيق بلسمي. استفسر عن الشروط والتوفر لدى المركز قبل إتمام الحجز.',
    },
  ];
  constructor() {
    const destroyRef = inject(DestroyRef);
    this.route.data.pipe(takeUntilDestroyed(destroyRef)).subscribe((data) => {
      this.page.set(data['page']);
      this.query.set('');
      this.category.set('all');
      this.messageReady.set(false);
      this.step.set(1);
      this.error.set('');
    });
    this.route.queryParamMap.pipe(takeUntilDestroyed(destroyRef)).subscribe((params) => {
      this.query.set(params.get('q') ?? '');
      const center = params.get('center');
      if (center && this.partners.some((h) => h.name === center)) this.booking.center = center;
      const subject = params.get('subject');
      if (subject) {
        if (
          ['انضمام مركز طبي', 'طلب عرض توضيحي', 'مساعدة في طلب موعد', 'فرص العمل'].includes(subject)
        )
          this.contact.subject = subject;
        else this.contact.message = 'أود الاستفسار عن ' + subject;
      }
      const specialty = params.get('specialty');
      if (specialty && this.specialties.some((s) => s.name === specialty))
        this.booking.specialty = specialty;
    });
  }
  next() {
    this.error.set('');
    if (this.step() === 1 && (!this.booking.center.trim() || !this.booking.specialty)) {
      this.error.set('اختر المركز والتخصص للمتابعة.');
      return;
    }
    this.step.update((n) => Math.min(3, n + 1));
  }
  reviewBooking() {
    this.error.set('');
    if (
      !this.booking.name.trim() ||
      !/^(05\d{8}|5\d{8}|\+9665\d{8}|9665\d{8})$/.test(this.booking.phone.replace(/[\s-]/g, '')) ||
      !this.booking.date ||
      this.booking.date < this.minDate ||
      !this.booking.consent
    ) {
      this.error.set(
        'أدخل اسمك ورقم جوال سعودي صحيح وتاريخًا غير سابق، ووافق على مشاركة بيانات الطلب.',
      );
      return;
    }
    this.step.set(3);
  }
  get bookingUrl() {
    return (
      'https://wa.me/966539366005?text=' +
      encodeURIComponent(
        `مرحبًا بلسمي، أود طلب موعد (بانتظار تأكيد التوفر).\nالمركز: ${this.booking.center}\nالتخصص: ${this.booking.specialty}\nالاسم: ${this.booking.name.trim()}\nالجوال: ${this.booking.phone}\nالتاريخ المفضل: ${this.booking.date}\nالفترة: ${this.booking.period}`,
      )
    );
  }
  prepareMessage() {
    this.error.set('');
    if (
      !this.contact.name.trim() ||
      !this.contact.message.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contact.email) ||
      !this.contact.consent
    ) {
      this.error.set('أكمل الحقول المطلوبة وأدخل بريدًا صحيحًا ووافق على مشاركة رسالتك.');
      return;
    }
    this.contactUrl.set(
      'https://wa.me/966539366005?text=' +
        encodeURIComponent(
          `مرحبًا بلسمي،\nالموضوع: ${this.contact.subject}\nالاسم: ${this.contact.name.trim()}\nالبريد: ${this.contact.email}\n${this.contact.message.trim()}`,
        ),
    );
    this.messageReady.set(true);
  }
}
