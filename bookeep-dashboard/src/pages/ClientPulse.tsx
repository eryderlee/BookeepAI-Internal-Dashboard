import { Card, CardContent, CardHeader, CardTitle } from '../components/UI';

const ClientPulse = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Client Pulse</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor client satisfaction and feedback
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Client Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon - Client feedback and satisfaction tracking
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPulse;