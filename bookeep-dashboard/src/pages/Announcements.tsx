import { Card, CardContent, CardHeader, CardTitle, Badge, Icon } from '../components/UI';
import { Trophy } from 'lucide-react';

const Announcements = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Announcements</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Company updates and team communications
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Card variant="ghost">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary-600 flex items-center">
                <Icon icon={Trophy} size="md" className="mr-2 text-primary-600" />
                Q4 Goals Achieved!
              </CardTitle>
              <Badge variant="success">New</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              We've successfully exceeded our Q4 automation deployment targets by 23%. Great work team!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Posted 2 hours ago</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Team Sync - Friday 2PM</CardTitle>
              <Badge variant="info">Recurring</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Don't forget about our weekly sync to review project progress and plan next week's priorities.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Posted 3 days ago</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Announcements;