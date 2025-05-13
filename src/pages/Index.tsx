
import React from 'react';
import ToolCard from '@/components/ToolCard';
import PageContainer from '@/components/PageContainer';
import { 
  KeyRound, 
  Hash, 
  FileCode, 
  Terminal, 
  FileJson, 
  Code 
} from 'lucide-react';

const Index = () => {
  const tools = [
    {
      title: "Password Generator",
      description: "Create strong, customized passwords with various character options and strength metrics.",
      icon: <KeyRound />,
      path: "/password-generator"
    },
    {
      title: "Hash Generator",
      description: "Generate secure hash digests using MD5, SHA-1, SHA-256, and SHA-512 algorithms.",
      icon: <Hash />,
      path: "/hash-generator"
    },
    {
      title: "UUID Generator",
      description: "Create universally unique identifiers (UUIDs) for distributed systems and databases.",
      icon: <FileCode />,
      path: "/uuid-generator"
    },
    {
      title: "JWT Decoder",
      description: "Decode and inspect JSON Web Tokens to view header, payload, and signature data.",
      icon: <Terminal />,
      path: "/jwt-decoder"
    },
    {
      title: "Regex Tester",
      description: "Test and debug regular expressions with real-time matching and explanation features.",
      icon: <FileCode />,
      path: "/regex-tester"
    },
    {
      title: "JSON Formatter",
      description: "Beautify or minify JSON data with syntax highlighting and validation.",
      icon: <FileJson />,
      path: "/json-formatter"
    },
    {
      title: "HTML/CSS/JS Minifier",
      description: "Reduce file sizes by removing unnecessary whitespace, comments, and formatting.",
      icon: <Code />,
      path: "/minifier"
    }
  ];

  return (
    <PageContainer
      title="SecureDev Toolkit"
      description="All-in-one toolbox for developers, security analysts, and power users."
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Essential Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
        <h2 className="text-xl font-semibold mb-2 text-devtools-purple">Why SecureDev Toolkit?</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <div className="mr-2 text-devtools-purple">✓</div>
            <span>All tools work locally in your browser - your data never leaves your device</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 text-devtools-purple">✓</div>
            <span>Open source and free to use for all your development tasks</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 text-devtools-purple">✓</div>
            <span>Regularly updated with new tools and features</span>
          </li>
        </ul>
      </div>
    </PageContainer>
  );
};

export default Index;
