import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/UI';

const Experiments = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Experiments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            A/B tests and experimental automation approaches
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI-Powered Lead Scoring</CardTitle>
              <Badge variant="warning">In Progress</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Testing machine learning models for lead qualification
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Voice-to-CRM Integration</CardTitle>
              <Badge variant="info">Planning</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Exploring automatic call transcription and data entry
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Experiments;