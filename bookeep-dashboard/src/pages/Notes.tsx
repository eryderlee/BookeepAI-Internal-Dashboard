import { Card, CardContent, CardHeader, CardTitle } from '../components/UI';

const Notes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Notes & Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Team communication and project notes
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon - Slack-style threaded conversations with @mentions
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notes;