
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';

const RegexTester: React.FC = () => {
  return (
    <PageContainer
      title="Regex Tester"
      description="Test and debug regular expressions in real-time."
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-60">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-devtools-purple mb-4">Coming Soon</h3>
              <p className="text-gray-600">
                The Regex Tester tool is under development and will be available soon.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default RegexTester;
