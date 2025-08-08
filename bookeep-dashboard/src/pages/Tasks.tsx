import { useState, useMemo } from 'react';
import { Badge, Button, Icon, Input } from '../components/UI';
import { 
  Search, 
  Filter,
  Plus,
  Circle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  MoreHorizontal
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'complete' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date | null;
  tags: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
}

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'status' | 'title'>('dueDate');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Sample task data for AI automation agency
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete TechCorp CRM integration setup',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date('2024-03-10'),
      tags: ['Client Work', 'CRM', 'Integration'],
      notes: 'Need to finalize API keys and test data sync',
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-08'),
      assignee: 'Sarah'
    },
    {
      id: '2',
      title: 'Review Q1 automation performance metrics',
      status: 'not-started',
      priority: 'medium',
      dueDate: new Date('2024-03-15'),
      tags: ['Internal', 'Analytics', 'Review'],
      notes: 'Prepare slides for board presentation',
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-05'),
      assignee: 'Mike'
    },
    {
      id: '3',
      title: 'Update RetailMax inventory automation',
      status: 'complete',
      priority: 'high',
      dueDate: new Date('2024-03-08'),
      tags: ['Client Work', 'Inventory', 'Update'],
      notes: 'Successfully deployed v2.1 with enhanced reporting',
      createdAt: new Date('2024-02-28'),
      updatedAt: new Date('2024-03-08'),
      assignee: 'Emily'
    },
    {
      id: '4',
      title: 'Onboard new team member - DevOps role',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date('2024-03-12'),
      tags: ['Internal', 'HR', 'Onboarding'],
      notes: 'Setup accounts, training schedule, and mentorship',
      createdAt: new Date('2024-03-06'),
      updatedAt: new Date('2024-03-09'),
      assignee: 'David'
    },
    {
      id: '5',
      title: 'Fix StartupCo email automation bug',
      status: 'blocked',
      priority: 'high',
      dueDate: new Date('2024-03-09'),
      tags: ['Client Work', 'Bug Fix', 'Email'],
      notes: 'Waiting for client to provide access credentials',
      createdAt: new Date('2024-03-07'),
      updatedAt: new Date('2024-03-09'),
      assignee: 'Anna'
    },
    {
      id: '6',
      title: 'Write blog post about AI automation trends',
      status: 'not-started',
      priority: 'low',
      dueDate: new Date('2024-03-20'),
      tags: ['Marketing', 'Content', 'Blog'],
      notes: 'Focus on 2024 industry predictions and case studies',
      createdAt: new Date('2024-03-08'),
      updatedAt: new Date('2024-03-08'),
      assignee: 'James'
    },
    {
      id: '7',
      title: 'Prepare InvestBank compliance documentation',
      status: 'in-progress',
      priority: 'high',
      dueDate: new Date('2024-03-14'),
      tags: ['Client Work', 'Compliance', 'Documentation'],
      notes: 'SOX compliance requirements for financial automation',
      createdAt: new Date('2024-03-02'),
      updatedAt: new Date('2024-03-09'),
      assignee: 'Lisa'
    },
    {
      id: '8',
      title: 'Update team knowledge base documentation',
      status: 'not-started',
      priority: 'low',
      dueDate: new Date('2024-03-25'),
      tags: ['Internal', 'Documentation', 'Knowledge Base'],
      notes: 'Include new automation patterns and best practices',
      createdAt: new Date('2024-03-09'),
      updatedAt: new Date('2024-03-09'),
      assignee: 'Tom'
    },
    {
      id: '9',
      title: 'Conduct LogisticsCorp system health check',
      status: 'not-started',
      priority: 'medium',
      dueDate: new Date('2024-03-16'),
      tags: ['Client Work', 'Maintenance', 'Health Check'],
      notes: 'Quarterly system performance review and optimization',
      createdAt: new Date('2024-03-08'),
      updatedAt: new Date('2024-03-08'),
      assignee: 'Rachel'
    },
    {
      id: '10',
      title: 'Design new client onboarding automation',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date('2024-03-18'),
      tags: ['Internal', 'Process', 'Automation'],
      notes: 'Streamline contract signing and initial setup process',
      createdAt: new Date('2024-03-04'),
      updatedAt: new Date('2024-03-09'),
      assignee: 'Alex'
    }
  ]);

  // Get today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority': {
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'dueDate': {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        }
        case 'status': {
          const statusOrder = { 'blocked': 4, 'in-progress': 3, 'not-started': 2, 'complete': 1 };
          return statusOrder[b.status] - statusOrder[a.status];
        }
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, searchQuery, filterStatus, sortBy]);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'not-started':
        return <Icon icon={Circle} size="sm" className="text-gray-400" />;
      case 'in-progress':
        return <Icon icon={Clock} size="sm" className="text-primary-500" />;
      case 'complete':
        return <Icon icon={CheckCircle2} size="sm" className="text-success-500" />;
      case 'blocked':
        return <Icon icon={AlertCircle} size="sm" className="text-error-500" />;
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'not-started': return 'Not Started';
      case 'in-progress': return 'In Progress';
      case 'complete': return 'Complete';
      case 'blocked': return 'Blocked';
    }
  };

  const getStatusBadgeVariant = (status: Task['status']) => {
    switch (status) {
      case 'not-started': return 'default';
      case 'in-progress': return 'info';
      case 'complete': return 'success';
      case 'blocked': return 'error';
    }
  };

  const getPriorityBadgeVariant = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
    }
  };

  const isOverdue = (dueDate: Date | null) => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  const isDueToday = (dueDate: Date | null) => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage daily operations and task pipelines
          </p>
        </div>
        <Button variant="primary">
          <Icon icon={Plus} size="sm" className="mr-2" />
          Add Task
        </Button>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon icon={Search} size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="complete">Complete</option>
            <option value="blocked">Blocked</option>
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
            <option value="title">Sort by Title</option>
          </select>

          <Button variant="ghost" size="sm">
            <Icon icon={Filter} size="sm" />
          </Button>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <div className="col-span-5">Task</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Tags</div>
          </div>
        </div>

        {/* Task Rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTasks.map((task) => {
            const overdue = isOverdue(task.dueDate) && task.status !== 'complete';
            const dueToday = isDueToday(task.dueDate);
            
            return (
              <div 
                key={task.id} 
                className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 group relative ${
                  overdue ? 'bg-error-50 dark:bg-error-900/10' : ''
                } ${
                  dueToday ? 'ring-1 ring-primary-200 dark:ring-primary-800' : ''
                }`}
              >
                {/* Overdue indicator */}
                {overdue && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-error-500 rounded-full"></div>
                )}

                {/* Task Title */}
                <div className="col-span-5 flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <span className={`font-medium ${
                    task.status === 'complete' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.title}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2 flex items-center">
                  <Badge variant={getStatusBadgeVariant(task.status) as any} className="text-xs">
                    {getStatusText(task.status)}
                  </Badge>
                </div>

                {/* Priority */}
                <div className="col-span-1 flex items-center">
                  <Badge variant={getPriorityBadgeVariant(task.priority) as any} className="text-xs">
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </div>

                {/* Due Date */}
                <div className="col-span-2 flex items-center space-x-2">
                  {task.dueDate && (
                    <>
                      <Icon icon={Calendar} size="xs" className="text-gray-400" />
                      <span className={`text-sm ${
                        overdue ? 'text-error-600 dark:text-error-400 font-medium' :
                        dueToday ? 'text-primary-600 dark:text-primary-400 font-medium' :
                        'text-gray-600 dark:text-gray-400'
                      }`}>
                        {formatDate(task.dueDate)}
                      </span>
                    </>
                  )}
                </div>

                {/* Tags */}
                <div className="col-span-2 flex items-center gap-1 flex-wrap">
                  {task.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="default" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {task.tags.length > 2 && (
                    <Badge variant="default" className="text-xs">
                      +{task.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Action Menu */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <Button variant="ghost" size="sm" className="p-1">
                    <Icon icon={MoreHorizontal} size="sm" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Task Row */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/25">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-gray-500 dark:text-gray-400">
            <div className="col-span-12 flex items-center space-x-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <Icon icon={Plus} size="sm" />
              <span className="text-sm">Add a task...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredTasks.filter(t => t.status === 'not-started').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Not Started</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-primary-600">
            {filteredTasks.filter(t => t.status === 'in-progress').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-success-600">
            {filteredTasks.filter(t => t.status === 'complete').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-error-600">
            {filteredTasks.filter(t => isOverdue(t.dueDate) && t.status !== 'complete').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;