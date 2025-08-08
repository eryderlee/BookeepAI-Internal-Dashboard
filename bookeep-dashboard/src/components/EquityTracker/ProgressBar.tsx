interface FounderEquity {
  name: string;
  percentage: number;
  color: string;
  department?: string;
}

interface ProgressBarProps {
  founders: FounderEquity[];
}

const ProgressBar = ({ founders }: ProgressBarProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex h-8 bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden shadow-inner dark:shadow-slate-900/50 transition-colors duration-300">
        {founders.map((founder) => (
          <div
            key={founder.name}
            className={`h-full ${founder.color} transition-all duration-500 ease-in-out flex items-center justify-center relative group cursor-pointer hover:brightness-110 hover:shadow-lg`}
            style={{ width: `${founder.percentage}%` }}
          >
            {founder.percentage > 10 && (
              <span className="text-white text-sm font-medium drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                {founder.percentage.toFixed(1)}%
              </span>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-200"></div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {founders.map((founder) => (
          <div 
            key={founder.name} 
            className="group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-slate-700/50 hover:shadow-sm dark:hover:shadow-slate-900/50 cursor-pointer hover:-translate-y-0.5"
          >
            <div className={`w-4 h-4 rounded ${founder.color} transition-all duration-200 group-hover:scale-125 group-hover:shadow-md`}></div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">{founder.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">{founder.department}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 font-semibold transition-colors">{founder.percentage.toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;