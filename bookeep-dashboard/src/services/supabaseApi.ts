import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { 
  FounderEquityRecord, 
  FounderEquityInsert, 
  FounderEquityUpdate,
  FounderEquityData,
  EquityResponse,
  SupabaseResponse 
} from '../types/supabase';

class SupabaseApiService {
  private supabase: SupabaseClient | null = null;
  private isConfigured = false;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url-here' || supabaseKey === 'your-supabase-anon-key-here') {
      console.warn('Supabase environment variables not configured. Using sample data.');
      this.isConfigured = false;
      return;
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.isConfigured = true;
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      this.isConfigured = false;
    }
  }

  /**
   * Transform database record to component-compatible format
   */
  private transformRecord(record: FounderEquityRecord): FounderEquityData {
    return {
      name: record.name,
      percentage: record.equity_percentage,
      workHours: record.work_hours,
      workSummary: record.work_summary || '',
      lastUpdated: record.last_updated,
    };
  }

  /**
   * Get all founder equity data
   */
  async getEquityData(): Promise<EquityResponse> {
    // If Supabase is not configured, return sample data
    if (!this.isConfigured || !this.supabase) {
      console.log('Using sample data (Supabase not configured)');
      return this.getSampleData();
    }

    try {
      const { data, error } = await this.supabase
        .from('founder_equity')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        // Return sample data if no records found (for initial setup)
        return this.getSampleData();
      }

      const founders = data.map(record => this.transformRecord(record));
      const totalHours = founders.reduce((sum, founder) => sum + founder.workHours, 0);
      const lastSync = new Date().toISOString();

      return {
        founders,
        totalHours,
        lastSync,
      };
    } catch (error) {
      console.error('Error fetching equity data:', error);
      // Return sample data as fallback
      return this.getSampleData();
    }
  }

  /**
   * Update founder work hours
   */
  async updateFounderHours(founderId: string, workHours: number): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('founder_equity')
        .update({ 
          work_hours: workHours,
          last_updated: new Date().toISOString()
        })
        .eq('id', founderId);

      if (error) {
        console.error('Error updating work hours:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error updating founder hours:', error);
      throw error;
    }
  }

  /**
   * Update founder work summary
   */
  async updateFounderSummary(founderId: string, workSummary: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('founder_equity')
        .update({ 
          work_summary: workSummary,
          last_updated: new Date().toISOString()
        })
        .eq('id', founderId);

      if (error) {
        console.error('Error updating work summary:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error updating founder summary:', error);
      throw error;
    }
  }

  /**
   * Update founder equity percentage
   */
  async updateFounderEquity(founderId: string, equityPercentage: number): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('founder_equity')
        .update({ 
          equity_percentage: equityPercentage,
          last_updated: new Date().toISOString()
        })
        .eq('id', founderId);

      if (error) {
        console.error('Error updating equity percentage:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error updating founder equity:', error);
      throw error;
    }
  }

  /**
   * Insert new founder
   */
  async insertFounder(founder: FounderEquityInsert): Promise<FounderEquityRecord> {
    try {
      const { data, error } = await this.supabase
        .from('founder_equity')
        .insert([{
          ...founder,
          last_updated: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error inserting founder:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error inserting founder:', error);
      throw error;
    }
  }

  /**
   * Delete founder
   */
  async deleteFounder(founderId: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('founder_equity')
        .delete()
        .eq('id', founderId);

      if (error) {
        console.error('Error deleting founder:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error deleting founder:', error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time changes
   */
  subscribeToChanges(callback: (payload: any) => void) {
    if (!this.isConfigured || !this.supabase) {
      console.log('Supabase not configured - real-time updates disabled');
      return null;
    }

    return this.supabase
      .channel('founder_equity_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'founder_equity'
        },
        callback
      )
      .subscribe();
  }

  /**
   * Unsubscribe from real-time changes
   */
  async unsubscribe(subscription: any) {
    if (!subscription || !this.isConfigured || !this.supabase) {
      return;
    }
    await this.supabase.removeChannel(subscription);
  }

  /**
   * Sample data for fallback/initial setup
   */
  private getSampleData(): EquityResponse {
    return {
      founders: [
        {
          name: 'Khan',
          percentage: 33.3,
          workHours: 120,
          workSummary: 'Client outreach, pipeline management, revenue tracking',
          lastUpdated: new Date().toISOString()
        },
        {
          name: 'Sora',
          percentage: 33.3,
          workHours: 120,
          workSummary: 'Client onboarding, process automation, dashboard setup',
          lastUpdated: new Date().toISOString()
        },
        {
          name: 'Eden',
          percentage: 33.4,
          workHours: 121,
          workSummary: 'Feature development, technical architecture, bug fixes',
          lastUpdated: new Date().toISOString()
        },
      ],
      totalHours: 361,
      lastSync: new Date().toISOString(),
    };
  }
}

export const supabaseApi = new SupabaseApiService();
export type { FounderEquityData, EquityResponse };