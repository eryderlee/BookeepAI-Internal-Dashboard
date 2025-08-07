import axios from 'axios';

interface FounderEquityData {
  name: string;
  percentage: number;
  workHours: number;
  workSummary: string;
  lastUpdated: string;
}

interface EquityResponse {
  founders: FounderEquityData[];
  totalHours: number;
  lastSync: string;
}

class N8nApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_N8N_API_URL || 'http://localhost:5678/webhook';
    this.apiKey = import.meta.env.VITE_N8N_API_KEY || '';
  }

  async getEquityData(): Promise<EquityResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/equity-data`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching equity data:', error);
      
      return {
        founders: [
          { 
            name: 'Sales Lead', 
            percentage: 33.3, 
            workHours: 120, 
            workSummary: 'Client outreach, pipeline management, revenue tracking',
            lastUpdated: new Date().toISOString() 
          },
          { 
            name: 'Onboarding Lead', 
            percentage: 33.3, 
            workHours: 120, 
            workSummary: 'Client onboarding, process automation, dashboard setup',
            lastUpdated: new Date().toISOString() 
          },
          { 
            name: 'Product Lead', 
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

  async updateEquityData(founderId: string, workHours: number): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/equity-update`, {
        founderId,
        workHours,
        timestamp: new Date().toISOString(),
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error updating equity data:', error);
      throw error;
    }
  }
}

export const n8nApi = new N8nApiService();
export type { FounderEquityData, EquityResponse };