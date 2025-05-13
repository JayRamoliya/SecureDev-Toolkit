
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  description, 
  icon, 
  path, 
  className 
}) => {
  return (
    <Link to={path}>
      <Card className={cn("tool-card h-full cursor-pointer border-2 border-transparent hover:border-devtools-purple", className)}>
        <CardHeader className="p-4 pb-2">
          <div className="rounded-full bg-purple-100 p-2 w-10 h-10 flex items-center justify-center mb-3 text-devtools-purple">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;
