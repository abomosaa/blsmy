import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';
import { SupabaseService } from '../../core/services/supabase.service';

interface Offer {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  categoryKey: 'dermatology' | 'dental';
  price: number;
  image: string;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-sky-600 mb-4 font-tajawal">{{ lang.isArabic() ? 'احجز موعدك الآن واستفد من عروضنا' : 'Book Now and Benefit from Our Offers' }}</h2>
          <p class="text-slate-600">{{ lang.isArabic() ? 'عروضنا لصحتك الصحة والعافية بأسعار لا تقبل المنافسة استثمر في صحتك مع باقاتنا الشاملة التي تلبي جميع احتياجاتك الصحية ...' : 'Our health and wellness offers at unbeatable prices. Invest in your health with our comprehensive packages that meet all your healthcare needs...' }}</p>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (cat of categories; track cat.id) {
            <button
              (click)="selectedCategory.set(cat.id)"
              [class.bg-sky-600]="selectedCategory() === cat.id"
              [class.text-white]="selectedCategory() === cat.id"
              [class.bg-white]="selectedCategory() !== cat.id"
              [class.text-slate-600]="selectedCategory() !== cat.id"
              class="px-6 py-2.5 rounded-full font-bold transition-all shadow-sm border border-slate-200 hover:border-sky-300">
              {{ lang.isArabic() ? cat.name : cat.nameEn }}
            </button>
          }
        </div>

        <!-- Offers Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (offer of filteredOffers(); track offer.id) {
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div class="aspect-square bg-slate-100 overflow-hidden">
                <img [src]="offer.image" [alt]="lang.isArabic() ? offer.title : offer.titleEn" class="w-full h-full object-cover" referrerpolicy="no-referrer">
              </div>
              <div class="p-4 text-center">
                <p class="text-sm text-slate-500 mb-1">{{ lang.isArabic() ? offer.category : offer.categoryEn }}</p>
                <p class="font-bold text-slate-900 font-tajawal mb-2">{{ offer.price }} {{ lang.isArabic() ? 'ر.س' : 'SAR' }}</p>
                <button
                  type="button"
                  (click)="openBuyModal(offer)"
                  class="inline-flex items-center gap-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold rounded-full transition-all">
                  <mat-icon class="text-sm">shopping_cart</mat-icon>
                  {{ lang.isArabic() ? 'شراء العرض' : 'Buy Offer' }}
                </button>
              </div>
            </div>
          }
        </div>

        @if (filteredOffers().length === 0) {
          <div class="text-center py-20 text-slate-400">
            <mat-icon class="text-6xl mb-4">local_offer</mat-icon>
            <p class="text-xl font-bold font-tajawal">{{ lang.isArabic() ? 'لا توجد عروض في هذا التصنيف حالياً' : 'No offers in this category currently' }}</p>
          </div>
        }
      </div>
    </section>

    <!-- Buy Offer Modal -->
    @if (showBuyModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" (click)="closeBuyModal()">
        <div class="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl" (click)="$event.stopPropagation()">

          @if (buyState() !== 'success') {
            <!-- Header -->
            <div class="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 class="text-2xl font-bold text-slate-900 font-tajawal">{{ lang.isArabic() ? 'شراء العرض' : 'Buy Offer' }}</h3>
                @if (selectedOffer()) {
                  <p class="mt-1 text-sm text-sky-600 font-bold font-tajawal">{{ lang.isArabic() ? selectedOffer()!.title : selectedOffer()!.titleEn }}</p>
                  <p class="text-xs text-slate-500 mt-0.5">{{ selectedOffer()!.price }} {{ lang.isArabic() ? 'ر.س' : 'SAR' }}</p>
                }
              </div>
              <button type="button" (click)="closeBuyModal()" class="text-slate-400 hover:text-slate-600">
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Phone input -->
            <div class="mb-4">
              <label class="block text-sm font-bold text-slate-700 mb-2 font-tajawal">
                {{ lang.isArabic() ? 'رقم الجوال' : 'Mobile Number' }}
              </label>
              <div class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span class="text-sm font-bold text-slate-500">+966</span>
                <input
                  type="tel"
                  [(ngModel)]="buyPhone"
                  placeholder="5xxxxxxxx"
                  maxlength="9"
                  class="w-full bg-transparent text-sm text-slate-700 outline-none">
              </div>
            </div>

            @if (buyError()) {
              <p class="mb-4 text-sm text-red-600 font-tajawal">{{ buyError() }}</p>
            }

            <!-- Actions -->
            <div class="flex gap-3">
              <button
                type="button"
                (click)="submitBuyRequest()"
                [disabled]="buyState() === 'loading'"
                class="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-60">
                @if (buyState() === 'loading') {
                  <mat-icon class="animate-spin text-base">autorenew</mat-icon>
                }
                {{ lang.isArabic() ? 'تأكيد الشراء' : 'Confirm Purchase' }}
              </button>
              <button type="button" (click)="closeBuyModal()" class="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
                {{ lang.isArabic() ? 'إلغاء' : 'Cancel' }}
              </button>
            </div>
          } @else {
            <!-- Success state -->
            <div class="text-center py-4">
              <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-emerald-600 text-3xl">check_circle</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-slate-900 font-tajawal mb-2">{{ lang.isArabic() ? 'تم استلام طلبك!' : 'Request Received!' }}</h3>
              <p class="text-sm text-slate-500 font-tajawal mb-6">{{ lang.isArabic() ? 'سيتم التواصل معك على رقم الجوال لتأكيد الحجز وإتمام الدفع.' : 'We will contact you on your mobile number to confirm the booking and complete payment.' }}</p>
              <button type="button" (click)="closeBuyModal()" class="px-8 py-3 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition">
                {{ lang.isArabic() ? 'حسناً' : 'OK' }}
              </button>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class Offers {
  lang = inject(LanguageService);
  supabase = inject(SupabaseService);
  selectedCategory = signal('all');

  // Buy modal state
  showBuyModal = signal(false);
  selectedOffer = signal<Offer | null>(null);
  buyPhone = '';
  buyState = signal<'idle' | 'loading' | 'success'>('idle');
  buyError = signal('');

  categories = [
    { id: 'all', name: 'الكل', nameEn: 'All' },
    { id: 'dermatology', name: 'جلدية', nameEn: 'Dermatology' },
    { id: 'dental', name: 'أسنان', nameEn: 'Dental' },
  ];

  offers: Offer[] = [
    { id: '1', title: 'تنظيف بشرة عميق', titleEn: 'Deep Skin Cleaning', category: 'جلدية', categoryEn: 'Dermatology', categoryKey: 'dermatology', price: 99, image: 'https://blsmy.com/images/screenshot1.webp' },
    { id: '2', title: 'جلسة علاج حب الشباب', titleEn: 'Acne Treatment Session', category: 'جلدية', categoryEn: 'Dermatology', categoryKey: 'dermatology', price: 140, image: 'https://blsmy.com/images/screenshot2.webp' },
    { id: '3', title: 'تبييض الأسنان', titleEn: 'Teeth Whitening', category: 'أسنان', categoryEn: 'Dental', categoryKey: 'dental', price: 199, image: 'https://blsmy.com/images/screenshot3.webp' },
    { id: '4', title: 'ابتسامة هوليود', titleEn: 'Hollywood Smile', category: 'أسنان', categoryEn: 'Dental', categoryKey: 'dental', price: 250, image: 'https://blsmy.com/images/screenshot4.webp' },
    { id: '5', title: 'فحص جلدية شامل', titleEn: 'Comprehensive Skin Check', category: 'جلدية', categoryEn: 'Dermatology', categoryKey: 'dermatology', price: 375, image: 'https://blsmy.com/images/screenshot5.webp' },
    { id: '6', title: 'حشوات تجميلية', titleEn: 'Cosmetic Fillings', category: 'أسنان', categoryEn: 'Dental', categoryKey: 'dental', price: 400, image: 'https://blsmy.com/images/screenshot1.webp' },
    { id: '7', title: 'علاج لثة متقدم', titleEn: 'Advanced Gum Treatment', category: 'أسنان', categoryEn: 'Dental', categoryKey: 'dental', price: 1500, image: 'https://blsmy.com/images/screenshot2.webp' },
    { id: '8', title: 'باقة نضارة البشرة', titleEn: 'Skin Glow Package', category: 'جلدية', categoryEn: 'Dermatology', categoryKey: 'dermatology', price: 4000, image: 'https://blsmy.com/images/screenshot3.webp' },
  ];

  filteredOffers = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.offers;
    return this.offers.filter(o => o.categoryKey === cat);
  });

  openBuyModal(offer: Offer) {
    this.selectedOffer.set(offer);
    this.buyPhone = '';
    this.buyState.set('idle');
    this.buyError.set('');
    this.showBuyModal.set(true);
  }

  closeBuyModal() {
    this.showBuyModal.set(false);
  }

  async submitBuyRequest() {
    const phone = this.buyPhone.trim();
    if (!phone || phone.length < 9) {
      this.buyError.set(this.lang.isArabic() ? 'يرجى إدخال رقم جوال صحيح (9 أرقام).' : 'Please enter a valid mobile number (9 digits).');
      return;
    }
    this.buyState.set('loading');
    this.buyError.set('');
    const offer = this.selectedOffer()!;
    await this.supabase.createOfferRequest({
      phone: `+966${phone}`,
      offer_id: offer.id,
      offer_title: offer.title,
    });
    this.buyState.set('success');
  }
}
