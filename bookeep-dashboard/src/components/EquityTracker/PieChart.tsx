interface FounderEquity {
  name: string;
  percentage: number;
  color: string;
  department?: string;
}

interface PieChartProps {
  founders: FounderEquity[];
}

const PieChart = ({ founders }: PieChartProps) => {
  // Calculate cumulative percentages for positioning
  let cumulativePercentage = 0;
  
  const createPathData = (percentage: number, startAngle: number) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    // Convert to radians
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    // Calculate coordinates for a circle with radius 90 (center at 100,100)
    const radius = 90;
    const centerX = 100;
    const centerY = 100;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    if (percentage === 100) {
      // Full circle
      return `M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 1 1 ${centerX} ${centerY + radius} A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`;
    }
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };
  
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          {founders.map((founder, index) => {
            const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
            const pathData = createPathData(founder.percentage, startAngle);
            cumulativePercentage += founder.percentage;
            
            // Get color without 'bg-' prefix for SVG fill
            const colorClass = founder.color.replace('bg-', '');
            let fillColor = '';
            
            // Map Tailwind colors to actual hex values
            switch (colorClass) {
              case 'emerald-400':
                fillColor = '#34d399';
                break;
              case 'violet-400':
                fillColor = '#a78bfa';
                break;
              case 'rose-400':
                fillColor = '#fb7185';
                break;
              case 'blue-600':
                fillColor = '#2563eb';
                break;
              default:
                fillColor = '#6b7280';
            }
            
            return (
              <path
                key={founder.name}
                d={pathData}
                fill={fillColor}
                className="transition-all duration-300 hover:opacity-90 hover:stroke-4 cursor-pointer drop-shadow-sm hover:drop-shadow-md"
                strokeWidth="2"
                stroke="white"
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.15))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = '';
                }}
              />
            );
          })}
        </svg>
        
        {/* Center circle with total equity text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border border-blue-100 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
            <div>
              <div className="text-xs text-gray-500 font-medium">Total</div>
              <div className="text-sm font-bold text-blue-900">100%</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md">
        {founders.map((founder) => (
          <div 
            key={founder.name} 
            className="group flex items-center space-x-2 text-sm p-3 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-md cursor-pointer hover:-translate-y-1"
          >
            <div className={`w-3 h-3 rounded-full ${founder.color} transition-transform duration-200 group-hover:scale-125 shadow-sm`}></div>
            <div className="text-center">
              <p className="font-medium text-blue-900 text-xs group-hover:text-blue-700 transition-colors">{founder.name}</p>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">{founder.department}</p>
              <p className="font-semibold text-blue-800 group-hover:text-blue-600 transition-colors">{founder.percentage.toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;