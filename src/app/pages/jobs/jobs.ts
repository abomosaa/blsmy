import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

interface JobPost {
  id: string;
  title: string;
  titleEn: string;
  department: string;
  departmentEn: string;
  type: string;
  typeEn: string;
  location: string;
  locationEn: string;
  summary: string;
  summaryEn: string;
}

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <section class="py-16 sm:py-20 bg-slate-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <h1 class="text-3xl sm:text-4xl font-bold text-cyan-600 mb-4 font-tajawal">
            {{ lang.isArabic() ? 'انضم لفريق بلسمي' : 'Join Our Team' }}
          </h1>
          <p class="text-slate-600 leading-8">
            {{ lang.isArabic()
              ? 'نبحث عن كفاءات طموحة لتطوير حلول رقمية صحية حديثة. إذا كنت شغوفاً بالتقنية وتجربة المستخدم، يسعدنا انضمامك.'
              : 'We are looking for ambitious talents to build modern digital healthcare solutions.' }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          @for (job of jobs; track job.id) {
            <article class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 class="text-xl font-bold text-slate-900 font-tajawal mb-2">
                {{ lang.isArabic() ? job.title : job.titleEn }}
              </h2>
              <div class="flex flex-wrap gap-2 mb-4 text-xs">
                <span class="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 font-bold">{{ lang.isArabic() ? job.department : job.departmentEn }}</span>
                <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">{{ lang.isArabic() ? job.type : job.typeEn }}</span>
                <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">{{ lang.isArabic() ? job.location : job.locationEn }}</span>
              </div>
              <p class="text-slate-600 leading-7 mb-5">
                {{ lang.isArabic() ? job.summary : job.summaryEn }}
              </p>
              <a routerLink="/contact" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors">
                <mat-icon class="text-base">send</mat-icon>
                {{ lang.isArabic() ? 'قدّم الآن' : 'Apply Now' }}
              </a>
            </article>
          }
        </div>

        <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <h3 class="text-xl font-bold text-slate-900 font-tajawal mb-2">{{ lang.isArabic() ? 'لم تجد الوظيفة المناسبة؟' : 'Didn\'t find a suitable role?' }}</h3>
          <p class="text-slate-600 mb-4">{{ lang.isArabic() ? 'أرسل لنا سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة.' : 'Send us your CV and we will contact you when a suitable role opens.' }}</p>
          <a routerLink="/contact" class="inline-flex px-8 py-3 rounded-full bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors">
            {{ lang.isArabic() ? 'تواصل معنا' : 'Contact Us' }}
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Jobs {
  lang = inject(LanguageService);

  jobs: JobPost[] = [
    {
      id: '1',
      title: 'مهندس برمجيات Frontend (Angular)',
      titleEn: 'Frontend Engineer (Angular)',
      department: 'المنتج والتقنية',
      departmentEn: 'Product & Engineering',
      type: 'دوام كامل',
      typeEn: 'Full Time',
      location: 'الرياض',
      locationEn: 'Riyadh',
      summary: 'تطوير واجهات تفاعلية عالية الجودة وتحسين تجربة المستخدم وفق أفضل الممارسات.',
      summaryEn: 'Build high-quality interactive interfaces and improve user experience using best practices.',
    },
    {
      id: '2',
      title: 'مصمم تجربة المستخدم (UI/UX)',
      titleEn: 'UI/UX Designer',
      department: 'التصميم',
      departmentEn: 'Design',
      type: 'دوام كامل',
      typeEn: 'Full Time',
      location: 'الرياض',
      locationEn: 'Riyadh',
      summary: 'تصميم رحلات مستخدم واضحة ومنتجات مرنة تدعم أهداف المنصة الصحية الرقمية.',
      summaryEn: 'Design clear user journeys and flexible products that support platform goals.',
    },
    {
      id: '3',
      title: 'أخصائي نجاح العملاء',
      titleEn: 'Customer Success Specialist',
      department: 'تشغيل العملاء',
      departmentEn: 'Customer Operations',
      type: 'دوام كامل',
      typeEn: 'Full Time',
      location: 'عن بُعد',
      locationEn: 'Remote',
      summary: 'متابعة احتياجات المراكز الطبية وتقديم حلول تشغيلية تساعد على رفع رضا العملاء.',
      summaryEn: 'Follow medical centers needs and provide operational solutions to improve customer satisfaction.',
    },
    {
      id: '4',
      title: 'أخصائي تسويق رقمي',
      titleEn: 'Digital Marketing Specialist',
      department: 'التسويق',
      departmentEn: 'Marketing',
      type: 'دوام كامل',
      typeEn: 'Full Time',
      location: 'الرياض',
      locationEn: 'Riyadh',
      summary: 'إدارة الحملات الرقمية وتحليل الأداء وبناء مبادرات نمو فعّالة للمنصة.',
      summaryEn: 'Manage digital campaigns, analyze performance, and drive growth initiatives.',
    },
  ];
}
