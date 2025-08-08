import { Card, CardContent, CardHeader, CardTitle } from '../components/UI';

const Assets = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Assets</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage templates, documents, and resources
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Asset Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Coming soon - File and template management system
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assets;