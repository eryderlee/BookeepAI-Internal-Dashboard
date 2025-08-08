import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Icon } from '../components/UI';
import { Plus, ClipboardList, CheckCircle, Zap, DollarSign } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'TechCorp CRM Automation',
      client: 'TechCorp Solutions',
      status: 'in-progress',
      progress: 75,
      dueDate: '2024-03-15',
      team: ['JD', 'SK', 'AM'],
      revenue: '$45,000',
      description: 'Complete CRM workflow automation with lead scoring and pipeline management.'
    },
    {
      id: 2,
      name: 'E-commerce Analytics Dashboard',
      client: 'RetailMax Inc.',
      status: 'completed',
      progress: 100,
      dueDate: '2024-02-28',
      team: ['ET', 'RK'],
      revenue: '$32,000',
      description: 'Real-time analytics dashboard with automated reporting and inventory tracking.'
    },
    {
      id: 3,
      name: 'HR Process Automation',
      client: 'StartupCo',
      status: 'planning',
      progress: 15,
      dueDate: '2024-04-20',
      team: ['MJ', 'LB', 'PW'],
      revenue: '$28,000',
      description: 'Automated hiring pipeline from application to onboarding.'
    },
    {
      id: 4,
      name: 'Financial Reporting Suite',
      client: 'InvestBank Ltd.',
      status: 'in-progress',
      progress: 45,
      dueDate: '2024-03-30',
      team: ['DT', 'FK'],
      revenue: '$67,000',
      description: 'Automated financial reports generation with compliance checks.'
    },
    {
      id: 5,
      name: 'Customer Service Chatbot',
      client: 'ServicePro',
      status: 'review',
      progress: 90,
      dueDate: '2024-03-10',
      team: ['GH', 'NM'],
      revenue: '$22,000',
      description: 'AI-powered customer service automation with natural language processing.'
    },
    {
      id: 6,
      name: 'Supply Chain Optimization',
      client: 'LogisticsCorp',
      status: 'on-hold',
      progress: 30,
      dueDate: '2024-05-15',
      team: ['QR', 'SU'],
      revenue: '$55,000',
      description: 'Automated supply chain management with predictive analytics.'
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'success',
      'in-progress': 'info', 
      'planning': 'warning',
      'review': 'secondary',
      'on-hold': 'destructive'
    };
    return colors[status as keyof typeof colors] || 'secondary';
  };

  const getStatusText = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage client automation projects and track progress
          </p>
        </div>
        <Button variant="primary">
          <Icon icon={Plus} size="sm" className="mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Icon icon={ClipboardList} size="lg" className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Icon icon={CheckCircle} size="lg" className="text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Icon icon={Zap} size="lg" className="text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Icon icon={DollarSign} size="lg" className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$249K</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} hoverable className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-1 pr-2">{project.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
                </div>
                <Badge variant={getStatusColor(project.status) as any}>
                  {getStatusText(project.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {project.description}
              </p>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{project.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400">Revenue</p>
                  <p className="font-medium text-green-600 dark:text-green-400">{project.revenue}</p>
                </div>
              </div>
              
              {/* Team Members */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Team:</span>
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <div 
                        key={index}
                        className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800"
                        title={member}
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  View Details →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;