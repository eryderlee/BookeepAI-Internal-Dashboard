const Sales = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Sales Dashboard</h1>
        <p className="text-gray-600">
          This section will contain prospects, meetings, invoices, and sales pipeline management.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Prospects</h3>
          <p className="text-blue-600">Coming soon...</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Meetings</h3>
          <p className="text-blue-600">Coming soon...</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Invoices</h3>
          <p className="text-blue-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Sales;