import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/UI';

const Tasks = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Internal task management and assignments
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Complete client onboarding</CardTitle>
              <Badge variant="warning">High</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Due: Tomorrow</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Review automation performance</CardTitle>
              <Badge variant="info">Medium</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Due: This week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tasks;