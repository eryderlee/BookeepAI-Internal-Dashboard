import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Icon } from '../components/UI';
import { RotateCcw, Settings } from 'lucide-react';

const BuildTracker = () => {
  const builds = [
    {
      id: 1,
      name: 'CRM Integration Pipeline',
      service: 'crm-automation',
      status: 'success',
      branch: 'main',
      commit: 'a1b2c3d',
      deployedAt: '2 hours ago',
      buildTime: '3m 24s',
      testCoverage: 94,
      environment: 'production'
    },
    {
      id: 2,
      name: 'Email Workflow Engine',
      service: 'email-automation',
      status: 'failed',
      branch: 'feature/smtp-fix',
      commit: 'e4f5g6h',
      deployedAt: '45 minutes ago',
      buildTime: '2m 12s',
      testCoverage: 87,
      environment: 'staging'
    },
    {
      id: 3,
      name: 'Analytics Dashboard',
      service: 'analytics-api',
      status: 'building',
      branch: 'develop',
      commit: 'i7j8k9l',
      deployedAt: 'Building...',
      buildTime: 'In progress',
      testCoverage: 91,
      environment: 'development'
    },
    {
      id: 4,
      name: 'Lead Scoring Model',
      service: 'ml-scoring',
      status: 'success',
      branch: 'main',
      commit: 'm0n1o2p',
      deployedAt: '6 hours ago',
      buildTime: '5m 47s',
      testCoverage: 88,
      environment: 'production'
    }
  ];

  const systemMetrics = {
    cpu: { value: 67, status: 'warning', label: 'CPU Usage' },
    memory: { value: 45, status: 'success', label: 'Memory Usage' },
    disk: { value: 23, status: 'success', label: 'Disk Usage' },
    network: { value: 12, status: 'success', label: 'Network I/O' }
  };

  const services = [
    { name: 'API Gateway', status: 'operational', uptime: '99.9%', responseTime: '45ms' },
    { name: 'Database', status: 'operational', uptime: '99.8%', responseTime: '12ms' },
    { name: 'Redis Cache', status: 'degraded', uptime: '98.2%', responseTime: '234ms' },
    { name: 'Message Queue', status: 'operational', uptime: '99.9%', responseTime: '8ms' },
    { name: 'File Storage', status: 'maintenance', uptime: '0%', responseTime: 'N/A' },
  ];

  const deploymentHistory = [
    { service: 'CRM Integration', version: 'v2.1.4', status: 'success', time: '2 hours ago', duration: '3m 24s' },
    { service: 'Email Engine', version: 'v1.8.2', status: 'failed', time: '45 minutes ago', duration: '2m 12s' },
    { service: 'Analytics API', version: 'v3.0.1', status: 'success', time: '6 hours ago', duration: '4m 15s' },
    { service: 'Auth Service', version: 'v1.4.7', status: 'success', time: '1 day ago', duration: '1m 58s' },
  ];

  const alerts = [
    { type: 'error', message: 'Email service authentication failed', time: '45 minutes ago', severity: 'high' },
    { type: 'warning', message: 'High CPU usage detected on server-03', time: '2 hours ago', severity: 'medium' },
    { type: 'info', message: 'Scheduled maintenance completed successfully', time: '4 hours ago', severity: 'low' },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'success': 'success',
      'failed': 'destructive',
      'building': 'warning',
      'operational': 'success',
      'degraded': 'warning',
      'maintenance': 'secondary'
    };
    return colors[status as keyof typeof colors] || 'secondary';
  };

  const getMetricColor = (status: string) => {
    const colors = {
      'success': 'text-green-600 dark:text-green-400',
      'warning': 'text-yellow-600 dark:text-yellow-400',
      'error': 'text-red-600 dark:text-red-400'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Build Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor builds, deployments, and system health
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Icon icon={RotateCcw} size="sm" className="mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Icon icon={Settings} size="sm" className="mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(systemMetrics).map(([key, metric]) => (
          <Card key={key}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                  <p className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                    {metric.value}%
                  </p>
                </div>
                <div className="w-12 h-12 relative">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200 dark:text-gray-700"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={getMetricColor(metric.status).replace('text-', 'text-').split(' ')[0]}
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${metric.value}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Build Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Builds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {builds.map((build) => (
                <div key={build.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">{build.name}</h4>
                      <Badge variant={getStatusColor(build.status) as any}>
                        {build.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>#{build.commit}</span>
                      <span>{build.branch}</span>
                      <span>{build.environment}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>Build: {build.buildTime}</span>
                      <span>Coverage: {build.testCoverage}%</span>
                      <span>{build.deployedAt}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View →
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'operational' ? 'bg-green-400' :
                      service.status === 'degraded' ? 'bg-yellow-400' :
                      service.status === 'maintenance' ? 'bg-gray-400' : 'bg-red-400'
                    }`}></div>
                    <span className="font-medium text-gray-900 dark:text-white">{service.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      <Badge variant={getStatusColor(service.status) as any} className="mb-1">
                        {service.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      {service.uptime} uptime • {service.responseTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment History & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deployment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deploymentHistory.map((deployment, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">{deployment.service}</span>
                      <Badge variant={getStatusColor(deployment.status) as any} className="text-xs">
                        {deployment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {deployment.version} • {deployment.duration} • {deployment.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 py-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-400' :
                    alert.severity === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={alert.severity === 'high' ? 'error' : alert.severity === 'medium' ? 'warning' : 'info'} className="text-xs">
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuildTracker;