import { Component, computed, inject, signal, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SERVICES } from '../core/data/services.data';
import { HOSPITALS } from '../core/data/hospitals.data';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './page.html',
})
export class ExperiencePage {
  route = inject(ActivatedRoute);
  router = inject(Router);
  page = signal('home');
  query = signal('');
  city = signal('all');
  category = signal('all');
  private descriptions: Record<string, string> = {
    '5': 'أكواد ترويجية لدعم حملات مركزك وربطها بعروض الخدمات.',
    '6': 'عرض خدمات ومنتجات المركز في متجر إلكتروني ضمن الحلول المتفق عليها.',
    '7': 'مساحة رقمية تعرّف بمركزك وتعرض خدماته وطرق التواصل معه.',
    '8': 'تذكيرات بالمواعيد تساعد المراجع على تنظيم زيارته القادمة.',
    '9': 'خيارات سداد إلكتروني ضمن الخدمات المتاحة للمركز حسب الإعداد والاتفاق.',
    '10': 'خيارات ربط تقني تُدرس وفق أنظمة المركز ومتطلبات التكامل.',
    '11': 'تسجيل وصول المراجع بخطوات ذاتية ضمن تجربة المركز الرقمية.',
    '12': 'تنظيم بيانات التأمين ضمن الحلول المتاحة؛ قبول التغطية يُؤكد لدى المركز.',
    '13': 'الوصول إلى نتائج المختبر والوصفات وتقارير الأشعة حسب ربط المركز وإتاحتها.',
    '14': 'تنظيم نطاق الحجوزات وفق احتياجات المركز وجداول عياداته.',
    '15': 'تعريف المراجعين بمركزك وخدماته عبر حضوره في منصة بلسمي.',
    '16': 'حل يساعد المنشآت على تنظيم احتياجات التوظيف ضمن خدماتها الرقمية.',
    '17': 'عرض مركزك في تطبيق بلسمي ليسهل التعرف على خدماته وطلب موعد.',
    '18': 'تنظيم طلبات الزيارات المنزلية لدى المراكز التي توفر هذه الخدمة.',
    '19': 'حل مخطط لمكافأة تفاعل المراجعين؛ استفسر من الفريق عن موعد إتاحته.',
    '20': 'خيار مخطط للاستشارات عن بُعد؛ استفسر عن الإتاحة والمراكز المشاركة.',
    '21': 'خدمة دعم موسعة مخطط لها، ويُحدد نطاقها وتوفرها مع الفريق.',
  };
  services = SERVICES.map((service) => ({
    ...service,
    description: service.description || this.descriptions[service.id],
  }));
  hospitals = HOSPITALS;
  filteredServices = computed(() =>
    this.services.filter(
      (s) =>
        (this.category() === 'all' || s.category === this.category() || s.category === 'both') &&
        (s.title + (s.description ?? '')).includes(this.query().trim()),
    ),
  );
  filteredHospitals = computed(() =>
    this.hospitals.filter(
      (h) =>
        (this.city() === 'all' || h.locationEn.toLowerCase() === this.city()) &&
        (h.name + h.location).includes(this.query().trim()),
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
      this.city.set('all');
      this.category.set('all');
      this.messageReady.set(false);
      this.step.set(1);
      this.error.set('');
    });
    this.route.queryParamMap.pipe(takeUntilDestroyed(destroyRef)).subscribe((params) => {
      this.query.set(params.get('q') ?? '');
      this.city.set(params.get('city') ?? 'all');
      const center = params.get('center');
      if (center && this.hospitals.some((h) => h.name === center)) this.booking.center = center;
      const specialty = params.get('specialty');
      if (specialty && this.specialties.some((s) => s.name === specialty))
        this.booking.specialty = specialty;
    });
  }
  search() {
    this.router.navigate(['/hospitals'], {
      queryParams: {
        q: this.query().trim() || null,
        city: this.city() === 'all' ? null : this.city(),
      },
    });
  }
  next() {
    this.error.set('');
    if (this.step() === 1 && (!this.booking.center || !this.booking.specialty)) {
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
  serviceIcon(icon: string) {
    const icons: Record<string, string> = {
      calendar_today: '▦',
      star_rate: '☆',
      smartphone: '▯',
      touch_app: '◎',
      payment: '▱',
      science: '⌁',
      notifications_active: '♧',
      home_health: '⌂',
      video_call: '▷',
      health_and_safety: '✚',
    };
    return icons[icon] ?? '✧';
  }
}
