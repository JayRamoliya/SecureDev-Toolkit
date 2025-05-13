
import React from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="container py-6 max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PageContainer;
