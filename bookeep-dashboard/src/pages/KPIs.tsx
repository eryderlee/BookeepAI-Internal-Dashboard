import { Card, CardContent, CardHeader, CardTitle, Badge, Icon } from '../components/UI';
import { DollarSign, Zap, Users, Star } from 'lucide-react';

const KPIs = () => {
  const revenueData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 48000 },
    { month: 'Apr', value: 61000 },
    { month: 'May', value: 58000 },
    { month: 'Jun', value: 67000 },
  ];

  const automationMetrics = [
    { name: 'Email Automation', success: 94, total: 1250 },
    { name: 'CRM Workflows', success: 89, total: 850 },
    { name: 'Lead Scoring', success: 96, total: 2100 },
    { name: 'Report Generation', success: 87, total: 450 },
  ];

  const clientSatisfaction = [
    { rating: 5, count: 24 },
    { rating: 4, count: 18 },
    { rating: 3, count: 6 },
    { rating: 2, count: 2 },
    { rating: 1, count: 1 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">KPIs Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track key performance indicators and business metrics
          </p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="success">Live Data</Badge>
          <Badge variant="info">Last Updated: 2 min ago</Badge>
        </div>
      </div>
      
      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Icon icon={DollarSign} size="lg" className="text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$67K</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-green-600">+15.3%</span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Icon icon={Zap} size="lg" className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Automations</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-blue-600">+8</span>
                  <span className="text-xs text-gray-500 ml-1">this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Icon icon={Users} size="lg" className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Clients</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-purple-600">+3</span>
                  <span className="text-xs text-gray-500 ml-1">new this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Icon icon={Star} size="lg" className="text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.7</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium text-orange-600">+0.2</span>
                  <span className="text-xs text-gray-500 ml-1">this quarter</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between h-32">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-8 bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-sm transition-all duration-500 hover:opacity-80"
                      style={{ 
                        height: `${(data.value / maxRevenue) * 100}%`,
                        minHeight: '8px'
                      }}
                      title={`$${data.value.toLocaleString()}`}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Total: ${revenueData.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Automation Success Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Automation Success Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">{metric.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{metric.success}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metric.success}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(metric.total * metric.success / 100)} successful out of {metric.total} executions
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Client Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Client Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clientSatisfaction.map((rating, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-8">
                    <span className="text-sm font-medium">{rating.rating}</span>
                    <Icon icon={Star} size="xs" className="text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(rating.count / Math.max(...clientSatisfaction.map(r => r.count))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-6">{rating.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">System Uptime</span>
                <Badge variant="success">99.9%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg Response Time</span>
                <Badge variant="info">2.3s</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Error Rate</span>
                <Badge variant="warning">0.1%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Client Retention</span>
                <Badge variant="success">94%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Project Success</span>
                <Badge variant="success">89%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg font-bold text-gray-900 dark:text-white">1.2M</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tasks Automated</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg font-bold text-gray-900 dark:text-white">156</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Hours Saved</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg font-bold text-gray-900 dark:text-white">$2.1M</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Revenue</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg font-bold text-gray-900 dark:text-white">67</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Workflows Built</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KPIs;