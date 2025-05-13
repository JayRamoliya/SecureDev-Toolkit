
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';

const JSONFormatter: React.FC = () => {
  return (
    <PageContainer
      title="JSON Formatter & Beautifier"
      description="Format JSON data for better readability and debugging."
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-60">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-devtools-purple mb-4">Coming Soon</h3>
              <p className="text-gray-600">
                The JSON Formatter tool is under development and will be available soon.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default JSONFormatter;
