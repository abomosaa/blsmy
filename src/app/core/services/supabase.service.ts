import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  // Auth
  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  // Contact form
  async submitContact(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    return this.supabase.from('contacts').insert(data);
  }

  // Appointments
  async createAppointment(data: {
    center_id: string;
    service_id: string;
    date: string;
    time: string;
    user_id?: string;
  }) {
    return this.supabase.from('appointments').insert(data);
  }

  async getAppointments(userId: string) {
    return this.supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });
  }

  async createOfferRequest(data: { phone: string; offer_id: string; offer_title: string }) {
    return this.supabase.from('offer_requests').insert(data);
  }
}
