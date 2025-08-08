const Sales = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-900/50 p-6 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4 transition-colors duration-300">Sales Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
          This section will contain prospects, meetings, invoices, and sales pipeline management.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-slate-700/50 rounded-lg p-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2 transition-colors duration-300">Prospects</h3>
          <p className="text-blue-600 dark:text-blue-300 transition-colors duration-300">Coming soon...</p>
        </div>
        <div className="bg-blue-50 dark:bg-slate-700/50 rounded-lg p-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2 transition-colors duration-300">Meetings</h3>
          <p className="text-blue-600 dark:text-blue-300 transition-colors duration-300">Coming soon...</p>
        </div>
        <div className="bg-blue-50 dark:bg-slate-700/50 rounded-lg p-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2 transition-colors duration-300">Invoices</h3>
          <p className="text-blue-600 dark:text-blue-300 transition-colors duration-300">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Sales;