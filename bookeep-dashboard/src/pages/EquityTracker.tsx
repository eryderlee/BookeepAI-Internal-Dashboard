import { useState, useEffect } from 'react';
import ProgressBar from '../components/EquityTracker/ProgressBar';
import PieChart from '../components/EquityTracker/PieChart';
import { supabaseApi, type FounderEquityData } from '../services/supabaseApi';

const EquityTracker = () => {
  const [equityData, setEquityData] = useState<FounderEquityData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Map founders to their departments and colors
  const founderDepartments = {
    'Khan': { department: 'Sales', color: 'bg-emerald-400' },
    'Sora': { department: 'Onboarding', color: 'bg-violet-400' },
    'Eden': { department: 'Product', color: 'bg-rose-400' },
    // Also handle the mock data names from the API
    'Sales Lead': { department: 'Sales (Khan)', color: 'bg-emerald-400' },
    'Onboarding Lead': { department: 'Onboarding (Sora)', color: 'bg-violet-400' },
    'Product Lead': { department: 'Product (Eden)', color: 'bg-rose-400' }
  };

  useEffect(() => {
    fetchEquityData();
    const interval = setInterval(fetchEquityData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Real-time subscription for database changes
  useEffect(() => {
    const subscription = supabaseApi.subscribeToChanges((payload) => {
      console.log('Real-time update received:', payload);
      // Refresh data when changes occur
      fetchEquityData();
    });

    return () => {
      supabaseApi.unsubscribe(subscription);
    };
  }, []);

  const fetchEquityData = async () => {
    try {
      setLoading(true);
      const response = await supabaseApi.getEquityData();
      setEquityData(response.founders);
      setLastUpdated(response.lastSync);
      setError('');
    } catch (err) {
      setError('Failed to fetch equity data from database');
      console.error('Error fetching equity data:', err);
    } finally {
      setLoading(false);
    }
  };

  const foundersWithColors = equityData.map((founder) => {
    const founderInfo = founderDepartments[founder.name as keyof typeof founderDepartments];
    return {
      name: founder.name,
      percentage: founder.percentage,
      color: founderInfo?.color || 'bg-blue-600', // Default to blue if founder not found
      department: founderInfo?.department || 'General'
    };
  });

  if (loading && equityData.length === 0) {
    return (
      <div className="space-y-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-900/50 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Progress bar skeleton */}
          <div className="mb-6">
            <div className="h-6 w-64 bg-gradient-to-r from-blue-200 to-blue-100 rounded mb-4 animate-pulse"></div>
            <div className="h-8 w-full bg-gradient-to-r from-emerald-200 via-violet-200 to-rose-200 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-gray-300 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-gray-300 rounded mb-1 animate-pulse"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pie chart skeleton */}
          <div className="mb-6 border-t pt-6">
            <div className="h-6 w-32 bg-gradient-to-r from-blue-200 to-blue-100 rounded mb-6 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-emerald-200 via-violet-200 to-rose-200 animate-pulse"></div>
            </div>
          </div>
          
          {/* Details skeleton */}
          <div className="border-t pt-6">
            <div className="h-5 w-36 bg-gradient-to-r from-blue-200 to-blue-100 rounded mb-4 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 rounded bg-gray-300 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-gray-300 rounded mb-1 animate-pulse"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-12 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-900/50 p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 transition-colors duration-300">Equity Tracker</h1>
          <button
            onClick={fetchEquityData}
            className="group relative bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 dark:disabled:bg-blue-800 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:scale-105 hover:shadow-lg dark:hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            disabled={loading}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4 mb-6 animate-in fade-in duration-300 transition-colors duration-300">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200 transition-colors duration-300">Database Connection Error</h3>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1 transition-colors duration-300">{error}</p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-1 transition-colors duration-300">Please check your Supabase configuration. Showing sample data for now.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 transition-colors duration-300">Current Equity Distribution</h2>
          <ProgressBar founders={foundersWithColors} />
        </div>

        <div className="mb-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-6 text-center transition-colors duration-300">Equity Overview</h2>
          <PieChart founders={foundersWithColors} />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 transition-colors duration-300">Founder Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foundersWithColors.map((founder) => (
              <div 
                key={founder.name} 
                className="group bg-blue-50 dark:bg-slate-700/50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-slate-900/50 hover:-translate-y-1 hover:bg-blue-100/70 dark:hover:bg-slate-600/50 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-slate-500"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-6 h-6 rounded ${founder.color} transition-transform duration-200 group-hover:scale-110 shadow-sm`}></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">{founder.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">{founder.department}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-200">
                    <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Equity:</span>
                    <span className="font-medium text-blue-800 dark:text-blue-200 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-1 rounded-md transition-colors duration-300">
                      {founder.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-200">
                    <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Work Hours:</span>
                    <span className="font-medium text-blue-800 dark:text-blue-200 transition-colors duration-300">
                      {equityData.find(f => f.name === founder.name)?.workHours}
                    </span>
                  </div>
                  <div className="group-hover:scale-105 transition-transform duration-200">
                    <span className="text-gray-600 dark:text-gray-300 text-xs block mb-1 transition-colors duration-300">Work Summary:</span>
                    <p className="font-medium text-blue-800 dark:text-blue-200 text-xs leading-relaxed transition-colors duration-300">
                      {equityData.find(f => f.name === founder.name)?.workSummary}
                    </p>
                  </div>
                  <div className="flex justify-between items-center group-hover:scale-105 transition-transform duration-200">
                    <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Last Updated:</span>
                    <span className="font-medium text-blue-800 dark:text-blue-200 text-xs transition-colors duration-300">
                      {new Date(equityData.find(f => f.name === founder.name)?.lastUpdated || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-200/0 to-blue-300/0 dark:from-slate-600/0 dark:to-slate-500/0 group-hover:from-blue-200/10 group-hover:to-blue-300/10 dark:group-hover:from-slate-600/10 dark:group-hover:to-slate-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {lastUpdated && (
          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Last synchronized: {new Date(lastUpdated).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquityTracker;