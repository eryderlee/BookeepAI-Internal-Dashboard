import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Icon } from '../components/UI';
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  MessageSquare, 
  Star, 
  Users, 
  ThumbsUp,
  Calendar,
  FileText,
  Mail,
  Phone,
  Eye
} from 'lucide-react';

const ClientPulse = () => {
  // Client health overview metrics
  const healthMetrics = {
    overallSatisfaction: { score: 4.7, trend: '+0.2', period: 'vs last month' },
    activeClients: { count: 23, trend: '+3', period: 'this quarter' },
    atRiskClients: { count: 3, trend: '-1', period: 'this month' },
    responseRate: { rate: 87, trend: '+5%', period: 'vs last quarter' }
  };

  // Sample client data
  const clients = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      contact: 'Sarah Johnson',
      satisfactionScore: 4.8,
      healthStatus: 'excellent',
      lastInteraction: '2 days ago',
      nextCheckIn: '2024-03-15',
      projectStatus: 'on-track',
      riskLevel: 'low',
      totalProjects: 3,
      activeProjects: 2
    },
    {
      id: 2,
      name: 'RetailMax Inc.',
      contact: 'Mike Chen',
      satisfactionScore: 4.9,
      healthStatus: 'excellent',
      lastInteraction: '1 week ago',
      nextCheckIn: '2024-03-12',
      projectStatus: 'completed',
      riskLevel: 'low',
      totalProjects: 2,
      activeProjects: 0
    },
    {
      id: 3,
      name: 'StartupCo',
      contact: 'Emily Rodriguez',
      satisfactionScore: 3.2,
      healthStatus: 'at-risk',
      lastInteraction: '3 weeks ago',
      nextCheckIn: 'Overdue',
      projectStatus: 'delayed',
      riskLevel: 'high',
      totalProjects: 1,
      activeProjects: 1
    },
    {
      id: 4,
      name: 'InvestBank Ltd.',
      contact: 'David Park',
      satisfactionScore: 4.5,
      healthStatus: 'good',
      lastInteraction: '5 days ago',
      nextCheckIn: '2024-03-20',
      projectStatus: 'on-track',
      riskLevel: 'low',
      totalProjects: 2,
      activeProjects: 1
    },
    {
      id: 5,
      name: 'LogisticsCorp',
      contact: 'Anna Williams',
      satisfactionScore: 3.8,
      healthStatus: 'needs-attention',
      lastInteraction: '2 weeks ago',
      nextCheckIn: '2024-03-14',
      projectStatus: 'on-hold',
      riskLevel: 'medium',
      totalProjects: 1,
      activeProjects: 0
    },
    {
      id: 6,
      name: 'ServicePro',
      contact: 'James Liu',
      satisfactionScore: 4.6,
      healthStatus: 'good',
      lastInteraction: '4 days ago',
      nextCheckIn: '2024-03-18',
      projectStatus: 'on-track',
      riskLevel: 'low',
      totalProjects: 1,
      activeProjects: 1
    }
  ];

  // Recent feedback data
  const recentFeedback = [
    {
      id: 1,
      client: 'TechCorp Solutions',
      rating: 5,
      comment: 'Exceptional service and attention to detail. The automation has saved us countless hours.',
      date: '2 days ago',
      category: 'Project Delivery'
    },
    {
      id: 2,
      client: 'RetailMax Inc.',
      rating: 5,
      comment: 'Outstanding results! Revenue tracking automation exceeded expectations.',
      date: '1 week ago',
      category: 'Technical Performance'
    },
    {
      id: 3,
      client: 'StartupCo',
      rating: 2,
      comment: 'Project timeline has been concerning. Need better communication.',
      date: '3 weeks ago',
      category: 'Communication'
    },
    {
      id: 4,
      client: 'InvestBank Ltd.',
      rating: 4,
      comment: 'Good progress on financial reporting automation. Minor adjustments needed.',
      date: '5 days ago',
      category: 'Project Delivery'
    }
  ];

  // Satisfaction distribution for chart
  const satisfactionDistribution = [
    { rating: 5, count: 14, percentage: 61 },
    { rating: 4, count: 6, percentage: 26 },
    { rating: 3, count: 2, percentage: 9 },
    { rating: 2, count: 1, percentage: 4 },
    { rating: 1, count: 0, percentage: 0 }
  ];

  const npsScore = 67; // Net Promoter Score


  const getHealthBadgeVariant = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'needs-attention': return 'warning';
      case 'at-risk': return 'error';
      default: return 'default';
    }
  };

  const getRiskIndicatorColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-400';
      case 'medium': return 'bg-yellow-400';
      case 'high': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Client Pulse</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor client satisfaction and engagement metrics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Icon icon={FileText} size="sm" className="mr-2" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <Icon icon={MessageSquare} size="sm" className="mr-2" />
            Schedule Survey
          </Button>
        </div>
      </div>

      {/* Health Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                <Icon icon={Heart} size="lg" className="text-pink-600 dark:text-pink-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{healthMetrics.overallSatisfaction.score}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overall Satisfaction</p>
                <div className="flex items-center mt-1">
                  <Icon icon={TrendingUp} size="xs" className="text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">{healthMetrics.overallSatisfaction.trend}</span>
                  <span className="text-xs text-gray-500 ml-1">{healthMetrics.overallSatisfaction.period}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Icon icon={Users} size="lg" className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{healthMetrics.activeClients.count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Clients</p>
                <div className="flex items-center mt-1">
                  <Icon icon={TrendingUp} size="xs" className="text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">{healthMetrics.activeClients.trend}</span>
                  <span className="text-xs text-gray-500 ml-1">{healthMetrics.activeClients.period}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <Icon icon={AlertTriangle} size="lg" className="text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{healthMetrics.atRiskClients.count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">At-Risk Clients</p>
                <div className="flex items-center mt-1">
                  <Icon icon={TrendingDown} size="xs" className="text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">{healthMetrics.atRiskClients.trend}</span>
                  <span className="text-xs text-gray-500 ml-1">{healthMetrics.atRiskClients.period}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Icon icon={ThumbsUp} size="lg" className="text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{healthMetrics.responseRate.rate}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
                <div className="flex items-center mt-1">
                  <Icon icon={TrendingUp} size="xs" className="text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">{healthMetrics.responseRate.trend}</span>
                  <span className="text-xs text-gray-500 ml-1">{healthMetrics.responseRate.period}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satisfaction Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Satisfaction Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satisfactionDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 w-12">
                      <span className="text-sm font-medium">{item.rating}</span>
                      <Icon icon={Star} size="xs" className="text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{item.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* NPS Score */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Net Promoter Score</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Based on client recommendations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{npsScore}</div>
                    <Badge variant="success" className="mt-1">Excellent</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Health Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Client Health Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {/* Risk Indicator */}
                      <div className={`w-3 h-3 rounded-full ${getRiskIndicatorColor(client.riskLevel)}`}></div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{client.name}</h4>
                          <Badge variant={getHealthBadgeVariant(client.healthStatus) as any}>
                            {client.healthStatus.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span>Contact: {client.contact}</span>
                          <span>Score: {client.satisfactionScore}/5</span>
                          <span>Projects: {client.activeProjects} active</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>Last contact: {client.lastInteraction}</span>
                          <span>Next check-in: {client.nextCheckIn}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon icon={Mail} size="sm" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon icon={Phone} size="sm" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon icon={Eye} size="sm" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Feedback & Alerts */}
        <div className="space-y-6">
          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm text-gray-900 dark:text-white">{feedback.client}</h5>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i}
                            icon={Star} 
                            size="xs" 
                            className={`${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{feedback.comment}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Badge variant="info" className="text-xs">{feedback.category}</Badge>
                      <span>{feedback.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                  <Icon icon={AlertTriangle} size="sm" className="text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Follow up with StartupCo</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Check-in overdue by 5 days</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                  <Icon icon={Calendar} size="sm" className="text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Schedule LogisticsCorp review</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Due tomorrow</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <Icon icon={ThumbsUp} size="sm" className="text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Request testimonial</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">TechCorp & RetailMax ready</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientPulse;