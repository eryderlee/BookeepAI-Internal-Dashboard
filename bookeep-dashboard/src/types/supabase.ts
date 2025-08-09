// Database record types
export interface FounderEquityRecord {
  id: string;
  name: string;
  department: string;
  equity_percentage: number;
  work_hours: number;
  work_summary: string | null;
  last_updated: string;
  created_at: string;
}

// Insert/Update types (omit generated fields)
export interface FounderEquityInsert {
  name: string;
  department: string;
  equity_percentage: number;
  work_hours?: number;
  work_summary?: string;
}

export interface FounderEquityUpdate {
  name?: string;
  department?: string;
  equity_percentage?: number;
  work_hours?: number;
  work_summary?: string;
}

// API response types (for compatibility with existing component)
export interface FounderEquityData {
  name: string;
  percentage: number;
  workHours: number;
  workSummary: string;
  lastUpdated: string;
}

export interface EquityResponse {
  founders: FounderEquityData[];
  totalHours: number;
  lastSync: string;
}

// Supabase specific types
export interface SupabaseResponse<T> {
  data: T | null;
  error: any;
}

export interface SupabaseError {
  message: string;
  details: string;
  hint: string;
  code: string;
}