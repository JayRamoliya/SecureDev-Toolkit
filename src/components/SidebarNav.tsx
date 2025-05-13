
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  KeyRound, 
  Hash, 
  FileCode, 
  Terminal, 
  FileJson, 
  Code, 
  Settings,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const SidebarNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Password Generator', icon: <KeyRound size={20} />, path: '/password-generator' },
    { name: 'Hash Generator', icon: <Hash size={20} />, path: '/hash-generator' },
    { name: 'UUID Generator', icon: <FileCode size={20} />, path: '/uuid-generator' },
    { name: 'JWT Decoder', icon: <Terminal size={20} />, path: '/jwt-decoder' },
    { name: 'Regex Tester', icon: <FileCode size={20} />, path: '/regex-tester' },
    { name: 'JSON Formatter', icon: <FileJson size={20} />, path: '/json-formatter' },
    { name: 'Minifier', icon: <Code size={20} />, path: '/minifier' },
  ];

  return (
    <div 
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="font-bold text-lg text-devtools-purple">SecureDev Toolkit</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-devtools-purple text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-gray-500 flex items-center">
            <Settings size={14} className="mr-2" />
            <span>v1.0.0</span>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <Settings size={14} className="text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarNav;
