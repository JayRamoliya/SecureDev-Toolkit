
import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';

const HTMLCSSJSMinifier: React.FC = () => {
  return (
    <PageContainer
      title="HTML/CSS/JS Minifier"
      description="Reduce file sizes by removing unnecessary whitespace, comments, and formatting."
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-60">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-devtools-purple mb-4">Coming Soon</h3>
              <p className="text-gray-600">
                The HTML/CSS/JS Minifier tool is under development and will be available soon.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default HTMLCSSJSMinifier;
