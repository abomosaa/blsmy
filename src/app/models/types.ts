export interface Service {
  id: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  icon: string;
  image?: string;
  category: 'patient' | 'medical-center' | 'both';
  featured?: boolean;
  comingSoon?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  authorEn?: string;
  role: string;
  roleEn?: string;
  content: string;
  contentEn?: string;
  avatar?: string;
}

export interface Partner {
  id: string;
  name: string;
  nameEn?: string;
  logo: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  locationEn: string;
  description: string;
  descriptionEn: string;
  logo: string;
  reviewCount: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
