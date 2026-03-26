import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  template: `
    <section class="py-24 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-tajawal">{{ lang.isArabic() ? 'احجز موعدك' : 'Book Your Appointment' }}</h2>
          <p class="text-slate-600">{{ lang.isArabic() ? 'احجز موعدك بسهولة في المركز الطبي المناسب لك.' : 'Easily book your appointment at the right medical center for you.' }}</p>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center justify-center gap-4 mb-12">
          @for (step of steps; track step.num; let i = $index) {
            <div class="flex items-center gap-2">
              <div
                [class.bg-sky-600]="currentStep() >= step.num"
                [class.text-white]="currentStep() >= step.num"
                [class.bg-slate-100]="currentStep() < step.num"
                [class.text-slate-400]="currentStep() < step.num"
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all">
                {{ step.num }}
              </div>
              <span class="text-sm font-medium hidden sm:inline"
                [class.text-sky-600]="currentStep() >= step.num"
                [class.text-slate-400]="currentStep() < step.num">
                {{ lang.isArabic() ? step.label : step.labelEn }}
              </span>
              @if (i < steps.length - 1) {
                <div class="w-8 h-0.5 mx-2"
                  [class.bg-sky-600]="currentStep() > step.num"
                  [class.bg-slate-200]="currentStep() <= step.num">
                </div>
              }
            </div>
          }
        </div>

        <!-- Step 1: Select Center -->
        @if (currentStep() === 1) {
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-slate-900 font-tajawal mb-6">{{ lang.isArabic() ? 'اختر المركز الطبي' : 'Select Medical Center' }}</h3>
            @for (center of medicalCenters; track center.id) {
              <button
                (click)="selectCenter(center.id)"
                [class.border-sky-500]="booking.centerId === center.id"
                [class.bg-sky-50]="booking.centerId === center.id"
                class="w-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-sky-300 transition-all text-right flex items-center gap-4">
                <div class="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                  <mat-icon>local_hospital</mat-icon>
                </div>
                <div>
                  <p class="font-bold text-slate-900">{{ lang.isArabic() ? center.name : center.nameEn }}</p>
                  <p class="text-sm text-slate-500">{{ lang.isArabic() ? center.location : center.locationEn }}</p>
                </div>
              </button>
            }
          </div>
        }

        <!-- Step 2: Select Service -->
        @if (currentStep() === 2) {
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-slate-900 font-tajawal mb-6">{{ lang.isArabic() ? 'اختر الخدمة' : 'Select Service' }}</h3>
            <div class="grid sm:grid-cols-2 gap-4">
              @for (service of availableServices; track service.id) {
                <button
                  (click)="selectService(service.id)"
                  [class.border-sky-500]="booking.serviceId === service.id"
                  [class.bg-sky-50]="booking.serviceId === service.id"
                  class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-sky-300 transition-all text-right flex items-center gap-3">
                  <mat-icon class="text-sky-600">{{ service.icon }}</mat-icon>
                  <span class="font-bold text-slate-900">{{ lang.isArabic() ? service.name : service.nameEn }}</span>
                </button>
              }
            </div>
          </div>
        }

        <!-- Step 3: Select Date/Time -->
        @if (currentStep() === 3) {
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-slate-900 font-tajawal mb-6">{{ lang.isArabic() ? 'اختر التاريخ والوقت' : 'Select Date & Time' }}</h3>

            <!-- Calendar -->
            <div class="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <!-- Month nav header -->
              <div class="flex items-center justify-between px-4 py-3 bg-sky-600 text-white">
                <button type="button" (click)="nextMonth()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-500 transition-all">
                  <mat-icon class="text-sm">chevron_left</mat-icon>
                </button>
                <span class="font-bold text-base font-tajawal">{{ calendarMonthLabel() }} {{ calendarYear() }}</span>
                <button type="button" (click)="prevMonth()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-500 transition-all" [disabled]="isAtMinMonth()" [class.opacity-30]="isAtMinMonth()">
                  <mat-icon class="text-sm">chevron_right</mat-icon>
                </button>
              </div>

              <!-- Weekday labels -->
              <div class="grid grid-cols-7 border-b border-slate-200">
                @for (d of weekDays; track d) {
                  <div class="py-2 text-center text-xs font-bold text-slate-500">{{ d }}</div>
                }
              </div>

              <!-- Day cells -->
              <div class="grid grid-cols-7 gap-px bg-slate-200">
                @for (cell of calendarDays(); track $index) {
                  @if (cell === null) {
                    <div class="bg-slate-50 h-10"></div>
                  } @else {
                    <button
                      type="button"
                      [disabled]="cell.disabled"
                      (click)="selectDate(cell.isoDate)"
                      class="h-10 flex items-center justify-center text-sm font-medium transition-all bg-white"
                      [class.text-slate-300]="cell.disabled"
                      [class.cursor-not-allowed]="cell.disabled"
                      [class.hover:bg-sky-50]="!cell.disabled && booking.date !== cell.isoDate"
                      [class.ring-2]="cell.isToday && booking.date !== cell.isoDate"
                      [class.ring-sky-400]="cell.isToday && booking.date !== cell.isoDate"
                      [class.ring-inset]="cell.isToday"
                      [class.bg-sky-600]="booking.date === cell.isoDate"
                      [class.text-white]="booking.date === cell.isoDate"
                      [class.font-bold]="booking.date === cell.isoDate || cell.isToday">
                      {{ cell.day }}
                    </button>
                  }
                }
              </div>
            </div>

            <!-- Selected date display -->
            @if (booking.date) {
              <p class="text-sm text-sky-700 font-bold text-center font-tajawal">
                {{ lang.isArabic() ? 'التاريخ المختار:' : 'Selected:' }} {{ booking.date }}
              </p>
            }

            <!-- Time Slots -->
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-3">{{ lang.isArabic() ? 'الوقت' : 'Time' }}</label>
              @if (!booking.date) {
                <p class="text-sm text-slate-400 font-tajawal">{{ lang.isArabic() ? 'اختر تاريخاً أولاً لعرض المواعيد المتاحة' : 'Select a date first to see available slots' }}</p>
              } @else {
                <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  @for (time of availableSlots; track time) {
                    @if (isSlotBooked(time)) {
                      <div class="py-3 rounded-xl border border-red-100 bg-red-50 text-red-400 font-bold text-center cursor-not-allowed text-sm line-through">
                        {{ time }}
                      </div>
                    } @else {
                      <button
                        type="button"
                        (click)="booking.time = time"
                        [class.bg-sky-600]="booking.time === time"
                        [class.text-white]="booking.time === time"
                        [class.border-sky-500]="booking.time === time"
                        [class.bg-emerald-50]="booking.time !== time"
                        [class.text-emerald-700]="booking.time !== time"
                        [class.border-emerald-200]="booking.time !== time"
                        class="py-3 rounded-xl border font-bold transition-all text-center text-sm hover:border-sky-400">
                        {{ time }}
                      </button>
                    }
                  }
                </div>
              }
            </div>
          </div>
        }

        <!-- Step 4: Confirm -->
        @if (currentStep() === 4) {
          <div class="bg-slate-50 rounded-3xl p-8 space-y-6">
            <h3 class="text-xl font-bold text-slate-900 font-tajawal mb-6">{{ lang.isArabic() ? 'تأكيد الحجز' : 'Confirm Booking' }}</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-3 border-b border-slate-200">
                <span class="text-slate-500">{{ lang.isArabic() ? 'المركز الطبي' : 'Medical Center' }}</span>
                <span class="font-bold text-slate-900">{{ getSelectedCenterName() }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-slate-200">
                <span class="text-slate-500">{{ lang.isArabic() ? 'الخدمة' : 'Service' }}</span>
                <span class="font-bold text-slate-900">{{ getSelectedServiceName() }}</span>
              </div>
              <div class="flex justify-between items-center py-3 border-b border-slate-200">
                <span class="text-slate-500">{{ lang.isArabic() ? 'التاريخ' : 'Date' }}</span>
                <span class="font-bold text-slate-900">{{ booking.date }}</span>
              </div>
              <div class="flex justify-between items-center py-3">
                <span class="text-slate-500">{{ lang.isArabic() ? 'الوقت' : 'Time' }}</span>
                <span class="font-bold text-slate-900">{{ booking.time }}</span>
              </div>
            </div>
          </div>
        }

        @if (successMessage()) {
          <div class="mt-8 p-6 bg-emerald-50 text-emerald-700 rounded-2xl text-center">
            <mat-icon class="text-4xl mb-2">check_circle</mat-icon>
            <p class="font-bold text-lg">{{ successMessage() }}</p>
            <a routerLink="/" class="inline-block mt-4 text-sky-600 font-bold hover:underline">{{ lang.isArabic() ? 'العودة للرئيسية' : 'Back to Home' }}</a>
          </div>
        }

        <!-- Navigation Buttons -->
        @if (!successMessage()) {
          <div class="flex justify-between mt-12">
            @if (currentStep() > 1) {
              <button (click)="prevStep()" class="px-8 py-3 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                {{ lang.isArabic() ? 'السابق' : 'Previous' }}
              </button>
            } @else {
              <div></div>
            }

            @if (currentStep() < 4) {
              <button
                (click)="nextStep()"
                [disabled]="!canProceed()"
                class="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ lang.isArabic() ? 'التالي' : 'Next' }}
              </button>
            } @else {
              <button
                (click)="confirmBooking()"
                [disabled]="isSubmitting()"
                class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 flex items-center gap-2">
                @if (isSubmitting()) {
                  <mat-icon class="animate-spin">autorenew</mat-icon>
                }
                {{ lang.isArabic() ? 'تأكيد الحجز' : 'Confirm Booking' }}
              </button>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class Book {
  lang = inject(LanguageService);
  supabase = inject(SupabaseService);
  currentStep = signal(1);
  isSubmitting = signal(false);
  successMessage = signal('');

  // ── Calendar ──────────────────────────────────────────────────────────────
  private readonly todayDate = new Date();

  calendarYear = signal(this.todayDate.getFullYear());
  calendarMonth = signal(this.todayDate.getMonth()); // 0-based

  weekDays = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
  private arabicMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
  ];
  private englishMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  calendarMonthLabel = computed(() => {
    const months = this.lang.isArabic() ? this.arabicMonths : this.englishMonths;
    return months[this.calendarMonth()];
  });

  calendarDays = computed(() => {
    const year = this.calendarYear();
    const month = this.calendarMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayIso = this.todayDate.toISOString().split('T')[0];

    const cells: ({ isoDate: string; day: number; disabled: boolean; isToday: boolean } | null)[] = [];

    // Padding nulls for days before the 1st
    for (let i = 0; i < firstDay; i++) cells.push(null);

    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const isoDate = `${year}-${mm}-${dd}`;
      cells.push({
        isoDate,
        day: d,
        disabled: isoDate < todayIso,
        isToday: isoDate === todayIso,
      });
    }
    return cells;
  });

  isAtMinMonth = computed(() => {
    const t = this.todayDate;
    return this.calendarYear() === t.getFullYear() && this.calendarMonth() === t.getMonth();
  });

  // Mock booked slots: some times blocked on specific dates
  bookedSlots: Record<string, string[]> = {
    [this.offsetDate(1)]: ['09:00', '09:30', '10:00'],
    [this.offsetDate(3)]: ['14:00', '14:30', '15:00', '15:30'],
    [this.offsetDate(5)]: ['11:00', '11:30', '16:00', '16:30'],
  };

  private offsetDate(days: number): string {
    const d = new Date(this.todayDate);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }

  selectDate(isoDate: string) {
    this.booking.date = isoDate;
    this.booking.time = ''; // reset time when date changes
  }

  isSlotBooked(time: string): boolean {
    return this.bookedSlots[this.booking.date]?.includes(time) ?? false;
  }

  prevMonth() {
    if (this.isAtMinMonth()) return;
    if (this.calendarMonth() === 0) {
      this.calendarMonth.set(11);
      this.calendarYear.update(y => y - 1);
    } else {
      this.calendarMonth.update(m => m - 1);
    }
  }

  nextMonth() {
    if (this.calendarMonth() === 11) {
      this.calendarMonth.set(0);
      this.calendarYear.update(y => y + 1);
    } else {
      this.calendarMonth.update(m => m + 1);
    }
  }
  // ─────────────────────────────────────────────────────────────────────────

  steps = [
    { num: 1, label: 'المركز', labelEn: 'Center' },
    { num: 2, label: 'الخدمة', labelEn: 'Service' },
    { num: 3, label: 'الموعد', labelEn: 'Schedule' },
    { num: 4, label: 'التأكيد', labelEn: 'Confirm' },
  ];

  booking = {
    centerId: '',
    serviceId: '',
    date: '',
    time: '',
  };

  medicalCenters = [
    { id: '1', name: 'مجمع غيم الطبي', nameEn: 'Ghaym Medical Complex', location: 'الرياض', locationEn: 'Riyadh' },
    { id: '2', name: 'مجمع الصحة والسلامة', nameEn: 'Health & Safety Complex', location: 'جدة', locationEn: 'Jeddah' },
    { id: '3', name: 'مجمع الدمام الأهلي', nameEn: 'Dammam National Complex', location: 'الدمام', locationEn: 'Dammam' },
  ];

  availableServices = [
    { id: '1', name: 'كشف عام', nameEn: 'General Checkup', icon: 'medical_services' },
    { id: '2', name: 'أسنان', nameEn: 'Dentistry', icon: 'dentistry' },
    { id: '3', name: 'عيون', nameEn: 'Ophthalmology', icon: 'visibility' },
    { id: '4', name: 'جلدية', nameEn: 'Dermatology', icon: 'dermatology' },
    { id: '5', name: 'أطفال', nameEn: 'Pediatrics', icon: 'child_care' },
    { id: '6', name: 'مختبر', nameEn: 'Laboratory', icon: 'science' },
  ];

  availableSlots = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
  ];

  selectCenter(id: string) {
    this.booking.centerId = id;
  }

  selectService(id: string) {
    this.booking.serviceId = id;
  }

  canProceed(): boolean {
    switch (this.currentStep()) {
      case 1: return !!this.booking.centerId;
      case 2: return !!this.booking.serviceId;
      case 3: return !!this.booking.date && !!this.booking.time;
      default: return true;
    }
  }

  nextStep() {
    if (this.canProceed() && this.currentStep() < 4) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  getSelectedCenterName(): string {
    const center = this.medicalCenters.find((c) => c.id === this.booking.centerId);
    return center ? (this.lang.isArabic() ? center.name : center.nameEn) : '';
  }

  getSelectedServiceName(): string {
    const service = this.availableServices.find((s) => s.id === this.booking.serviceId);
    return service ? (this.lang.isArabic() ? service.name : service.nameEn) : '';
  }

  async confirmBooking() {
    this.isSubmitting.set(true);
    try {
      await this.supabase.createAppointment({
        center_id: this.booking.centerId,
        service_id: this.booking.serviceId,
        date: this.booking.date,
        time: this.booking.time,
      });
      this.successMessage.set(
        this.lang.isArabic()
          ? 'تم حجز موعدك بنجاح! سيتم التواصل معك لتأكيد الحجز.'
          : 'Your appointment has been booked successfully! We will contact you to confirm.'
      );
    } catch {
      this.successMessage.set('');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
